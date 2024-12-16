import axios from 'axios';
import dotenv from 'dotenv';
import { calculateExpenses, TotalExpenses } from '../calculators/calculateExpense.js';
import calculatePNL from '../calculators/calculatePNL.js';

dotenv.config();
const postDataToSpreadsheet = async (data) => {
  const url = `https://script.google.com/macros/s/${process.env.EXPENSE_SHEET_API_ID}/exec`;

  try {
    // Posting Data to PNL(Profit and Loss) Sheet
        const calculatedExpensesOnEachItem = calculateExpenses(data?.solditems);
        const totalExpense = TotalExpenses(calculatedExpensesOnEachItem);
        const pnl = calculatePNL(data?.revenue, totalExpense);
        const pnlData = {
        action:'PNL',
        Date: data?.date,
        Revenue: data?.revenue,
        'Total Expense': totalExpense,
        'Profit': pnl,
    }
    const pnlResponse = await axios.post(url, pnlData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("PNL data sent successfully");
    // Posting Data to Expense sheet for each food item
    for (const foodItem in data.solditems) {
      const item = data.solditems[foodItem];
      for (const itemName in item) {
        const cost = item[itemName];
        
        // Preparing the expenses object
        const expensesData = {
          action:"Expense",
          Date: data.date,
          Category: foodItem,
          'Item Name': itemName,
          Cost: cost,
        };
        
        // Sending each expense data as a separate POST request
        const response = await axios.post(url, expensesData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Expense sent!!!', response?.data);
      }
    }
    console.log("Data successfully sent to Apps Script!");
  } catch (error) {
    console.error('Error posting data:', error.response?.data || error.message);
  }
};

export default postDataToSpreadsheet;
