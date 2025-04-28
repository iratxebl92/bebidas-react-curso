import { useMemo, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppStore } from "../stores/useAppStore";


export const Header = () => {
  const [searchFilter, setSearchFilter] = useState({
    ingredient: "",
    category: "",
  });
    const {pathname} = useLocation();
    const isHome = useMemo(() => pathname === "/", [pathname]);
    const {fetchCategories, categories: {drinks}, searchRecipes, showNotification} = useAppStore()
  



    useEffect(() => {
      fetchCategories()
    }, [])
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 
        const {name, value} = e.target
        setSearchFilter({
            ...searchFilter,
            [name]: value
        })
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // Comportamiento por defecto: enviar los datos al servidor y recargar o cambiar de página.
        //Validar
        if(Object.values(searchFilter).includes("")) {
           showNotification({text: "Todos los campos son obligatorios", error: true})
            return
        }
        // consultar las recetas
        searchRecipes(searchFilter)
    }
        // Redirigir a la página de recetas con los parámetros de búsqueda
  return (

    <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-slate-800'}>
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img src="/logo.svg" alt="logotipo" className="w-32" />
          </div>
          <nav className="flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/favoritos"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Favoritos
            </NavLink>
            <NavLink
              to="/generate"
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 uppercase font-bold"
                  : "text-white uppercase font-bold"
              }
            >
              Generar con IA
            </NavLink>
          </nav>
        </div>
        {isHome && (
            <form 
              className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
              onSubmit={handleSubmit}
            >
                <div className="space-y-4">
                    <label htmlFor="ingredient" className="block text-white uppercase font-extrabold text-lg" >Nombre o Ingredientes</label>
                    <input 
                        type="text" 
                        id='ingredient'
                        name='ingredient'
                        className="p-3 w-full rounded-lg focus:outline-none"
                        placeholder="Nombre o Ingrediente. Ej. Vodka, Tequila, Café"
                        onChange={handleChange}
                        value={searchFilter.ingredient}

                    />
                </div>
                <div className="space-y-4">
                    <label htmlFor="category" className="block text-white uppercase font-extrabold text-lg" >Categoria</label>
                    <select 
                        id='category'
                        name='category'
                        className="p-3 w-full rounded-lg focus:outline-none"
                        onChange={handleChange}
                        value={searchFilter.category}
                    >
                        <option value="">
                          ---- Seleccione ----
                          
                        </option>
                        {
                          drinks.map((drink) => (
                            <option key={drink.strCategory} value={drink.strCategory}>{drink.strCategory}</option> 
                          )

                          )
                        }

                    </select>
                </div>
                <input 
                    type="submit" 
                    value='Buscar Recetas' 
                    className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase"/>

            </form>
        )}
      </div>
    </header>
  );
};
