export interface ProductModel {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  // Putting it here for the sake of simplicity,
  // but in a real-world scenario it would need to be e.g. in a User model.
  owned: boolean;
  // Percentage of discount
  discount?: number;
}
