import { TError, TErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorSources: TError[] = [
    {
      path: '',
      message: `${extractedMessage} is already exists`,
    },
  ];

  const status = 400;

  return {
    status,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleDuplicateError;
