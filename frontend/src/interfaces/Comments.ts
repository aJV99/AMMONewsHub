export interface Comment {
  id: number;
  article_id: number;
  user_id: number;
  parent_comment_id: number | null;
  text: string;
  created: Date;
  updated: Date;
}
