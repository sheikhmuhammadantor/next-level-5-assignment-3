import express, { Request, Response } from "express";
import { SortOrder } from "mongoose";
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

booksRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
    } = req.query;

    const query: Record<string, any> = {};

    if (filter) {
      query.genre = filter;
    }

    const parsedLimit = parseInt(limit as string) || 10;

    const sortOrder: SortOrder = sort === "asc" ? 1 : -1;
    const sortObj: Record<string, SortOrder> = {};
    sortObj[sortBy as string] = sortOrder;

    const books = await Book.find(query).sort(sortObj).limit(parsedLimit);

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve books",
      error: error.message,
    });
  }
});
