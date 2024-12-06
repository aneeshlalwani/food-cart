export default function calculatePNL(revenue, totalExpense){
    const calculation = revenue - totalExpense;
    return `Profit : ${calculation}`;
}
