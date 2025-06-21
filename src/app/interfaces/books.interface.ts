type GenreType =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY";

export interface IBook {
  title: string;
  author: string;
  genre: GenreType;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  //   createdAt?: Date;
  //   updatedAt?: Date;
}
