fetch("http://localhost:8080/room")
.then(res => res.json())
.then(
    rooms => {
        const container = document.getElementById("rooms");

        rooms.forEach(room => {
            const button =
                room.status === "AVAILABLE"
                ? `<button onclick="bookRoom(${room.id})">Book</button>`
                : `<button disabled>Not Available</button>`

            container.innerHTML += `
            <div class=card>
            <h3> Room ${room.roomNum}</h3>
            <p>Price ${room.pricePerNight}</p>
            <p>Status: ${room.status}</p>
            ${button}
            </div>`;
        });
    });

function bookRoom(id) {
    fetch(`http://localhost:8080/room/${id}/book`,{
        method: "POST",
    })
        .then(res => {
            if(res.ok){
                throw new Error("Room is not available");
            }
            return res.json();
        })
        .then(data => {
            alert("Room booked successfully!");
            location.reload();
        })
        .catch(error =>{
            alert(error.message);
        })
}