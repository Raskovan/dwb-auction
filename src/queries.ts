import { graphql } from "./gql";

export const itemsOnSaleDocument = graphql(/* GraphQL */ `
  query ItemsOnSale{
    itemsOnSale {
      nodes {
        id
        title
        description
        startTime
        endTime
        currentPrice
        images {
          id
          url
        }
        seller {
          id
          name
          email
        }
      }
    }
  }
`)

export const itemByIdDocument = graphql(/* GraphQL */ `
  query ItemById($id: ID!) {
    itemById(id: $id) {
      id
      title
      description
      startTime
      endTime
      currentPrice
      images {
        id
        url
      }
      seller {
        id
        name
        email
      }
    }
  }
`)

export const bidsByItemIdDocument = graphql(/* GraphQL */ `
  query BidsByItemId($itemId: ID!) {
    bidsByItemId(itemId: $itemId) {
      nodes {
        id
        message
        bidTime
        newPrice
        bidder {
          id
          name
          email
        }
      }
    }
  }
`)


export const makeBidByItemIdDocument = graphql(/* GraphQL */ `
  mutation MakeBidByItemId($itemId: ID!, $bidderId: ID!, $newPrice: Int!, $message: String!) {
    makeBidByItemId(itemId: $itemId, bidderId: $bidderId, newPrice: $newPrice, message: $message)
  }
`)