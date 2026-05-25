export interface HtmlPage {
  getLang(): string;
  getTitle(): string;
  getBody(): string;
  toString(): string;
  getHtml(): string;
}
