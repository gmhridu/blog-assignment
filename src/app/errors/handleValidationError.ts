import mongoose from 'mongoose';
import { TError, TErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const errorSources: TError[] = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    },
  );

  const status = 400;
  return {
    status,
    message: 'Validation error',
    errorSources,
  };
};

export default handleValidationError;
