import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Author } from './interfaces/author.interface';
import { CreateAuthorDto } from './dtos/create-author.dto';
import { UpdateAuthorDto } from './dtos/update-author.dto';

@Injectable()
export class AuthorsService {
  private authors: Author[] = [
    {
      id: 1,
      name: 'George R. R. Martin',
      book_name: 'Game of Thrones',
      education: 'Master of Journalism',
      number_of_books: 7,
    },
  ];

  private nextId = 2;

  create(data: CreateAuthorDto): Author {
    const exists = this.authors.find((a) => a.name === data.name);
    if (exists) {
      throw new ConflictException(`Author ${data.name} already exists`);
    }

    const newAuthor: Author = {
      id: this.nextId++,
      ...data,
    };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  findAll(): Author[] {
    return this.authors;
  }

  findOne(id: number): Author {
    const author = this.authors.find((a) => a.id === id);
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  update(id: number, updateData: UpdateAuthorDto): Author {
    const index = this.authors.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    this.authors[index] = { ...this.authors[index], ...updateData };
    return this.authors[index];
  }

  remove(id: number): { message: string } {
    const index = this.authors.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    const removed = this.authors.splice(index, 1)[0];
    return {
      message: `Author ${removed.name} has been deleted`,
    };
  }
}
