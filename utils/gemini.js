import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

export async function getResponseFromLLM(prompt) {
    try {
        // Initialize the generative model
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Get the result from the LLM
        const result = await model.generateContent(prompt);

        // Extract JSON from markdown
        const jsonResponse = extractJSONFromMarkdown(result.response.text().toLowerCase());
        
        // Parse the JSON string to an object
        let parsedData;
        try {
            parsedData = JSON.parse(jsonResponse); // Parse the JSON string
        } catch (error) {
            console.log("Error parsing JSON:", error.message);
            return;
        }

        // Access the revenue and item expenses
        const revenue = parsedData?.revenue; // Safe access with optional chaining
        const date = parsedData?.date;
        const calculatedExpensesOnEachItem = parsedData?.solditems;
        console.log(date)
        console.log("Revenue:", revenue);
        console.log("Expense Object:",calculatedExpensesOnEachItem);
        // console.log("Item Expenses:", itemExpenses);
        
        // Log the structured data (if needed)
        // console.log(parsedData);
        console.log(jsonResponse);
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
