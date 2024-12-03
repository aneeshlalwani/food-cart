function calculateExpenses(solditems) {
    const expenses = {}; 

    for (const [item, ingredients] of Object.entries(solditems)) {
        // console.log(item);
        const totalExpense = Object.values(ingredients).reduce((sum, value) => {
            return typeof value === 'number' ? sum + value : sum;
        }, 0);
        
        expenses[`ExpenseOn${item}`] = totalExpense;
    }

    return expenses; // Return the expenses object
}

function TotalExpenses(expenses){
    return Object.values(expenses).reduce((sum, value) => sum + value, 0);
}
export {calculateExpenses, TotalExpenses};