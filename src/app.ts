import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/books.controller";

const app: Application = express();

app.use(express.json());

app.use("/api/books", booksRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("📚 Welcome to the Book Library !");
});

export default app;
