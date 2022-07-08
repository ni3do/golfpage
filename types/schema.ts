export type PlayerSchema = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  Set: SetSchema[];
  SetPoints: SetPointsSchema[];
};

export type SetPointsSchema = {
  id: string;
  setId: number;
  player: PlayerSchema;
  points: number;
  createdAt: string;
  updatedAt: string;
  Set: SetSchema;
};

export type SetSchema = {
  id: number;
  map: string;
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
};

export type StatsSchema = {
  setCount: number;
  playerStats: { [playerName: string]: PlayerStatsSchema };
};
