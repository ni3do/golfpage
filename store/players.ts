import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { PlayerSchema } from "../types/schema";
import { AppThunk, RootState } from "./store";

const storeSlice = createSlice({
  name: "players",
  initialState: {
    value: [] as PlayerSchema[],
  },
  reducers: {
    setPlayers: (state, action) => {
      const players = action.payload;
      console.log("Players update", players);
      state.value = players;
    },
  },
});

export const setupPlayers = (): AppThunk => async (dispatch, getState) => {
  const current = selectPlayers(getState());
  if (current.length === 0) {
    const res = await axios.get(
      "https://golfblitz-stats.herokuapp.com/api/getPlayers",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Setting up players listeners for store: ", res.data);
    dispatch(setPlayers(res.data));
  }
};

export const createPlayer =
  (name: string): AppThunk =>
  async (dispatch) => {
    const resCreate = await axios.post(
      "https://golfblitz-stats.herokuapp.com/api/createPlayer",
      {
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ name: name }),
      }
    );
    const resGet = await axios.get(
      "https://golfblitz-stats.herokuapp.com/api/getPlayers",
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(setPlayers(resGet.data));
  };

export const { setPlayers } = storeSlice.actions;
export const selectPlayers = (state: RootState) => state.players.value;

export default storeSlice.reducer;
