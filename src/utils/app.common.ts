import { logErrorConsole } from "./logs";
import config from "src/config";

export const sleep = async (time = 10000) => {
  await new Promise((resolve) => setTimeout(() => resolve(true), time));
};


/**
 * array to object with key by column in item array
 *
 * @param arr Array [{col1: val1, col2: val2}]
 * @param col string
 * @returns object json {col1: {item1}, col2: {item2}}
 */
export function keyByColum(arr, col) {
    const result = {};
    arr.forEach((item) => {
        result[item[col]] = item;
    });
    return result;
}

/**
 * format number
 *
 * @param x number
 * @returns 
 */
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * string to json object data
 *
 * @param data string
 * @returns 
 */
export function stringToJson(data) {
  if (!data) {
    return {};
  }
  if (typeof data === 'object') {
    return data;
  }
  try {
    return JSON.parse(data);
  } catch (err) {
    logErrorConsole(err);
    return {};
  }
}


export const objEmptyToNull = (objItem: any, arrKey: string[]) => {
  for (const k of arrKey) {
    if (typeof objItem[k] === 'string' && objItem[k] === '') {
      objItem[k] = null;
    }
  }
  return objItem;
}

export const itemsRenderImgUrl = (items: any[], cols=['image']) => {
  if (!items || items.length === 0) {
    return items;
  }
  items.forEach((item: any) => {
    cols.forEach((col: string) => {
      if (item[col]) {
        item[col] = config.URL_STORAGE + item[col];
      }
    });
  });
  return items;
}
