const handler = async (event, context) => {
  console.log("Lambda Function Name: ", context.functionName);
  console.log("Lambda Function Event: ", event);
  let response;

  try {
    if (event.httpMethod !== "POST") {
      throw new Error("Only POST method is allowed");
    }

    // Get POST body
    const body = JSON.parse(event.body);

    // Implement business logic with body data

    response = {
      statusCode: 200,
      body: JSON.stringify({ 
        message: "Webhook received!",
      }),
    };
  } catch (error) {
    // Print debug error message
    console.error(error);

    response = {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    };
  }

  return response;
};

module.exports = {
  handler
}
