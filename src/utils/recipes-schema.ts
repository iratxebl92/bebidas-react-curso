import {z} from 'zod'

export const CategoriesAPIResponseSchema = z.object ({
    drinks: z.array(
        z.object({
            strCategory: z.string()
        })
    )
})

export const SearchFilterSchema = z.object({
    ingredient: z.string(),
    category: z.string()
})

export const DrinkAPIResponseSchema = z.object({
   idDrink: z.string(),
   strDrink: z.string(),
   strDrinkThumb: z.string()
})

export const DrinksAPIResponseSchema = z.object({
    drinks: z.array(DrinkAPIResponseSchema)
})
export const RecipeAPIResponseSchema = z.object({
    idDrink: z.string(),
    strDrink: z.string(),
    strDrinkThumb: z.string(),
    strInstructions: z.string(),
    strIngredient1: z.string().nullable(),
    strIngredient2: z.string().nullable(),
    strIngredient3: z.string().nullable(),
    strIngredient4: z.string().nullable(),
    strIngredient5: z.string().nullable(),
    strIngredient6: z.string().nullable(),
    strMeasure1: z.string().nullable(),
    strMeasure2: z.string().nullable(),
    strMeasure3: z.string().nullable(),
    strMeasure4: z.string().nullable(),
    strMeasure5: z.string().nullable(),
    strMeasure6: z.string().nullable(),
  });
  // z.string().nullable() esto es que puede tener datos o ser null
  // RecipeAPIResponseSchema en este caso podria traer mas ingredientes ya que la API trae mas ingredientes, pero lo limitamos a 6, asi luego en result SOLO trae los datos que queramos, que son los que hemos tipado aqui 