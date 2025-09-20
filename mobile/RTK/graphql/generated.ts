import { GraphQLResolveInfo } from 'graphql';
import { api } from './baseApi';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createSession?: Maybe<Session>;
  markFeatured?: Maybe<Speaker>;
  signIn: AuthPayload;
  signOut: SignOutPayload;
  signUp: AuthPayload;
  toggleFavoriteSession?: Maybe<User>;
  userInfo: UserInfoPayload;
};


export type MutationCreateSessionArgs = {
  session: SessionInput;
};


export type MutationMarkFeaturedArgs = {
  featured: Scalars['Boolean']['input'];
  speakerId: Scalars['ID']['input'];
};


export type MutationSignInArgs = {
  credentials: SignIn;
};


export type MutationSignUpArgs = {
  credentials: SignUp;
};


export type MutationToggleFavoriteSessionArgs = {
  sessionId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  sessionById?: Maybe<Session>;
  sessions: Array<Session>;
  speakerById?: Maybe<Speaker>;
  speakers: Array<Speaker>;
  userById?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};


export type QuerySessionByIdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QuerySessionsArgs = {
  day?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  endsAt?: InputMaybe<Scalars['String']['input']>;
  favorite?: InputMaybe<Scalars['Boolean']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  level?: InputMaybe<Scalars['String']['input']>;
  room?: InputMaybe<Scalars['String']['input']>;
  startsAt?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  track?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySpeakerByIdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryUserByIdArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type Session = {
  __typename?: 'Session';
  day?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  endsAt?: Maybe<Scalars['String']['output']>;
  format?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  level?: Maybe<Scalars['String']['output']>;
  room?: Maybe<Scalars['String']['output']>;
  speakers: Array<Speaker>;
  startsAt?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  /** @deprecated Too many sessions do not fit into a single track, we will be migrating to a tags based system in the future... */
  track?: Maybe<Scalars['String']['output']>;
};

export type SessionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  format?: InputMaybe<Scalars['String']['input']>;
  level?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type SignIn = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignOutPayload = {
  __typename?: 'SignOutPayload';
  user?: Maybe<User>;
};

export type SignUp = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Speaker = {
  __typename?: 'Speaker';
  bio?: Maybe<Scalars['String']['output']>;
  featured?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  sessions?: Maybe<Array<Maybe<Session>>>;
  user?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  favorites?: Maybe<Array<Session>>;
  hash?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  role: Role;
  speaker?: Maybe<Speaker>;
};

export type UserInfoPayload = {
  __typename?: 'UserInfoPayload';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = Record<PropertyKey, never>, TParent = Record<PropertyKey, never>, TContext = Record<PropertyKey, never>, TArgs = Record<PropertyKey, never>> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;





/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Role: Role;
  Session: ResolverTypeWrapper<Session>;
  SessionInput: SessionInput;
  SignIn: SignIn;
  SignOutPayload: ResolverTypeWrapper<SignOutPayload>;
  SignUp: SignUp;
  Speaker: ResolverTypeWrapper<Speaker>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserInfoPayload: ResolverTypeWrapper<UserInfoPayload>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  Boolean: Scalars['Boolean']['output'];
  ID: Scalars['ID']['output'];
  Mutation: Record<PropertyKey, never>;
  Query: Record<PropertyKey, never>;
  Session: Session;
  SessionInput: SessionInput;
  SignIn: SignIn;
  SignOutPayload: SignOutPayload;
  SignUp: SignUp;
  Speaker: Speaker;
  String: Scalars['String']['output'];
  User: User;
  UserInfoPayload: UserInfoPayload;
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createSession?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType, RequireFields<MutationCreateSessionArgs, 'session'>>;
  markFeatured?: Resolver<Maybe<ResolversTypes['Speaker']>, ParentType, ContextType, RequireFields<MutationMarkFeaturedArgs, 'featured' | 'speakerId'>>;
  signIn?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignInArgs, 'credentials'>>;
  signOut?: Resolver<ResolversTypes['SignOutPayload'], ParentType, ContextType>;
  signUp?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'credentials'>>;
  toggleFavoriteSession?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationToggleFavoriteSessionArgs, 'sessionId'>>;
  userInfo?: Resolver<ResolversTypes['UserInfoPayload'], ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  sessionById?: Resolver<Maybe<ResolversTypes['Session']>, ParentType, ContextType, Partial<QuerySessionByIdArgs>>;
  sessions?: Resolver<Array<ResolversTypes['Session']>, ParentType, ContextType, Partial<QuerySessionsArgs>>;
  speakerById?: Resolver<Maybe<ResolversTypes['Speaker']>, ParentType, ContextType, Partial<QuerySpeakerByIdArgs>>;
  speakers?: Resolver<Array<ResolversTypes['Speaker']>, ParentType, ContextType>;
  userById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, Partial<QueryUserByIdArgs>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
};

export type SessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Session'] = ResolversParentTypes['Session']> = {
  day?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endsAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  format?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  room?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  speakers?: Resolver<Array<ResolversTypes['Speaker']>, ParentType, ContextType>;
  startsAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  track?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type SignOutPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignOutPayload'] = ResolversParentTypes['SignOutPayload']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type SpeakerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Speaker'] = ResolversParentTypes['Speaker']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  featured?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sessions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Session']>>>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  favorites?: Resolver<Maybe<Array<ResolversTypes['Session']>>, ParentType, ContextType>;
  hash?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['Role'], ParentType, ContextType>;
  speaker?: Resolver<Maybe<ResolversTypes['Speaker']>, ParentType, ContextType>;
};

export type UserInfoPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserInfoPayload'] = ResolversParentTypes['UserInfoPayload']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Session?: SessionResolvers<ContextType>;
  SignOutPayload?: SignOutPayloadResolvers<ContextType>;
  Speaker?: SpeakerResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserInfoPayload?: UserInfoPayloadResolvers<ContextType>;
};



export const SessionsDocument = `
    query Sessions {
  sessions {
    id
    title
    day
    format
    level
  }
}
    `;
export const SpeakersDocument = `
    query Speakers {
  speakers {
    id
    name
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    Sessions: build.query<SessionsQuery, SessionsQueryVariables | void>({
      query: (variables) => ({ document: SessionsDocument, variables })
    }),
    Speakers: build.query<SpeakersQuery, SpeakersQueryVariables | void>({
      query: (variables) => ({ document: SpeakersDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSessionsQuery, useLazySessionsQuery, useSpeakersQuery, useLazySpeakersQuery } = injectedRtkApi;

