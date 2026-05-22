import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/tts", async (req, res) => {

  try {

    const text = req.body.text;

    console.log("Texte reçu :", text);

    const response = await axios.post(
      "https://tts.darijat.com/api/v1/external/generate-audio",
      {
        text: text,
        voice_name: "مريم",
        human_simulation: true
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DARIJAT_API_KEY}`,
          "Content-Type": "application/json"
        },
        responseType: "arraybuffer"
      }
    );

    res.set({
      "Content-Type":"audio/mpeg"
    });

    res.send(response.data);

  } catch (error) {

    console.log(error);

    res.status(500).send("Erreur TTS");

  }

});

app.get("/", (req, res) => {
  res.send("Darijat API OK");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});