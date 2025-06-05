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
} from '@nestjs/common';
import { AuthorsService } from './author.service';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';
import { ApiResponse } from 'src/shared/interfaces/api-response/api-response.interface';
import { Author } from './interfaces/author.interface';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateAuthorDto): ApiResponse<Author> {
    try {
      const author = this.authorsService.create(data);
      return {
        success: true,
        message: 'Author created successfully',
        data: author,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create author',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Get()
  findAll(): ApiResponse<Author[]> {
    try {
      const authors = this.authorsService.findAll();
      return {
        success: true,
        message: `Retrieved ${authors.length} author(s)`,
        data: authors,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to retrieve authors',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): ApiResponse<Author> {
    try {
      const author = this.authorsService.findOne(id);
      return {
        success: true,
        message: 'Author found',
        data: author,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Author not found',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateAuthorDto,
  ): ApiResponse<Author> {
    try {
      const updated = this.authorsService.update(id, data);
      return {
        success: true,
        message: 'Author updated successfully',
        data: updated,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update author',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): ApiResponse<null> {
    try {
      const result = this.authorsService.remove(id);
      return {
        success: true,
        message: result.message,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete author',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
