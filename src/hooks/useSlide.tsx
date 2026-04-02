import { useEffect, useState } from "react";

import { UseSlide } from "@/types/hooks";

export const useSlide = <T,>(arr: T[]): UseSlide => {
  const [index, setIndex] = useState<number>(0);

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

    return () => clearTimeout(timeout);
  }, [index, arr]);

  return {
    index: index,
    handleSetIndex: handleSetIndex,
  };
};
