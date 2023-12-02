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
          itemId
        }
        seller {
          id
          name
          email
        }
        state
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
        itemId
      }
      seller {
        id
        name
        email
      }
      state
    }
  }
`)

export const bidsByItemIdDocument = graphql(/* GraphQL */ `
  query BidsByItemId($itemId: ID!, $last: Int, $before: String) {
    bidsByItemId(itemId: $itemId, last: $last, before: $before) {
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
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`)


export const makeBidByItemIdDocument = graphql(/* GraphQL */ `
  mutation MakeBidByItemId($itemId: ID!, $bidderId: ID!, $newPrice: Int!, $message: String!) {
    makeBidByItemId(itemId: $itemId, bidderId: $bidderId, newPrice: $newPrice, message: $message)
  }
`)

export const createOrUpdateUserDocument = graphql(/* GraphQL */ `
  mutation CreateOrUpdateUser($userId: String!, $username: String!, $email: String!) {
    createOrUpdateUser(userId: $userId, username: $username, email: $email)
  }
`)

export const itemUpdatesDocument = `
  subscription ItemUpdates($id: String!) {
    itemUpdates(id: $id){
      id
      title
      description
      startTime
      endTime
      currentPrice
      imagesAdded
      imagesRemoved
      bidMessage
    }
  }
`

export const catalogUpdatesDocument = `
  subscription CatalogUpdates {
    catalogUpdates {
      itemId
      event
    }
  }
`