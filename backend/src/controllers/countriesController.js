import { getData } from "../serverUtil.js";

const data = getData();

export const getCountries = (req, res) => {
  const countries = [...new Set(data.products.map((p) => p.country))];
  res.status(200).json({ countries });
};
