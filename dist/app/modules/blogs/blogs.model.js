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
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("../user/user.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blogSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
blogSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const author = yield user_model_1.User.findById(this.author);
            if (!author) {
                return next(new AppError_1.default(400, 'Author does not exists!'));
            }
            if (author.isBlocked) {
                return next(new AppError_1.default(403, 'Cannot post: The author is either blocked.'));
            }
            else if (author.isDeleted) {
                return next(new AppError_1.default(403, 'Cannot post: The author is deleted.'));
            }
            if (author.isBlocked && author.isDeleted) {
                return next(new AppError_1.default(403, 'Cannot post: The author is either blocked or deleted.'));
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
blogSchema.pre('find', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const invalidUsers = yield user_model_1.User.find({
                $or: [{ isBlocked: true }, { isDeleted: true }],
            });
            this.where({
                author: { $nin: invalidUsers.map((user) => user._id) },
            });
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
exports.Blog = (0, mongoose_1.model)('Blog', blogSchema);
