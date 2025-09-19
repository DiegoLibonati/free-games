import { getSliceArraySorted } from "@src/helpers/getSliceArraySorted";

describe("getSliceArraySorted.ts", () => {
  describe("General Tests.", () => {
    test("it should return an array with the specified number of elements.", () => {
      const inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const count = 5;

      const result = getSliceArraySorted(inputArray, count);

      expect(result).toHaveLength(count);
    });

    test("it should not modify the original array.", () => {
      const inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const count = 5;

      const originalArrayCopy = [...inputArray];
      getSliceArraySorted(inputArray, count);

      expect(inputArray).toEqual(originalArrayCopy);
    });

    test("it should return an array with elements from the original array.", () => {
      const inputArray = [1, 2, 3, 4, 5];
      const count = 3;

      const result = getSliceArraySorted(inputArray, count);

      result.forEach((element) => {
        expect(inputArray).toContain(element);
      });
    });

    test("it should return an empty array if count is 0.", () => {
      const inputArray = [1, 2, 3, 4, 5];
      const count = 0;

      const result = getSliceArraySorted(inputArray, count);

      expect(result).toEqual([]);
    });

    test("it should return the entire array if count is greater than the array length.", () => {
      const inputArray = [1, 2, 3];
      const count = 10;

      const result = getSliceArraySorted(inputArray, count);

      expect(result).toHaveLength(inputArray.length);
      expect(result.sort()).toEqual(inputArray.sort());
    });
  });
});
