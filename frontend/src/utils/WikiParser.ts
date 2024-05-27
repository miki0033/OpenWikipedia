/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable no-useless-escape */
export default function parsewiki(wiki: string) {
  let mainBody = wiki
    .toString()
    .replace(/\{\{(.*?)\}\}/g, "")
    .replace(/[\[]/g, "")
    .replace(/[\]]/g, "")
    .replace(/[\|]/g, ", ");

  let str = wiki.toString();
  let links = [];
  while (str.match(/\[\[(.*?)\]\]/)) {
    links.push(str.match(/\[\[(.*?)\]\]/));
    str = str.replace(/[\[\[]/, "");
  }

  let related: any[] = [];

  links.forEach(function (link) {
    if (link) {
      link
        .toString()
        .split("|")
        .forEach(function (sub: string) {
          related.push(sub.replace(/[\[]/g, "").replace(/[\]]/g, ""));
        });
    }
  });

  return {
    mainBody: mainBody,
    related: related,
  };
}
