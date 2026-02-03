import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { generatePlan } from "./plans.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/generate", (req, res) => {
    try {
        const plan = generatePlan(req.body);
        res.json(plan);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log("🏋️ FitForge running at http://localhost:3000");
});
