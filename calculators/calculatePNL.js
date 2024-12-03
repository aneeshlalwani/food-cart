export default function calculatePNL(revenue, totalExpense){
    const calculation = revenue - totalExpense;
    
    if(calculation > 0){
        return {profit: calculation}
    } else {
        return { loss: Math.abs(calculation) };
    }    
}
