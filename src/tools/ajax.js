import axios from "axios";
import "@madzadev/audio-player/dist/index.css";

export const ajax = async (options) =>
  await axios.request(options).then((response) => response.data);
