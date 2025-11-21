import pedirTraduccion from "../ShakespeareIA.js";

export const translate = async (req, res) => {
    try{
        const response = await(pedirTraduccion(req.body.text));
        console.log(req.body)
        res.status(201).json(response);
    }catch(error){
        res.status(500).json({Error: error});
    }
};