import { useEffect, useState } from "react";

export const useDebounce = (value: string, time: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  console.log("in useDebounce");
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceValue(value);
    }, time);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, time]);

  return debounceValue;
};
