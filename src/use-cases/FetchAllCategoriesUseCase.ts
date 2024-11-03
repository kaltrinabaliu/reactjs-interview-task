import type { CategoriesDto } from "../entities/CategoriesDto";
import type { ICategoriesService } from "../interfaces/ICategoriesService";

export class FetchAllCategoriesUseCase {
  constructor(private categoriesService: ICategoriesService) {}

  async execute(): Promise<CategoriesDto[]> {
    return await this.categoriesService.fetchAllCategories();
  }
}
