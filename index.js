
import { getResponseFromLLM } from "./utils/gemini.js";
import prompt from "./utils/prompt.js";
// import postToSpreadsheet from "./utils/sheetAPI.js"
const messages = [
  "30 nov 24 sale 19500",
  "Fries 300 petrol\n2100 gas\n2500 oil\n950 cup\n000 sticks\n100 dips\n300 shopers",
  "Zinger 1500 Chicken\n 300 Maida\n00 Salt\n00 Peprika\n140 garlic\n100 milk\n200 laal mirch",
  "Pizza 450 black olives\n430 green olives",
];


getResponseFromLLM(`${prompt}\n${messages}`);
// const dataToSend = {
//   Date: '30/11/24',
//   Category: 'Pizza',
//   'Item Name': 'maida',
//   Cost: 1500,
// };

// postToSpreadsheet(dataToSend);