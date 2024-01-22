import { useState } from "react";

export function useAutoResetState<T>(
  initialValue: T,
  timeout: number,
): [T, (value: T) => void] {
  const [value, setValue] = useState(initialValue);
  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);
  const resetValue = (value: T) => {
    if (timer) {
      clearTimeout(timer);
    }
    setValue(value);
    setTimer(setTimeout(() => setValue(initialValue), timeout));
  };
  return [value, resetValue];
}
