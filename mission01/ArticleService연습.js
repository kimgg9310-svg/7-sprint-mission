export class Article {
  #likeCount;
  //     - Article 클래스는 `title`(제목), `content`(내용), `image`(작성자), `likeCount`(좋아요 수) 프로퍼티를 가집니다.
  constructor(title, content, image) {
    this.title = title;
    this.content = content;
    this.image = image;
    this.createdAt = new Date();
    this.#likeCount = 0;
  }
  //     - Article 클래스는 `like` 메소드를 가집니다. `like` 메소드가 호출될 경우 좋아요 수가 1 증가합니다.
  like() {
    this.#likeCount++;
  }

  get likeCount() {
    // getter 숨겨둔 내부 상태를 보여줄 필요가 있을때
    return this.#likeCount;
  }

  static of({ title, content, image }) {
    return new Article(title, content, image);
  }
}

import axios from "axios";
import { logAndThrow } from "./ProductService";

const BASE_URL = "https://panda-market-api-crud.vercel.app/articles";

export function getArticleList(params) {
  return axios
    .get(`${BASE_URL}/${params}`)
    .then(({ data: { list: articles } }) => articles.map(Article.of))
    .catch((e) => logAndThrow("getting article", e));
}

export function getArticle(articleId) {
  return axios
    .get(`${BASE_URL}/${articleId}`)
    .then(Article.of)
    .catch((e) => logAndThrow("getting article", e));
}

export function creatArticle(article) {
  return axios
    .post(`${BASE_URL}/${article}`)
    .catch((e) => logAndThrow("creating article".e));
}

export function patchArticle(id, article) {
  return axios
    .patch(`${BASE_URL}/${id}` / article)
    .catch((e) => logAndThrow("patching article", e));
}

export function deleteArticle(articleId) {
  return axios
    .delete(`${BASE_URL}/${articleId}`)
    .then((response) => response.data.id)
    .catch((e) => logAndThrow("deleting article", e));
}

function throwIfResponseFailed(response) {
  if (response.status !== 200) {
    throw new Error("response failed", { cause: response });
  }
  return response;
}
