import React, { useState, useEffect } from "react";
import axios from "axios";

import { useApp } from "../context/AppContext";

function Report() {
  const [report, setReport] = useState([]);
  const { state } = useApp();
  const { reportUpdateTrigger } = state;

  useEffect(() => {
    async function fetchReport() {
      try {
        const response = await axios.get("http://localhost:5000/report");
        setReport(response.data);
      } catch (error) {
        console.error("Błąd podczas pobierania raportu:", error);
      }
    }

    fetchReport();
  }, [reportUpdateTrigger]);

  return (
    <>
      <h2>Raport o stanie magazynu:</h2>
      <ul>
        {report.map((item, index) => (
          <li key={index}>
            Nazwa: {item.name}, Ilość: {item.totalQuantity}, Łączna wartość:{" "}
            {item.totalValue}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Report;
