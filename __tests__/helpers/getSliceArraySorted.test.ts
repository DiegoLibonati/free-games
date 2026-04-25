import { getSliceArraySorted } from "@/helpers/getSliceArraySorted";

describe("getSliceArraySorted", () => {
  it("should return an array of the specified count", () => {
    const arr = [1, 2, 3, 4, 5];

    const result = getSliceArraySorted(arr, 3);

    expect(result).toHaveLength(3);
  });

  it("should return all elements when count equals array length", () => {
    const arr = [1, 2, 3, 4, 5];

    const result = getSliceArraySorted(arr, 5);

    expect(result).toHaveLength(5);
  });

  it("should return an empty array when count is 0", () => {
    const arr = [1, 2, 3, 4, 5];

    const result = getSliceArraySorted(arr, 0);

    expect(result).toEqual([]);
  });

  it("should not modify the original array", () => {
    const arr = [1, 2, 3, 4, 5];
    const original = [...arr];

    getSliceArraySorted(arr, 3);

    expect(arr).toEqual(original);
  });

  it("should return only items that exist in the original array", () => {
    const arr = [1, 2, 3, 4, 5];

    const result = getSliceArraySorted(arr, 3);

    result.forEach((item) => {
      expect(arr).toContain(item);
    });
  });

  it("should return an empty array when the input array is empty", () => {
    const arr: number[] = [];

    const result = getSliceArraySorted(arr, 3);

    expect(result).toEqual([]);
  });

  it("should return the full array when count is greater than array length", () => {
    const arr = [1, 2, 3, 4, 5];

    const result = getSliceArraySorted(arr, 10);

    expect(result).toHaveLength(5);
  });
});
