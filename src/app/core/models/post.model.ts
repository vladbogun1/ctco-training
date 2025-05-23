import {CommentDto} from "./comment.model";

export interface PostDto {
  userId: number;
  id: number;
  title: string;
  body: string;
  comments?: CommentDto[];
}
