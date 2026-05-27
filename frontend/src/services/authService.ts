import type { User } from "../types";

export async function loginUser(email: string, password: string): Promise<User | null> {
    const response = await fetch('/api/customers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        throw new Error("Login failed. Please try again.");
    }

    const data = await response.json();

    if (data.customer) {
        const user: User = {
            customerId: data.customer.customerId,
            firstname: data.customer.firstname,
            lastname: data.customer.lastname,
            email: email,
            password: "",
            items: data.customer.items ?? [],
        };
        localStorage.setItem("currentUser", JSON.stringify(user));
        return user;
    }
    
    return null;
}

export async function registerUser(fname: string, lname: string, email: string, password: string): Promise<User | null> {
    const response = await fetch('/api/customers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fname, lname, email, password })
    });

    if (!response.ok) {
        throw new Error("Register failed. Please try again.");
    }

    const data = await response.json();

    if (data.customer) {
        const user: User = {
            customerId: data.customer.customerId,
            firstname: data.customer.firstname,
            lastname: data.customer.lastname,
            email: email,
            password: "",
            items: data.customer.items ?? [],
        };
        localStorage.setItem("currentUser", JSON.stringify(user));
        return user;
    }

    return null;
}