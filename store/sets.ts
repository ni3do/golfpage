import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SetSchema } from "../types/schema";
import { AppThunk, RootState } from "./store";

let BASE_URL = "https://golfblitz-stats.herokuapp.com/api/";
const env = process.env.NODE_ENV;

const storeSlice = createSlice({
  name: "sets",
  initialState: {
    value: [] as SetSchema[],
  },
  reducers: {
    setSets: (state, action) => {
      const sets = action.payload;
      // console.log("Sets update", sets);
      state.value = sets;
    },
  },
});

export const setupSets = (): AppThunk => async (dispatch, getState) => {
  const current = selectSets(getState());
  if (current.length === 0) {
    if (env == "development") {
      BASE_URL = "http://localhost:3000/api/";
    }
    const res = await axios.get(`${BASE_URL}getSets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Setting up Map listeners for store: ", res.data);
    dispatch(setSets(res.data));
  }
};

export const createSet =
  (newSet: SetSchema): AppThunk =>
  async (dispatch) => {
    if (env == "development") {
      BASE_URL = "http://localhost:3000/api/";
    }
    const resCreate = await axios.post(`${BASE_URL}createSet`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(newSet),
    });
    const resGet = await axios.get(`${BASE_URL}getSets`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    dispatch(setSets(resGet.data));
  };

export const { setSets } = storeSlice.actions;
export const selectSets = (state: RootState) => state.sets.value;

export default storeSlice.reducer;
