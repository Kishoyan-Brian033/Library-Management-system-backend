import { Module } from '@nestjs/common';
import { AuthorsController } from './author.controller';
import { AuthorsService } from './author.service';

@Module({
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorModule {}
