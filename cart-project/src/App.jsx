import { useState } from "react";

function App() {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("All");

  // ➕ Add Assignment
  const addAssignment = () => {
    if (!title || !subject || !dueDate) return;

    const newAssignment = {
      id: Date.now(),
      title,
      subject,
      dueDate,
      status: "Pending",
    };

    setAssignments([...assignments, newAssignment]);

    setTitle("");
    setSubject("");
    setDueDate("");
  };

  // 🔁 Change Status
  const changeStatus = (id, status) => {
    setAssignments(
      assignments.map((a) =>
        a.id === id ? { ...a, status } : a
      )
    );
  };

  // ❌ Delete
  const deleteAssignment = (id) => {
    setAssignments(assignments.filter((a) => a.id !== id));
  };

  // 📊 Summary Counts
  const submitted = assignments.filter((a) => a.status === "Submitted").length;
  const pending = assignments.filter((a) => a.status === "Pending").length;
  const late = assignments.filter((a) => a.status === "Late").length;

  // 🔍 Filter Logic
  const filteredData =
    filter === "All"
      ? assignments
      : assignments.filter((a) => a.subject === filter);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>📚 Assignment Tracker</h1>

      {/* 📊 Dashboard */}
      <div style={{ display: "flex", gap: "20px" }}>
        <div>Submitted: {submitted}</div>
        <div>Pending: {pending}</div>
        <div>Late: {late}</div>
      </div>

      <hr />

      {/* ➕ Add Form */}
      <h3>Add Assignment</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button onClick={addAssignment}>Add</button>

      <hr />

      {/* 🔍 Filter */}
      <h3>Filter by Subject</h3>
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All</option>
        {[...new Set(assignments.map((a) => a.subject))].map((s, i) => (
          <option key={i} value={s}>
            {s}
          </option>
        ))}
      </select>

      <hr />

      {/* 📋 List */}
      <h3>Assignments</h3>

      {filteredData.length === 0 ? (
        <p>No assignments found</p>
      ) : (
        filteredData.map((a) => (
          <div
            key={a.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <h4>{a.title}</h4>
            <p>Subject: {a.subject}</p>
            <p>Due: {a.dueDate}</p>
            <p>Status: {a.status}</p>

            {/* Buttons */}
            <button onClick={() => changeStatus(a.id, "Submitted")}>
              Submitted
            </button>

            <button onClick={() => changeStatus(a.id, "Pending")}>
              Pending
            </button>

            <button onClick={() => changeStatus(a.id, "Late")}>
              Late
            </button>

            <button onClick={() => deleteAssignment(a.id)}>
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;