/* eslint-disable @typescript-eslint/no-explicit-any */

export function excludeFields<T, Key extends keyof T>(
  user: T,
  keys: Key[]
): Omit<T, Key> | { [k: string]: unknown } {
  return Object.fromEntries(
    Object.entries(user as any).filter(([key]) => !keys.includes(key as Key))
  );
}

export const asyncForEach = async (arr: any[], callback: any) => {
  if (!Array.isArray(arr)) {
    throw new Error('expected an array');
  }
  for (let i = 0; i < arr.length; i++) {
    await callback(arr[i], i, arr);
  }
};

export const hasTimeConflict = (
  existingSlots: {
    startTime: string;
    endTime: string;
    // dayOfWeek: WeekDays;
  }[],
  newSlot: {
    startTime: string;
    endTime: string;
    // dayOfWeek: WeekDays;
  }
) => {
  for (const slot of existingSlots) {
    const existingStart = new Date(`1970-01-01T${slot.startTime}:00`);
    const existingEnd = new Date(`1970-01-01T${slot.endTime}:00`);
    const newStart = new Date(`1970-01-01T${newSlot.startTime}:00`);
    const newEnd = new Date(`1970-01-01T${newSlot.endTime}:00`);

    if (newStart < existingEnd && newEnd > existingStart) {
      return true;
    }
  }
  return false;
};
