
import { getResponseFromLLM } from "./utils/gemini.js";
import prompt from "./utils/prompt.js";

const messages = [
  "Sandwich 200 oil\n600 salt",
  "30 nov 24 sale 19500",
  "Pizza 450 black olives\n430 green olives",
  "Fries 300 petrol\n2100 gas\n2500 oil\n950 cup",
  "Zinger\n1500 Chicken\n300 Maida\n00 Salt\n00 Peprika"
];
// processMessages(messages);
console.log('MODEL RESPONSE!');
// const prompt = "Given the following array of WhatsApp messages containing daily sales data for a food cart business, extract and structure the information into a JSON format. Each message includes total revenue, date, expenses, and expense of each sold items (e.g., fries, zinger, pizza)"

const res = getResponseFromLLM(`${prompt}\n${messages}`);
console.log(res);