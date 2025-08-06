import * as Location from "expo-location";
import React from "react";
import { useLocationPermission } from "../";
import { TLocation } from "@/src/types";

export const useCurrentLocation = () => {
  const { granted } = useLocationPermission();
  const [state, setState] = React.useState<TLocation>({
    lat: 51.507351,
    lon: -0.127758,
  });

  React.useEffect(() => {
    (async () => {
      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      if (coords) {
        setState((s) => ({
          ...s,
          lat: coords.latitude,
          lon: coords.longitude,
        }));
      }
    })();
  }, [granted, location]);

  return state;
};
