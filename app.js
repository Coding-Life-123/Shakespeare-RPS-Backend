import express from "express";
import 'dotenv/config';
import cors from "cors";
import textRoutes from "./routes/shakespeareRoutes.js";
import gameRoutes from "./routes/RPSgameRoutes.js"

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5177", "http://localhost:5176", "http://localhost:5175", "http://localhost:5174", "https://game-vue-kappa.vercel.app/"], 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/shakespeare", textRoutes);
app.use("/api/RPSgame", gameRoutes);

const PORT = process.env.PORT;
app.listen(PORT, ()=> {
    console.log(`servidor corriendo en el puerto ${PORT}`);
});

