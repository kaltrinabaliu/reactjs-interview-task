import type {  NotesDto } from "../entities/NotesDto";
import type { ICategoriesService } from "../interfaces/ICategoriesService";

export class CreateNoteUseCase {
  constructor(private categoriesService: ICategoriesService) {}

  async execute(note: NotesDto): Promise<void> {
    return await this.categoriesService.createNote(note);
  }
}
