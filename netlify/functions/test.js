exports.handler = async () => {

    const response = await fetch(
        "https://api.github.com/repos/TangoMermaid/TM_Shop_Secure",
        {
            headers: {
                "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
                "Accept": "application/vnd.github+json"
            }
        }
    );

    const data = await response.json();

    return {
        statusCode: response.status,
        body: JSON.stringify({
            repository: data.name,
            private: data.private
        })
    };
};
