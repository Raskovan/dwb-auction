import request from "graphql-request";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query"
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

export function useBidsByItemId(itemId: string | undefined, last: number = 10, showBidHistory: boolean) {
  if (!itemId) throw new Error("Not found")
  return useQuery<BidsByItemIdQuery>({
    queryKey: ['auction-item', itemId, 'bids-history'], queryFn: async () => await request(
      endpoint,
      bidsByItemIdDocument,
      { itemId: itemId, last: last }
    ), enabled: showBidHistory
  })
}

export function useMakeBidByItemId(itemId: string, bidderId: string, newPrice: number, message: string, queryClient: QueryClient) {
  if (!itemId) throw new Error("Not found")
  return useMutation<MakeBidByItemIdMutation>({
    mutationFn: () => request(
      endpoint,
      makeBidByItemIdDocument,
      { itemId: itemId, bidderId: bidderId, newPrice: newPrice, message: message }
    ),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['auction-item', itemId] })
    }
  })
}