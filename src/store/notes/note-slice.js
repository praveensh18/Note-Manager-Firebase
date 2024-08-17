import { createSlice } from '@reduxjs/toolkit';

export const noteSlice = createSlice({
  name: 'noteSlice',
  initialState: {
    noteList: [],
  },
  reducers: {
    setNoteList: (state, action) => {
      state.noteList = action.payload;
    },
    addNote: (state, action) => {
      state.noteList.push(action.payload);
    },
    updateNote: (state, action) => {
      const noteIndexToUpdate = state.noteList.findIndex(
        (note) => note.id === action.payload.id
      );
      state.noteList[noteIndexToUpdate] = action.payload;
    },
    deleteNote: (state, action) => {
      // splice method will remove the specific note from noteList
      // const noteIndexToDelete = state.noteList.findIndex((note) => note.id === action.payload.id)
      // state.noteList.splice(noteIndexToDelete, 1)

      // Filter method will return the updated noteList which will not contain the current note
      const filteredNoteList = state.noteList.filter((note) => note.id !== action.payload.id)
      state.noteList = filteredNoteList
    }
  },
});

// Function to convert id to string (to make sure that id is always string)
// function formatId(note) {
//   return { ...note, id: note.id.toString() };
// }

export const noteReducer = noteSlice.reducer;
export const { setNoteList, addNote, updateNote, deleteNote } = noteSlice.actions;
