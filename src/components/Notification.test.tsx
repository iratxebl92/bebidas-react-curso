import { render, screen, fireEvent } from '@testing-library/react';
import { useAppStore } from '../stores/useAppStore';
import Notification from '../components/Notification';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// mockStore es un objeto que simula el resultado de useAppStore. Así evitamos tener que usar Zustand realmente, y controlamos directamente el estado.

const mockStore = {
  notification: {
    show: false,
    text: '',
    error: false,
  },
  hideNotification: vi.fn(),
};


 //interceptamos cualquier uso de useAppStore y devolvemos mockStore. Así, el componente va a usar este mock en lugar del store real.
vi.mock('../stores/useAppStore', () => ({
  useAppStore: () => mockStore,
}));

describe('Notification Component', () => {
  beforeEach(() => {
    //Se resetea el estado de la notificación.
    //Se limpia el contador del mock de hideNotification para evitar que se acumulen llamadas entre tests.
    mockStore.notification = { show: false, text: '', error: false };
    mockStore.hideNotification.mockClear();
  });

  it('should render when notification.show is true', () => {
    // testea que se abra el modal de notificación
    mockStore.notification.show = true;
    render(<Notification />);
    const notificationElement = screen.getByTestId('notification');
    expect(notificationElement).toBeInTheDocument();
  });

  it('should not render when notification.show is false', () => {
        // testea que no se abra el modal de notificación

    render(<Notification />);
    const notificationElement = screen.queryByTestId('notification');
    expect(notificationElement).not.toBeInTheDocument()
  });


  it('should display the correct success message and icon', () => {

    //Testea que se muestre notificación de exito
    mockStore.notification.show = true;
    mockStore.notification.text = 'Operación completada con éxito.';
    mockStore.notification.error = false;
    render(<Notification />);
    expect(screen.getByText('Notificación')).toBeInTheDocument();
    expect(screen.getByText('Operación completada con éxito.')).toBeInTheDocument();
    expect(screen.getByLabelText('ícono de éxito'))    
});

  it('should display the correct error message and icon', () => {
     //Testea que se muestre notificación de error
    mockStore.notification.show = true;
    mockStore.notification.text = 'Ha ocurrido un error.';
    mockStore.notification.error = true;
    render(<Notification />);
    expect(screen.getByText('Notificación')).toBeInTheDocument();
    expect(screen.getByText('Ha ocurrido un error.')).toBeInTheDocument();
    expect(screen.getByLabelText('ícono de error'))  
  });


  it('should call hideNotification when the close button is clicked', () => {
    // testea que se llame a la función hideNotification correctamente
    mockStore.notification.show = true;
    render(<Notification />);
    const closeButton = screen.getByRole('button', { name: 'Cerrar' });
    fireEvent.click(closeButton);
    expect(mockStore.hideNotification).toHaveBeenCalledTimes(1);
  });

  it('should have the correct data-testid', () => {
    // comprobamos que tenga un data-testid correcto
    mockStore.notification.show = true;
    render(<Notification />);
    expect(screen.getByTestId('notification')).toBeInTheDocument();
  });

  it('should have the correct aria-live attribute', () => {
    //Verifica que el contenedor tenga aria-live="assertive" para accesibilidad (anunciar notificaciones automáticamente a lectores de pantalla).
    mockStore.notification.show = true;
    render(<Notification />);
    expect(screen.getByTestId('notification')).toHaveAttribute('aria-live', 'assertive');
  });

  it('should have the close button with the correct aria-label', () => {
    //Verifica que el button de cerrar contenga el texto "Cerrar" aunque solo sea visible con lectores de pantalla
    mockStore.notification.show = true;
    render(<Notification />);
    const closeButton = screen.getByRole('button', { name: 'Cerrar' });
    expect(closeButton).toHaveTextContent('Cerrar');
    expect(screen.getByText('Cerrar')).toBeInTheDocument();
  });
  it('should render the XMarkIcon with correct class and aria-hidden attribute', () => {
    //testea el icono SVG deñl button de Cerrar
    mockStore.notification.show = true;
    render(<Notification />);
    
    const xMarkIcon = screen.getByRole('button', { name: 'Cerrar' }).querySelector('svg');
    
    expect(xMarkIcon).toBeInTheDocument();
    expect(xMarkIcon).toHaveClass('h-5 w-5');
    expect(xMarkIcon).toHaveAttribute('aria-hidden', 'true');
  });
});