import type {  NotesDto } from "../entities/NotesDto";
import type { ICategoriesService } from "../interfaces/ICategoriesService";

export class CreateNoteUseCase {
  constructor(private categoriesService: ICategoriesService) {}

  async execute(categoryId:number, note: NotesDto): Promise<void> {
    return await this.categoriesService.createNote(categoryId, note);
  }
}
