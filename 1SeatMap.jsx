export default function SeatMap({
  bookings,
  car,
  setCar,
  selectedSeat,
  setSelectedSeat,
}) {
  function createSeat(seatId) {
    const key = `${car}-${seatId}`;
    const occupied = bookings[key];

    return (
      <div
        key={seatId}
        className={`seat ${
          occupied
            ? "occupied"
            : selectedSeat?.seat === seatId
            ? "selected"
            : "free"
        }`}
        onClick={() => {
          if (occupied) return;
          setSelectedSeat({ car, seat: seatId });
        }}
      >
        {seatId}
      </div>
    );
  }

  return (
    <div className="seats-section">
      <div className="seats-header">
        <h3>Interaktiver Sitzplan</h3>

        <select value={car} onChange={(e) => setCar(e.target.value)}>
          <option value="1">Wagen 1</option>
          <option value="2">Wagen 2</option>
          <option value="3">Wagen 3</option>
        </select>
      </div>

      <div className="train-car">
        {[1, 2, 3, 4, 5].map((row) => (
          <div className="seat-row" key={row}>
            <div className="seats-left">
              {createSeat(`R${row}S1`)}
              {createSeat(`R${row}S2`)}
            </div>

            <div className="aisle">GANG</div>

            <div className="seats-right">
              {createSeat(`R${row}S3`)}
              {createSeat(`R${row}S4`)}
            </div>
          </div>
        ))}
      </div>

      {selectedSeat && (
        <div className="selected-display">
          ✅ {selectedSeat.seat} (Wagen {selectedSeat.car})
        </div>
      )}
    </div>
  );
}
