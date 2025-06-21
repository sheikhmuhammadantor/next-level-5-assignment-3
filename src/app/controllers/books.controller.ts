import express, { Request, Response } from "express";
import mongoose, { SortOrder } from "mongoose";
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

    const sortOrder: SortOrder = sort as SortOrder;
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

booksRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(400).json({
        success: false,
        message: "Invalid book ID format",
      });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve book",
      error: error.message,
    });
  }
});

booksRoutes.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(400).json({
        success: false,
        message: "Invalid book ID format",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update book",
      error: error.message,
    });
  }
});

booksRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(400).json({
        success: false,
        message: "Invalid book ID format",
      });
    }

    const deleted = await Book.findByIdAndDelete(bookId);

    if (!deleted) {
      res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete book",
      error: error.message,
    });
  }
});
