export type TLocation = {
  lat: number;
  lon: number;
};

export type TLanguage = "en" | "xh" | "zu" | "af" | "st";

export interface Current {
  cloudcover: number;
  feelslike: number;
  observation_time: string;
  pressure: number;
  temperature: number;
  visibility: number;
  weather_descriptions: string[];
  weather_icons: string[];
  wind_dir: string;
  wind_speed: number;
}

export interface Location {
  country: string;
  name: string;
  region: string;
  timezone_id: string;
}

export interface Weather {
  current: Current;
  location: Location;
}

export interface TWeatherData {
  error?: any;
  success: boolean;
  weather?: Weather;
}

export interface TItemResponse {
  label: number;
  class_label: string;
  probability: number;
}

export interface Prediction {
  quality: TItemResponse;
  maturity: TItemResponse;
}

export interface TPredictionResponse {
  time: number;
  ok: boolean;
  status: string;
  prediction?: Prediction;
  error?: string;
}

export type THistory = {
  id: string;
  date: Date;
  prediction: Prediction;
  tomato: string;
};
