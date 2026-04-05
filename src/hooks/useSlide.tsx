import { useEffect, useState } from "react";

import type { UseSlide } from "@/types/hooks";

export const useSlide = (arr: unknown[]): UseSlide => {
  const [index, setIndex] = useState(0);

  const handleSetIndex = (index: number): void => {
    setIndex(index);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index >= arr.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }, 5000);

    return (): void => {
      clearTimeout(timeout);
    };
  }, [index, arr]);

  return {
    index: index,
    handleSetIndex: handleSetIndex,
  };
};
