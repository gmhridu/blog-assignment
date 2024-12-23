"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const errorSources = err.issues.map((issue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    const status = 400;
    return {
        status,
        message: 'Zod Validation Error',
        errorSources,
    };
};
exports.default = handleZodError;
