import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  data: [],
  isloading: false,
  error: null,
};

export const fetchData = createAsyncThunk("content/fetchData", async () => {
  const response = await axios.get("/data.json");
  return response.data;
});
export const localSlice = createSlice({
  name: "localuser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state, action) => {
      state.isloading = true;
    });

    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isloading = false;
    });

    builder.addCase(fetchData.rejected, (state, action) => {
      state.isloading = false;
      state.error = action.error.message;
    });
  },
});
export default localSlice.reducer;
