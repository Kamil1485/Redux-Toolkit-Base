import { createSlice } from "@reduxjs/toolkit";
import { data } from "../data";

const initialState = {
  value: data,
};
export const userSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.value.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.value = state.value.filter((user) => user.id !== action.payload.id);
    },

    updateUser: (state, action) => {
      state.value.map((user) => {
        if (user.id === action.payload.id) {
          user.name = action.payload.name;
          user.username = action.payload.username;
        }
      });
    },
  },
});
export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
