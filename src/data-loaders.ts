import { GraphQLClient } from "graphql-request";
import { QueryClient, useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query"
import { BidsByItemIdQuery, CreateOrUpdateUserMutation, ItemByIdQuery, ItemsOnSaleQuery, MakeBidByItemIdMutation } from "./gql/graphql";
import { bidsByItemIdDocument, createOrUpdateUserDocument, itemByIdDocument, itemsOnSaleDocument, makeBidByItemIdDocument } from "./queries";

const API_URL: string = (process.env.REACT_APP_API_URL as string)
const API_KEY: string = (process.env.REACT_APP_API_KEY as string)

const graphQLClient = new GraphQLClient(API_URL, {
  headers: {
    "X-API-KEY": API_KEY
  }
});

export function useItemsOnSale() {
  return useQuery<ItemsOnSaleQuery>({
    queryKey: ['items-on-sale'], queryFn: async () => await graphQLClient.request(
      itemsOnSaleDocument,
    )
  })
}

export function useItemById(itemId: string | undefined) {
  if (!itemId) throw new Error("Not found")
  return useQuery<ItemByIdQuery>({
    queryKey: ['item-by-id', itemId], queryFn: async () => await graphQLClient.request(itemByIdDocument,
      { id: itemId }
    ), enabled: !!itemId
  })
}

export function useBidsByItemId(itemId: string | undefined, last: number = 10, showBidHistory: boolean) {
  if (!itemId) throw new Error("Not found")
  return useInfiniteQuery<BidsByItemIdQuery>({
    // to invalidate both queries - 'item-by-id' and 'bid-by-item-id' - structure key similar
    // https://stackoverflow.com/questions/74370694/react-query-invalidate-multiple-queries-but-wait-until-they-all-finished-on-mut
    queryKey: ['item-by-id', itemId, 'bid-by-item-id'],
    queryFn: async ({ pageParam }) => {
      return await graphQLClient.request(bidsByItemIdDocument,
        { itemId: itemId, last: last, before: pageParam as string | undefined }
      )
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage, pages) => lastPage.bidsByItemId.pageInfo.endCursor,
    getPreviousPageParam: (firstPage, pages) => firstPage.bidsByItemId.pageInfo.startCursor,
    enabled: showBidHistory
  })
}

export function useMakeBidByItemId(itemId: string, bidderId: string, newPrice: number, message: string, queryClient: QueryClient) {
  if (!itemId) throw new Error("Not found")
  return useMutation<MakeBidByItemIdMutation>({
    mutationFn: () => graphQLClient.request(makeBidByItemIdDocument,
      { itemId: itemId, bidderId: bidderId, newPrice: newPrice, message: message }
    ),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ['item-by-id', itemId] })
    }
  })
}

export function useCreateOrUpdateUser(userId: string, username: string, email: string) {
  if (!userId && !username && !email) window.open("https://app-dev.dw-connect.org/projects/test-in", '_self')
  return useMutation<CreateOrUpdateUserMutation>({
    mutationFn: () => graphQLClient.request(createOrUpdateUserDocument,
      { userId: userId, username: username, email: email }
    )
    // onSuccess: () => {
    //   return queryClient.invalidateQueries({ queryKey: ['item-by-id', itemId] })
    // }
  })
}