import { useEffect, useState } from "react";

export const useAutoSlide = (arr: unknown[]): number => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < 0) {
      setIndex(arr.length - 1);
    }

    if (index > arr.length - 1) {
      setIndex(0);
    }
  }, [index, arr]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(index + 1);
    }, 6000);

    return (): void => {
      clearInterval(interval);
    };
  }, [index]);

  return index;
};
