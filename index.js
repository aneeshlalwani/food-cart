
import { getResponseFromLLM } from "./utils/gemini.js";
import prompt from "./utils/prompt.js";

const messages = [
  
  "30 nov 24 sale 19500",
  "Fries 300 petrol\n2100 gas\n2500 oil\n950 cup\n000 sticks\n100 dips\n300 shopers",
  "Zinger 1500 Chicken\n 300 Maida\n00 Salt\n00 Peprika\n140 garlic\n100 milk\n200 laal mirch",
  "Pizza 450 black olives\n430 green olives",
];
// processMessages(messages);
console.log('MODEL RESPONSE!');
// const prompt = "Given the following array of WhatsApp messages containing daily sales data for a food cart business, extract and structure the information into a JSON format. Each message includes total revenue, date, expenses, and expense of each sold items (e.g., fries, zinger, pizza)"

getResponseFromLLM(`${prompt}\n${messages}`);
