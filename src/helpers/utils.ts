import __ from './lang';

export const sleep = async (second = 10) => {
  return new Promise((r) => setTimeout(r, second * 1000));
};

/**
 * diff time ms
 * @param start starttime
 * @returns
 */
export const diffTime = (start: bigint) => {
  const end = process.hrtime.bigint();
  return Number(end - start) * 1e-6;
};

/**
 * replace string by var flag :var
 * @param formatMessage
 * @param params
 * @returns
 */
export const validateField = (formatMessage: string, params: any) => {
  let validateMessage = formatMessage;
  for (const keyParam in params) {
    validateMessage = validateMessage.replaceAll(
      `:${keyParam}`,
      params[keyParam],
    );
  }
  return validateMessage;
};

export const responseSuccess = () => {
  return { message: __('success') };
};
