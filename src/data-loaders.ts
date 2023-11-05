import request from "graphql-request";
import { useMutation, useQuery } from "react-query"
import { BidsByItemIdQuery, ItemByIdQuery, ItemsOnSaleQuery, MakeBidByItemIdMutation } from "./gql/graphql";
import { bidsByItemIdDocument, itemByIdDocument, itemsOnSaleDocument, makeBidByItemIdDocument } from "./queries";

const endpoint = "https://secure-bayou-87301-79d4527ad2ec.herokuapp.com"

export function useItemsOnSale() {
  return useQuery<ItemsOnSaleQuery>({
    queryKey: ['auction-items'], queryFn: async () => await request(
      endpoint,
      itemsOnSaleDocument
    )
  })
}

export function useItemById(itemId: string | undefined) {
  if (!itemId) throw new Error("Not found")
  return useQuery<ItemByIdQuery>({
    queryKey: ['auction-item', itemId], queryFn: async () => await request(
      endpoint,
      itemByIdDocument,
      { id: itemId }
    ), enabled: !!itemId
  })
}

export function useBidsByItemId(itemId: string | undefined) {
  if (!itemId) throw new Error("Not found")
  return useQuery<BidsByItemIdQuery>({
    queryKey: ['bids', itemId], queryFn: async () => await request(
      endpoint,
      bidsByItemIdDocument,
      { itemId: itemId }
    ), enabled: false
  })
}

export function useMakeBidByItemId(itemId: string, bidderId: string, newPrice: number, message: string) {
  if (!itemId) throw new Error("Not found")
  return useMutation<MakeBidByItemIdMutation>({
    mutationFn: () => request(
      endpoint,
      makeBidByItemIdDocument,
      { itemId: itemId, bidderId: bidderId, newPrice: newPrice, message: message }
    )
  })
}