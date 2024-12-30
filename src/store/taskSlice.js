import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  refresh: false,
  idTask: null,
};

export const taskSlice = createSlice({
  name: "taskReducer",
  initialState: initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks = action.payload;
    },
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
    setIdTask: (state, action) => {
      state.idTask = action.payload;
    },
  },
});

export const { addTask, setRefresh, setIdTask } = taskSlice.actions;
export default taskSlice.reducer;
