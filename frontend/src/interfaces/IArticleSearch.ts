import IThumbnail from "./IThumbnail";

interface IArticleSearch {
  id: number | string;
  key: string;
  title: string;
  excerpt?: string;
  matched_title?: string | null;
  description?: string;
  thumbnail?: IThumbnail;
}

export default IArticleSearch;
