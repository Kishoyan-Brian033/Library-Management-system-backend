export interface Books {
  id: number;
  title: string;
  author: string;
  isAvailable: boolean;
  createdAt: Date;
  availableCopies: number;
}
