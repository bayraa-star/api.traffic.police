const RequestLog = require("../models/RequestLog");

const loggerMiddleware = async (req, res, next) => {
    const startTime = Date.now();
    const { method, url, ip, body: requestBody, headers } = req;
    const device = headers['user-agent'] || 'Unknown device';
    const userId = req.user ? req.user.userId : null; 

    res.on("finish", async () => {
        const responseTime = Date.now() - startTime;
        const statusCode = res.statusCode;

        try {
            await RequestLog.create({
                method,
                url,
                statusCode,
                responseTime,
                ip,
                requestBody: requestBody || {},
                userId,
                device
            });
        } catch (error) {
            console.error("Error logging request:", error);
        }
    });

    next();
}

module.exports = loggerMiddleware;