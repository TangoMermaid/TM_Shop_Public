exports.handler = async () => {

    const testOrder = {
        order_nr: "TEST-001",
        order_status: "open",
        order_comment: "created"
    };

    const content = Buffer.from(
        JSON.stringify(testOrder, null, 2)
    ).toString("base64");

    const response = await fetch(
        "https://api.github.com/repos/TangoMermaid/TM_Shop_Secure/contents/orders_secure/test_order.json",
        {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
                "Accept": "application/vnd.github+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Create test order JSON",
                content: content
            })
        }
    );

    const data = await response.json();

    return {
        statusCode: response.status,
        body: JSON.stringify({
            success: response.ok,
            message: data.message || "File written"
        })
    };
};
