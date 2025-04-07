export const reduceValue = (item) => item.reduce((x, y) => y?.price + x, 0);
