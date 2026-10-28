const API_URL = "http://localhost:8080";

export async function logout() {
  const response = await fetch(`${API_URL}/auth/logout`,{
    method: "POST",
    credentials: "include"
  }
  );
}

export async function loginCustomer(credentials) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      userName: credentials.userName,
      password: credentials.password
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Login failed");
  }

  // Ако backend-ът връща JSON:
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return await response.json();
  }

  return null;
}

export async function createCustomer(customer) {

  //TODO: check if errors are handled properly
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      userName: customer.userName,
      password: customer.password,
      email: customer.email
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Registration failed");
  }

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return await response.json();
  }

  return null;
}