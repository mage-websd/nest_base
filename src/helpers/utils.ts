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
