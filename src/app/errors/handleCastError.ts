import mongoose from 'mongoose';
import { TError, TErrorResponse } from '../interface/error';

const handleCastError = (err: mongoose.Error.CastError): TErrorResponse => {
  const errorSources: TError[] = [
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

export default handleCastError;
