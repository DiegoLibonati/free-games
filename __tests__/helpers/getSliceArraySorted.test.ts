import { getSliceArraySorted } from "@/helpers/getSliceArraySorted";

describe("getSliceArraySorted", () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it("should return an array with the specified count", () => {
    const result = getSliceArraySorted(arr, 3);

    expect(result).toHaveLength(3);
  });

  it("should only contain items from the original array", () => {
    const result = getSliceArraySorted(arr, 5);

    result.forEach((item) => {
      expect(arr).toContain(item);
    });
  });

  it("should not mutate the original array", () => {
    const original = [...arr];

    getSliceArraySorted(arr, 5);

    expect(arr).toEqual(original);
  });

  it("should return an empty array when count is 0", () => {
    const result = getSliceArraySorted(arr, 0);

    expect(result).toHaveLength(0);
  });

  it("should return the full array when count exceeds array length", () => {
    const result = getSliceArraySorted(arr, 100);

    expect(result).toHaveLength(arr.length);
  });

  it("should return an empty array for empty input", () => {
    const result = getSliceArraySorted([], 5);

    expect(result).toHaveLength(0);
  });

  it("should not have duplicate items", () => {
    const result = getSliceArraySorted(arr, arr.length);
    const unique = new Set(result);

    expect(unique.size).toBe(result.length);
  });
});
