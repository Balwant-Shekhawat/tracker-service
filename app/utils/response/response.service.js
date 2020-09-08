/** Response Class */
class Response {
    /**
     * @param {number} statusCode Status Code
     */
    constructor(statusCode) {
        this.statusCode = statusCode;
    }

    /**
     * @param {object} data Response to send to client
     * @param {string} message Message (Default value "OK")
     * @return {Response} Response Response Class Object
     */
    success(data, message = 'OK') {
        this.data = data;
        this.message = message;
        this.error = null;

        return this;
    }

    /**
     * @param {object} error Error Object
     * @param {string} message Message
     * @param {object} stack Complete Error Object
     * @return {Response} Response object
     */
    error(error, message) {
        this.data = {};
        this.message = message || error.message || 'Unknown';
        this.error = Object.assign(error, {
            name: error.name || 'Request Failed',
            message: error.message || 'Some error occurred',
        });

        return this;
    }

    /**
     * @param {object} req Express Request Object
     * @param {object} res Express Response Object
     */
    send(req, res) {
        // We can log our response here if we want
        res.status(this.statusCode).send(this);
    }
}

module.exports = Response;
