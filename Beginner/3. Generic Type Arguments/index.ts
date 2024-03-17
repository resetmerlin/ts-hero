type GroceryStore<T, U> = {
  name: T;
  city: U;
};

type GroceryItem = unknown;

type CapreseSalad = {
  name: "Caprese Salad";
  price: 14.99;
  inStock: true;
};
