class PageList {
    constructor(pageIndex, sumCount, listData) {
        this.pageIndex = pageIndex;
        this.sumCount = sumCount;
        this.listData = listData;
        this.pageCount = Math.ceil(this.listData.length / 10);
        this.hasNext = this.pageCount > this.pageIndex ? true : false;
    }
}

module.exports = PageList;


//分页数据对象