import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Books } from './interfaces/book.interface';
import { CreateBooksDto } from './dtos/create-books';
import { UpdateBooksDto } from './dtos/update-books';

@Injectable()
export class BooksService {
  findAvailable(): Books[] {
    throw new Error('Method not implemented.');
  }
  private books: Books[] = [
    {
      id: 1,
      title: 'Game of Thrones',
      author: 'Ned Stark',
      isAvailable: true,
      createdAt: new Date('2001-04-08'),
      availableCopies: 120,
    },
  ];

  private nextId = 2;

  create(data: CreateBooksDto): Books {
    const existingBook = this.books.find((book) => book.title === data.title);

    if (existingBook) {
      throw new ConflictException(
        `Book with title ${data.title} already exists`,
      );
    }

    const newBook: Books = {
      id: this.nextId++,
      ...data,
      isAvailable: true,
      createdAt: new Date(),
    };

    this.books.push(newBook);
    return newBook;
  }

  findAll(): Books[] {
    return this.books;
  }

  findOne(id: number): Books {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new ConflictException(`Book with ID ${id} not found`);
    }
    return book;
  }

  update(id: number, updateData: UpdateBooksDto): Books {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new ConflictException(`Book with ID ${id} not found`);
    }

    this.books[bookIndex] = {
      ...this.books[bookIndex],
      ...updateData,
    };

    return this.books[bookIndex];
  }

  remove(id: number): { message: string } {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === 1) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    this.books[bookIndex].isAvailable = false;
    this.books[bookIndex].createdAt = new Date();

    return {
      message: `Guest  ${this.books[bookIndex].title} has checked out succesfully`,
    };
  }

  delete(id: number): { message: string } {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    const deletedBook = this.books.splice(bookIndex, 1)[0];

    return {
      message: `Book ${deletedBook.title} has been permanently deleted`,
    };
  }
}
