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

      <h2>Werk</h2>
      <ul>{renderLijst("Werk")}</ul>

      <h2>Persoonlijk</h2>
      <ul>{renderLijst("Persoonlijk")}</ul>

      <h2>Vrije tijd</h2>
      <ul>{renderLijst("Vrije tijd")}</ul>
    </div>
  );
}

export default TodoList;