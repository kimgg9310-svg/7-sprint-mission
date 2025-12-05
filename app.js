import express from "express";
import cors from "cors";
import path from "path";
import productsRouter from "./routers/productsRouter.js";
import commentsRouter from "./routers/commentsRouter.js";
import imagesRouter from "./routers/imagesRouter.js";
import {
  defaultNotFoundHandler,
  globalErrorHandler,
} from "./controllers/errorController.js";
import { Console } from "console";

const app = express();

app.use(cors());
app.use(express.json());

app.use("articles", articlesRouter);
app.use("/products", productsRouter);
app.use("/comments", commentsRouter);
app.use("/images", imagesRouter);

app.use(defaultNotFoundHandler);
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
