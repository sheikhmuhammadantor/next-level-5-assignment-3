import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Book } from "../models/books.model";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      res.status(400).json({ success: false, message: "Invalid book ID" });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({ success: false, message: "Book not found" });
    }

    if (book && book.copies < quantity) {
      res.status(400).json({
        success: false,
        message: "Not enough copies available",
      });
    }

    if (book) {
      book.copies -= quantity;
      if (book.copies === 0) {
        book.available = false;
      }
      await book.save();

      const borrow = await Borrow.create({ book: bookId, quantity, dueDate });

      res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to borrow book",
      error: error.message,
    });
  }
});

borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrow summary",
      error: error.message,
    });
  }
});
