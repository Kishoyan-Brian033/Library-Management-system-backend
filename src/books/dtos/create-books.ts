export class CreateBooksDto {
  title: string;
  author: string;
  isAvailable: boolean;
  createdAt: Date;
  availableCopies: number;
}
