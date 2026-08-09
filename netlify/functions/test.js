exports.handler = async () => {

    const fileUrl =
        "https://api.github.com/repos/TangoMermaid/TM_Shop_Secure/contents/orders_secure/test_order.json";

    const headers = {
        "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
        "Accept": "application/vnd.github+json"
    };

    // Get the existing file and its SHA
    const getResponse = await fetch(fileUrl, {
        headers
    });

    const existingFile = await getResponse.json();

    if (!getResponse.ok) {
        return {
            statusCode: getResponse.status,
            body: JSON.stringify(existingFile)
        };
    }

    const testOrder = {
        order_nr: "TEST-001",
        order_status: "open",
        order_comment: "created"
    };

    const content = Buffer.from(
        JSON.stringify(testOrder, null, 2)
    ).toString("base64");

    // Update the existing file
    const putResponse = await fetch(fileUrl, {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: "Update test order JSON",
            content: content,
            sha: existingFile.sha
        })
    });

    const data = await putResponse.json();

    return {
        statusCode: putResponse.status,
        body: JSON.stringify({
            success: putResponse.ok,
            message: data.message || "File updated"
        })
    };
};
