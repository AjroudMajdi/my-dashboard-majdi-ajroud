import React, { useState, useEffect } from "react";
import { Data } from "../types";
import data from "../data/data.json";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { saveAs } from "file-saver";
import Papa from "papaparse";

const Dashboard: React.FC = () => {
  /*set data dans une state */
  const [dashboardData, setDashboardData] = useState<Data | null>(null);

  useEffect(() => {
    setDashboardData(data);
  }, []);

/*Chargement s il n ya pas de data */
  if (!dashboardData) return <div>Chargement...</div>;

  const { sales, users } = dashboardData;

  const totalSales = sales.reduce((sum, sale) => sum + sale.revenue, 0);
  const activeUsers = users.active;
  const conversionRate = ((users.active / users.total) * 100).toFixed(2);

/*sales par mois */
  const salesByMonth = sales.map((sale) => ({
    month: sale.month,
    revenue: sale.revenue,
  }));

/* sales par produit */
  const salesByProduct = sales.reduce((acc, sale) => {
    const existing = acc.find((item) => item.name === sale.product);
    if (existing) {
      existing.value += sale.revenue;
    } else {
      acc.push({ name: sale.product, value: sale.revenue });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Fonction pour télécharger les données en CSV
  const downloadCSV = () => {
    const csvData = Papa.unparse(sales, {
      header: true, 
    });
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "sales_data.csv");
  };

  return (
    <div>
      <h1>Tableau de Bord</h1>

      {/* Bouton pour télécharger les données CSV */}
      <div style={{ textAlign: "right", marginBottom: "20px" }}>
        <button onClick={downloadCSV} className="download-button">
          Télécharger les donnees CSV
        </button>
      </div>

      <div className="dashboard-container">
        <div className="widget">
          <h3>Nombre Total de Ventes</h3>
          <p>{totalSales} €</p>
        </div>
        <div className="widget">
          <h3>Utilisateurs Actifs</h3>
          <p>{activeUsers}</p>
        </div>
        <div className="widget">
          <h3>Taux de Conversion</h3>
          <p>{conversionRate}%</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart">
          <h2>Evolution des ventes par mois</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesByMonth}>
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="chart">
          <h2>Repartition des ventes par produit</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={salesByProduct}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {salesByProduct.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
