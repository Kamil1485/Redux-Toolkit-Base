import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  contents: [],
  isloading: false,
  error: null,
};
export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async () => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/photos"
    );
    const data = await response.data;
    return data;
  }
);


export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state, action) => {
      state.isloading = true;
    });

    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.contents = action.payload;
      state.isloading = false;
    });

    builder.addCase(fetchContent.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message;
    });
  },
});

export default contentSlice.reducer;

/*
const datafetch = async () => {
    try {
      const response = await fetch("data.json");
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  datafetch()*/
