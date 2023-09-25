import { ajax } from "../tools/ajax";

export const getCityWeather = async (city) => {
  const optionsRequest = {
    method: "GET",
    url: "http://api.openweathermap.org/data/2.5/weather",
    params: {
      q: city,
      appid: "f7e24b708fbf59f27b91ac13deea5ae6",
      units: "metric", // Grados centígrados
    },
  };
  return await ajax(optionsRequest);
};
