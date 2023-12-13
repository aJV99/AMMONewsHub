// interfaces/Profile.ts
import { Comment } from "./Comments";

export interface Article {
  Article_title: string;
  Article_summary: string;
  Article_category: string;
  Article_date: Date;
  id: number;
}
