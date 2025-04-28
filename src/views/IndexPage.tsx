import { lazy, Suspense, useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import { LoadingSpinner } from "../components/LoadingSpinner"


const DrinkCardLazy = lazy(() => import("../components/DrinkCard"))
export default function IndexPage ()  {
  const {drinks} = useAppStore()

  const hasDrinks = useMemo(() => drinks.drinks.length, [drinks]) // Comprueba si hay bebidas y lo revisa cada vez que drinks cambia, devolviendo true o false
  
  return (
   <>
    <h1 className="text-6xl font-extrabold">Recetas</h1>
    {hasDrinks ? (
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10">
        {drinks.drinks.map((drink) => (
          <Suspense fallback={<LoadingSpinner/>}>
            <DrinkCardLazy 
            key={drink.idDrink} 
            drink={drink}
            />
          </Suspense>
        ))}
      </div>
    )
    : (
      <p className="my-10 text-center text-2xl">No hay resultados aún, utiliza el formulario para buscar recetas</p>
    )
  }
   </>

  )
}
