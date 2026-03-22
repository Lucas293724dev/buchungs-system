import { useState } from "react";

export default function BookingForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    station: "",
    destination: "",
    date: new Date().toISOString().split("T")[0],
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(form);
      }}
    >
      <div className="form-grid">
        <input id="name" placeholder="Name" onChange={handleChange} required />
        <input id="email" placeholder="E-Mail" onChange={handleChange} />
        <input id="station" placeholder="Start" onChange={handleChange} required />
        <input id="destination" placeholder="Ziel" onChange={handleChange} required />
        <input id="date" type="date" value={form.date} onChange={handleChange} />
      </div>

      <button className="btn">🎫 Ticket buchen</button>
    </form>
  );
}
