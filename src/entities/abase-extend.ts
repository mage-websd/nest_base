import * as moment from "moment";

export class AbaseExtends {
  getDate(prop: string): string {
    if (typeof this[prop] === 'undefined' || !this[prop]) {
      return '';
    }
    return moment(this[prop]).format('yyyy-MM-DD');
  }
}
