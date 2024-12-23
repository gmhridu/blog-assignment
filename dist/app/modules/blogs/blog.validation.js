"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidations = void 0;
const zod_1 = require("zod");
const createBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: 'Title is required',
        })
            .min(5, 'Title must be at least 5 characters long')
            .max(100, 'Title can not be more than 100 characters'),
        content: zod_1.z.string({
            required_error: 'Content is required',
        }),
        author: zod_1.z.string(),
        isPublished: zod_1.z.boolean().optional().default(true),
    }),
});
exports.BlogValidations = {
    createBlogValidationSchema,
};
