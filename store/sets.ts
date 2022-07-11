import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SetSchema } from "../types/schema";
import { AppThunk, RootState } from "./store";

const storeSlice = createSlice({
  name: "sets",
  initialState: {
    value: [] as SetSchema[],
  },
  reducers: {
    setSets: (state, action) => {
      const sets = action.payload;
      console.log("Sets update", sets);
      state.value = sets;
    },
  },
});

export const setupSets = (): AppThunk => async (dispatch, getState) => {
  const current = selectSets(getState());
  if (current.length === 0) {
    const res = await axios.get(
      "https://golfblitz-stats.herokuapp.com/api/getSets",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Setting up Map listeners for store: ", res);
    dispatch(setSets(res.data));
  }
};

export const createSet =
  (newSet: SetSchema): AppThunk =>
  async (dispatch) => {
    const resCreate = await axios.post(
      "https://golfblitz-stats.herokuapp.com/api/createSet",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(newSet),
      }
    );
    const resGet = await axios.get(
      "https://golfblitz-stats.herokuapp.com/api/getSets",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(setSets(resGet.data));
  };

export const { setSets } = storeSlice.actions;
export const selectSets = (state: RootState) => state.sets.value;

export default storeSlice.reducer;
