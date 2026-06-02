//Dit is de pagina voor een to-do list voor VR CAfe haarlem.
import { useState, useEffect } from "react";

const categorieen = ["Werk", "Persoonlijk", "Vrije tijd"];

function TodoList() {
  const [taak, setTaak] = useState("");
  const [categorie, setCategorie] = useState("Werk");
  const [taken, setTaken] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  //local storage om te "saven".
  useEffect(() => {
    const opgeslagen = localStorage.getItem("taken");
    if (opgeslagen) {
      setTaken(JSON.parse(opgeslagen));
    }
  }, []);

  //local storage om te "saven".

  useEffect(() => {
    localStorage.setItem("taken", JSON.stringify(taken));
  }, [taken]);

  // Functie om een nieuwe taak toe te voegen in de lijst
  function voegTaakToe() {
    if (taak === "") return;

    const nieuweTaak = {
      id: Date.now(),
      naam: taak,
      categorie: categorie,
      voltooid: false
    };

    setTaken([...taken, nieuweTaak]);
    setTaak("");
  }

  // Functie om een taak te markeren als voltooid of niet voltooid en verwijderen.
  function toggleVoltooid(id) {
    setTaken(
      taken.map((t) =>
        t.id === id ? { ...t, voltooid: !t.voltooid } : t
      )
    );
  }

  function verwijderTaak(id) {
    setTaken(taken.filter((t) => t.id !== id));
  }

  // hieronder volgt een dropdown voor de categorieën en
  // lijsten van taken per categorie.
  function renderLijst(categorieNaam) {
    return taken
      .filter((t) => t.categorie === categorieNaam)
      .map((t) => (
        <li key={t.id}>
          <span
            style={{
              textDecoration: t.voltooid ? "line-through" : "none"
            }}
          >
            {t.naam}
          </span>

          <button onClick={() => toggleVoltooid(t.id)}>
            {t.voltooid ? "Ongedaan" : "Voltooid"}
          </button>

          <button onClick={() => verwijderTaak(t.id)}>
            Verwijderen
          </button>
        </li>
      ));
  }

  return (
    <div>

      <h1>To-Do List</h1>

      <input
        type="text"
        value={taak}
        onChange={(e) => setTaak(e.target.value)}
        placeholder="Nieuwe taak"
      />

      <select
        value={categorie}
        onChange={(e) => setCategorie(e.target.value)}
      >
        {categorieen.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <button onClick={voegTaakToe}>Toevoegen</button>

      {/* werk*/}
      <div className="cat-section">
        <div className="cat-header">
          <div className="cat-dot" style={{ background: "#a62fcd" }}></div>
          <h2>Werk</h2>
          <span className="cat-count">
            {taken.filter((t) => t.categorie === "Werk" && !t.voltooid).length} open
          </span>
        </div>
        <ul>{renderLijst("Werk")}</ul>
      </div>

      {/* Persoonlijk  */}
      <div className="cat-section">
        <div className="cat-header">
          <div className="cat-dot" style={{ background: "#36f2aa" }}></div>
          <h2>Persoonlijk</h2>
          <span className="cat-count">
            {taken.filter((t) => t.categorie === "Persoonlijk" && !t.voltooid).length} open
          </span>
        </div>
        <ul>{renderLijst("Persoonlijk")}</ul>
      </div>

      {/* Vrije tijd */}
      <div className="cat-section">
        <div className="cat-header">
          <div className="cat-dot" style={{ background: "#fd3e81" }}></div>
          <h2>Vrije tijd</h2>
          <span className="cat-count">
            {taken.filter((t) => t.categorie === "Vrije tijd" && !t.voltooid).length} open
          </span>
        </div>
        <ul>{renderLijst("Vrije tijd")}</ul>
      </div>

    </div>
  );
}

export default TodoList;