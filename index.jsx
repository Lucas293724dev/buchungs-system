import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import BookingForm from "./components/BookingForm";
import SeatMap from "./components/SeatMap";
import Message from "./components/Message";
import "./styles.css";

export default function App() {
  const [bookings, setBookings] = useState({});
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [car, setCar] = useState(1);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    const fd = new FormData();
    fd.append("action", "get_bookings");

    const res = await fetch("sonderzug.php", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();
    setBookings(data || {});
  }

  async function handleBooking(formData) {
    if (!selectedSeat) {
      setMessage({ type: "error", text: "Sitzplatz wählen!" });
      return;
    }

    const fd = new FormData();
    fd.append("action", "book");

    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
    fd.append("car", selectedSeat.car);
    fd.append("seat", selectedSeat.seat);

    const res = await fetch("sonderzug.php", {
      method: "POST",
      body: fd,
    });

    const result = await res.json();

    setMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });

    if (result.success) {
      setSelectedSeat(null);
      loadBookings();
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>🚂 Sonderzug Buchung</h1>
        <p>Professionelles Ticketsystem • Live-Sitzpläne • PDF Download</p>
      </div>

      <div className="card">
        <BookingForm onSubmit={handleBooking} />

        <SeatMap
          bookings={bookings}
          car={car}
          setCar={setCar}
          selectedSeat={selectedSeat}
          setSelectedSeat={setSelectedSeat}
        />

        <Message message={message} />
      </div>

      <Analytics />
    </div>
  );
}
