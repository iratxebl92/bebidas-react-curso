import { useAppStore } from "../stores/useAppStore"

export default function GenerateAI() {

    const {showNotification, generateRecipe, recipe, isGenerating} = useAppStore()
    
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement> ) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)
        // e.currentTarget es el elemento del formulario que ha activado el evento (es decir, el formulario <form>).
        // FormData es una interfaz que permite acceder a los datos de un formulario de manera fácil, incluyendo los valores de los campos de entrada (como input, select, textarea, etc.)
        const prompt = form.get('prompt') as string 
        // form.get('prompt') obtiene el valor del campo con el nombre 'prompt' en el formulario.
        //get es un método de FormData que devuelve el valor asociado con el nombre del campo. Si el campo input con nombre prompt tiene el valor 'hello', form.get('prompt') devolvería ese valor.
        //as string es una afirmación de tipo en TypeScript. Le está diciendo al compilador que, aunque form.get() devuelve un valor de tipo FormDataEntryValue (que puede ser un string o un File), lo estamos tratando como un string para que podamos usar métodos de cadenas como .trim()
        console.log(prompt)
        if(prompt.trim() === '') {
            // prompt.trim() === '' Esta comparación verifica si la cadena está vacía después de eliminar los espacios en blanco al principio y al final de la cadena. Esto es útil cuando quieres asegurarte de que el campo de entrada no contiene solo espacios en blanco, saltos de línea o tabulaciones.
            showNotification({
                text: 'La busqueda no puede ir vacía',
                error: true
            })
            return;
        }
        await generateRecipe(prompt)
    }
  
    return (
      <>
        <h1 className="text-6xl font-extrabold">Generar Receta con IA</h1>
  
        <div className="max-w-4xl mx-auto">
          <form  
            onSubmit={ handleSubmit}
            className='flex flex-col space-y-3 py-10'
          >
            <div className="relative">
              <input 
                name="prompt" 
                id="prompt" 
                className="border bg-white p-4 rounded-lg w-full border-slate-800" 
                placeholder="Genera una receta con ingredientes. Ej. Bebida con Tequila y Fresa"
              />
              <button 
                type="submit" 
                aria-label="Enviar"
                
                className={`cursor-pointer absolute top-1/2 right-5 transform -translate-x-1/2 -translate-y-1/2 ${isGenerating ? "cursor-not-allowed opacity-50 " : ""}`}
                disabled={isGenerating}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                  stroke="currentColor" className="w-10 h-10">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            </div>
          </form>
      {
        isGenerating && <p className="text-center animate-blink"> Generando...</p>
      }
          <div className="py-10 whitespace-pre-wrap">
        {recipe}
          </div>
        </div>
  
      </> 
    )
  }