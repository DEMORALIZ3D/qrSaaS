import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function updateNestedObject<T extends Record<string, any>>(
  obj: T,
  key: string,
  value: any
): T {
  const keys = key.split(".");
  let current: any = obj;

  // Iterate through the keys, creating nested objects as needed.
  for (let i = 0; i < keys.length - 1; i++) {
    const currentKey = keys[i];

    // If the current key doesn't exist or isn't an object, create/overwrite it.
    if (
      typeof current[currentKey] !== "object" ||
      current[currentKey] === null
    ) {
      current[currentKey] = {};
    }
    current = current[currentKey];
  }

  // Set the value at the final key.
  current[keys[keys.length - 1]] = value;
  console.log({ updatedObj: obj });
  return obj;
}

export function createAndSetNestedValue<T>(
  key: string,
  value: T
): Record<string, any> {
  const keys = key.split(".");
  const result: Record<string, any> = {}; // Start with an empty object
  let current: any = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const currentKey = keys[i];
    current[currentKey] = {}; // Always create the nested object
    current = current[currentKey];
  }

  current[keys[keys.length - 1]] = value;
  return result;
}
