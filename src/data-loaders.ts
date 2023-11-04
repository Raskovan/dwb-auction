import request from "graphql-request";
import { useQuery } from "react-query"
import { BidsByItemIdQuery, ItemByIdQuery, ItemsOnSaleQuery } from "./gql/graphql";
import { bidsByItemIdDocument, itemByIdDocument, itemsOnSaleDocument } from "./queries";

const endpoint = "https://secure-bayou-87301-79d4527ad2ec.herokuapp.com"

export function useItemsOnSale() {
  return useQuery<ItemsOnSaleQuery>({
    queryKey: ['auction-items'], queryFn: async () => await request(
      endpoint,
      itemsOnSaleDocument
    )
  })
}

export function useItemById(itemId: string) {
  return useQuery<ItemByIdQuery>({
    queryKey: ['auction-item', itemId], queryFn: async () => await request(
      endpoint,
      itemByIdDocument,
      { id: itemId }
    ), enabled: !!itemId
  })
}

export function useBidsByItemId(itemId: string) {
  return useQuery<BidsByItemIdQuery>({
    queryKey: ['bids', itemId], queryFn: async () => await request(
      endpoint,
      bidsByItemIdDocument,
      { itemId: itemId }
    ), enabled: false
  })
}