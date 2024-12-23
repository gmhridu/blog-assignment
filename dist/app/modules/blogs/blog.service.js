"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builders/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const blog_constant_1 = require("./blog.constant");
const blogs_model_1 = require("./blogs.model");
const createBlogIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogs_model_1.Blog.create(payload);
    return result;
});
const getAllBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blogs_model_1.Blog.find().populate('author'), query)
        .search(blog_constant_1.BlogSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield blogQuery.Query;
    return result;
});
// retrieved users posted blogs using authorId
const getBlogsByAuthorId = (authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const author = yield user_model_1.User.findById(authorId);
    if (!author) {
        throw new AppError_1.default(404, 'Author not found!');
    }
    if (author.isBlocked) {
        throw new AppError_1.default(403, 'Author is blocked. Cannot retrieve blogs.');
    }
    if (author.isDeleted) {
        throw new AppError_1.default(403, 'Author is deleted. Cannot retrieve blogs.');
    }
    const result = yield blogs_model_1.Blog.find({ author: authorId }).populate('author');
    return result;
});
const updateBlogIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogs_model_1.Blog.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogs_model_1.Blog.findByIdAndDelete(id);
    return result;
});
exports.BlogServices = {
    createBlogIntoDB,
    getAllBlogsFromDB,
    getBlogsByAuthorId,
    updateBlogIntoDB,
    deleteBlogFromDB,
};
