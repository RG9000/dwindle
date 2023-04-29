export interface Habit {
  id: number;
  name: string;
  startDate: Date;
  targetEndDate: Date;
  lastPartaken: Date;
  startFrequency: number;
}
