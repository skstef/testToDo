export const getFilters = (): string[] => {
  const filters: string[] = JSON.parse(
    (typeof window !== "undefined" && window.localStorage.getItem("filters")) ||
      "[]"
  );

  return filters;
};
