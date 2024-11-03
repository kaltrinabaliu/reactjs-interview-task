import type { ICategoriesRepository } from "../interfaces/ICategoriesRepository";
import type { ICategoriesService } from "../interfaces/ICategoriesService";
import { CategoriesDto } from "../entities/CategoriesDto";
import { NotesDto } from "../entities/NotesDto";

export class CategoriesService implements ICategoriesService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async fetchAllCategories(): Promise<CategoriesDto[]> {
    try {
      return await this.categoriesRepository.fetchAllCategories();
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
      throw new Error("Could not fetch categories.");
    }
  }

  async getCategoriesById(categoryId: number): Promise<CategoriesDto> {
      try {
        return await this.categoriesRepository.getCategoriesById(categoryId);
        } catch (error) {
          console.error("Failed to fetch category:", error);
          throw new Error("Could not fetch category.");
          }
  }

  async createNote(categoryId: number, note: NotesDto): Promise<void> {
      try {
        await this.categoriesRepository.createNote(categoryId, note);
        } catch (error) {
          console.error("Failed to create note:", error);
          throw new Error("Could not create note.");
  }
}
}
