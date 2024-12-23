"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const blog_controller_1 = require("./blog.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
router.post('/create-blog', (0, auth_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(blog_validation_1.BlogValidations.createBlogValidationSchema), blog_controller_1.BlogControllers.createBlog);
router.get('/:authorId', (0, auth_1.default)(user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin), blog_controller_1.BlogControllers.getBlogsByAuthorId);
router.put('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), blog_controller_1.BlogControllers.updateBlog);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.user), blog_controller_1.BlogControllers.deleteBlog);
router.get('/', blog_controller_1.BlogControllers.getAllBlogs);
exports.BlogRoutes = router;
