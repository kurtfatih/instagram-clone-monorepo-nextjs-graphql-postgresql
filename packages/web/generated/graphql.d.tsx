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
  createPost?: Maybe<Scalars['Boolean']>;
  deleteAllComments: Scalars['Boolean'];
  deleteAllPosts: Scalars['Boolean'];
  deleteAllUser: Scalars['Boolean'];
  deleteCommentByPostAndCommentId: Scalars['Boolean'];
  deletePostById: Scalars['Boolean'];
  dislikePost: Scalars['Boolean'];
  likeComment: Scalars['Boolean'];
  likePost: Scalars['Boolean'];
  signIn: Scalars['String'];
  signUp?: Maybe<Scalars['Boolean']>;
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

export type SignUpMutationVariables = Exact<{
  createUserInput: UserCreateInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp?: boolean | null };

export type SignInMutationVariables = Exact<{
  emailAndPassword: UserLoginInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: string };

export type CreatePostMutationVariables = Exact<{
  postInput: UpdatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost?: boolean | null };

export type DeletePostByIdMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeletePostByIdMutation = { __typename?: 'Mutation', deletePostById: boolean };

export type UpdatePostDescriptionByIdMutationVariables = Exact<{
  description: Scalars['String'];
  postId: Scalars['String'];
}>;


export type UpdatePostDescriptionByIdMutation = { __typename?: 'Mutation', updatePostDescriptionById: boolean };

export type CreateCommentMutationVariables = Exact<{
  text: Scalars['String'];
  postId: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: boolean };

export type DeleteCommentByPostAndCommentIdMutationVariables = Exact<{
  commentId: Scalars['String'];
  postId: Scalars['String'];
}>;


export type DeleteCommentByPostAndCommentIdMutation = { __typename?: 'Mutation', deleteCommentByPostAndCommentId: boolean };

export type PostQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post?: { __typename?: 'Post', id: string, description?: string | null } | null };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, displayName: string } | null };

export type UserFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserFriendsQuery = { __typename?: 'Query', findFriends?: Array<{ __typename?: 'User', id: string }> | null };

export type NewPostCreatedNotificationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewPostCreatedNotificationSubscription = { __typename?: 'Subscription', newPostCreatedNotification: { __typename?: 'PostNotification', post: { __typename?: 'Post', id: string } } };

export type UserLoginSubscribeSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type UserLoginSubscribeSubscription = { __typename?: 'Subscription', userLoginSubscribe: { __typename?: 'User', id: string } };


export const SignUpDocument = gql`
    mutation SignUp($createUserInput: UserCreateInput!) {
  signUp(createUserInput: $createUserInput)
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($emailAndPassword: UserLoginInput!) {
  signIn(emailAndPassword: $emailAndPassword)
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      emailAndPassword: // value for 'emailAndPassword'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($postInput: UpdatePostInput!) {
  createPost(postInput: $postInput)
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      postInput: // value for 'postInput'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostByIdDocument = gql`
    mutation DeletePostById($postId: String!) {
  deletePostById(post_id: $postId)
}
    `;
export type DeletePostByIdMutationFn = Apollo.MutationFunction<DeletePostByIdMutation, DeletePostByIdMutationVariables>;

/**
 * __useDeletePostByIdMutation__
 *
 * To run a mutation, you first call `useDeletePostByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostByIdMutation, { data, loading, error }] = useDeletePostByIdMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostByIdMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostByIdMutation, DeletePostByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostByIdMutation, DeletePostByIdMutationVariables>(DeletePostByIdDocument, options);
      }
export type DeletePostByIdMutationHookResult = ReturnType<typeof useDeletePostByIdMutation>;
export type DeletePostByIdMutationResult = Apollo.MutationResult<DeletePostByIdMutation>;
export type DeletePostByIdMutationOptions = Apollo.BaseMutationOptions<DeletePostByIdMutation, DeletePostByIdMutationVariables>;
export const UpdatePostDescriptionByIdDocument = gql`
    mutation UpdatePostDescriptionById($description: String!, $postId: String!) {
  updatePostDescriptionById(description: $description, post_id: $postId)
}
    `;
export type UpdatePostDescriptionByIdMutationFn = Apollo.MutationFunction<UpdatePostDescriptionByIdMutation, UpdatePostDescriptionByIdMutationVariables>;

/**
 * __useUpdatePostDescriptionByIdMutation__
 *
 * To run a mutation, you first call `useUpdatePostDescriptionByIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostDescriptionByIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostDescriptionByIdMutation, { data, loading, error }] = useUpdatePostDescriptionByIdMutation({
 *   variables: {
 *      description: // value for 'description'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useUpdatePostDescriptionByIdMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostDescriptionByIdMutation, UpdatePostDescriptionByIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostDescriptionByIdMutation, UpdatePostDescriptionByIdMutationVariables>(UpdatePostDescriptionByIdDocument, options);
      }
export type UpdatePostDescriptionByIdMutationHookResult = ReturnType<typeof useUpdatePostDescriptionByIdMutation>;
export type UpdatePostDescriptionByIdMutationResult = Apollo.MutationResult<UpdatePostDescriptionByIdMutation>;
export type UpdatePostDescriptionByIdMutationOptions = Apollo.BaseMutationOptions<UpdatePostDescriptionByIdMutation, UpdatePostDescriptionByIdMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($text: String!, $postId: String!) {
  createComment(text: $text, postId: $postId)
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      text: // value for 'text'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentByPostAndCommentIdDocument = gql`
    mutation DeleteCommentByPostAndCommentId($commentId: String!, $postId: String!) {
  deleteCommentByPostAndCommentId(commentId: $commentId, postId: $postId)
}
    `;
export type DeleteCommentByPostAndCommentIdMutationFn = Apollo.MutationFunction<DeleteCommentByPostAndCommentIdMutation, DeleteCommentByPostAndCommentIdMutationVariables>;

/**
 * __useDeleteCommentByPostAndCommentIdMutation__
 *
 * To run a mutation, you first call `useDeleteCommentByPostAndCommentIdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentByPostAndCommentIdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentByPostAndCommentIdMutation, { data, loading, error }] = useDeleteCommentByPostAndCommentIdMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeleteCommentByPostAndCommentIdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentByPostAndCommentIdMutation, DeleteCommentByPostAndCommentIdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentByPostAndCommentIdMutation, DeleteCommentByPostAndCommentIdMutationVariables>(DeleteCommentByPostAndCommentIdDocument, options);
      }
export type DeleteCommentByPostAndCommentIdMutationHookResult = ReturnType<typeof useDeleteCommentByPostAndCommentIdMutation>;
export type DeleteCommentByPostAndCommentIdMutationResult = Apollo.MutationResult<DeleteCommentByPostAndCommentIdMutation>;
export type DeleteCommentByPostAndCommentIdMutationOptions = Apollo.BaseMutationOptions<DeleteCommentByPostAndCommentIdMutation, DeleteCommentByPostAndCommentIdMutationVariables>;
export const PostDocument = gql`
    query Post($postId: String!) {
  post(post_id: $postId) {
    id
    description
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const UserDocument = gql`
    query User {
  user {
    id
    displayName
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserFriendsDocument = gql`
    query UserFriends {
  findFriends {
    id
  }
}
    `;

/**
 * __useUserFriendsQuery__
 *
 * To run a query within a React component, call `useUserFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserFriendsQuery(baseOptions?: Apollo.QueryHookOptions<UserFriendsQuery, UserFriendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFriendsQuery, UserFriendsQueryVariables>(UserFriendsDocument, options);
      }
export function useUserFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFriendsQuery, UserFriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFriendsQuery, UserFriendsQueryVariables>(UserFriendsDocument, options);
        }
export type UserFriendsQueryHookResult = ReturnType<typeof useUserFriendsQuery>;
export type UserFriendsLazyQueryHookResult = ReturnType<typeof useUserFriendsLazyQuery>;
export type UserFriendsQueryResult = Apollo.QueryResult<UserFriendsQuery, UserFriendsQueryVariables>;
export const NewPostCreatedNotificationDocument = gql`
    subscription NewPostCreatedNotification {
  newPostCreatedNotification {
    post {
      id
    }
  }
}
    `;

/**
 * __useNewPostCreatedNotificationSubscription__
 *
 * To run a query within a React component, call `useNewPostCreatedNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewPostCreatedNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewPostCreatedNotificationSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewPostCreatedNotificationSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewPostCreatedNotificationSubscription, NewPostCreatedNotificationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NewPostCreatedNotificationSubscription, NewPostCreatedNotificationSubscriptionVariables>(NewPostCreatedNotificationDocument, options);
      }
export type NewPostCreatedNotificationSubscriptionHookResult = ReturnType<typeof useNewPostCreatedNotificationSubscription>;
export type NewPostCreatedNotificationSubscriptionResult = Apollo.SubscriptionResult<NewPostCreatedNotificationSubscription>;
export const UserLoginSubscribeDocument = gql`
    subscription UserLoginSubscribe {
  userLoginSubscribe {
    id
  }
}
    `;

/**
 * __useUserLoginSubscribeSubscription__
 *
 * To run a query within a React component, call `useUserLoginSubscribeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useUserLoginSubscribeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserLoginSubscribeSubscription({
 *   variables: {
 *   },
 * });
 */
export function useUserLoginSubscribeSubscription(baseOptions?: Apollo.SubscriptionHookOptions<UserLoginSubscribeSubscription, UserLoginSubscribeSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<UserLoginSubscribeSubscription, UserLoginSubscribeSubscriptionVariables>(UserLoginSubscribeDocument, options);
      }
export type UserLoginSubscribeSubscriptionHookResult = ReturnType<typeof useUserLoginSubscribeSubscription>;
export type UserLoginSubscribeSubscriptionResult = Apollo.SubscriptionResult<UserLoginSubscribeSubscription>;