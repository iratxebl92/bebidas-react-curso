import { StateCreator } from "zustand";
import { SelectedRecipe } from "../types";
import { createRecipesSlice, RecipesSliceType } from "./recipeSlice";
import { createNotificationSlice, NotificationSliceType } from "./notificationSlice";


export type FavoritesSliceType = {
    favorites: SelectedRecipe[]
    handleClickFavorite: (recipe: SelectedRecipe) => void
    favoriteExists: (id: SelectedRecipe['idDrink']) => boolean
    loadFromStorage: () => void
}
export const createFavoritesSlice : StateCreator<FavoritesSliceType & RecipesSliceType & NotificationSliceType, [], [], FavoritesSliceType> = (set, get, api) => ({
    favorites: [],
    handleClickFavorite: (recipe) => {
        
       if(get().favoriteExists(recipe.idDrink)){ //para obtener acciones que pertenecen a este mismo Slice, como es favorites
        set((state) => ({
            favorites: state.favorites.filter(favorite => favorite.idDrink !== recipe.idDrink)
        }))
        createNotificationSlice(set, get, api).showNotification({
            text: 'Se eliminó de favoritos', 
            error: false
        })
    } else {
        set((state) => ({
            favorites: [...state.favorites, recipe ]
        }))
        createNotificationSlice(set, get, api).showNotification({
            text: 'Se agregó a favoritos', 
            error: false
        })
    }
    createRecipesSlice(set, get, api).closeModal()
    localStorage.setItem('favorites', JSON.stringify(get().favorites))
},
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites')
        if(storedFavorites){
            set({
                favorites: JSON.parse(storedFavorites)
            })
        }
    }
})



/*
Ambos formas son correctas, el profesor prefiere la primera, con el Callback
set((state) => ({
    favorites: [...state.favorites, recipe ]
}))
set({
            favorites: [...get().favorites, recipe ]
        })
*/

//FavoritesSliceType & RecipesSliceType, [], [], FavoritesSliceType --> Esto hay que ponerlo para poder usar sin errores de TS funciones de un Slice en el otro. Al profesor no le gusta, peor a veces no queda otra.