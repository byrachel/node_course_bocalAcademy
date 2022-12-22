function handleRequest(req, res) {
    const path = req.url;
    const method = req.method;

    if(path === "/units" && method === "GET") {
        const responseBody = JSON.stringify({temperature: ["celcius", "farenheit"] });
        res.writeHead(200, {
            "Content-Type": "application/json",
            "Content-Length": responseBody.length
        });
        res.end(responseBody);
        return;
    } else if( path === "/convert/temperature" && method === "POST") {
        const body = [];
        let result = null;
    
        req.on("data", (chunk) => {
            body.push(chunk);
        });

        req.on("end", () => {
            const data = JSON.parse(body);

            if(data.convertTo === "farenheit" && data.unit === 'celcius') {
                result = (data.value * 9/5) + 32
            } else if(data.convertTo === "celcius" && data.unit === 'farenheit')  {
                result = (data.value - 32) * 5/9
            }
            if(result) {
                res.writeHead(200, {
                    "Content-Type": "application/json",
                });
                const responseBody = JSON.stringify({result :  result, unit: data.convertTo });
                res.end(responseBody);
            } else {
                const responseBody = JSON.stringify({message: 'Erreur' });
                res.writeHead(404, {});
                res.end(responseBody);
            }
        });
    }
}
module.exports = handleRequest;