"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const blog_route_1 = require("../modules/blogs/blog.route");
const admin_route_1 = require("../modules/admin/admin.route");
const router = (0, express_1.Router)();
const routes = [
    {
        path: '/auth',
        route: user_route_1.UserRouter,
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogRoutes,
    },
    {
        path: '/admin',
        route: admin_route_1.AdminRoutes,
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
