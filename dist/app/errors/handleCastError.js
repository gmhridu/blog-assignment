"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const errorSources = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    const status = 400;
    return {
        status,
        message: 'Cast Error',
        errorSources,
    };
};
exports.default = handleCastError;
