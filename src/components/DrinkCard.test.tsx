import {beforeEach, describe, expect, it, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import DrinkCard from './DrinkCard'
import userEvent from '@testing-library/user-event';

// Mock del store para poder controlar su comportamiento en los tests
const mockSelectRecipe = vi.fn();
vi.mock('../stores/useAppStore', () => ({
  useAppStore: () => ({
    selectRecipe: mockSelectRecipe,
  }),
}));

const drink = {
  idDrink: "1",
  strDrink: "155 Belmont",
  strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/yqvvqs1475667388.jpg"
}

describe('<DrinkCard />', () => {
  beforeEach(() => {
    // Resetear el mock antes de cada test para asegurar que no hay llamadas residuales
    mockSelectRecipe.mockClear();
    render(<DrinkCard drink={drink}/>);
  })

  it('Debería renderizar la imagen con la src y alt correctos', () => {
    const image = screen.getByAltText(`Imagen de ${drink.strDrink}`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', drink.strDrinkThumb);
  });

  it('Debería renderizar el título con el nombre de la bebida', () => {
    const title = screen.getByText(drink.strDrink);
    expect(title).toBeInTheDocument();
  });

  it('Debería renderizar el botón "Ver receta"', () => {
    const button = screen.getByText('Ver receta');
    expect(button).toBeInTheDocument();
  });

  it('Debería llamar a selectRecipe con el idDrink correcto al hacer clic en el botón', async () => {
    const button = screen.getByText('Ver receta');
    await userEvent.click(button);
    expect(mockSelectRecipe).toHaveBeenCalledTimes(1);
    expect(mockSelectRecipe).toHaveBeenCalledWith(drink.idDrink);
  });
})