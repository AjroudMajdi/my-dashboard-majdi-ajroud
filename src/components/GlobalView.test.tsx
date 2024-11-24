import React from "react";
import { render, screen } from "@testing-library/react";
import GlobalView from "./GlobalView";

describe("composant GlobalView", () => {
  it("renders sans crash et affichage des elemnts", () => {
    // Rendu du composant
    render(<GlobalView />);

    // Vérifie que le titre principal est affiché
    expect(screen.getByText(/Vue Globale/i)).toBeInTheDocument();

    // Vérifie que le menu déroulant pour le filtre est présent
    expect(screen.getByLabelText(/filtrer par année/i)).toBeInTheDocument();

    // Vérifie que la table est présente
    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
