import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { MapSchema } from "../types/schema";
import { AppThunk, RootState } from "./store";

let BASE_URL = "https://golfblitz-stats.herokuapp.com/api/";
const env = process.env.NODE_ENV;

const storeSlice = createSlice({
  name: "maps",
  initialState: {
    value: [] as MapSchema[],
  },
  reducers: {
    setMaps: (state, action) => {
      const maps = action.payload;
      // console.log("Maps update", maps);
      state.value = maps;
    },
  },
});

export const setupMaps = (): AppThunk => async (dispatch, getState) => {
  const current = selectMaps(getState());
  if (env == "development") {
    BASE_URL = "http://localhost:3000/api/";
  }
  if (current.length === 0) {
    const res = await axios.get(`${BASE_URL}getMaps`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Setting up Map listeners for store: ", res.data);
    dispatch(setMaps(res.data));
  }
};

export const createMap =
  (name: string): AppThunk =>
  async (dispatch, getState) => {
    if (env == "development") {
      BASE_URL = "http://localhost:3000/api/";
    }
    const resCreate = await axios.post(`${BASE_URL}createMap`, {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ name: name }),
    });
    const resGet = await axios.post(`${BASE_URL}getMaps`, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(setMaps(resGet.data));
  };

export const { setMaps } = storeSlice.actions;
export const selectMaps = (state: RootState) => state.maps.value;

export default storeSlice.reducer;
