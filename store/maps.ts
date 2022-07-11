import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { MapSchema } from "../types/schema";
import { AppThunk, RootState } from "./store";

const storeSlice = createSlice({
  name: "maps",
  initialState: {
    value: [] as MapSchema[],
  },
  reducers: {
    setMaps: (state, action) => {
      const maps = action.payload;
      console.log("Maps update", maps);
      state.value = maps;
    },
  },
});

export const setupMaps = (): AppThunk => async (dispatch, getState) => {
  const current = selectMaps(getState());
  if (current.length === 0) {
    const res = await axios.get("/api/getMaps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    console.log("Setting up Map listeners for store: ", res.data);
    dispatch(setMaps(res.data));
  }
};

export const createMap =
  (name: string): AppThunk =>
  async (dispatch, getState) => {
    const resCreate = await axios.post("/api/createMap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ name: name }),
    });
    const resGet = await axios.get("/api/getMaps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    dispatch(setMaps(resGet.data));
  };

export const { setMaps } = storeSlice.actions;
export const selectMaps = (state: RootState) => state.maps.value;

export default storeSlice.reducer;
