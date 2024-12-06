import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import {calculateExpenses, TotalExpenses } from "../calculators/calculateExpense.js";
import calculatePNL from "../calculators/calculatePNL.js";

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
        // Extracting JSON from markdown, which is response from LLM
        const jsonResponse = extractJSONFromMarkdown(result.response.text().toLowerCase());
        
        // Parsing the json string to an object
        let parsedData;
        try {
            parsedData = JSON.parse(jsonResponse);
        } catch (error) {
            console.log("Error parsing JSON:", error.message);
            return;
        }
        console.log(jsonResponse);
        const calculatedExpensesOnEachItem = calculateExpenses(parsedData?.solditems);
        console.log("Expenses on each food Item:",calculatedExpensesOnEachItem);
        const totalExpense = TotalExpenses(calculatedExpensesOnEachItem);
        console.log(`Total Expense : ${totalExpense}`);
        const revenue = parsedData?.revenue;
        console.log("Revenue:", revenue);
        const date = parsedData?.date;
        console.log(`Date : ${date}`)
        const pnl = calculatePNL(revenue, totalExpense);
        console.log(pnl);
        // if(pnl.profit){
        //     console.log(`Profit : ${pnl.profit}`);
        // } else {
        //     console.log(`Loss : ${pnl.loss}`);
        // }
        
        
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
