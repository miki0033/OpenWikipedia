import ILatest from "./ILatest";

interface IArticle {
  id: number | string;
  key: string;
  title: string;
  latest?: ILatest;
  content_model?: string;
  source: string;
}

export default IArticle;
