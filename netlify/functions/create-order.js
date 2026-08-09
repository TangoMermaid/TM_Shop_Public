exports.handler = async (event) => {

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({
                error: "POST required"
            })
        };
    }

    try {

        const order = JSON.parse(event.body);

        console.log("Order received:", order);

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                message: "Order received",
                order
            })
        };

    }

    catch (error) {

        console.error(error);

        return {
            statusCode: 400,
            body: JSON.stringify({
                success: false,
                error: "Invalid order data"
            })
        };

    }

};
