import jugar from "../RPSgameIA.js";

export const sendJugar = async (req, res) => {
    try{
        const response = await(jugar(req.body.text));
        console.log(req.body);
        res.status(201).json(response);
    }catch(error){
        console.log("controller", error)
        res.status(500).json({Error: error});        
    }
};