export interface IPost {
  _id: string;
  title: string;
  description: string;
  fileUrl: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
  }[];
  owner: {
    _id: string;
    name: string;
    username: string;
    profileImage: string;
  };
  views: number;
  likes: string[];
  ratioWidth: number[];
  ratioHeight: number[];
  createdAt: string;
  __v: number;
}

export interface IPostWithHashtags extends IPost {
  hashtags: string[];
}

export interface IUserData {
  _id: string;
  name: string;
  username: string;
  profileImage: string;
  posts: IPost[];
}
