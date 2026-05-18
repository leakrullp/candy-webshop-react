export async function loginUser(email: string, password: string): Promise<{id: string, fname: string, lname: string} | null> {
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
        localStorage.setItem("customerId", data.customer.id);
        localStorage.setItem("fname", data.customer.fname);
        localStorage.setItem("lname", data.customer.lname);
        localStorage.setItem("email", email);
        return data.customer;
    }
    
    return null;
}
export async function registerUser(fname: string, lname: string, email: string, password: string): Promise<{id: string, fname: string, lname: string, email: string} | null> {

    const response = await fetch('/api/customers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({fname,lname,email, password})
    });

    if (!response.ok) {
        throw new Error("register failed. Please try again.");
    }

    const data = await response.json();

    if (data.customer) {
        localStorage.setItem("customerId", data.customer.id);
        localStorage.setItem("fname", data.customer.fname);
        localStorage.setItem("lname", data.customer.lname);
        localStorage.setItem("email", email);
        return data.customer;
    }
    
    return null;
}

