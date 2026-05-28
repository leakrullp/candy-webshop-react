import { getData, saveData } from "../serverUtil.js";

const data = getData();

export const createBasketForCustomer = (req, res) => {
  const existing = data.baskets.find(
    (b) => b.customerId === req.params.customerId,
  );

  if (existing) {
    return res
      .status(200)
      .json({ message: "Basket already exists", basket: existing });
  }

  const newBasket = {
    customerId: req.params.customerId,
    items: [],
  };

  data.baskets.push(newBasket);
  saveData(data);

  res.status(201).json({ message: "Basket created", basket: newBasket });
};

export const getBasketForCustomer = (req, res) => {
  const basket = data.baskets.find(
    (b) => b.customerId === req.params.customerId,
  );

  if (!basket) {
    return res.status(404).json({ message: "No basket for this customer" });
  }

  res.status(200).json({ basket });
};

export const addItemToBasket = (req, res) => {
  const productId = parseInt(req.params.productId);
  const quantity = parseInt(req.params.quantity);

  const basket = data.baskets.find(
    (b) => b.customerId === req.params.customerId,
  );

  if (!basket) {
    return res.status(404).json({ message: "Basket not found" });
  }

  const item = basket.items.find((i) => i.productId === productId);

  if (item) {
    item.quantity += quantity;
  } else {
    basket.items.push({ productId, quantity });
  }

  saveData(data);
  res.status(200).json({ message: "Item added to basket", basket });
};

export const removeItemFromBasket = (req, res) => {
  const basket = data.baskets.find(
    (b) => b.customerId === req.params.customerId,
  );

  if (!basket) {
    return res.status(404).json({ message: "Basket not found" });
  }

  basket.items = basket.items.filter(
    (item) => item.productId !== parseInt(req.params.productId),
  );
  saveData(data);
  res.status(200).json({ message: "Item removed from basket", basket });
};
