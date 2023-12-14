// interfaces/Profile.ts

import { Category } from "./Category";

export interface Article {
  Article_title: string;
  Article_summary: string;
  Article_category: Category;
  Article_date: Date;
  id: number;
}
