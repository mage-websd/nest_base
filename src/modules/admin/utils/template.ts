import { Response } from 'express';

export const renderHtml = async (res: Response, viewPath: string, data: any = {}) => {
  return new Promise((resolve, reject) => {
    data = Object.assign(data, {
      layout: null
    });
    res.render(
      viewPath,
      data,
      function (err, html) {
        if (html) {
          resolve(html);
        } else {
          reject(err);
        }
      }
    );
  })
};
