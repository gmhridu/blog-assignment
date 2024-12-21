import { ZodError, ZodIssue } from 'zod';
import { TError, TErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TErrorResponse => {
  const errorSources: TError[] = err.issues.map((issue: ZodIssue) => {
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

export default handleZodError;
