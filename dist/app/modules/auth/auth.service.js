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
exports.AuthServices = void 0;
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const auth_utlis_1 = require("./auth.utlis");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the user is exist with this email
    const user = yield user_model_1.User.isUserExist(payload === null || payload === void 0 ? void 0 : payload.email);
    if (!user) {
        throw new Error('This user is not found!');
    }
    ;
    // check if the user is already deleted
    const isUserDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isUserDeleted) {
        throw new Error('This user is deleted!');
    }
    const isUserBlocked = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (isUserBlocked) {
        throw new Error('This user is blocked!');
    }
    // check if the password is correct
    if (!(yield user_model_1.User.isPasswordMatch(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new Error('Incorrect password!');
    }
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = (0, auth_utlis_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, auth_utlis_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { userId, iat } = decoded;
    const user = yield user_model_1.User.isUserExist(userId);
    if (!user) {
        throw new AppError_1.default(404, 'This user is not found!');
    }
    const isUserDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
    if (isUserDeleted) {
        throw new AppError_1.default(403, 'This user is deleted!');
    }
    const isUserBlocked = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (isUserBlocked) {
        throw new AppError_1.default(403, 'This user is blocked!');
    }
    const jwtPayload = {
        userId: user === null || user === void 0 ? void 0 : user.email,
        role: user === null || user === void 0 ? void 0 : user.role,
    };
    const accessToken = (0, auth_utlis_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
exports.AuthServices = {
    loginUserIntoDB,
    refreshToken,
};