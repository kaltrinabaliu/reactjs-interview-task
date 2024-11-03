import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButton from "../components/ActionButton";
import ActionInput from "../components/ActionInput";
import IconPlus from "../components/icons/IconPlus";
import IconCategory from "../components/icons/IconCategory";
import IconArrowDown from "../components/icons/IconArrowDown";
import IconSave from "../components/icons/IconSave";
import {
  fetchAllCategories,
  GetCategoryById,
} from "../redux/categories/categoriesSlice";
import { CategoriesDto } from "../entities/CategoriesDto";
import { NotesDto } from "../entities/NotesDto";
import { AppDispatch, RootState } from "../redux/store";
import IconSearch from "../components/icons/IconSearch";

const buttonColorsPrimary = [
  { color: "#1264A3" },
  { color: "#1264A3" },
  { color: "#71CF48" },
];

const buttonColorsSecondary = [
  { color: "#1264A3" },
  { color: "#1264A3" },
  { color: "#1264A3" },
];

const HomePage: React.FC = () => {
  const [selectedCategoryNotes, setSelectedCategoryNotes] =
    useState<NotesDto[]>();
  const [isNote, setIsNote] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector(
    (state: RootState) => state.categories
  );

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const getNoteCount = (notes: NotesDto[] | undefined) => {
    return Array.isArray(notes) ? notes.length : 0;
  };

  const handleClickCategory = async (id: number) => {
    try {
      const category = await dispatch(GetCategoryById(id)).unwrap();
      const notes = category.notes;
      setSelectedCategoryNotes(notes);
      setIsNote(true);
    } catch (err) {
      console.error("Failed to fetch category notes:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full flex flex-row gap-4 items-start mx-auto py-1 px-2">
      <div className="h-screen w-[30%] bg-white flex flex-col space-y-2 p-2">
        <ActionButton
          label="Create Category"
          click={() => console.log("click")}
          bgColor="#71CF48"
          iconRight={<IconPlus />}
        />
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category: CategoriesDto) => (
            <ActionButton
              key={category.id}
              label={`Category (${getNoteCount(category.notes)})`}
              click={() => handleClickCategory(category.id)}
              iconRight={<IconArrowDown />}
              iconLeft={<IconCategory />}
              bgColor="#1264A3"
            />
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>

      <div className="relative w-full flex flex-col bg-white p-2 h-screen">
        {!isNote ? (
          <>
            <div className="flex justify-between">
              <div className="flex gap-2">
                {buttonColorsPrimary.map((item, index) => (
                  <ActionButton
                    key={index}
                    bgColor={item.color}
                    widthsize="120px"
                  />
                ))}
              </div>
              <div className="flex gap-2">
                {buttonColorsSecondary.map((item, index) => (
                  <ActionButton
                    key={index}
                    bgColor={item.color}
                    widthsize="32px"
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col justify-start items-start space-y-4 my-2 px-1">
              <div className="border-b w-full">
                <ActionInput placeholder="Add a title" />
              </div>
              <div>
                <ActionInput placeholder="Write your note here..." />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center">
              <ActionButton
                label="Create Note"
                click={() => console.log("click")}
                bgColor="#71CF48"
                iconRight={<IconPlus />}
              />
              <ActionInput
                placeholder="Search"
                iconLeft={<IconSearch />}
                borderColor="#EAEAEA"
              />
            </div>
            {Array.isArray(selectedCategoryNotes) &&
            selectedCategoryNotes.length > 0 ? (
              selectedCategoryNotes.map((note: NotesDto) => (
                <div key={note.id} className="border-b my-2">
                  <h3 className="font-semibold">{note.title}</h3>
                  <p>{note.description}</p>
                </div>
              ))
            ) : (
              <p>No notes available for this category</p>
            )}
            <div className="absolute bottom-0 right-4">
              <ActionButton
                label="Save Changes"
                bgColor="#71CF48"
                iconRight={<IconSave />}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
