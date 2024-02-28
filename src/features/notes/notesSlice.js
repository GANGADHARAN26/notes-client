import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notesService } from "./notesService";

export const notesAll = createAsyncThunk(
    "task/allTask",
    async (userData) => {
      try {
        return await notesService.notes(userData);
      } catch (error) {
        return console.log("error in getting notes", error);
      }
    }
  );
  export const createNote = createAsyncThunk(
    "task/createdTask",
    async (userData) => {
      try {
        return await notesService.createNote(userData);
      } catch (error) {
        return console.log("error in createing notes", error);
      }
    }
  );
  export const updateNote = createAsyncThunk(
    "task/updatedTask",
    async (userData) => {
      try {
        return await notesService.updateNote(userData);
      } catch (error) {
        return console.log("error in update notes", error);
      }
    }
  );
  export const deleteNote = createAsyncThunk(
    "task/deletedTask",
    async (userData) => {
      try {
        return await notesService.deleteNote(userData);
      } catch (error) {
        return console.log("error in delete notes", error);
      }
    }
  );
  const initialState = {
    task: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
  };
  export const notesSlice=createSlice({
    name:"notes",
    initialState: initialState,
    reducers:{},
    extraReducers:(builder)=>{
       builder
       .addCase(notesAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(notesAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.notes = action.payload;
      })
      .addCase(notesAll.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          console.log(action.payload.response.data.message);
        }
      })
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdNote = action.payload;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          console.log(action.payload.response.data.message);
        }
      })
      .addCase(updateNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedNote = action.payload;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          console.log(action.payload.response.data.message);
        }
      })
      .addCase(deleteNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.deletedNote = action.payload;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          console.log(action.payload.response.data.message);
        }
      })
    },
  })
  export default notesSlice.reducer;