import { Category } from "./Category";

// interfaces/Profile.ts
export interface Profile {
    full_name: string;
    username: string;
    email: string;
    date_of_birth: Date;
    bio: string;
    image: string;
    favorite_categories: Category[];
}
