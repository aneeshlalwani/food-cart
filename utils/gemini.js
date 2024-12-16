import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import postDataToSpreadsheet from "./sheetAPI.js";

dotenv.config();
// GEMINI API
const API_KEY = process.env.GEMINI_API_KEY;

export async function getResponseFromLLM(prompt) {
    try {
        // Initialize the generative model
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Getting result from LLM
        const result = await model.generateContent(prompt);
        // Extracting JSON from markdown, which is response from LLM But It Will return JSON type of string
        const jsonResponse = extractJSONFromMarkdown(result.response.text().toLowerCase());

        // Parsing the json string to an object
        let parsedData;
        try {
            parsedData = JSON.parse(jsonResponse);
            postDataToSpreadsheet(parsedData);
        } catch (error) {
            console.log("Error parsing JSON:", error.message);
            return;
        }
        
    } catch (error) {
        console.log("Error:", error.message);
    }
}

// Function to extract JSON from markdown
function extractJSONFromMarkdown(responseText) {
    // Match content between triple backticks
    const match = responseText.match(/```json([\s\S]*?)```/);
    if (match && match[1]) {
        const jsonString = match[1].trim();
        return jsonString; // Return the raw JSON string
    }
    throw new Error("No valid JSON block found in the response.");
}
