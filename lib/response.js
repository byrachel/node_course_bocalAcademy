function sendResponse(res, status = 200, headers, body = null) {
    res.writeHead(status, {
        ...headers,
        "Content-Type": "application/json"
    });

    if(!body) {
        res.end();
        return;
    }
    res.end(JSON.stringify(body));
}

module.exports = sendResponse;