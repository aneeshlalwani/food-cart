const messages = [
    "30 nov 24\nsale 19500",
    `Fries\n300 petrol\n2100 gas\n2500 oil\n...`,
    `Zinger\n1500 Chicken\n300 Maida\n...`
];

const processMessages = async () => {
    try {
        for (const msg of messages) {
            // const structuredData = await sendToLLM(msg);
            console.log('Parsed Data:', msg);
        }
    } catch (error) {
        console.error('Error processing messages:', error.message);
    }
};

processMessages();