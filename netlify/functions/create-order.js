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

        const token = process.env.GITHUB_TOKEN;

        if (!token) {
            throw new Error("GITHUB_TOKEN is not configured.");
        }

        const owner = "TangoMermaid";
        const repo = "TM_Shop_Secure";
        const path = "orders_secure/orders.json";
        const branch = "main";

        const githubURL =
            `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

        const headers = {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28"
        };

        /* ---------- READ ORDERS ---------- */

        let orders = [];
        let fileSHA = null;

        const readResponse = await fetch(
            `${githubURL}?ref=${branch}`,
            {
                method: "GET",
                headers
            }
        );

        if (readResponse.status === 404) {

            orders = [];

        }

        else {

            if (!readResponse.ok) {
                throw new Error(
                    `GitHub read failed: ${readResponse.status}`
                );
            }

            const fileData = await readResponse.json();

            fileSHA = fileData.sha;

            const decoded = Buffer
                .from(fileData.content, "base64")
                .toString("utf8");

            orders = JSON.parse(decoded);

        }

        /* ---------- CREATE ORDER NUMBER ---------- */

        let highestNumber = 0;

        orders.forEach(existingOrder => {

            const match =
                String(existingOrder.order_nr || "")
                    .match(/^(\d+)_/);

            if (match) {

                const number =
                    Number(match[1]);

                if (number > highestNumber) {
                    highestNumber = number;
                }

            }

        });

        const now = new Date();
        
        const localNow =
            new Date(
                now.toLocaleString("en-US", {
                    timeZone: "Europe/Helsinki"
                })
            );
        
        const timePart =
            String(localNow.getHours()).padStart(2, "0") +
            String(localNow.getMinutes()).padStart(2, "0") +
            String(localNow.getSeconds()).padStart(2, "0") +
            String(localNow.getMilliseconds()).padStart(3, "0");
        
        const orderNumber =
            String(highestNumber + 1).padStart(5, "0") +
            "_" +
            timePart;
        
        const whenOpened =
            localNow.getFullYear() +
            "-" +
            String(localNow.getMonth() + 1).padStart(2, "0") +
            "-" +
            String(localNow.getDate()).padStart(2, "0") +
            " " +
            String(localNow.getHours()).padStart(2, "0") +
            ":" +
            String(localNow.getMinutes()).padStart(2, "0") +
            ":" +
            String(localNow.getSeconds()).padStart(2, "0");

        /* ---------- BUILD ORDER ---------- */

        const newOrder = {

            order_nr: orderNumber,
            order_status: "open",
            order_comment: "created",
            when_opened: whenOpened,
            when_closed: "",

            cust_name: order.cust_name || "",
            cust_email: order.cust_email || "",
            cust_phone: order.cust_phone || "",
            tm_club: order.tm_club || "no",
            privacy_accepted: "yes",

            items_IDs: Array.isArray(order.items_IDs)
                ? order.items_IDs
                : [],

            items_count: Number(order.items_count || 0),
            subtotal: Number(order.subtotal || 0),
            campaign: order.campaign || "",
            discount: Number(order.discount || 0),
            total: Number(order.total || 0),

            pay_method: order.pay_method || "",
            pay_proof_file: order.pay_proof_file || "",

            when_confirm_sent: "",
            confirm_comments: "",

            when_receipt_sent: "",
            receipt_comments: ""

        };

        orders.push(newOrder);

        /* ---------- WRITE ORDERS ---------- */

        const content =
            JSON.stringify(orders, null, 4);

        const encodedContent =
            Buffer
                .from(content, "utf8")
                .toString("base64");

        const writeBody = {
            message: `Create order ${orderNumber}`,
            content: encodedContent,
            branch
        };

        if (fileSHA) {
            writeBody.sha = fileSHA;
        }

        const writeResponse = await fetch(
            githubURL,
            {
                method: "PUT",
                headers: {
                    ...headers,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(writeBody)
            }
        );

        if (!writeResponse.ok) {

            const errorText =
                await writeResponse.text();

            throw new Error(
                `GitHub write failed: ${writeResponse.status} ${errorText}`
            );

        }

        console.log("Order saved:", newOrder);

        return {
            statusCode: 200,
            body: JSON.stringify({
                success: true,
                order_nr: orderNumber
            })
        };

    }

    catch (error) {

        console.error("Order creation failed:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                success: false,
                error: "Could not create order"
            })
        };

    }

};
