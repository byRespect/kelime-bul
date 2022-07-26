import { createSlice } from "@reduxjs/toolkit";

export const gameSlice = createSlice({
  name: "Game",
  initialState: {
    boardState: localStorage.getItem("boardState")
      ? JSON.parse(localStorage.getItem("boardState"))
      : [
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
          ["", "", "", "", ""],
        ],
    solution: localStorage.getItem("solution")
      ? JSON.parse(localStorage.getItem("solution"))
      : [],
    RowIndex: 0,
    GameIndex: localStorage.getItem("GameIndex")
      ? JSON.parse(localStorage.getItem("GameIndex"))
      : 0,
    GameFinish: localStorage.getItem("GameFinish")
      ? JSON.parse(localStorage.getItem("GameFinish"))
      : false,
    innerSolution: localStorage.getItem("innerSolution")
      ? JSON.parse(localStorage.getItem("innerSolution"))
      : [[], [], []],
  },
  reducers: {
    popBoardState: (state) => {
      if (state.RowIndex >= 1) --state.RowIndex;
      state.boardState[state.GameIndex][state.RowIndex] = "";
      if (state.RowIndex == 5) --state.RowIndex;
    },
    setBoardState: (state, action) => {
      if (state.RowIndex != 5)
        state.boardState[state.GameIndex][state.RowIndex] = action.payload;

      if (state.RowIndex <= 4) ++state.RowIndex;
    },
    SetSolution: (state, action) => {
      if (!localStorage.getItem("solution")) state.solution = action.payload;
    },
    SubmitSolution: (state, action) => {
      state.GameFinish = action.payload;
      let check = true;
      state.boardState[state.GameIndex].map((text) => {
        if (text.length == 0) check = false;
      });
      if (check) {
        if (state.GameIndex !== 6) ++state.GameIndex;
        state.RowIndex = 0;

        localStorage.setItem(
          "innerSolution",
          JSON.stringify(state.innerSolution)
        );
        localStorage.setItem("GameIndex", state.GameIndex);
        localStorage.setItem("boardState", JSON.stringify(state.boardState));
        localStorage.setItem("GameFinish", state.GameFinish);
        localStorage.setItem("solution", JSON.stringify(state.solution));
      }
    },
    ResetGame: (state, action) => {
      state.boardState = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
      ];
      state.RowIndex = 0;
      state.GameIndex = 0;
      state.GameFinish = false;
      state.solution = action.payload;
      state.innerSolution = [[], [], []];
    },
    InsertInnerSolution: (state, action) => {
      const x = action.payload.index;
      const val = action.payload.value;
      if (x == 0) {
        if (state.innerSolution[x].indexOf(val) === -1) {
          state.innerSolution[x] = [...state.innerSolution[x], val];
          const checkIndex = state.innerSolution[1].indexOf(val);
          if (checkIndex !== -1) state.innerSolution[1].splice(checkIndex, 1);
        }
      } else if (x == 1) {
        if (
          state.innerSolution[x].indexOf(val) === -1 &&
          state.innerSolution[0].indexOf(val) === -1
        ) {
          state.innerSolution[x] = [...state.innerSolution[x], val];
        }
      } else {
        if (state.innerSolution[x].indexOf(val) === -1)
          state.innerSolution[x] = [...state.innerSolution[x], val];
      }
    },
  },
});

export const {
  popBoardState,
  setBoardState,
  SetSolution,
  SubmitSolution,
  ResetGame,
  InsertInnerSolution,
} = gameSlice.actions;

export default gameSlice.reducer;
