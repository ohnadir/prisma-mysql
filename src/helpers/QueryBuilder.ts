class QueryBuilder {
    queryModel: any;
    query: any;

    constructor(queryModel: any, query: Record<string, any>) {
        this.queryModel = queryModel;
        this.query = query;
    }

    search(searchableFields: string[]) {
        if (this?.query.searchTerm) {
            this.queryModel.where.OR = searchableFields.map((field) => ({
                [field]: { contains: this.query.searchTerm, mode: 'insensitive' },
            }));
        }
        return this;
    }

    filter(extraFilters: Record<string, any> = {}) {
        const queryObj = { ...this.query, ...extraFilters }; // if you add the any filter then you need to add below array.
        const excludedFields = ['page', 'limit', 'searchTerm'];
        excludedFields.forEach((el) => delete queryObj[el]);

        const where: Record<string, any> = {};
        for (const [key, value] of Object.entries(queryObj)) {
            if (value !== undefined && value !== '') {
                where[key] = value;
            }
        }

        this.queryModel.where = { ...this.queryModel.where, ...where };
        return this;
    }

    paginate() {
        const page = Number(this.query.page) || 1;
        const limit = Number(this.query.limit) || 10;
        const skip = (page - 1) * limit;
        this.queryModel.pagination = { skip, take: limit };
        return this;
    }

    async getPaginationInfo() {
        const total = await this.queryModel.model.count({ where: this.queryModel.where });
        const limit = Number(this.query.limit) || 10;
        const totalPage = Math.ceil(total / limit);
        const page = Number(this.query.page) || 1;

        return {
            total,
            totalPage,
            page,
            limit
        };
    }
}

export default QueryBuilder;