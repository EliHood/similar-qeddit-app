import React, { ReactChildren, ReactNode } from 'react'

export type ICurrentUserType = {
  id:number
  username:string
}

type AuthorType = {
  gravatar: string
  username: string
}
  

export type CommentType = {
  comment_body?: string;
  gifUrl?: string;
  commentUserId?: number;
  id?: number;
  createdAt?: any;
  author?: AuthorType
  commentReplies?: []
};


export type CommentBottomType = {
  post: {
    Comments: [];
    id: number;
    userId: number;
  };
  deleteComment: () => void;
  postComment: (data: object) => void;
}

export type EditProfileFormType = {
  bio: string;
  gravatar: string;
  onSubmit: (e) => void;
  handleBio: (e) => void;
  handleGravatar: (e) => void;
}

export type LoginType = {
  submit: (event) => void;
  username: string;
  password: string;
  usernameChange: (event) => void;
  passwordChange: (event) => void;
}

export type ProfilePropsType = {
  getProfileInit: (username: string) => void;
  unfollowUserInit: (username: string, id: number) => void;
  followUserInit: (username: string, id: number) => void;
  username: string;
  match: any;
  user: any;
  currentUser: {
    user: {
      id: number;
    };
  };
  appBar: any;
  appBarShift: any;
  appOpen: boolean;
}

export type ReplyPropsType = {
  onSubmit: (e: any) => void;
  replyBody: string;
  replyChange: (e: any) => void;
}
export type SearchType = {
  currentUser?: any;
};

export type SearchResultsPageType = {
  location?: any;
};

export type RegisterStateType = {
  passwordConf: string;
  passErr: string;
}
export type TabPanelPropsType = {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export type UserPostsType = {
  match?: any;
  user?: any;
  getPostsInit: () => void;
  deletePostInit: (id: number, userId: number) => void;
  deleteComment: (id: number, postId: number, userId: number) => void;
  postCommentInit: (event: object) => void;
  titleError?: boolean;
  bodyError?: boolean;
  error: any[];
  title: string;
  postContent: string;
  addTitle: (data: string) => void;
  addContent: (data: string) => void;
  createPostInit: (event: object) => void;
  likePost: (event: number) => void;
  dislikePost: (event: number) => void;
  isNotified?: boolean;
  notificationInit: () => void;
  notification: string;
  appBar: any;
  appBarShift: any;
  appOpen: boolean;
}
export type CommentPropsType = {
  onSubmit: any;
  comment_body: string;
  commentChange: (e: any) => void;
  gifUrl: any;
  isGif: string;
  mentionedUser?: boolean;
  setMentionedUser?: (data: boolean) => void;
  setCommentBody?: (data: string) => any;
  currentUser?: {
    username: string;
  };
}


export type ReplyType = {
  createdAt: any;
  replyBody: string;
  userId: number;
  id: number;
}


export type CommentItemPropsType = {
  editComment: (comment) => void;
  onReply: () => void;
  comment:CommentType
  reply?:ReplyType |  null;
  type: 'comment' | 'reply';
  postId: number;
  deleteComment: (commentId:number, postId:number, userId:number) => void;
};

export interface CommentAuthorDataInterface {
    comment: CommentType
    userId: number
    isBold: any
    openModal: () => void
    handleCloseModal: () => void
    handleClickOpen: () => void
    currentUser: Record<string, any>
}

export type AuthHocPropsType = {
  user?: any;
  history?: any;
  initLogin: () => void;
}
export type AuthStateType = {
  errors: object;
}

export type ILikesType = {
  match?: any;
  user?: any;
  getPostsInit: () => void;
  deletePostInit: (id: number, userId: number) => void;
  deleteComment: (id: number, postId: number, userId: number) => void;
  postCommentInit: (event: object) => void;
  titleError?: boolean;
  bodyError?: boolean;
  posts: any[];
  error: any[];
  title: string;
  postContent: string;
  addTitle: (data: string) => void;
  addContent: (data: string) => void;
  createPostInit: (event: object) => void;
  likePost: (event: number) => void;
  dislikePost: (event: number) => void;
  isNotified?: boolean;
  notificationInit: () => void;
  notification: string;
  appBar: any;
  appBarShift: any;
  appOpen: boolean;
}

export type AuthButtonType = {
  type?: 'post-buttons' | 'comment-buttons' | 'post-buttons-modal';
  user?: {
    user: {
      id: number;
    };
  };
  comment?:CommentType;
  postId?: number;
  post?: {
    id: number;
    likeCounts: number;
    likedByMe: boolean;
  };
  handleClickOpen?: () => void;
  onReply?: () => void;
  setEditComment?: (e: any) => void;
  currentUser?: Record<string, any>;
  openModal?: boolean;
  handleCloseModal?: () => void;
  writeComment?: () => void;
  openForm?: boolean;
};

export type ButtonFunctionProps = {
  type: 'edit' | 'reply' | 'delete' | 'cancel' | 'update' | 'deleteReply';
  onReply?: () => void;
  update?: (data: Record<string, any>) => void;
  postId?: number | any;
  userId?: number | any;
  commentId?: number | any;
  comment?: any;
  setEditComment?: (boolean: boolean) => void;
  deleteReply?: (replyId?: number, postId?: number, replyUserId?: number, commentId?: number) => void;
  replyId?: number;
  replyUserId?: number;
};

export type OurDateType = {
  type: 'post-date' | 'comment-date' | 'reply-date';
  createdAt: string;
};

export type LikeButtonPropsType = {
  type: 'liked' | 'unliked';
  likeCounts: number;
  postId?: number;
  dislike?: (id: number) => void;
  like?: (id: number) => void;
};

export type IMenuItemType = {
  children: ReactChildren | ReactNode
}
export type IUseInputType = {
  addTitle?: (data:string) => void;
  addContent?:(data:string) => void;
  addUsername?:(data:string) => void;
  addEmail?:(data:string) => void;
  addPassword?:(data:string) => void;
  addPasswordConf?:(data:string) => void;
}

export type FieldType = {
  type: 'gif-commentfield' | 'post' | 'comment' | 'post-content' | 'edit-comment';
  handleTitleChange?: (e: any) => void;
  title?: string;
  titleError?: boolean | null;
  comment_body?: string;
  commentChange?: (e: any) => void;
  post_content?: string;
  bodyError?: boolean | null;
  handleContentChange?: (e: any) => void;
  setGifSelected?: () => void;
  selectedUser?: string;
  setCommentEdit?: (e: any) => void;
};

export type INavButtonType = {
  children: ReactChildren | ReactNode
  onClick?:() => void
}

interface INavLinkToType{
  pathname: string
}

export type INavLinkType = {
  children: string
  to: INavLinkToType | string
}

export interface IMainNavType { 
  isAuthenticated:boolean;
  googleAccount:boolean;
  darkTheme:() => void;
  logOut:() => void;
  handleNotificationClick:(event: React.MouseEvent<HTMLButtonElement>) => void
  notificationId: string | undefined
  handleClose:() => void
  open:boolean;
  anchorEl:HTMLButtonElement | null
  appOpen?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

export type IButtonBar = {
  children: ReactChildren | ReactNode
}

export interface IDyanmicMenuType extends IMainNavType  {
  type: 'main-menu' | 'collapsed-menu'
}

export interface IRouterType {
  notifications: (userId: number) => void
  darkTheme:() => void;
  hasError: boolean
  logOut: () => void
  isAuthenticated:boolean;
  googleAccount: boolean
}

export interface IPrivateRoute {
  Component: React.ElementType | ReactNode
  exact:boolean
  path:string
  appOpen: boolean
  googleAccount: boolean
  isAuthenticated: boolean
}

export interface IPostItemContainer{
  post: any
  deleteComment:() => void;
  postComment:() => void;
  deletePost: (id: number, userId: number) => void;
}