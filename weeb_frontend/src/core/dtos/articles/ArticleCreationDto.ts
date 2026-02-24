// ---------- ARTICLE CREATION DTO ---------- //
export interface ArticleCreateOrUpdateDto {
  title: string;
  content: string;
  image: File | null;
}
