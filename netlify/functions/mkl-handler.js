const FaunaService = require("@brianmmdev/faunaservice");

exports.handler = async (event, context) => {
  try {
    const service = new FaunaService(
      "fnAFgdkjZLAA0BbhLudTfXA4AspNEme1Tqlbw72u"
    );

    const data = JSON.parse(event.body);
    const userInput = data.input;
    const isMkl = data.budget === "High" ? true : false;

    await service.createRecord("data", {
      userInput,
      isMkl,
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Received your input!",
        yourInput: userInput,
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "Error on the catch of serverless function",
        error: error.message,
      }),
    };
  }
};
