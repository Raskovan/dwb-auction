import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { catalogUpdatesDocument } from "../queries";

const SUB_URL: string = (process.env.REACT_APP_API_SUBSCRIPTION_URL as string)

export const useCatalogUpdatesSubscription = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const ws = new WebSocket(SUB_URL, 'graphql-ws');
    ws.onopen = () => {
      ws.send(JSON.stringify({
        "type": "connection_init", "payload": {}
      }));
      ws.send(JSON.stringify({
        "id": "2",
        "type": "start",
        "payload": {
          "variables": {},
          "extensions": {},
          "query": catalogUpdatesDocument
        }
      }))
    }

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)

      if (msg.type === 'data') {
        queryClient.invalidateQueries({ queryKey: ['items-on-sale'] })
      }
    }

    return () => {
      // Unsubscribe before exit
      ws.close()
    }
  }, [])
}