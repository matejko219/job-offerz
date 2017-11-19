/**
 * Created by DELL on 2017-11-19.
 */
const handleError = require('../error-handlers').handleError;

const requiredParams = (paramNamesArr) => {
  return (req, res, next) => {
      paramNamesArr.some(paramName => {
          const param = getNestedValue(req, paramName);
          if (!param || param === '') {
              const errorParamName = paramName.substring(paramName.indexOf('.') + 1);
              handleError(`Parametr ${errorParamName} jest wymagany.`, 400, next);
              return true;
          } else return false;
      });

      next();
  };
};

const getNestedValue = (obj, key) => key.split(".").reduce((result, key) => result[key], obj);


module.exports = requiredParams;