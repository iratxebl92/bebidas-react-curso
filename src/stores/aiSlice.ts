import {StateCreator} from 'zustand'
import AIService from '../services/AIService'


export type AISlice = {
    recipe: string
    isGenerating: boolean
    generateRecipe: (prompt: string) => Promise<void> //Ponemos Promise porque es asincrona y void porque no devuelve nada
}

export const createAISlice: StateCreator<AISlice> = (set) => ({
    recipe: '',
    isGenerating: false,
    generateRecipe: async (prompt) => {
        set({recipe: '', isGenerating: true})
       const data = await AIService.generateRecipe(prompt)

       for await (const textPart of data) {
        //ejecuta el for mientras data tenga mas información, mientras la IA siga generando la respuesta
       set((state => ({
        // Va actualizando el recipe a medida que se vaya recibiendo la respuesta en el for
        recipe: state.recipe + textPart
       })))
       }
       set({
        isGenerating: false //al terminar de generar la respuesta en el for
       })
    }
})