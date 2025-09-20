import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { dummyUsers } from "./data";
import axios from "axios";
import { StylesConfig } from "react-select";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function authenticateUser(username: string, password: string) {
  const index = dummyUsers.findIndex(
    (user) => user.username === username && user.password === password
  );
  if (index === -1) return null;
  return {
    username: dummyUsers[index].username,
    role: dummyUsers[index].role,
  };
}

export const API = axios.create({
  baseURL: "http://localhost:3000",
});

export function delay(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export const isUserExist = (username: string) => {
  const user = dummyUsers.find((u) => u.username === username);
  return user ? true : false;
};

export const reactSelectCustomStyles = (): StylesConfig<
  { value: string; label: string },
  true
> => {
  const isDarkMode = document.documentElement.classList.contains("dark");

  if (!isDarkMode) {
    return {}; // Keep light mode styles as default
  }

  return {
    control: (base) => ({
      ...base,
      backgroundColor: "rgb(24, 24, 27)", // Dark background
      borderColor: "#3F3F46",
      color: "#E4E4E7",
      "&:hover": { borderColor: "#818CF8" },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "rgb(24, 24, 27)",
      color: "#E4E4E7",
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? "#6366F1"
        : isFocused
        ? "#27272A"
        : "transparent",
      color: isSelected ? "#F3F4F6" : "#D1D5DB",
      "&:hover": { backgroundColor: "#B2D4FF", color: "#121212" },
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "#3F3F46",
      color: "#E4E4E7",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "#F3F4F6",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "#F87171",
      "&:hover": { backgroundColor: "#27272A", color: "#EF4444" },
    }),
  };
};
