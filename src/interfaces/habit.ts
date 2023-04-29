export interface Habit {
  id: number;
  name: string;
  startDate: Date;
  targetEndDate: Date;
  lastPartaken: Date;
  timesPartakenToday: number;
  startFrequency: number;
}
