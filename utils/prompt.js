const prompt = `You will be Given the following array of WhatsApp messages containing daily sales data for a food cart business regardless of any order or format, structure the data into a Pure JSON format:
Below I have provided you how to structure a JSON        
date(key): Include the date(DD/MM/YY) as value.
revenue(key): Include the total revenue.
solditems(key): sold food items value will be an object, which will contain food item as key and value of object with their associated expenses.  
your response should only contains a json data without any further response.
`;

export default prompt;