import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Modal from "./Modal";
import userEvent from "@testing-library/user-event";
import { SelectedRecipe } from "../types";

//lo tipamos para evitar errores de TS en los test
const selectedRecipe: SelectedRecipe = {
  idDrink: "14029",
  strDrink: "57 Chevy with a White License Plate",
  strDrinkThumb:
    "https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg",
  strInstructions:
    "1. Fill a rocks glass with ice 2.add white creme de cacao and vodka 3.stir",
  strIngredient1: "Creme de Cacao",
  strIngredient2: "Vodka",
  strIngredient3: null,
  strIngredient4: null,
  strIngredient5: null,
  strIngredient6: null,
  strMeasure1: "1 oz white ",
  strMeasure2: "1 oz ",
  strMeasure3: null,
  strMeasure4: null,
  strMeasure5: null,
  strMeasure6: null,
};

const mockStore = {
  modal: false,
  selectedRecipe: selectedRecipe,
  closeModal: vi.fn(),
  handleClickFavorite: vi.fn(),
  favoriteExists: vi.fn(),
  setSelectedRecipe: vi.fn(),
};
vi.mock("../stores/useAppStore", () => ({
  useAppStore: () => mockStore,
}));

describe("<Modal /> ", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockStore.selectedRecipe = selectedRecipe;
    mockStore.modal = false;
  });

  it("No debe mostrar el <Modal /> si modal es false", () => {
    // Aqui con getByTestId('modal') falla el test xq si modal === false no lo encuentra en el DOM y lanza error. En cambio queryByTestId devuelve null pero no da error.
    render(<Modal />);
    const modal = screen.queryByTestId("modal");
    expect(modal).not.toBeInTheDocument();
  });
  it("No debe mostrar el <Modal /> si modal es false", () => {
    mockStore.modal = true;
    render(<Modal />); // renderizo despues de cambiar el valor de modal para que renderice en base a eso
    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();
  });
  it("Debe mostrar el button de Cerrar", () => {
    mockStore.modal = true;
    render(<Modal />);
    const closeButton = screen.getByRole("button", { name: "Cerrar" });
    userEvent.click(closeButton);
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveClass(
      "w-full bg-gray-600 p-3 rounded font-bold text-white uppercase shadow hover:bg-gray-500"
    );
  });
  it("Debe ejecutarse la función onClose y cerrar el Modal al clickar en el button", async () => {
    mockStore.modal = true;
    render(<Modal />);

    const closeButton = screen.getByRole("button", { name: "Cerrar" });

    await userEvent.click(closeButton); //  usar await si se usa userEvent, esto simula la acción del usuario

    expect(mockStore.closeModal).toHaveBeenCalled(); //Verifica que la acción disparó el efecto esperado (llamada de función)
  });
  it("Debe ejecutarse la función favoriteExists ", async () => {
    mockStore.modal = true;
    render(<Modal />);
    const favoritos = screen.getByTestId("button favoritos");
    await userEvent.click(favoritos);
    expect(mockStore.handleClickFavorite).toHaveBeenCalled();
    expect(mockStore.handleClickFavorite).toHaveBeenCalledWith(selectedRecipe);
  });
  it('Debe mostrar "Agregar a Favoritos" si la receta no está en favoritos', () => {
    mockStore.modal = true;
    // Se usa mockReturnValue(true | false) para definir el comportamiento del mock y asi decidir si está en favoritos (true) o no (false)
    //Simula la ejecución de la función y devuelve el resultado
    mockStore.favoriteExists = vi.fn().mockReturnValue(false); // ¡No está en favoritos!

    render(<Modal />);

    const button = screen.getByTestId("button favoritos");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Agregar a Favoritos");
  });
  it('Debe mostrar "Eliminar Favorito" si la receta ya está en favoritos', () => {
    mockStore.modal = true;
    mockStore.favoriteExists = vi.fn().mockReturnValue(true); // ¡Ya está en favoritos!

    render(<Modal />);

    const button = screen.getByTestId("button favoritos");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Eliminar Favorito");
  });
  it("Debe mostrar los titulos del modal", () => {
    mockStore.modal = true;
    render(<Modal />);
    const ingredientsHeading = screen.getByRole("heading", {
      name: /ingredientes y cantidades/i,
    });
    expect(ingredientsHeading).toBeInTheDocument();
    //screen.debug(); --> para imprimir en el DOM el momento actual
    const instructionsHeading = screen.getByRole("heading", {
      name: /instrucciones/i,
    });
    expect(instructionsHeading).toBeInTheDocument();
    //getByRole('heading'): Esto busca todos los elementos <h1>, <h2>, <h3>, etc.
    // { name: /ingredientes y cantidades/i }: Usamos una expresión regular (con i para ignorar mayúsculas/minúsculas) para asegurarnos de que el texto sea "Ingredientes y Cantidades". Esto ayuda a encontrar el encabezado con ese texto exacto, sin importar el nivel (h1, h2, h3, etc.).

  });
  it("Debe mostrar el título de la bebida (strDrink)", () => {
    mockStore.modal = true;
    render(<Modal />);
    const name = screen.getByTestId('strDrink')
    expect(name).toHaveTextContent('57 Chevy with a White License Plate')
  });
  it("Debe mostrar las instrucciones de la bebida", () => {
    mockStore.modal = true;
    render(<Modal />);
    const instructions = screen.getByTestId('instructions')
    expect(instructions).toHaveTextContent("1. Fill a rocks glass with ice 2.add white creme de cacao and vodka 3.stir")
  });
  it("Debe mostrar las toda la información de la imágen", () => {
    mockStore.modal = true;
    render(<Modal />);
    const image = screen.getByRole('img')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', selectedRecipe.strDrinkThumb)
    expect(image).toHaveAttribute('alt', `Imagen de ${selectedRecipe.strDrink}`)
  });
  it("Debe mostrar los ingredientes y medidas correctamente", () => {
    mockStore.modal = true;
    render(<Modal />);
  
    const items = screen.getAllByRole('listitem'); // En Testing Library, los elementos <li> tienen el role accesible "listitem"
    expect(items).toHaveLength(2); // Solo hay 2 ingredientes válidos
    expect(items[0]).toHaveTextContent('Creme de Cacao - 1 oz white');
    expect(items[1]).toHaveTextContent('Vodka - 1 oz');
  });
  it("No debe renderizar ingredientes si no existen", () => {
    mockStore.modal = true;
    mockStore.selectedRecipe = {
      ...selectedRecipe,
      strIngredient1: null,
      strIngredient2: null,
      strMeasure1: null,
      strMeasure2: null
    };
    render(<Modal />);
    const items = screen.queryAllByRole('listitem');
    expect(items).toHaveLength(0);
  });
  it("Debe tener el rol dialog cuando está abierto", () => {
    mockStore.modal = true;
    render(<Modal />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });
  it("Debe tener las clases de estilo principales en el DialogPanel", () => {
    mockStore.modal = true;
    render(<Modal />);
    const panel = screen.getByTestId('dialog-panel');
    expect(panel).toHaveClass('transform', 'overflow-hidden', 'rounded-2xl', 'bg-white');
  });
  
});
