/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction } from "@reduxjs/toolkit";
import { Board, Column, Task } from "../models/board.model";
import {
  UPDATE_TASK,
  SET_SELECTED_TASK,
  SET_COLUMNS,
  SET_BOARD,
  SET_BOARDS,
} from "../actions/boardActions";
import { loadFromLocalStorage } from "../utils/localStorage";
import { boards } from "../data/data.json";

// const boardsData = [...boards];

// Load boards from localStorage

const boardsData = loadFromLocalStorage("boards") || [];

// FOR TESTING:
// localStorage.removeItem("boards");

interface State {
  selectedBoard: Board | null;
  boards: Board[] | null;
  columns: Column[] | null;
  selectedTask: Task | null;
}

const initialState: State = {
  selectedBoard: null,
  boards: boardsData,
  columns: null,
  selectedTask: null,
};
// 3. Reducer handles the "SET_SELECTED_BOARD" action, by updating the state.data
// with the new action.payload
export default function boardReducer(
  state = initialState,
  action: PayloadAction<any>
) {
  switch (action.type) {
    case SET_COLUMNS:
      return {
        ...state,
        columns: action.payload,
      };
    case SET_BOARDS:
      return {
        ...state,
        boards: action.payload,
      };
    case SET_BOARD:
      return {
        ...state,
        board: action.payload,
      };
    case UPDATE_TASK:
      // eslint-disable-next-line no-case-declarations
      const updatedTask: Task = action.payload;
      // eslint-disable-next-line no-case-declarations
      const newColumns =
        state.columns?.map((column) => {
          const taskIndex = column.tasks.findIndex(
            (task) => task.id === updatedTask.id
          );
          if (taskIndex !== -1) {
            return {
              ...column,
              tasks: [
                ...column.tasks.slice(0, taskIndex),
                updatedTask,
                ...column.tasks.slice(taskIndex + 1),
              ],
            };
          }
          return column;
        }) || [];
      return { ...state, columns: newColumns, selectedTask: updatedTask };
    case SET_SELECTED_TASK:
      return { ...state, selectedTask: action.payload };
    default:
      return state;
  }
}
