exports.handler = async () => {

    const content = Buffer.from(
        "Netlify → GitHub write test"
    ).toString("base64");

    const response = await fetch(
        "https://api.github.com/repos/TangoMermaid/TM_Shop_Secure/contents/test_write.txt",
        {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
                "Accept": "application/vnd.github+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Netlify write test",
                content: content
            })
        }
    );

    const data = await response.json();

    return {
        statusCode: response.status,
        body: JSON.stringify({
            success: response.ok,
            message: data.message || "File created"
        })
    };
};
