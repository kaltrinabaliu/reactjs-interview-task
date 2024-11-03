import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionButton from "../components/ActionButton";
import ActionInput from "../components/ActionInput";
import IconPlus from "../components/icons/IconPlus";
import IconCategory from "../components/icons/IconCategory";
import IconArrowDown from "../components/icons/IconArrowDown";
import IconSave from "../components/icons/IconSave";
import IconSearch from "../components/icons/IconSearch";
import {
  fetchAllCategories,
  CreateNote,
  GetCategoryById,
} from "../redux/categories/categoriesSlice";
import { CategoriesDto } from "../entities/CategoriesDto";
import { NotesDto } from "../entities/NotesDto";
import { AppDispatch, RootState } from "../redux/store";
import IconDelete from "../components/icons/IconDelete";

const HomePage: React.FC = () => {
  const [selectedCategoryNotes, setSelectedCategoryNotes] =
    useState<NotesDto[]>();
  const [isNewNote, setIsNewNote] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState<NotesDto | null>(null);

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
      setSelectedCategoryNotes(category.notes);
      setSelectedCategoryId(id);
    } catch (err) {
      console.error("Failed to fetch category notes:", err);
    }
  };

  const handleClickNote = (note: NotesDto) => {
    setSelectedNote(note); // Set the selected note
    setIsNewNote(false);
  };

  const handleCreateNote = () => {
    setIsNewNote(true);
    setNoteTitle("");
    setNoteDescription("");
    setSelectedNote(null); // Clear selected note
  };

  const handleAddNote = async () => {
    if (noteTitle && noteDescription && selectedCategoryId !== null) {
      try {
        const newNote: NotesDto = {
          id: Math.random(),
          title: noteTitle,
          description: noteDescription,
        };
        await dispatch(
          CreateNote({ categoryId: selectedCategoryId, note: newNote })
        ).unwrap();
        setNoteTitle("");
        setNoteDescription("");
        setIsNewNote(false);
        handleClickCategory(selectedCategoryId);
      } catch (error) {
        console.error("Failed to create note:", error);
      }
    } else {
      alert("Please enter both title and description");
    }
  };

  const filteredNotes = selectedCategoryNotes?.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              bgColor={
                selectedCategoryId === category.id ? "#0A4A76" : "#1264A3"
              }
            />
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>

      <div
        className={`relative w-full flex w-[30%] ${
          selectedNote ? "flex-row gap-4" : "flex-col"
        }`}
      >
        <div className="bg-white p-2 h-screen">
          <div className="flex gap-4">
            <ActionButton
              label="Create Note"
              click={handleCreateNote}
              bgColor="#71CF48"
              iconRight={<IconPlus />}
            />
            <ActionInput
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              iconLeft={<IconSearch />}
              borderColor="#EAEAEA"
            />
          </div>

          <div className="flex flex-col w-full mt-4">
            {filteredNotes && filteredNotes.length > 0 ? (
              filteredNotes.map((note: NotesDto) => (
                <div
                  key={note.id}
                  className={`${
                    selectedNote?.id === note.id
                      ? "border-b py-2 cursor-pointer bg-gray-100"
                      : "border-b py-2 cursor-pointer"
                  }`}
                  onClick={() => handleClickNote(note)}
                >
                  <h3 className="font-semibold">{note.title}</h3>
                  <p>{note.description}</p>
                </div>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>

        <div
          className={` ${selectedNote ? "relative bg-white p-2 w-full" : ""} `}
        >
          {selectedNote ? (
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
              <h2 className="font-bold">{selectedNote.title}</h2>
              <p>{selectedNote.description}</p>
            </>
          ) : (
            <p></p>
          )}
        </div>
        {isNewNote ||
          (selectedNote && (
            <div className="absolute bottom-2 right-4">
              <div className="flex justify-between gap-[530px]">
                <ActionButton
                  label="Delete Note"
                  iconRight={<IconDelete />}
                  bgColor="#EB4345"
                />
                <ActionButton
                  label="Save Changes"
                  bgColor="#71CF48"
                  iconRight={<IconSave />}
                  click={handleAddNote}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
