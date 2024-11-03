import { CategoriesDto } from "../entities/CategoriesDto";
import { NotesDto } from "../entities/NotesDto";

export interface ICategoriesService {
  fetchAllCategories(): Promise<CategoriesDto[]>;
  getCategoriesById(categoryId: number): Promise<CategoriesDto>;
  createNote(note: NotesDto): Promise<void>;
  // delete(id: number): Promise<void>;
  // update(id: number, contact: ContactDto): Promise<void>;
}
