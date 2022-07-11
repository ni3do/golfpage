export type PlayerSchema = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  sets: SetSchema[];
  setPoints: SetPointsSchema[];
};

export type SetPointsSchema = {
  id: string;
  setId: number;
  playerName: string;
  player: PlayerSchema;
  points: number;
  createdAt: string;
  updatedAt: string;
};

export type SetSchema = {
  id: number;
  map: MapSchema;
  points: SetPointsSchema[];
  winner: PlayerSchema;
  createdAt: String;
  updatedAt: String;
};

export type PlayerStatsSchema = {
  name: string;
  wins: number;
  losses: number;
  setsPlayed: number;
  points: number;
  swooshes: number;
  mapWins: { [mapName: string]: number };
};

export type StatsSchema = {
  setCount: number;
  playerStats: { [playerName: string]: PlayerStatsSchema };
};

export type MapSchema = {
  name: string;
};

export type SettingsSchema = {
  darkMode: boolean;
};
