import type { CategoriesDto } from "../entities/CategoriesDto";
import type { ICategoriesService } from "../interfaces/ICategoriesService";

export class GetCategoryByIdUseCase {
  constructor(private categoriesService: ICategoriesService) {}

  async execute(categoryId: number): Promise<CategoriesDto> {
    return await this.categoriesService.getCategoriesById(categoryId);
  }
}
