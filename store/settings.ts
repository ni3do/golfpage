import { createSlice } from "@reduxjs/toolkit";
import { SettingsSchema } from "../types/schema";
import { AppThunk, RootState } from "./store";

const storeSlice = createSlice({
  name: "settings",
  initialState: {
    value: {} as SettingsSchema,
  },
  reducers: {
    setSettings: (state, action) => {
      const settings = action.payload;
      console.log("Settings update", settings);
      state.value = settings;
    },
  },
});

export const setupSettings = (): AppThunk => (dispatch, getState) => {
  const current = selectSettings(getState());
  if (Object.keys(current).length === 0) {
    console.log("Setting up Settings listeners for store");
    dispatch(setSettings({ darkMode: true }));
  }
};

export const editSettings =
  (newSettings: any): AppThunk =>
  (dispatch) => {
    console.log(`Edit settings: ${JSON.stringify(newSettings)}`);
    dispatch(setSettings(newSettings));
  };

export const { setSettings } = storeSlice.actions;
export const selectSettings = (state: RootState) => state.settings.value;

export default storeSlice.reducer;
