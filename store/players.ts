import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PlayerSchema } from "../types/schema";
import { AppThunk, RootState } from "./store";

let BASE_URL = "https://golfblitz-stats.herokuapp.com/api/";
const env = process.env.NODE_ENV;

const storeSlice = createSlice({
  name: "players",
  initialState: {
    value: [] as PlayerSchema[],
  },
  reducers: {
    setPlayers: (state, action) => {
      const players = action.payload;
      // console.log("Players update", players);
      state.value = players;
    },
  },
});

export const setupPlayers = (): AppThunk => async (dispatch, getState) => {
  const current = selectPlayers(getState());
  if (current.length === 0) {
    if (env == "development") {
      BASE_URL = "http://localhost:3000/api/";
    }
    const res = await axios.get(`${BASE_URL}getPlayers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    // console.log("Setting up players listeners for store: ", res.data);
    dispatch(setPlayers(res.data));
  }
};

export const createPlayer =
  (name: string): AppThunk =>
  async (dispatch) => {
    if (env == "development") {
      BASE_URL = "http://localhost:3000/api/";
    }
    const resCreate = await axios.post(`${BASE_URL}createPlayer`, {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ name: name }),
    });
    const resGet = await axios.get(`${BASE_URL}getPlayers`, {
      headers: { "Content-Type": "application/json" },
    });
    dispatch(setPlayers(resGet.data));
  };

export const { setPlayers } = storeSlice.actions;
export const selectPlayers = (state: RootState) => state.players.value;

export default storeSlice.reducer;
