import { useAppStore } from "../stores/useAppStore";
import { Drink } from "../types";

type DrinkCardProps = {
  drink: Drink;
};

export default function DrinkCard  ({ drink }: DrinkCardProps)  {
    const {selectRecipe} = useAppStore()

  return (
    <div className="border shadow-lg">
      <div className="overflow-hidden">
        <img 
            src={drink.strDrinkThumb} 
            alt={`Imagen de ${drink.strDrink}`} 
            className="hover:scale-125 transition-transform hover:rotate-2" />
      </div>
      <div className="p-5 ">
        <h2 className="text-2xl truncate font-black"> {drink.strDrink}</h2>
        <button onClick={() => selectRecipe(drink.idDrink)} className="bg-orange-400 hover:bg-orange-500 mt-5 w-full p-3 font-bold text-white text-lg" type="button">
            Ver receta
        </button>
      </div>
    </div>
  );
};

/*
 overflow-hidden aqui lo usamos ya que Impide que cualquier contenido que se salga del contenedor visible sea mostrado. O sea, si algo dentro del div crece o se mueve fuera de sus límites, simplemente no se va a ver.
 Entonces, el overflow-hidden:

recorta cualquier parte de la imagen que se salga del div.

Hace que el efecto de agrandamiento no desordene el layout ni se sobreponga a otros elementos.

Visualmente da ese efecto de “zoom dentro de una ventana” bien controlado.
Resultado visual:
    Sin overflow-hidden:
    La imagen al hacer hover se agrandaría y saldría fuera del contenedor, posiblemente montándose sobre texto u otros componentes.

Con overflow-hidden:
    El zoom y rotación de la imagen se ven dentro de los límites del div, como si estuvieras mirando a través de una ventanita.
 */