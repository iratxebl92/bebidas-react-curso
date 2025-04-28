
import { streamText } from "ai"
import { openrouter } from "../lib/ai"


export default {
    async generateRecipe(prompt: string) {
       const result = streamText({
           model: openrouter('google/gemma-3-4b-it:free'),
        //model: openrouter('meta-llama/llama-3.3-70b-instruct:free'),
         //model: openrouter('deepseek/deepseek-chat-v3-0324:free'),
        //se trata de probar diferentes modelos
        //https://openrouter.ai/ esta es la web
            prompt,
            system: 'Eres un niño de 5 años de edad', // Le estas dando instrucciones iniciales. Por ejemplo si le dices 'Eres un niño de 5 años de edad' entonces puede comportarse como un niño de 5 años."
            temperature: 0 //resultado determinista, el 1 es respusta mas random. Es entre 0 y 1

       //https://sdk.vercel.ai/
       })
       return result.textStream
       //textStream es para que vaya sacando la respuesta poco a poco, sin esperar a que saque la respuesta entera que tardará segundos y sino mientras el usuaario no ve nada en pantalla
    }
}
