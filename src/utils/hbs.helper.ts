import * as hbs from 'hbs';
import { STATUS } from '../constants';

export const hbsHelper = () => {
  hbs.registerHelper('ifIn', function(elem: any, list: any[], options: any) {
    if(list.includes(elem)) {
      return options.fn(this);
    }
    return options.inverse(this);
  });

  hbs.registerHelper('ifEquals', function(arg1: any, arg2: any, options: any) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });

  hbs.registerHelper('optionsHtml', function(value: any, objValues: any) {
    let html = '';
    if (!objValues || typeof objValues.lookupProperty === 'function') {
      objValues = STATUS;
    }
    for (const k in objValues) {
      html += `<option value="${objValues[k]}"${value == objValues[k] ? ' selected' : ''}>${k}</option>`
    }
    return html;
  });
};
