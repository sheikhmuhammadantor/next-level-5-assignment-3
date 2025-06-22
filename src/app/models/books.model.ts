import { Schema, model } from "mongoose";
import { BookModel, IBook } from "../interfaces/books.interface";
import { Borrow } from "./borrow.model";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    copies: {
      type: Number,
      required: true,
      min: [0, "Copies cannot be negative"],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.statics.updateAvailability = async function (bookId: string) {
  const book = await this.findById(bookId);
  if (!book) return;
  if (book.copies === 0) {
    book.available = false;
    await book.save();
  }
};

bookSchema.pre("findOneAndDelete", async function (next) {
  const bookBeingDeleted = await this.model.findOne(this.getQuery());

  if (bookBeingDeleted) {
    await Borrow.deleteMany({ book: bookBeingDeleted._id });
  }

  next();
});

export const Book = model<IBook, BookModel>("Book", bookSchema);
