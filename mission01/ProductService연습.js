export class Product {
  #favoriteCount;
  constructor(name, price, tags, images) {
    this.name = name;
    this.price = price;
    this.tags = tags;
    this.images = images;
    this.#favoriteCount = 0;
  }
  favorite() {
    this.#favoriteCount++;
  }
}

export class ElectroninProduct extends Product {
  constructor(name, price, tags, images, manufacturer) {
    super(name, price, tags, images);
    this.manufacturer = manufacturer;
  }
}

import axios from "axios";

const BASE_URL = "https://panda-market-api-crud.vercel.app/products";

export async function getProductList(params) {
  try {
    if (typeof params !== "object") {
      throw new error("invalid parameter", { cause: params });
    }
    const response = await axios.get(BASE_URL, { params });
    if (response.status !== 200) {
      throw new error("response failed", { cause: response });
    }
    return response.data.list.map(productFromInfo);
  } catch (e) {
    logAndThrow("getting product list", e);
  }
}

export async function getProduct(productId) {
  try {
    const response = await axios.get(`${BASE_URL}/${productId}`);
    return response.data;
  } catch (e) {
    logAndThrow("getting product", e);
  }
}
Promise.resolve(getProduct(55)).then(console.log);

export async function createProduct(product) {
  try {
    const response = await axios.post(BASE_URL);
    if (response.status !== 200) {
      throw new error("에러입니다", { cause: response });
    }
    return response.data;
  } catch (e) {
    logAndThrow("createProduct", e);
  }
}

export async function patchProduct(id, product) {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}`, product);
  } catch (e) {
    logAndThrow("patching product", e);
  }
}

export async function deleteProduct(productId) {
  try {
    const response = await axios.delete(`${BASE_URL}/${productId}`);
  } catch (e) {
    logAndThrow("에러임당", e);
  }
}

export const logAndThrow = (messsage, error) => {
  console.error(`Error fetching :${messsage}`, error);
  throw error;
};
