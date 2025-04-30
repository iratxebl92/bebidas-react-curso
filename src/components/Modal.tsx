import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { SelectedRecipe } from '../types';

export default function Modal() {
  const { modal, closeModal, selectedRecipe, handleClickFavorite, favoriteExists, setSelectedRecipe } = useAppStore();

  console.log(selectedRecipe)

  const renderIngredients = () => {
    const ingredients: React.ReactNode[]  = [];
    for (let i = 1; i <= 6; i++) {
      const ingredient = selectedRecipe[`strIngredient${i}` as keyof SelectedRecipe];
      const measure = selectedRecipe[`strMeasure${i}` as keyof SelectedRecipe];
      if (ingredient && measure) {
        ingredients.push(
          <li key={i} className="text-lg font-normal">
            {ingredient} - {measure}
          </li>
        );
      }
    }
    return ingredients;
  };

  return (
  
    <Transition
      appear
      show={modal}
      as={Fragment}
      afterLeave={setSelectedRecipe} // <<< limpiar receta después de que se cierra
    >
      <Dialog as="div"  className="relative z-10" onClose={closeModal}>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 backdrop-blur-sm bg-black/50" />
            </TransitionChild>

            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel  className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {selectedRecipe.strDrink && (
                  <div data-testid="modal">
                    <DialogTitle as="h3" data-testid='strDrink'  className="text-gray-900 text-4xl font-extrabold my-5 text-center">
                      {selectedRecipe.strDrink}
                    </DialogTitle>
                    <img
                    role='img'
                      src={selectedRecipe.strDrinkThumb}
                      alt={`Imagen de ${selectedRecipe.strDrink}`}
                      className="mx-auto w-96"
                    />

                    <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                      Ingredientes y Cantidades
                    </DialogTitle>
                    <ul>{renderIngredients()}</ul>

                    <DialogTitle as="h3" className="text-gray-900 text-2xl font-extrabold my-5">
                      Instrucciones
                    </DialogTitle>
                    <p data-testid="instructions" className="text-lg">{selectedRecipe.strInstructions}</p>

                    <div className="mt-5 flex justify-between gap-4">
                      <button
                        onClick={closeModal}
                        type="button"
                        className="w-full bg-gray-600 p-3 rounded font-bold text-white uppercase shadow hover:bg-gray-500"
                      >
                        Cerrar
                      </button>
                      <button
                        onClick={() => handleClickFavorite(selectedRecipe)}
                        type="button"
                        data-testid='button favoritos'
                        className="w-full bg-orange-600 p-3 rounded font-bold text-white uppercase shadow hover:bg-orange-500"
                      >
                        {favoriteExists(selectedRecipe.idDrink) ? 'Eliminar Favorito' : 'Agregar a Favoritos'}
                      </button>
                    </div>
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>


  );
}
