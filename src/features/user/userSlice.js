import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
    "auth/register",
    async (userData) => {
      try {
        return await authService.register(userData);
      } catch (error) {
        return console.log("error in registering user");
      }
    }
  );
  export const loginUser = createAsyncThunk(
    "auth/login",
    async (userData) => {
      try {
        return await authService.login(userData);
      } catch (error) {
        return console.log(error);
      }
    }
  );
  export const forgotUserPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (userData) => {
      try {
        return await authService.forgotPassword(userData);
      } catch (error) {
        return console.log(error);
      }
    }
  );
  export const updateUserPassword = createAsyncThunk(
    "auth/updatePassword",
    async (userData) => {
      try {
        return await authService.updatePassword(userData);
      } catch (error) {
        return console.log(error);
      }
    }
  );
  const getCustomerFromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;
  export const resetState = createAction("Reset_all");
const initialState = {
  user: getCustomerFromLocalStorage,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
  export const authslice=createSlice({
    name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.createdUser = action.payload;
        if (state.isSuccess === true) {
          toast.success("User created successfully");
          console.log("User created successfully");
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          console.log(action.payload.response.data.message);
        }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.user = action.payload;

        if (state.isSuccess === true) {
          localStorage.setItem("token", JSON.stringify(action.payload.token));
        //   toast.success("User Logged In Successfully");
          
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          toast.error(action.payload.response.data.message);
        }
      })
      .addCase(forgotUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgotUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.forgotPassword = action.payload;
      })
      .addCase(forgotUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError === true) {
          console.log(action.payload.response.data.message);
        }
      })
      .addCase(updateUserPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.updatedPassword = action.payload;
      })
      .addCase(updateUserPassword.rejected, (state, action) => {
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
  export default authslice.reducer;