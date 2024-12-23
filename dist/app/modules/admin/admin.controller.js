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
exports.AdminControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const admin_service_1 = require("./admin.service");
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield admin_service_1.AdminServices.getAllUsersFromDB();
    (0, sendResponse_1.default)(res, {
        status: 200,
        success: true,
        message: 'Users fetched successfully',
        data: users,
    });
}));
const blockedAUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield admin_service_1.AdminServices.blockedAUserIntoDB(userId);
    (0, sendResponse_1.default)(res, {
        status: 200,
        success: true,
        message: 'User blocked successfully',
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield admin_service_1.AdminServices.deleteAUserIntoDB(userId);
    (0, sendResponse_1.default)(res, {
        status: 200,
        success: true,
        message: 'User deleted successfully',
        data: result,
    });
}));
const deleteABlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield admin_service_1.AdminServices.deleteABlogFromDB(id);
    (0, sendResponse_1.default)(res, {
        status: 200,
        success: true,
        message: 'Blog deleted successfully',
        data: result,
    });
}));
exports.AdminControllers = {
    blockedAUser,
    getAllUsers,
    deleteUser,
    deleteABlog,
};
