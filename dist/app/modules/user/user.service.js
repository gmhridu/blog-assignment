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
exports.UserServices = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("./user.model");
const admin_model_1 = require("../admin/admin.model");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.create(payload);
});
const createAdminIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield (0, mongoose_1.startSession)();
    session.startTransaction();
    try {
        // Step 1: Create user with admin role
        const userData = {
            name: payload.name,
            email: payload.email,
            password: payload.password,
            role: 'admin',
        };
        const newUser = yield user_model_1.User.create([userData], { session });
        if (!newUser.length)
            throw new Error('Failed to create admin user');
        // Step 2: Create admin profile and link to the user
        payload.user = newUser[0]._id;
        const newAdmin = yield admin_model_1.Admin.create([payload], { session });
        if (!newAdmin.length)
            throw new Error('Failed to create admin profile');
        // Commit transaction
        yield session.commitTransaction();
        session.endSession();
        return newAdmin[0];
    }
    catch (error) {
        // Rollback transaction
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.UserServices = {
    createUserIntoDB,
    createAdminIntoDB,
};
