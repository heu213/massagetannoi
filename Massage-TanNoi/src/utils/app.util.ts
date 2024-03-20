import mapValues from 'lodash/mapValues';
import get from 'lodash/get';
import mixin from 'lodash/mixin';
import { cloneDeep, flatMapDeep, isEmpty, isEqual, isObject, isPlainObject, isTypedArray } from 'lodash';
import _ from 'lodash';
import moment from 'moment';
import fs from 'fs';
import path from 'path';
import { Types } from 'mongoose';

const deeply = (map: any) => {
  return (obj: any, fn: any): any => {
    return map(mapValues(obj, function (v) {
      return isPlainObject(v) ? deeply(map)(v, fn) : v;
    }), fn);
  }
}

const getPaging = (req: any) => {
  let page = Number(get(req,'body.page',get(req, 'query.page', 1) ) );
  page = page <= 0 ? 1 : page;
  let limit = Number(get(req,'body.limit',get(req, 'query.limit', 10) ) );
  limit = limit <= 0 || limit > 200 ? 10 : limit;
  const offset = (page - 1) * limit;
  const pagination = req.query?.pagination === 'false' ? false : true;
  return { page, limit, offset, pagination };
};

const mapLanguage = (obj: any, preferLang = 'vi') => {
  return deeply(_.mapValues)(obj, (val: any, key: any) => {
    return _.get(val, preferLang, _.get(val, 'vi', val));
  });
}

const enumerateDaysBetweenDates = (startTime: number, endTime: number, format = 'YYYYMMDD') => {
  const startDate: any = moment.utc(startTime).utcOffset('+07:00');
  const endDate = moment.utc(endTime).utcOffset('+07:00');
  const dates: any = [endDate.format(format)];

  while (startDate.isBefore(endDate)) {
    dates.push(startDate.format(format));
    startDate.add(1, 'days');
  }
  return dates;
};

const mask = (str: string, mask = '*') => {
  const n = (str || '').length / 1.2;
  return ('' + str).slice(0, -n)
    .replace(/./g, mask)
    + ('' + str).slice(-n);
}

const isValidObjectId = (id: any) => {
  if (Types.ObjectId.isValid(id)) {
    if ((String)(new Types.ObjectId(id)) === id)
      return true;
    return false;
  }
  return false;
}

export function mappingCollectionData(originalObj: any, updateData: any) {
  const clonedData = cloneDeep(originalObj.toJSON());
  const updatedFields: any = [];
  for (var key in updateData) {
    originalObj[key] = updateData[key];
    if (originalObj.isModified(key)) {
      updatedFields.push(key);
    }
  }
  return {
    updatedFields,
    previousData: clonedData,
    updatedData: originalObj,
  }
}


/**
 * @param {string} dir - A path to folder
 * @returns {string[]}  A array path of files inside passing folder
 */

 export function readDirRecursiveSync(dir: string): string[] {
  const BASE_PATH = dir;
  const filesPath = fs.readdirSync(dir).map(el => path.join(BASE_PATH, el));
  const result = filesPath.map((filePath: string, index: number) => {
    try {
      let statFile: fs.Stats = fs.statSync(filePath);
      return statFile.isDirectory() ? readDirRecursiveSync(filePath) : filePath;
    } catch (err) {
      return undefined;
    }
  })
  return flatMapDeep(result.filter(el => el));
}
function sliceInput(date:string|undefined){
  return date? date.slice(0,10): undefined
}
export class ValidDate {
  #valS: any;
  #valE: any;
  #utc: any;
  constructor(value?:any,valueE:any=undefined){
    this.#valS= sliceInput(value);
    this.#valE= sliceInput(valueE);
    const timezoneOffset = new Date().getTimezoneOffset();
    const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60));
    this.#utc = timezoneOffset >= 0 ? -timezoneOffsetHours : timezoneOffsetHours;
  };
  startDate(value:any=undefined){ 
    const _value =value??this.#valS;
    const p_date= this.checkDate(_value)
    return new Date(p_date).setHours(0+this.#utc,0,0)
  };
  endDate (value:any=undefined){
    const _value = value??this.#valE??this.#valS;
    const p_date= this.checkDate(_value);
    return new Date(p_date).setHours(23+this.#utc,59,59)
  }

  checkDate (_value :any=undefined ){
    const value = _value ?? this.#valS
    const fRoot='YYYY-MM-DD'
    const finddForemat = () => ['YYYY-MM-DD','DD-MM-YYYY','YYYY/MM/DD','DD/MM/YYYY']?.find(e => moment(value,e).format(e) === value)
    if(!finddForemat())return null;
    return moment(value,finddForemat()).format(fRoot) as string;
  }
}

function getNestedValue(obj:any, path:any) {
  const parts = path.split('.');
  const filteredParts = parts.filter((part:any) => isNaN(part));
  let value = obj;
  for (const part of parts) {
    if (value) {
      value = value[Array.isArray(value)?+part:part];
    } else {
      value = undefined;
      break;
    }
  }
  return value;
}

export default {
  getPaging,
  mapLanguage,
  enumerateDaysBetweenDates,
  mask,
  isValidObjectId,
  deeply,
  getNestedValue
}