// ---------- ARTICLE DTO ---------- //
export interface ArticleDto {
  id: number;
  title: string;
  content: string;
  image: string | null;
  created_at: string;
  updated_at: string;
  author: {
    id: number;
    first_name: string;
    last_name: string;
  };
}
