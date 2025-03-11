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

export interface GradientOptions {
  from: string;
  to?: string;
  rotation?: number; // Optional rotation in degrees
  type?: "linear" | "radial"; // Optional gradient type, defaults to linear
  stops?: { color: string; position: number }[]; // Optional array of color stops.  Overrides from/to if present.
}

export function createGradientCSS(options: GradientOptions): string {
  const { from, to, rotation = 0, type = "linear", stops } = options;

  if (stops && stops.length > 0) {
    // Handle multiple color stops
    const stopString = stops
      .sort((a, b) => a.position - b.position) // Ensure stops are in order
      .map((stop) => `${stop.color} ${stop.position}%`)
      .join(", ");

    if (type === "radial") {
      return `radial-gradient(circle, ${stopString})`;
    } else {
      return `linear-gradient(${rotation}deg, ${stopString})`;
    }
  } else {
    // Handle simple from/to gradient

    if (type === "radial") {
      return `radial-gradient(circle, ${from}, ${to})`;
    } else {
      return `linear-gradient(${rotation}deg, ${from}, ${to})`;
    }
  }
}

export const deepMergeAndUpdate = <T>(target: T, source: DeepPartial<T>): T => {
  const output: T = { ...target }; // Create a shallow copy of target

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const sourceValue = source[key];
      const targetValue = target[key as keyof T];

      if (
        sourceValue !== null &&
        typeof sourceValue === "object" &&
        !Array.isArray(sourceValue) &&
        Object.prototype.hasOwnProperty.call(target, key) &&
        targetValue !== null &&
        typeof targetValue === "object"
      ) {
        // Recursive call for nested objects
        output[key as keyof T] = deepMergeAndUpdate(
          targetValue as Record<string, unknown>, // More specific type assertion
          sourceValue as Record<string, unknown> // More specific type assertion
        ) as T[keyof T]; // Cast back to the correct property type
      } else {
        // Override or add the value from source
        output[key as keyof T] = sourceValue as T[keyof T]; // Type assertion
      }
    }
  }

  return output;
};

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
