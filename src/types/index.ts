export interface Alert {
  _id: string;
  timestamp: number;
  machine: string;
  anomaly: string;
  sensor: string;
  soundClip: string;
  reason: string;
  action: string;
  comment: string;
}
