class PageJson {
    constructor(status, msg, data) {
        this.status = status;
        this.msg = msg;
        this.data = data || "";
    }
}

module.exports = PageJson;