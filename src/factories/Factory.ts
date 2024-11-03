import { ApiClient } from "../api/ApiClient";
import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CategoriesService } from "../services/CategoriesService";

const baseURL = import.meta.env.VITE_APP_BASE_URL;

export const createApiClient = (): ApiClient => {
  return new ApiClient(baseURL);
};

export const createCategoriesRepository = (): CategoriesRepository => {
  const apiClient = createApiClient();
  return new CategoriesRepository(apiClient);
};

export const createCategoriesService = (): CategoriesService => {
  const categoriesRepository = createCategoriesRepository();
  return new CategoriesService(categoriesRepository);
};
