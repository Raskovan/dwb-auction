/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query ItemsOnSale{\n    itemsOnSale {\n      nodes {\n        id\n        title\n        description\n        startTime\n        endTime\n        currentPrice\n        images {\n          id\n          url\n          itemId\n        }\n        seller {\n          id\n          name\n          email\n        }\n        state\n      }\n    }\n  }\n": types.ItemsOnSaleDocument,
    "\n  query ItemById($id: ID!) {\n    itemById(id: $id) {\n      id\n      title\n      description\n      startTime\n      endTime\n      currentPrice\n      images {\n        id\n        url\n        itemId\n      }\n      seller {\n        id\n        name\n        email\n      }\n      state\n    }\n  }\n": types.ItemByIdDocument,
    "\n  query BidsByItemId($itemId: ID!, $last: Int, $before: String) {\n    bidsByItemId(itemId: $itemId, last: $last, before: $before) {\n      nodes {\n        id\n        message\n        bidTime\n        newPrice\n        bidder {\n          id\n          name\n          email\n        }\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n": types.BidsByItemIdDocument,
    "\n  mutation MakeBidByItemId($itemId: ID!, $bidderId: ID!, $newPrice: Int!, $message: String!) {\n    makeBidByItemId(itemId: $itemId, bidderId: $bidderId, newPrice: $newPrice, message: $message)\n  }\n": types.MakeBidByItemIdDocument,
    "\n  mutation CreateOrUpdateUser($userId: String!, $username: String!, $email: String!) {\n    createOrUpdateUser(userId: $userId, username: $username, email: $email)\n  }\n": types.CreateOrUpdateUserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ItemsOnSale{\n    itemsOnSale {\n      nodes {\n        id\n        title\n        description\n        startTime\n        endTime\n        currentPrice\n        images {\n          id\n          url\n          itemId\n        }\n        seller {\n          id\n          name\n          email\n        }\n        state\n      }\n    }\n  }\n"): (typeof documents)["\n  query ItemsOnSale{\n    itemsOnSale {\n      nodes {\n        id\n        title\n        description\n        startTime\n        endTime\n        currentPrice\n        images {\n          id\n          url\n          itemId\n        }\n        seller {\n          id\n          name\n          email\n        }\n        state\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ItemById($id: ID!) {\n    itemById(id: $id) {\n      id\n      title\n      description\n      startTime\n      endTime\n      currentPrice\n      images {\n        id\n        url\n        itemId\n      }\n      seller {\n        id\n        name\n        email\n      }\n      state\n    }\n  }\n"): (typeof documents)["\n  query ItemById($id: ID!) {\n    itemById(id: $id) {\n      id\n      title\n      description\n      startTime\n      endTime\n      currentPrice\n      images {\n        id\n        url\n        itemId\n      }\n      seller {\n        id\n        name\n        email\n      }\n      state\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BidsByItemId($itemId: ID!, $last: Int, $before: String) {\n    bidsByItemId(itemId: $itemId, last: $last, before: $before) {\n      nodes {\n        id\n        message\n        bidTime\n        newPrice\n        bidder {\n          id\n          name\n          email\n        }\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query BidsByItemId($itemId: ID!, $last: Int, $before: String) {\n    bidsByItemId(itemId: $itemId, last: $last, before: $before) {\n      nodes {\n        id\n        message\n        bidTime\n        newPrice\n        bidder {\n          id\n          name\n          email\n        }\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MakeBidByItemId($itemId: ID!, $bidderId: ID!, $newPrice: Int!, $message: String!) {\n    makeBidByItemId(itemId: $itemId, bidderId: $bidderId, newPrice: $newPrice, message: $message)\n  }\n"): (typeof documents)["\n  mutation MakeBidByItemId($itemId: ID!, $bidderId: ID!, $newPrice: Int!, $message: String!) {\n    makeBidByItemId(itemId: $itemId, bidderId: $bidderId, newPrice: $newPrice, message: $message)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOrUpdateUser($userId: String!, $username: String!, $email: String!) {\n    createOrUpdateUser(userId: $userId, username: $username, email: $email)\n  }\n"): (typeof documents)["\n  mutation CreateOrUpdateUser($userId: String!, $username: String!, $email: String!) {\n    createOrUpdateUser(userId: $userId, username: $username, email: $email)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;