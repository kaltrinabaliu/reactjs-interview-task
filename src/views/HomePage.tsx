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
  CreateNote,
  CreateNotePayload,
  fetchAllCategories,
  GetCategoryById,
} from "../redux/categories/categoriesSlice";
import { CategoriesDto } from "../entities/CategoriesDto";
import { NotesDto } from "../entities/NotesDto";
import { AppDispatch, RootState } from "../redux/store";
import IconDelete from "../components/icons/IconDelete";

const HomePage: React.FC = () => {
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
  const [selectedCategoryNotes, setSelectedCategoryNotes] = useState<
    NotesDto[]
  >([]);
  const [isNewNote, setIsNewNote] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNote, setSelectedNote] = useState<NotesDto | null>(null);

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
      setSelectedCategoryNotes(category.notes ?? []);
      setSelectedCategoryId(id);
      await dispatch(fetchAllCategories()).unwrap();
    } catch (err) {
      console.error("Failed to fetch category notes:", err);
    }
    setIsNewNote(false);
  };

  const handleClickNote = (note: NotesDto) => {
    setSelectedNote(note);
    setIsNewNote(false);
  };

  const handleCreateNote = () => {
    setIsNewNote(true);
    console.log(isNewNote);
    setNoteTitle("");
    setNoteDescription("");
    setSelectedNote(null);
  };

  const handleAddNote = () => {
    if (noteTitle && noteDescription && selectedCategoryId !== null) {
      const newNote: NotesDto = {
        id: Math.floor(Math.random() * 10000),
        title: noteTitle,
        description: noteDescription,
      };

      setSelectedCategoryNotes((prevNotes) => [...prevNotes, newNote]);
      const payload: CreateNotePayload = {
        categoryId: selectedCategoryId,
        note: newNote,
      };

      dispatch(CreateNote(payload));
      setNoteTitle("");
      setNoteDescription("");
      setIsNewNote(false);
    } else {
      console.log("Please enter both title and description");
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
        className={`relative w-full flex w-[30%] h-screen ${
          selectedNote ? "flex-row gap-4" : "flex-col"
        }`}
      >
        {!isNewNote && (
          <div className="bg-white p-2">
            <div className="flex gap-4 w-1/2">
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
        )}

        <div
          className={` ${
            selectedNote
              ? "relative bg-white p-2 w-full"
              : "bg-white p-2 w-full h-screen"
          } `}
        >
          {isNewNote || selectedNote ? (
            <div className="space-y-2">
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

              {isNewNote ? (
                <div className="flex flex-col justify-start items-start space-y-4 my-2 px-1">
                  <div className="border-b w-full">
                    <ActionInput
                      placeholder="Add a title"
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <ActionInput
                      placeholder="Write your note here..."
                      value={noteDescription}
                      onChange={(e) => setNoteDescription(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="font-bold">{selectedNote?.title}</h2>
                  <p>{selectedNote?.description}</p>
                </div>
              )}
            </div>
          ) : null}
        </div>

        <div className="absolute bottom-2 right-4">
          <div className="flex justify-between gap-[570px]">
            {selectedNote && (
              <ActionButton
                label="Delete Note"
                iconRight={<IconDelete />}
                bgColor="#EB4345"
              />
            )}
            {(isNewNote || selectedNote) && (
              <ActionButton
                label="Save Changes"
                bgColor="#71CF48"
                iconRight={<IconSave />}
                click={handleAddNote}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
