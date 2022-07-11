import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import mapsReducer from "./maps";
import playersReducer from "./players";
import setsReducer from "./sets";
import settingsReducer from "./settings";

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    players: playersReducer,
    maps: mapsReducer,
    sets: setsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
