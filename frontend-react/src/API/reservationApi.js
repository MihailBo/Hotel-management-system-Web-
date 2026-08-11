export async function createReservation(reservation) {
  const response = await fetch("http://localhost:8080/reservation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reservation)
  });

  if (!response.ok) {
    throw new Error("Reservation request failed.");
  }

  return response.json();
}