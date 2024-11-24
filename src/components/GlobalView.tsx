import React, { useEffect, useState } from "react";
import { Data, Sale } from "../types";
import data from "../data/data.json";

const GlobalView: React.FC = () => {

  /*Les states de cette page  */
  const [tableData, setTableData] = useState<Data["sales"]>([]);
  const [filteredData, setFilteredData] = useState<Data["sales"]>([]);
  const [sortColumn, setSortColumn] = useState<keyof Sale>("revenue");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedYear, setSelectedYear] = useState<string>("All");

  useEffect(() => {
    // Charger les données initiales
    setTableData(data.sales);
    setFilteredData(data.sales);
  }, []);

  // Fonction pour trier les données
  const sortData = (column: keyof Sale) => {
    const order = column === sortColumn && sortOrder === "desc" ? "asc" : "desc";
    setSortColumn(column);
    setSortOrder(order);

    const sorted = [...filteredData].sort((a, b) => {
      if (a[column] < b[column]) return order === "asc" ? -1 : 1;
      if (a[column] > b[column]) return order === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredData(sorted);
  };

  // Fonction pour filtrer les données par année
  const filterByYear = (year: string) => {
    setSelectedYear(year);

    if (year === "All") {
      setFilteredData(tableData); // Réinitialiser le filtre
    } else {
      const filtered = tableData.filter((sale) =>
        sale.month.startsWith(year)
      );
      setFilteredData(filtered);
    }
  };

  // Extraire la liste des années disponibles
  const uniqueYears = Array.from(
    new Set(tableData.map((sale) => sale.month.split("-")[0]))
  ).sort();

  return (
    <div>
      <h1>Vue Globale</h1>
  
      {/* Menu déroulant pour filtrer par année */}
      <label htmlFor="year-filter">Filtrer par année : </label>
      <select
        id="year-filter"
        value={selectedYear}
        onChange={(e) => filterByYear(e.target.value)}
      >
        <option value="All">Toutes les années</option>
        {uniqueYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
  
      {/* Conteneur pour le tableau */}
      <div className="responsive-table">
        <table>
          <thead>
            <tr>
              <th onClick={() => sortData("product")}>Produit</th>
              <th onClick={() => sortData("quantity")}>Quantite Vendue</th>
              <th onClick={() => sortData("revenue")}>Chiffre d Affaires (€)</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((sale, index) => (
              <tr key={index}>
                <td>{sale.product}</td>
                <td>{sale.quantity}</td>
                <td>{sale.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
};

export default GlobalView;
