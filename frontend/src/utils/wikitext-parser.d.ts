declare module "../../utils/WikiParser" {
  export default function parsewiki(wiki: string): {
    mainBody: string;
    related: string[];
  };
}
