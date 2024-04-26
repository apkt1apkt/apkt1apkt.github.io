import { isObject, mapValues } from 'lodash';

export const tryParse = <T extends Obj = Obj>(data: Nullable<string>): T => {
  if (!data) return {} as T;
  try {
    return JSON.parse(data) as T;
  } catch (e) {
    return {} as T;
  }
};

export const normalizeObj = <T extends Obj>(obj: T): Normalized<T> => {
  return mapValues(obj, (value) => {
    if (value === '' || value === undefined) {
      return null;
    }
    if (typeof value === 'string') {
      const strValue = (value as string)?.trim().toLowerCase();
      if (strValue === 'false') return false;
      if (strValue === 'true') return true;
    }
    return value;
  }) as T;
};

export const pickShapeStrict = <T extends Obj>(shape: T, obj: Nullable<Obj>): T => {
  const result: Obj = Array.isArray(shape) ? [] : {};

  Object.keys(shape).forEach((key) => {
    if (isObject(shape[key])) {
      result[key] = isObject(obj?.[key]) ? pickShapeStrict(shape[key], obj[key]) : createEmptyShape(shape[key]);
    } else {
      result[key] = obj && key in obj && typeof obj[key] === typeof shape[key] ? obj[key] : '';
    }
  });

  return result as T;
};

const createEmptyShape = (shape: Obj) => {
  if (Array.isArray(shape)) {
    return [];
  } else if (isObject(shape)) {
    const emptyObject: Obj = {};
    Object.keys(shape).forEach((key) => {
      emptyObject[key] = createEmptyShape(shape[key]);
    });
    return emptyObject;
  } else {
    return '';
  }
};

type Normalized<T> = {
  [P in keyof T]: T[P] extends string | undefined ? string | null : T[P];
};
