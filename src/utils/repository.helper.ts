import { ILike, Repository } from "typeorm"

/**
 * pagination obj in find options typeorm
 * queryObj = {limit, offset, page}
 */
export const paginateObj = (queryObj: any = {}) => {
  let limit = queryObj.limit ?? 50;
  const page = queryObj.page ?? 1;
  if (limit < 0 || limit > 500) {
    limit = 50;
  }
  const offset = (page - 1) * limit;
  return {
    take: limit,
    skip: offset
  };
};

/**
 * where obj in find options typeorm
 */
export const whereObj = (query: any, searchObj: Object) => {
  const result = {};
  for (const col in searchObj) {
    if (!query[col]) {
      continue;
    }
    const operator = searchObj[col];
    switch (operator) {
      case '=':
        result[col] = query[col];
        break;
      default:
        result[col] = ILike(`%${query[col]}%`);
        break;
    }
  }
  return {
    where: result
  };
};

/**
 * find option with paginate, where, select
 * searchObj = {name: 'like', 'email': '='}
 */
export const paginatorNavFind = async (repository: Repository<any>, query: any, searchObj?: Object, selectObj?: Object) => {
  const where = whereObj(query, searchObj);
  return {
    total: await repository.count(where),
    items: await repository.find({...selectObj, ...paginateObj(query), ...where, ...{
      order: {
        id: "DESC",
      },
    }}),
  }
};

/**
 * save form body to entity object
 *
 * @param repository 
 * @param dto object form
 * @returns item entity
 */
export const saveItem = async (repository: Repository<any>, dto: any) => {
  const entity: any = repository.target;
  let item: any = null;
  if (dto.id) {
    item = await repository.findOneBy({
      id: dto.id
    });
    if (!item) {
      return null;
    }
  } else {
    item = repository.create();
  }
  entity.filled.forEach((col: string) => {
    if (typeof dto[col] === 'string' || typeof dto[col] === 'number') {
      item[col] = dto[col];
    }
  })
  return await repository.save(item);
}