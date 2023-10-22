// Api
import client from "./config";

// Type
import { IImage } from "../types/detailImageType";

interface EditPostFormData {
  title: string;
  description: string;
  hashtags: string[];
}

interface CreatePostFormData {
  title: string;
  description: string;
  hashtags: string[];
}

export const postApi = {
  getDetailPost: (postId: string) => client.get(`/post/${postId}`),
  getMainPosts: (page: any) => client.get(`/posts?page=${page}`),
  putPostView: (postId: string, views: number) =>
    client.put(`post/${postId}/views`, { views }, { withCredentials: true }),
  putPostLike: (postId: string) =>
    client.put(`/post/${postId}/likes`, "", { withCredentials: true }),
  putEditPost: (postId: string, formData: EditPostFormData) =>
    client.put(`/post/${postId}/edit`, formData, { withCredentials: true }),
  deletePost: (postId: string) =>
    client.delete(`/post/${postId}/delete`, { withCredentials: true }),
  getSimilarPosts: (page: number, title: string, postId: string) =>
    client.get(`post/similarPosts?page=${page}`, {
      params: { postTitle: title, postId },
    }),
  postUploadImage: (imagesFormData: FormData) =>
    client.post("/post/upload/images", imagesFormData, {
      withCredentials: true,
    }),
  postCreatePost: (
    formData: CreatePostFormData,
    files: IImage[],
    ratioWidth: number[],
    ratioHeight: number[]
  ) =>
    client.post(
      "/post/upload",
      { formData, files, ratio: { ratioWidth, ratioHeight } },
      { withCredentials: true }
    ),
};
