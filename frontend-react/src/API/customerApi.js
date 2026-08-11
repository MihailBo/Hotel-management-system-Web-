export async function createCustomer(customer) {
  const response = await fetch("http://localhost:8080/customer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(customer)
  });

  if (!response.ok) {
    throw new Error("Customer request failed.");
  }

  return response.json();
}