function RoomsAndPrices() {
  return (
    <div className="main-content">
      <h1 id="title1">Rooms And Prices</h1>

      <div id="cards">
        <div className="card" style={{ width: "18rem" }}>
          <img
            src="localhost:3000/Photos/single-room.jpg"
            className="card-photo"
            alt="Single room"
          />

          <div className="card-body">
            <h2 className="card-title">Single</h2>

            <p className="card-text">
              Add the original single room description and price.
            </p>

            <button
              id="singleBook"
              className="btn btn-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#bookingModal"
            >
              Book
            </button>
          </div>
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img
            src="/Photos/double-room.jpg"
            className="card-photo"
            alt="Double room"
          />

          <div className="card-body">
            <h2 className="card-title">Double</h2>

            <p className="card-text">
              Add the original double room description and price.
            </p>

            <button
              id="doubleBook"
              className="btn btn-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#bookingModal"
            >
              Book
            </button>
          </div>
        </div>

        <div className="card" style={{ width: "18rem" }}>
          <img
            src="/Photos/deluxe-room.jpg"
            className="card-photo"
            alt="Deluxe room"
          />

          <div className="card-body">
            <h2 className="card-title">Deluxe</h2>

            <p className="card-text">
              Add the original deluxe room description and price.
            </p>

            <button
              id="deluxeBook"
              className="btn btn-primary"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#bookingModal"
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoomsAndPrices;