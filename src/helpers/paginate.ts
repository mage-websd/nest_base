import { Repository, SelectQueryBuilder } from 'typeorm';

export const getLimitOffset = (params: any) => {
  return {
    limit:
      params.limit &&
      !isNaN(params.limit) &&
      params.limit <= 200 &&
      params.limit > 0
        ? params.limit
        : 10,
    offset: params.offset && params.offset > 0 ? params.offset : 0,
  };
};

export const paginate = async (
  queryBuilder: SelectQueryBuilder<any>,
  params: any,
  isHaving: Repository<any> = null,
  isGetRaw = true,
) => {
  const { limit, offset } = getLimitOffset(params);
  let items: any[] = [];
  let total: number = 0;

  if (isHaving) {
    const qbHaving = queryBuilder.clone();
    qbHaving.select('1').orderBy();
    const rawSqlParams = qbHaving.getQueryAndParameters();
    const queryCountGroup = `select count(*) as total from (${rawSqlParams[0]}) as t`;
    const countQuery = await isHaving.query(queryCountGroup, rawSqlParams[1]);

    if (countQuery.length > 0) {
      total = Number(countQuery[0].total);
    }
  } else {
    total = await queryBuilder.getCount();
  }

  if (total === 0) {
    return {
      total,
      items,
    };
  }

  queryBuilder.limit(limit).offset(offset);

  if (isGetRaw) {
    items = await queryBuilder.getRawMany();
  } else {
    items = await queryBuilder.getMany();
  }

  return {
    total,
    items,
  };
};
