"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class QueryBuilder {
    constructor(Query, query) {
        this.Query = Query;
        this.query = query;
    }
    search(searchableFields) {
        var _a;
        const search = (_a = this.query) === null || _a === void 0 ? void 0 : _a.search;
        if (search) {
            this.Query = this.Query.find({
                $or: searchableFields.map((field) => ({
                    [field]: {
                        $regex: search,
                        $options: 'i',
                    },
                })),
            });
        }
        return this;
    }
    filter() {
        const copyObj = Object.assign({}, this.query);
        const filtering = [
            'search',
            'sortBy',
            'sortOrder',
            'limit',
            'page',
            'fields',
        ];
        filtering.forEach((el) => delete copyObj[el]);
        if (copyObj['filter']) {
            copyObj['author'] = new mongoose_1.default.Types.ObjectId(copyObj['filter']);
            delete copyObj['filter'];
        }
        this.Query = this.Query.find(copyObj);
        return this;
    }
    sort() {
        var _a, _b;
        const sortBy = ((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.sortBy) || 'createdAt';
        const sortOrder = ((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.sortOrder) === 'desc' ? '-' : '';
        const sortQuery = `${sortOrder}${sortBy}`;
        this.Query = this.Query.sort(sortQuery);
        return this;
    }
    paginate() {
        var _a, _b;
        const page = Number((_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
        const limit = Number((_b = this === null || this === void 0 ? void 0 : this.query) === null || _b === void 0 ? void 0 : _b.limit) || 6;
        const skip = (page - 1) * limit;
        this.Query = this.Query.skip(skip).limit(limit);
        return this;
    }
    fields() {
        var _a, _b;
        const fields = ((_b = (_a = this === null || this === void 0 ? void 0 : this.query) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.split(',').join(' ')) || '-__v';
        this.Query = this.Query.select(fields);
        return this;
    }
}
exports.default = QueryBuilder;
