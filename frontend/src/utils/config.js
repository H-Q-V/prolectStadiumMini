import { LOCAL_STORAGE_TOKEN } from "./localStoreName";
export const config = {
  headers: {
    token: `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN)}`,
  },
};
