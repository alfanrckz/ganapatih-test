import axios from "axios";

export const baseUrl = axios.create({
  baseURL: "https://1c9a-182-253-56-190.ngrok-free.app",
  headers: {
    "ngrok-skip-browser-warning": "true", // Tambahkan header ini
  },
});
