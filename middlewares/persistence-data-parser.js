const Sequelize = require("sequelize");

function parseFilterMethod(filterString) {
  const filter = {};
  // separamos el by_ del resto
  if (filterString.split("_").length > 0) {
    const auxFields = filterString.substring(filterString.indexOf("_") + 1);
    if (auxFields.indexOf("-") === -1) {
      filter.field = auxFields;
    } else {
      const arrayParse = auxFields.split("-");
      [filter.field, filter.condition] = arrayParse;
    }
  }
  return filter;
}

const parseFilter = (key, value) => {
  const filter = {};
  const filterObject = {};
  const filterParsedObject = parseFilterMethod(key);
  if (Object.prototype.hasOwnProperty.call(filterParsedObject, "condition")) {
    const op = Sequelize.Op[filterParsedObject.condition];
    filterObject[op] = `%${value}%`;
  } else {
    // Si no hay una condicion especifica, usamos eq como default
    filterObject[Sequelize.Op.eq] = value;
  }

  filter[filterParsedObject.field] = filterObject;
  return filter;
};

const parseOrder = (key, value) => {
  const splitted = key.split("_");
  const path = splitted[1];
  if (value !== "asc" && value !== "desc") {
    throw Error("Los valores admitidos de ordenamiento son ASC y DESC");
  }
  return [path, value];
};

/**
 * Parsea datos de filtros, order y paging que se pueden encontrar en el request.
 * Los params correspondientes a filtros deben seguir el patron:
 * by_path-sequelizeCondition=value
 * Los params correspondientes a orders deben seguir el patron:
 * orderBy_path=ASC o orderBy_path=DESC
 * Los params de paginacion son page y pageSize
 */
const parse = async (req, res, next) => {
  const paramKeys = Object.keys(req.query);
  const filterRegex = new RegExp("by_.+");
  const orderRegex = new RegExp("orderBy_.+");
  const filters = [];
  const orders = [];

  for (const key of paramKeys) {
    if (filterRegex.test(key)) {
      filters.push(parseFilter(key, req.query[key]));
    }
    if (orderRegex.test(key)) {
      orders.push(parseOrder(key, req.query[key]));
    }
  }

  const pagingInfo = {};
  if (req.query.page) {
    pagingInfo.page = parseInt(req.query.page, 10);
  }
  if (req.query.pageSize) {
    pagingInfo.pageSize = parseInt(req.query.pageSize, 10);
  }

  req.query.filters = filters;
  req.query.orders = orders;
  // req.query.pageAll evita que se limite el listado
  if (!req.query.pageAll) {
    req.query.paging = pagingInfo;
  }
  console.log("Filters", filters);
  console.log("Orders", orders);
  console.log("Paging", pagingInfo);
  await next();
};

module.exports = parse;
