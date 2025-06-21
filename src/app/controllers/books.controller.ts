import express, { Request, Response } from "express";
import { Book } from "../models/books.model";

export const booksRoutes = express.Router();

booksRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { title, author, genre, isbn, description, copies, available } =
      req.body;

    const newBook = await Book.create({
      title,
      author,
      genre,
      isbn,
      description,
      copies,
      available,
    });

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: newBook,
    });
  } catch (error: any) {
    if (error.code === 11000 && error.keyValue?.isbn) {
      res.status(409).json({
        success: false,
        message: "ISBN must be unique. This ISBN already exists.",
        error,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});
