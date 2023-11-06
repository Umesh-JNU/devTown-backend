class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const title = this.queryStr.title ? {
            title: {
                $regex: this.queryStr.title,
                $options: "i",
            },
        } : {}

        const categoryQry = this.queryStr.category;
        const category = categoryQry ? {
            category: categoryQry
        } : {}

        const qry = { ...title, ...category };
        console.log({ qry });
        this.query = this.query.find({ ...title, ...category });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr }

        // Removing field for category
        const removeFields = ["keyword", "currentPage", "resultPerPage", 'category', 'title'];
        removeFields.forEach(key => delete queryCopy[key]);

        // filter for price
        let querystr = JSON.stringify(queryCopy);
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(querystr));
        return this;
    }

    pagination() {
        const currentPage = Number(this.queryStr.currentPage) || 1;
        const itemPerPage = Number(this.queryStr.resultPerPage);

        const skip = itemPerPage * (currentPage - 1);
        console.log({ currentPage, itemPerPage, skip });

        this.query = this.query.limit(itemPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures