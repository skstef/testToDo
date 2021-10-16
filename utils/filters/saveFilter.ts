export const saveFilter = (filter: string): void => {
  const filters: string[] = JSON.parse(
    (typeof window !== "undefined" && window.localStorage.getItem("filters")) ||
      "[]"
  );

  if (!filters.includes(filter)) {
    filters.push(filter);
  }

  localStorage.setItem("filters", JSON.stringify(filters));
};
