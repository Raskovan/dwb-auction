import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { itemUpdatesDocument } from "../queries";

const url = 'wss://secure-bayou-87301-79d4527ad2ec.herokuapp.com/ws';
const API_KEY = "zrcbpAcaRvB3.deW6dXP"

export const useItemUpdateSubscription = (itemId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(url, 'graphql-ws');

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