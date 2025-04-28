import { StateCreator } from "zustand"
import { getCategories, getRecipeById, getRecipes } from "../services/RecipeService"
import type {Categories, Drinks, SearchFilter, Drink, SelectedRecipe} from '../types'
import { FavoritesSliceType } from "./favoritesSlice"



export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    selectedRecipe: SelectedRecipe
    modal: boolean
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters: SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
    setSelectedRecipe: () => void
}
export const createRecipesSlice: StateCreator<RecipesSliceType & FavoritesSliceType, [], [], RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as SelectedRecipe ,
    modal: false,
    fetchCategories: async () => {
       const categoriesFetch = await getCategories()
       set({
        categories: categoriesFetch
       })
    },
    searchRecipes: async (filters) => {
       const drinks = await getRecipes(filters)
        set({drinks}) // actualiza el estado de drinks con la respuesta de la API (drinks:drinks)
    },
    selectRecipe: async(id) => {
        const recipe = await getRecipeById(id)
        set({
            selectedRecipe:recipe,
            modal: true
        })
    },
    closeModal: () => {
        set({
            modal: false,
        })
    },
    //Separamos el set de selectedRecipe del closeModal para que no aparezca un modal pequeño al cerrarlo.
    setSelectedRecipe: () => {
        set({ selectedRecipe: {} as SelectedRecipe //hay que evitar los as, porque "engañas a TS"
         });
      }
})
// selectedRecipe: {} as SelectedRecipe  --> agrega los elementos virtualmente, es una manera de decirle confia en mi que voy a incluirlos En vez de tener que añadir todos los datos de la estructura

//RecipesSliceType & FavoritesSliceType, [], [], RecipesSliceType --> Esto hay que ponerlo para poder usar sin errores de TS funciones de un Slice en el otro