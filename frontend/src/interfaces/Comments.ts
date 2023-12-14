export interface Comment {
  id: number;
  article_id: number;
  user_id: number;
  user_name: string;
  parent_comment_id: number | null;
  text: string;
  created: Date;
  updated: Date;
  children: Comment[] | null;
}
