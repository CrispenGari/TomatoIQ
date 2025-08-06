import { TPredictionResponse, TWeatherData } from "@/src/types";
import { ReactNativeFile } from "apollo-upload-client";

const __serverURL__ = "https://tomatoiq.onrender.com"; //process.env.EXPO_PUBLIC_SERVER_URL!;

export const predictTomatoQualityAndMaturity = async ({
  tomato,
}: {
  tomato: ReactNativeFile;
}) => {
  const formData = new FormData();
  formData.append("tomato", tomato);
  const res = await fetch(`${__serverURL__}/api/v1/tomato/predict`, {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  return data as TPredictionResponse;
};

export const getCurrentWeather = async ({
  queryKey,
}: {
  queryKey: (string | number)[];
}) => {
  const [_, lat, lon] = queryKey;
  const res = await fetch(
    `${__serverURL__}/api/v1/weather/current?lat=${lat}&lon=${lon}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  return data as TWeatherData;
};
