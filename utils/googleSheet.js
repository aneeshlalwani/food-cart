import axios from "axios";
import dotenv from 'dotenv';
import { calculateExpenses, TotalExpenses } from "../calculators/calculateExpense.js";
import calculatePNL from "../calculators/calculatePNL.js";
dotenv.config();

const EXPENSE_SHEET_URL = `https://sheetdb.io/api/v1/${process.env.EXPENSE_SHEET_KEY}`
const PNL_SHEET_URL = `https://sheetdb.io/api/v1/${process.env.PNL_SHEET_KEY}?sheet=pnlSheet`

// Sending Data to Expense Sheet
const sendDataToSheet = async(data) =>{
     try {
        // Calculations
                const calculatedExpensesOnEachItem = calculateExpenses(data?.solditems);
                const totalExpense = TotalExpenses(calculatedExpensesOnEachItem);
                const pnl = calculatePNL(data?.revenue, totalExpense);
                const pnlData = {
                    Date: data?.date,
                    Revenue: data?.revenue,
                    'Total Expense': totalExpense,
                    'Profit': pnl,
                }
        // Posting Data to PNL Sheet
        await axios.post(PNL_SHEET_URL, pnlData);
        console.log('Data has been Sent!');
        // Processing Expenses Data
        for(const itemName in data.solditems){
            const item = data.solditems[itemName];
                
            for(const category in item){
                const cost = item[category];
                
                const expenses = {
                    Date:data.date,
                    'Item Name':itemName,
                    Category:category,
                    Cost:cost,
                }
                console.log(expenses);
                // Posting Data to Expenses Sheet 
                await axios.post(EXPENSE_SHEET_URL, expenses);
                console.log('expense sent')
                
            }
        }

     } catch (error) {
        console.log(error.message);
     }   
    
}

export default sendDataToSheet;