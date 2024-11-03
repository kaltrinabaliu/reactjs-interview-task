import { CreateNoteUseCase } from "../use-cases/CreateNoteUseCase";
import { FetchAllCategoriesUseCase } from "../use-cases/FetchAllCategoriesUseCase";
import { GetCategoryByIdUseCase } from "../use-cases/GetCategoryByIdUseCase";
import { createCategoriesService } from "./Factory";

export const createFetchAllCategoriesUseCase = (): FetchAllCategoriesUseCase => {
  const categoryService = createCategoriesService();
  return new FetchAllCategoriesUseCase(categoryService);
};

export const createGetCategoryById = (): GetCategoryByIdUseCase => {
  const categoryService = createCategoriesService();
  return new GetCategoryByIdUseCase(categoryService);
};
export const createNote = (): CreateNoteUseCase => {
  const categoryService = createCategoriesService();
  return new CreateNoteUseCase(categoryService);
};

