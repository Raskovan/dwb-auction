import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { itemUpdatesDocument } from "../queries";

const SUB_URL: string = (process.env.REACT_APP_API_SUBSCRIPTION_URL as string)
const API_KEY: string = (process.env.REACT_APP_API_KEY as string)

export const useItemUpdateSubscription = (itemId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(SUB_URL, 'graphql-ws');

    ws.onopen = () => {
      ws.send(JSON.stringify({
        "type": "connection_init", "payload": {
          headers: {
            "X-API-KEY": API_KEY,
          },
        }
      }));
      ws.send(JSON.stringify({
        "id": "1",
        "type": "start",
        "payload": {
          "variables": { "id": itemId },
          "extensions": {},
          "query": itemUpdatesDocument
        }
      }))
    }

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)

      if (msg.type === 'data') {
        const data = msg.payload.data.itemUpdates
        queryClient.invalidateQueries({ queryKey: ['item-by-id', data.id] })
      }
    }

    return () => {
      // Unsubscribe before exit
      // ws.send(JSON.stringify({ "id": "1", "type": "stop" }))
      ws.close()
    }
  }, [])
}