import { getData, saveData } from "../serverUtil.js";

const data = getData();

export function getAllCustomers(req, res) {
  res.status(200).json({ customers: data.baskets });
}

export function loginCustomer(req, res) {
  const { email, password } = req.body;

  const customer = data.baskets.find(
    (c) => c.email === email && c.password === password
  );

  if (!customer) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.status(200).json({ customer });
}

export function registerCustomer(req, res) {
  const { fname, lname, email, password } = req.body;

  const exists = data.baskets.find((c) => c.email === email);
  if (exists) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const newCustomer = {
    customerId: String(data.baskets.length + 1),
    firstname: fname,
    lastname: lname,
    email,
    password,
    items: [],
  };

  data.baskets.push(newCustomer);
  saveData(data);

  res.status(201).json({ customer: newCustomer });
}