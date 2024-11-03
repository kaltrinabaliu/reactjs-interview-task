import type { ICategoriesRepository } from "../interfaces/ICategoriesRepository";
import type { IApiClient } from "../interfaces/IApiClient";
import { CategoriesDto } from "../entities/CategoriesDto";
import { NotesDto } from "../entities/NotesDto";

export class CategoriesRepository implements ICategoriesRepository {
  private apiClient: IApiClient;

  constructor(apiClient: IApiClient) {
    this.apiClient = apiClient;
  }

  async fetchAllCategories(): Promise<CategoriesDto[]> {
    return await this.apiClient.get<CategoriesDto[]>("/category");
  }

  async getCategoriesById(categoryId: number): Promise<CategoriesDto> {
      return await this.apiClient.get<CategoriesDto>(`/category/${categoryId}`
      )
  }

  async createNote(note: NotesDto): Promise<void> {
        this.apiClient.post("/note", note);
  }
}
