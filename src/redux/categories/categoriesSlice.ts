import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createFetchAllCategoriesUseCase, createGetCategoryById, createNote } from "../../factories/CreateCategoriesUseCasesFactory";
import { CategoriesDto } from "../../entities/CategoriesDto";
import { NotesDto } from "../../entities/NotesDto";

export interface CategoriesState {
  categories: CategoriesDto[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchAllCategories = createAsyncThunk(
  "category",
  async () => {
    const fetchAllUseCase = createFetchAllCategoriesUseCase();
    return await fetchAllUseCase.execute();
  }
);

export const GetCategoryById = createAsyncThunk(
  "category",
  async (id: number) => {
    const fetchByIdUseCase = createGetCategoryById();
    return await fetchByIdUseCase.execute(id);
  }
);

export const CreateNote  = createAsyncThunk(
  "note",
  async (note: NotesDto) => {
    const createNoteUseCase = createNote();
    return await createNoteUseCase.execute(note);
  }
);


const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllCategories.fulfilled,
        (state, action: PayloadAction<CategoriesDto[]>) => {
          state.loading = false;
          state.categories = action.payload;
        }
      )
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch categories.";
      });
  },
});

export default categoriesSlice.reducer;
