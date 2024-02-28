export const frenchCategory = (category) => {
  const mapping = {
    fruits: "Fruit",
    vegetables: "Légume",
    other: "Autre",
  };
  return mapping[category];
};

export const frenchDifficulty = (difficulty) => {
  const mapping = {
    easy: 1,
    medium: 2,
    hard: 3,
  };
  return mapping[difficulty];
};

export const frenchMonth = (month) => {
  const mapping = {
    january: "Janvier",
    february: "Février",
    march: "Mars",
    april: "Avril",
    may: "Mai",
    june: "Juin",
    july: "Juillet",
    august: "Août",
    september: "Septembre",
    october: "Octobre",
    november: "Novembre",
    december: "Décembre",
  };
  return mapping[month];
};

export const frenchUnit = (unit) => {
  const mapping = {
    g: "g",
    kg: "kg",
    ml: "ml",
    cl: "cl",
    l: "l",
    teaspoon: "cuillère à café",
    tablespoon: "cuillère à soupe",
    pinch: "pincée",
    unit: "unité",
  };
  return mapping[unit];
};
