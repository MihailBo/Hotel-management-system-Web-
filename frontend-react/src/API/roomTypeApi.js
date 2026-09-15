const API_URL = "http://localhost:8080";

export async function getRoomTypes() {
  const response = await fetch(`${API_URL}/roomType`);

  if (!response.ok) {
    throw new Error("Failed to fetch room types.");
  }

  return response.json();
}

export async function checkRoomAvailability(
  roomTypeId,
  checkIn,
  checkOut
) {
  const params = new URLSearchParams({
    roomTypeId: roomTypeId,
    checkIn: checkIn,
    checkOut: checkOut
  });

  const response = await fetch(
    `${API_URL}/room/availability?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to check room availability.");
  }

  return response.json();
}