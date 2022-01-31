import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Comments = {
  __typename?: 'Comments';
  id: Scalars['String'];
  likes?: Maybe<Scalars['Float']>;
  post: Post;
  text: Scalars['String'];
};

export type Image = {
  __typename?: 'Image';
  id: Scalars['String'];
  post: Post;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFriends: Scalars['Boolean'];
  addImageToPost: Scalars['Boolean'];
  changeUserRole: Scalars['Boolean'];
  createComment: Scalars['Boolean'];
  createPost: Scalars['Boolean'];
  deleteAllComments: Scalars['Boolean'];
  deleteAllPosts: Scalars['Boolean'];
  deleteAllUser: Scalars['Boolean'];
  deleteCommentByPostAndCommentId: Scalars['Boolean'];
  deletePostById: Scalars['Boolean'];
  dislikePost: Scalars['Boolean'];
  likeComment: Scalars['Boolean'];
  likePost: Scalars['Boolean'];
  signIn: Scalars['String'];
  signUp: Scalars['Boolean'];
  unLikeComment: Scalars['Boolean'];
  updateCommentTextById: Scalars['Boolean'];
  updatePostDescriptionById: Scalars['Boolean'];
};


export type MutationAddFriendsArgs = {
  friends_id: Scalars['String'];
};


export type MutationAddImageToPostArgs = {
  picture: Scalars['Upload'];
};


export type MutationChangeUserRoleArgs = {
  role: Scalars['String'];
  user_email: Scalars['String'];
};


export type MutationCreateCommentArgs = {
  postId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationCreatePostArgs = {
  postInput: UpdatePostInput;
};


export type MutationDeleteCommentByPostAndCommentIdArgs = {
  commentId: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationDeletePostByIdArgs = {
  post_id: Scalars['String'];
};


export type MutationDislikePostArgs = {
  initialLike: Scalars['Float'];
  post_id: Scalars['String'];
};


export type MutationLikeCommentArgs = {
  commentId: Scalars['String'];
  initialLike: Scalars['Float'];
};


export type MutationLikePostArgs = {
  initialLike: Scalars['Float'];
  post_id: Scalars['String'];
};


export type MutationSignInArgs = {
  emailAndPassword: UserLoginInput;
};


export type MutationSignUpArgs = {
  createUserInput: UserCreateInput;
};


export type MutationUnLikeCommentArgs = {
  commentId: Scalars['String'];
  initialLike: Scalars['Float'];
};


export type MutationUpdateCommentTextByIdArgs = {
  commentId: Scalars['String'];
  postId: Scalars['String'];
  text: Scalars['String'];
};


export type MutationUpdatePostDescriptionByIdArgs = {
  description: Scalars['String'];
  post_id: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  comments?: Maybe<Array<Comments>>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image: Image;
  likes?: Maybe<Scalars['Float']>;
  user: User;
};

export type PostNotification = {
  __typename?: 'PostNotification';
  date: Scalars['DateTime'];
  post: Post;
};

export type Query = {
  __typename?: 'Query';
  findFriends?: Maybe<Array<User>>;
  getAllComments: Array<Comments>;
  getAllPosts: Array<Post>;
  getAllUsers: Array<User>;
  post?: Maybe<Post>;
  user?: Maybe<User>;
};


export type QueryPostArgs = {
  post_id: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newPostCreatedNotification: PostNotification;
  userLoginSubscribe: User;
};

/** Update Post Input That */
export type UpdatePostInput = {
  description: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  displayName: Scalars['String'];
  email: Scalars['String'];
  friends?: Maybe<Array<User>>;
  id: Scalars['String'];
  password: Scalars['String'];
  posts: Array<Post>;
  role?: Maybe<Scalars['String']>;
};

export type UserCreateInput = {
  displayName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'Query', user?: { __typename: 'User', id: string, email: string } | null };


export const GetUsersDocument = gql`
    query GetUsers {
  user {
    __typename
    id
    email
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;