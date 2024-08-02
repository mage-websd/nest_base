import { resolve } from 'path';
import { readFileSync } from 'fs';
import config from 'src/config';
import { validateField } from '../utils';

const langObj = (lang: string) => {
  if (!lang) {
    lang = config.APP_LANG;
  }
  const f = readFileSync(resolve('lang', lang, 'message.json'), 'utf8');

  return JSON.parse(f);
};

const lang = langObj(config.APP_LANG);

const __ = (word: string, params?: any) => {
  if (lang[word]) {
    return validateField(lang[word], params);
  }

  return validateField(word, params);
};

export default __;
