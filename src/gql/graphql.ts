/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * Implement the DateTime<Utc> scalar
   *
   * The input/output is a string in RFC3339 format.
   */
  DateTime: { input: any; output: any; }
};

export type Bid = {
  __typename?: 'Bid';
  bidTime: Scalars['DateTime']['output'];
  bidder?: Maybe<User>;
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  newPrice: Scalars['Int']['output'];
};

export type BidConnection = {
  __typename?: 'BidConnection';
  /** A list of edges. */
  edges: Array<BidEdge>;
  /** A list of nodes. */
  nodes: Array<Bid>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type BidEdge = {
  __typename?: 'BidEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Bid;
};

export enum CatalogEvent {
  ItemAdded = 'ITEM_ADDED',
  ItemChanged = 'ITEM_CHANGED',
  ItemDeleted = 'ITEM_DELETED'
}

export type CatalogUpdate = {
  __typename?: 'CatalogUpdate';
  event: CatalogEvent;
  itemId: Scalars['ID']['output'];
};

export type Item = {
  __typename?: 'Item';
  currentPrice: Scalars['Int']['output'];
  description: Scalars['String']['output'];
  endTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  images: Array<ItemImage>;
  seller?: Maybe<User>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
  state: ItemState;
  title: Scalars['String']['output'];
};

export type ItemConnection = {
  __typename?: 'ItemConnection';
  /** A list of edges. */
  edges: Array<ItemEdge>;
  /** A list of nodes. */
  nodes: Array<Item>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ItemEdge = {
  __typename?: 'ItemEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge */
  node: Item;
};

export type ItemImage = {
  __typename?: 'ItemImage';
  id: Scalars['ID']['output'];
  itemId: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};

export enum ItemState {
  Announced = 'ANNOUNCED',
  Inactive = 'INACTIVE',
  OnSale = 'ON_SALE',
  Sold = 'SOLD'
}

export type ItemUpdate = {
  __typename?: 'ItemUpdate';
  bidMessage?: Maybe<Scalars['String']['output']>;
  currentPrice?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endTime?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  imagesAdded?: Maybe<Array<Scalars['ID']['output']>>;
  imagesRemoved?: Maybe<Array<Scalars['ID']['output']>>;
  startTime?: Maybe<Scalars['DateTime']['output']>;
  state?: Maybe<ItemState>;
  title?: Maybe<Scalars['String']['output']>;
};

export type MutationRoot = {
  __typename?: 'MutationRoot';
  addImagesToItemById: Array<Scalars['ID']['output']>;
  createItem: Scalars['ID']['output'];
  createOrUpdateUser: Scalars['ID']['output'];
  deleteImageById: Scalars['Boolean']['output'];
  deleteItemById: Scalars['Boolean']['output'];
  deleteUserById: Scalars['Boolean']['output'];
  endSellingItemById: Scalars['DateTime']['output'];
  makeBidByItemId: Scalars['ID']['output'];
  publish: Scalars['Boolean']['output'];
  startSellingItemById: Scalars['DateTime']['output'];
  updateItemById: Scalars['Boolean']['output'];
};


export type MutationRootAddImagesToItemByIdArgs = {
  itemId: Scalars['ID']['input'];
  urls: Array<Scalars['String']['input']>;
};


export type MutationRootCreateItemArgs = {
  currentPrice: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  sellerId: Scalars['ID']['input'];
  title: Scalars['String']['input'];
};


export type MutationRootCreateOrUpdateUserArgs = {
  email: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRootDeleteImageByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRootDeleteItemByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRootDeleteUserByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRootEndSellingItemByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRootMakeBidByItemIdArgs = {
  bidderId: Scalars['ID']['input'];
  itemId: Scalars['ID']['input'];
  message: Scalars['String']['input'];
  newPrice: Scalars['Int']['input'];
};


export type MutationRootPublishArgs = {
  value: Scalars['String']['input'];
};


export type MutationRootStartSellingItemByIdArgs = {
  id: Scalars['ID']['input'];
};


export type MutationRootUpdateItemByIdArgs = {
  currentPrice?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['ID']['input'];
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  state?: InputMaybe<ItemState>;
  title?: InputMaybe<Scalars['String']['input']>;
};

/** Information about pagination in a connection */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type QueryRoot = {
  __typename?: 'QueryRoot';
  bidById?: Maybe<Bid>;
  bidsByItemId: BidConnection;
  imagesByIds: Array<ItemImage>;
  itemById?: Maybe<Item>;
  itemsOnSale: ItemConnection;
  userById?: Maybe<User>;
  version: Scalars['String']['output'];
};


export type QueryRootBidByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRootBidsByItemIdArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  itemId: Scalars['ID']['input'];
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRootImagesByIdsArgs = {
  ids: Array<Scalars['ID']['input']>;
};


export type QueryRootItemByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryRootItemsOnSaleArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRootUserByIdArgs = {
  id: Scalars['ID']['input'];
};

export type SubscriptionRoot = {
  __typename?: 'SubscriptionRoot';
  catalogUpdates: CatalogUpdate;
  itemUpdates: ItemUpdate;
  values: Scalars['String']['output'];
};


export type SubscriptionRootItemUpdatesArgs = {
  id: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type ItemsOnSaleQueryVariables = Exact<{ [key: string]: never; }>;


export type ItemsOnSaleQuery = { __typename?: 'QueryRoot', itemsOnSale: { __typename?: 'ItemConnection', nodes: Array<{ __typename?: 'Item', id: string, title: string, description: string, startTime?: any | null, endTime?: any | null, currentPrice: number, images: Array<{ __typename?: 'ItemImage', id: string, url: string }>, seller?: { __typename?: 'User', id: string, name: string, email: string } | null }> } };

export type ItemByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ItemByIdQuery = { __typename?: 'QueryRoot', itemById?: { __typename?: 'Item', id: string, title: string, description: string, startTime?: any | null, endTime?: any | null, currentPrice: number, images: Array<{ __typename?: 'ItemImage', id: string, url: string }>, seller?: { __typename?: 'User', id: string, name: string, email: string } | null } | null };

export type BidsByItemIdQueryVariables = Exact<{
  itemId: Scalars['ID']['input'];
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
}>;


export type BidsByItemIdQuery = { __typename?: 'QueryRoot', bidsByItemId: { __typename?: 'BidConnection', nodes: Array<{ __typename?: 'Bid', id: string, message: string, bidTime: any, newPrice: number, bidder?: { __typename?: 'User', id: string, name: string, email: string } | null }>, pageInfo: { __typename?: 'PageInfo', hasPreviousPage: boolean, hasNextPage: boolean, startCursor?: string | null, endCursor?: string | null } } };

export type MakeBidByItemIdMutationVariables = Exact<{
  itemId: Scalars['ID']['input'];
  bidderId: Scalars['ID']['input'];
  newPrice: Scalars['Int']['input'];
  message: Scalars['String']['input'];
}>;


export type MakeBidByItemIdMutation = { __typename?: 'MutationRoot', makeBidByItemId: string };

export type CreateOrUpdateUserMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type CreateOrUpdateUserMutation = { __typename?: 'MutationRoot', createOrUpdateUser: string };


export const ItemsOnSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ItemsOnSale"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemsOnSale"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"currentPrice"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seller"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ItemsOnSaleQuery, ItemsOnSaleQueryVariables>;
export const ItemByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ItemById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"endTime"}},{"kind":"Field","name":{"kind":"Name","value":"currentPrice"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seller"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}}]} as unknown as DocumentNode<ItemByIdQuery, ItemByIdQueryVariables>;
export const BidsByItemIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BidsByItemId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bidsByItemId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"bidTime"}},{"kind":"Field","name":{"kind":"Name","value":"newPrice"}},{"kind":"Field","name":{"kind":"Name","value":"bidder"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]} as unknown as DocumentNode<BidsByItemIdQuery, BidsByItemIdQueryVariables>;
export const MakeBidByItemIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MakeBidByItemId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"bidderId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newPrice"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"message"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"makeBidByItemId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemId"}}},{"kind":"Argument","name":{"kind":"Name","value":"bidderId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"bidderId"}}},{"kind":"Argument","name":{"kind":"Name","value":"newPrice"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newPrice"}}},{"kind":"Argument","name":{"kind":"Name","value":"message"},"value":{"kind":"Variable","name":{"kind":"Name","value":"message"}}}]}]}}]} as unknown as DocumentNode<MakeBidByItemIdMutation, MakeBidByItemIdMutationVariables>;
export const CreateOrUpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateOrUpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createOrUpdateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<CreateOrUpdateUserMutation, CreateOrUpdateUserMutationVariables>;