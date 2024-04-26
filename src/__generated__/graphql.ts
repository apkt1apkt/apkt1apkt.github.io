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
  /** Date custom scalar type  */
  Date: { input: any; output: any; }
};

export type Donation = {
  __typename?: 'Donation';
  amount: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  mobile: Scalars['String']['output'];
  name: Scalars['String']['output'];
  recordedAt?: Maybe<Scalars['Date']['output']>;
  user?: Maybe<User>;
};

export type DonationInput = {
  amount: Scalars['Int']['input'];
  mobile: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  recordDonation?: Maybe<Donation>;
};


export type MutationRecordDonationArgs = {
  donationInput: DonationInput;
};

export type Query = {
  __typename?: 'Query';
  appName: Scalars['String']['output'];
  donations?: Maybe<Array<Maybe<Donation>>>;
  totalDonations: Scalars['Int']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  donationRecorded?: Maybe<Donation>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type GetDonationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDonationsQuery = { __typename?: 'Query', donations?: Array<{ __typename?: 'Donation', id: number, name: string, mobile: string, amount: number, recordedAt?: any | null, user?: { __typename?: 'User', id: number, name: string } | null } | null> | null };

export type RecordDonationMutationVariables = Exact<{
  donationInput: DonationInput;
}>;


export type RecordDonationMutation = { __typename?: 'Mutation', recordDonation?: { __typename?: 'Donation', id: number, name: string, mobile: string, amount: number, recordedAt?: any | null, user?: { __typename?: 'User', id: number, name: string } | null } | null };

export type DonationRecordedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type DonationRecordedSubscription = { __typename?: 'Subscription', donationRecorded?: { __typename?: 'Donation', id: number, name: string, mobile: string, amount: number, recordedAt?: any | null, user?: { __typename?: 'User', id: number, name: string } | null } | null };

export type TotalDonationsQueryVariables = Exact<{ [key: string]: never; }>;


export type TotalDonationsQuery = { __typename?: 'Query', totalDonations: number };


export const GetDonationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetDonations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"donations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"recordedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetDonationsQuery, GetDonationsQueryVariables>;
export const RecordDonationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RecordDonation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"donationInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DonationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"recordDonation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"donationInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"donationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"recordedAt"}}]}}]}}]} as unknown as DocumentNode<RecordDonationMutation, RecordDonationMutationVariables>;
export const DonationRecordedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"DonationRecorded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"donationRecorded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"recordedAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<DonationRecordedSubscription, DonationRecordedSubscriptionVariables>;
export const TotalDonationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TotalDonations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalDonations"}}]}}]} as unknown as DocumentNode<TotalDonationsQuery, TotalDonationsQueryVariables>;