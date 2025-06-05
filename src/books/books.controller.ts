import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBooksDto } from './dtos/create-books';
import { UpdateBooksDto } from './dtos/update-books';
import { ApiResponse } from 'src/shared/interfaces/api-response/api-response.interface';
import { Books } from './interfaces/book.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateBooksDto): ApiResponse<Books> {
    try {
      const book = this.booksService.create(data);
      return {
        success: true,
        message: 'Book created successfully',
        data: book,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create book',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Get()
  findAll(@Query('available') available?: string): ApiResponse<Books[]> {
    try {
      let books: Books[];

      if (available === 'true') {
        books = this.booksService.findAvailable();
      } else {
        books = this.booksService.findAll();
      }

      return {
        success: true,
        message: `Retrieved ${books.length} book(s)`,
        data: books,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve books',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): ApiResponse<Books> {
    try {
      const book = this.booksService.findOne(id);
      return {
        success: true,
        message: 'Book found',
        data: book,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Book not found',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateBooksDto,
  ): ApiResponse<Books> {
    try {
      const updated = this.booksService.update(id, data);
      return {
        success: true,
        message: 'Book updated successfully',
        data: updated,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update book',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): ApiResponse<null> {
    try {
      const result = this.booksService.remove(id);
      return {
        success: true,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to remove book',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Delete(':id/permanent')
  delete(@Param('id', ParseIntPipe) id: number): ApiResponse<null> {
    try {
      const result = this.booksService.delete(id);
      return {
        success: true,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to permanently delete book',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
