export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// Minimal real-world chat example types (shared by frontend and worker)
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number; // epoch millis
}
// Aegis Mission Control Types
export interface Telemetry {
  altitude: number; // in km
  speed: number; // in km/h
  downrange: number; // in km
  signalStrength: number; // in %
  temperature: number; // in Celsius
  fuel: number; // in %
  pressure: number; // in kPa
}
export interface RocketSpecs {
  name: string;
  height: string; // e.g., "70 m"
  diameter: string; // e.g., "3.7 m"
  mass: string; // e.g., "549,054 kg"
  payloadToLEO: string; // e.g., "22,800 kg"
}
export interface LaunchSite {
  name: string;
  location: string;
}
export interface Launch {
  id: string;
  missionName: string;
  launchDate: string; // ISO 8601 format
  status: 'Upcoming' | 'In-Flight' | 'Success' | 'Failed';
  rocket: RocketSpecs;
  launchSite: LaunchSite;
  payload: string;
  liveStreamUrl?: string;
  telemetry: Telemetry;
}