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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminServices = void 0;
const blogs_model_1 = require("../blogs/blogs.model");
const user_model_1 = require("../user/user.model");
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.find();
    return users;
});
const blockedAUserIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndUpdate({ _id: id }, {
        isBlocked: true,
    }, {
        new: true,
        runValidators: true,
    });
    if (!user) {
        throw new Error('User not found!');
    }
    return user;
});
const deleteAUserIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, {
        isDeleted: true,
    }, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new Error('Failed to delete Student!');
    }
    return result;
});
const deleteABlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogs_model_1.Blog.findByIdAndDelete(id);
    if (!result) {
        throw new Error('Failed to delete Blog!');
    }
    return result;
});
exports.AdminServices = {
    blockedAUserIntoDB,
    getAllUsersFromDB,
    deleteAUserIntoDB,
    deleteABlogFromDB,
};
