import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";

// Mock de las funciones del store
const fetchCategories = vi.fn();
const showNotification = vi.fn();
const searchRecipes = vi.fn();

// Mockeamos el custom hook que usa el store global
vi.mock("../stores/useAppStore", () => ({
  useAppStore: () => ({
    fetchCategories,
    categories: { drinks: [{ strCategory: "Cocktail" }] },
    searchRecipes,
    showNotification,
  }),
}));

describe("<Header/>", () => {
    beforeEach(() => {
        //Limpiamos el mock antes de cada test para evitar errores como en  expect(fetchCategories).toHaveBeenCalledTimes(1); (si no se resetea falla porque recibe 5 llamadas)
        vi.clearAllMocks();
      });
      

  it("debería renderizar el logo y los enlaces de navegación", () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
          <Header />
        </MemoryRouter>
      );
    expect(screen.getByAltText("logotipo")).toBeInTheDocument();
    expect(screen.getByText("Inicio")).toBeInTheDocument();
    expect(screen.getByText("Favoritos")).toBeInTheDocument();
    expect(screen.getByText("Generar con IA")).toBeInTheDocument();
  });

  it("muestra el formulario de búsqueda solo en la ruta '/'", () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
          <Header />
        </MemoryRouter>
      );
    expect(screen.getByLabelText(/nombre o ingredientes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /buscar recetas/i })).toBeInTheDocument();
  });

  it("muestra una notificación si el formulario está vacío al hacer submit", async () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
          <Header />
        </MemoryRouter>
      );
    const user = userEvent.setup();
    const submitBtn = screen.getByRole("button", { name: /buscar recetas/i });

    await user.click(submitBtn);

    expect(showNotification).toHaveBeenCalledTimes(1);
    expect(showNotification).toHaveBeenCalledWith({
      text: "Todos los campos son obligatorios",
      error: true,
    });
  });

  it("envía el formulario con datos válidos y llama a searchRecipes", async () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
          <Header />
        </MemoryRouter>
      );
    const user = userEvent.setup();

    // Seleccionamos elementos del formulario
    const input = screen.getByLabelText(/nombre o ingredientes/i);
    const select = screen.getByLabelText(/categoria/i);
    const submitBtn = screen.getByRole("button", { name: /buscar recetas/i });

    // Simulamos que el usuario escribe y selecciona
    await user.type(input, "vodka");
    await user.selectOptions(select, "Cocktail");

    await user.click(submitBtn);

    // Verificamos que se llama a la función con los datos correctos
    expect(searchRecipes).toHaveBeenCalledTimes(1);
    expect(searchRecipes).toHaveBeenCalledWith({
      ingredient: "vodka",
      category: "Cocktail",
    });
  });
  it("llama a fetchCategories al montar el componente", () => {
    render(
        <MemoryRouter initialEntries={["/"]}>
          <Header />
        </MemoryRouter>
      );
    expect(fetchCategories).toHaveBeenCalledTimes(1);
  });
  
  it("no muestra el formulario si no está en la ruta '/'", () => {
    // Si renderizamos el componente en BeforeEach este falla 
    render(
      <MemoryRouter initialEntries={["/favoritos"]}>
        <Header />
      </MemoryRouter>
    );
  
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });
});
