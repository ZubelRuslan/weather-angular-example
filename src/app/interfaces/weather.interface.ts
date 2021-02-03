export interface Weather {
  days: Array<string>;
  weather: Array<Temp>;
}

interface Temp {
  day: number;
  night: number;
}
