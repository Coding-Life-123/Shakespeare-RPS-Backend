import 'dotenv/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { text } from 'express';


const APIS = [process.env.API_KEY1, process.env.API_KEY2, process.env.API_KEY3, process.env.API_KEY4];

let currentKeyIndex = 0;
let GEMINI_API_KEY = APIS[currentKeyIndex];


function rotateApiKey() {
currentKeyIndex = (currentKeyIndex + 1) % apis.length;
GEMINI_API_KEY = APIS[currentKeyIndex];
console.log(`🔁 API key cambiada a: ${GEMINI_API_KEY}`);
}

let conversacion = [];

async function jugar(texto = "tijeras"){
    const contexto = `quiero que seas una IA cómica, esta aplicación es como un juego de piedra papel o tijera, pero tu siempre tienes que ganar, puedes cambiar tu desición si quieres o dar razones tan absurdas como quieras para lograr ganar, puedes justificarlo como quieras, como que si sacas papel y el otro tijera, tú ganas porque es papel de hierro, puedes decir lo que quieras para excusarte, funcionaras en cierto modo como 2do jugador de unn juego y a la vez como chat, sé gracioso y no te limites!, el único límite que tendrás es de no escribir tanto, sé breve, evita pasar de 25-30 palabras en tu respuesta`

    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    console.log(currentKeyIndex);
    console.log(conversacion);
    console.log(texto);
    
    try{
        const result = await model.generateContent({
            contents: [
            {
                role: "user",
                parts: [{ text: `contexto: ${contexto}, historial:${conversacion}, mensaje:${texto}` }]
            }
            ],
        })
        console.log(result.response.candidates[0].content.parts[0].text);
        conversacion.push({
            role: "user",
            content: texto
        })
        conversacion.push({
            role: result.response.candidates[0].content.role,
            content: result.response.candidates[0].content.parts[0].text
        });
        console.log(JSON.stringify({cpu: result.response.candidates[0].content.parts[0].text}))
        return {"cpu": result.response.candidates[0].content.parts[0].text};
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

export default jugar

