const sendResponse = require("./lib/response");

function handleRequest(req, res) {
    const path = req.url;
    const method = req.method;

    if(path === "/units" && method === "GET") {
        sendResponse(res, 200, {}, {temperature: ["celsius", "farenheit"] } )
        return;
    }
    
    if( path === "/convert/temperature" && method === "POST") {
        const body = [];
        let result = null;
    
        req.on("data", (chunk) => {
            body.push(chunk);
        });

        req.on("end", () => {
            const data = JSON.parse(body);

            if(data.convertTo === "farenheit" && data.unit === 'celsius') {
                result = (data.value * 9/5) + 32
            } else if(data.convertTo === "celsius" && data.unit === 'farenheit')  {
                result = (data.value - 32) * 5/9
            }
            if(result) {
                sendResponse(res, 200, {}, {result, unit: data.convertTo });
            } else {
                sendResponse(res, 400, {}, { message: 'Erreur, les données ne sont pas exploitables.' });
                return;
            }
        });
        return;
    }
}
module.exports = handleRequest;