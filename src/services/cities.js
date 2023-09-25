import { ajax } from "../tools/ajax";

export const getCities = async (countryCode) => {
  const optionsRequest = {
    method: "GET",
    url: "https://spott.p.rapidapi.com/places",
    params: {
      limit: 32,
      type: "CITY",
      country: countryCode ?? "US",
    },
    headers: {
      "X-RapidAPI-Key": "7e740b7833mshc9d5ebebcac3b1dp1940bcjsn894f5ed4be72",
      "X-RapidAPI-Host": "spott.p.rapidapi.com",
    },
  };
  return await ajax(optionsRequest);
};
