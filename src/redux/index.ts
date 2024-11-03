import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const someSlice = createSlice({
  name: "someSlice",
  initialState,
  reducers: {},
});

export default someSlice.reducer;
