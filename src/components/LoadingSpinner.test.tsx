import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../components/LoadingSpinner'; // Ajusta la ruta si es necesario



describe('<LoadingSpinner /> ', () => {
  it('Debería renderizar el contenedor principal y verificar sus clases con toHaveClass', () => {
    render(<LoadingSpinner />);
    const mainContainer = screen.getByTestId('main-spinner-container');
    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer).toHaveClass('flex');
    expect(mainContainer).toHaveClass('items-center');
    expect(mainContainer).toHaveClass('justify-center');
    expect(mainContainer).toHaveClass('min-h-screen');
    expect(mainContainer).toHaveClass('w-full');
    expect(mainContainer).toHaveClass('bg-transparent');
  });

  it('Debería renderizar el contenedor del spinner por testId y verificar sus dimensiones y rol', () => {
    render(<LoadingSpinner />);
    const spinnerContainer = screen.getByTestId('spinner-container');
    expect(spinnerContainer).toBeInTheDocument();
    expect(spinnerContainer).toHaveClass('relative');
    expect(spinnerContainer).toHaveClass('h-20');
    expect(spinnerContainer).toHaveClass('w-20');
    expect(spinnerContainer).toHaveAttribute('role', 'progressbar');
  });

  it('Debería renderizar los elementos con el rol "progressbar"', () => {
    render(<LoadingSpinner />);
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars).toHaveLength(3);
    expect(progressBars[0]).toHaveAttribute('data-testid', 'spinner-container');
    expect(progressBars[1]).toHaveAttribute('data-testid', 'inner-circle-1');
    expect(progressBars[2]).toHaveAttribute('data-testid', 'inner-circle-2');
  });
  it('Debería renderizar el círculo de fondo por testId y verificar su clase de fondo', () => {
    render(<LoadingSpinner />);
    const backgroundCircle = screen.getByTestId('inner-circle-3');
    expect(backgroundCircle).toBeInTheDocument();
    expect(backgroundCircle).toHaveClass('bg-blue-100');
  });

  it('Debería verificar el atributo role en el contenedor del spinner y los círculos animados', () => {
    render(<LoadingSpinner />);
    const spinnerContainer = screen.getByTestId('spinner-container');
    expect(spinnerContainer).toHaveAttribute('role', 'progressbar');

    const circle1 = screen.getByTestId('inner-circle-1');
    expect(circle1).toHaveAttribute('role', 'progressbar');

    const circle2 = screen.getByTestId('inner-circle-2');
    expect(circle2).toHaveAttribute('role', 'progressbar');
  });
});