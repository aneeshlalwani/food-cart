import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const postDataToSpreadsheet = async (data) => {
  const url = `https://script.google.com/macros/s/${process.env.EXPENSE_SHEET_API_ID}/exec`;

  try {
    // Posting Data to Expense sheet for each food item
    for (const foodItem in data.solditems) {
      const item = data.solditems[foodItem];
      for (const itemName in item) {
        const cost = item[itemName];
        
        // Preparing the expenses object
        const expenses = {
          Date: data.date,
          Category: foodItem,
          'Item Name': itemName,
          Cost: cost,
        };
        
        // Sending each expense data as a separate POST request
        const response = await axios.post(url, expenses, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('Expense sent!!!');
      }
    }
    console.log("Data successfully sent to Apps Script!");
  } catch (error) {
    console.error('Error posting data:', error.response?.data || error.message);
  }
};

export default postDataToSpreadsheet;
