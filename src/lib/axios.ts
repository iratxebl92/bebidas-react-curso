import axios from "axios";
const api = axios.create({
    baseURL: 'https://www.thecocktaildb.com/api/json/v1/1'
})

export default api

//Internamente, axios tiene lógica para manejar esto de forma transparente. Cuando se hace una solicitud con una URL relativa (como /lookup.php?i=12345), axios la interpreta como una URL relativa a la baseURL definida en la instancia. Si la URL pasada ya tiene un esquema (http:// o https://), axios no la combina con la baseURL y la usa tal cual.