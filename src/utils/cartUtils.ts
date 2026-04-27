import { type Product } from "../services/productsService";
import { type BasketProduct } from "../services/basketService";

export function addToCart(productId: number) {
  let productsInCart =
    JSON.parse(localStorage.getItem("productsInCart") ?? "[]") || []; //TODO: look up how to do this safely in TS

  const existingProduct = productsInCart.find(
    (item: Product) => item.id === productId,
  );

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    productsInCart.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem("productsInCart", JSON.stringify(productsInCart));
  localStorage.setItem("cart", JSON.stringify(productsInCart));
  window.location.href = "../basket.html";
}

export function numberOfProductsInCart() {
  let productsInCart =
    JSON.parse(localStorage.getItem("productsInCart") ?? "[]") || []; //TODO: look up how to do this safely in TS

  let number = 0;
  productsInCart.forEach(function (p: BasketProduct) {
    number += p.quantity;
  });
  return number;
}
