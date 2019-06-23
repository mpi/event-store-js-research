export interface Event {
  type: string;
  payload: { [key: string]: unknown };
}