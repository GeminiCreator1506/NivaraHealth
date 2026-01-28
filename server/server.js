import express from "express";
import multer from "multer";
import cors from "cors";
import axios from "axios";
import fs from "fs";
import FormData from "form-data";

const app = express();
app.use(cors());

// ======================
// CONFIG
// ======================
const OPENROUTER_API_KEY =
  "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";
const OPENROUTER_MODEL = "openai/gpt-4.1-mini";

const ROBOFLOW_API_KEY = "zUa1qfkAPDtqRQ6rRlco";
const ROBOFLOW_MODEL = "anemia-detection-v3-fyv07/1";

const YOLO_SERVICE_URL = "http://localhost:5001/analyze_tongue";
// ======================

// Ensure upload dir exists
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");

const upload = multer({ dest: "uploads/" });

// Health check
app.get("/", (req, res) => {
  res.send("VitalGaze server running 🚀");
});

// ----------------------
// YOLO TONGUE ANALYSIS
// ----------------------
async function analyzeTongueYOLO(imagePath) {
  const form = new FormData();
  form.append("image", fs.createReadStream(imagePath));

  const res = await axios.post(YOLO_SERVICE_URL, form, {
    headers: form.getHeaders(),
    timeout: 30000
  });

  return res.data; // { condition, confidence }
}

// ----------------------
// ROBOFLOW EYE ANALYSIS
// ----------------------
async function analyzeEyeRoboflow(imagePath) {
  const image = fs.readFileSync(imagePath, { encoding: "base64" });

  const res = await axios.post(
    `https://detect.roboflow.com/${ROBOFLOW_MODEL}`,
    image,
    {
      params: { api_key: ROBOFLOW_API_KEY },
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
    }
  );

  const data = res.data;

  // Classification-style (most likely)
  if (data.predicted_classes && data.predictions) {
    const label = data.predicted_classes[0];
    const confidence = data.predictions[label]?.confidence ?? 0.5;

    return { result: label, confidence };
  }

  // Object-detection fallback
  if (Array.isArray(data.predictions) && data.predictions.length > 0) {
    const best = data.predictions[0];
    return {
      result: best.class || "unknown",
      confidence: best.confidence || 0.5
    };
  }

  return { result: "Unable to determine", confidence: 0.5 };
}

// ----------------------
// MAIN ANALYSIS ROUTE
// ----------------------
app.post(
  "/analyze",
  upload.fields([{ name: "tongue" }, { name: "eye" }]),
  async (req, res) => {
    try {
      const { name, dob } = req.body;

      if (!name || !dob || !req.files?.tongue || !req.files?.eye) {
        return res.status(400).json({ error: "Missing data or images" });
      }

      // 1️⃣ Tongue → YOLO
      const tongueData = await analyzeTongueYOLO(
        req.files.tongue[0].path
      );

      // 2️⃣ Eye → Roboflow
      const eyeData = await analyzeEyeRoboflow(
        req.files.eye[0].path
      );

      // 3️⃣ AI Report
      const prompt = `
You are VitalGaze, an AI health screening assistant.

Patient:
- Name: ${name}
- DOB: ${dob}

Computer Vision Findings:
- Tongue: ${tongueData.condition} (${(tongueData.confidence * 100).toFixed(1)}%)
- Eye: ${eyeData.result} (${(eyeData.confidence * 100).toFixed(1)}%)

Write a calm, patient-friendly screening report.
Explain what these findings may indicate.
Include a clear disclaimer that this is NOT a diagnosis.
`;

      const ai = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: OPENROUTER_MODEL,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.6,
          max_tokens: 400
        },
        {
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
            "X-Title": "VitalGaze"
          },
          timeout: 30000
        }
      );

      const report =
        ai.data?.choices?.[0]?.message?.content ||
        "Unable to generate report.";

      // 4️⃣ Response
      res.json({
        tongue: tongueData,
        eye: eyeData,
        report
      });
    } catch (err) {
      console.error("SERVER ERROR:", err.response?.data || err.message);
      res.status(500).json({
        error:
          err.response?.data?.error?.message ||
          err.message ||
          "Unknown error"
      });
    }
  }
);

// ----------------------
app.listen(3000, "0.0.0.0", () => {
  console.log("✅ VitalGaze server running on port 3000");
});
