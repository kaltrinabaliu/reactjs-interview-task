import { NotesDto } from "./NotesDto";

export interface CategoriesDto {
  id: number;
  notes?: NotesDto[];
}
