
import api from "../lib/axios"
import { CategoriesAPIResponseSchema, DrinksAPIResponseSchema, RecipeAPIResponseSchema } from "../utils/recipes-schema"
import { Drink, SearchFilter } from "../types"

export async function getCategories() {
    const url = '/list.php?c=list'
    const { data } = await api(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)
    if(result.success){
        return result.data
    }
}

export async function getRecipes(filters: SearchFilter){
    const url = `/filter.php?c=${filters.category}&i=${filters.ingredient}`
    const { data } = await api(url)
    const result = DrinksAPIResponseSchema.safeParse(data)
   if(result.success){
       return result.data
   }
}

export async function getRecipeById(id: Drink['idDrink']){
    const url = `/lookup.php?i=${id}`
    const { data } = await api(url)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0]) // trae SOLO los datos tipados en el Schema con Zod
    if(result.success) {
        //success viene en el Zod
        return result.data
    }
}
// Internamente, axios tiene lógica para manejar esto de forma transparente. Cuando se hace una solicitud con una URL relativa (como /lookup.php?i=12345), axios la interpreta como una URL relativa a la baseURL definida en la instancia. Si la URL pasada ya tiene un esquema (http:// o https://), axios no la combina con la baseURL y la usa tal cual.