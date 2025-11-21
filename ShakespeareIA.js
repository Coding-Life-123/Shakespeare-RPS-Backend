import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';


const APIS = [process.env.API_KEY1, process.env.API_KEY2, process.env.API_KEY3, process.env.API_KEY4];

let currentKeyIndex = 0;
let GEMINI_API_KEY = APIS[currentKeyIndex];


function rotateApiKey() {
currentKeyIndex = (currentKeyIndex + 1) % apis.length;
GEMINI_API_KEY = APIS[currentKeyIndex];
console.log(`🔁 API key cambiada a: ${GEMINI_API_KEY}`);
}

async function pedirTraduccion(texto = "me pica el culo"){
    const contexto = `Quiero que conviertas a Idioma Shakespeariano dramático clásico, por ejemplo: "El wifi está lento" → "¡Oh cruel destino! ¿Por qué las señales etéreas me abandonan en mi hora de necesidad?", la idea es que aún si es grosero tu lo vuelvas no grosero y le des un tono interesante, único y dramático, además da una respuesta única y corta, o de una longitud parecida al texto dado, haz eso con el siguiente texto: ${texto}`

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    console.log(currentKeyIndex);
    
    try{
        const result = await model.generateContent({
            contents: [
            {
                role: "user",
                parts: [{ text: contexto }]
            }
            ],
        })
        console.log(result.response.candidates[0].content.parts[0].text);
        return {"translated": result.response.candidates[0].content.parts[0].text};
    }catch(error){
        if(error.res && [401, 403, 429].includes(error.res.status)){
            console.warn(`error con la key actual (${error.res.status}). Cambiando a nueva key...`);
            rotateApiKey();
            return pedirTraduccion(texto);
        }else{
            throw error;
        }
    }
}

export default pedirTraduccion

