Elkaisar.HomeDB = Elkaisar.HomeDB || {};
Elkaisar.HomeDB.ASelectFrom = function (Query, Table, Where, Parmter, ComFunc) {
  return new Promise((resolve, reject) => {
      Elkaisar.MysqlHome.query("SELECT " + Query + " FROM " + Table + " WHERE " + Where, Parmter, (error, results) => {
          if (error) {
              return reject(error);
          }
          return resolve(results);
      });
  });
};


Elkaisar.HomeDB.AUpdate = function (Query, Table, Where, Parmter, ComFunc) {


  return new Promise((resolve, reject) => {
      Elkaisar.MysqlHome.query(`UPDATE ${Table} SET ${Query} WHERE ${Where}`, Parmter, (error, results) => {
          if (error) {
              return reject(error);
          }
          return resolve(results);
      });
  });
};
Elkaisar.HomeDB.ADelete = function (Table, Where, Parmter, ComFunc) {


  return new Promise((resolve, reject) => {
      Elkaisar.MysqlHome.query(`DELETE FROM ${Table} WHERE ${Where}`, Parmter, (error, results) => {
          if (error) {
              return reject(error);
          }
          return resolve(results);
      });
  });
};

Elkaisar.HomeDB.AInsert = function (Query, Table, Parmter, ComFunc) {

  return new Promise((resolve, reject) => {
      Elkaisar.MysqlHome.query(`INSERT IGNORE INTO ${Table} SET ${Query}`, Parmter, (error, Result) => {
          if (error) {
              return reject(error);
          }
          return resolve(Result);
      });
  });
};


Elkaisar.HomeDB.AQueryExc = function (Query, Parmter) {

  return new Promise((resolve, reject) => {
      Elkaisar.MysqlHome.query(Query, Parmter, (error, Result) => {
          if (error) {
              return reject(error);
          }
          return resolve(Result);
      });
  });
};



Elkaisar.HomeDB.AExist = function (Table, Where, Parmter, ComFunc) {

  return new Promise((resolve, reject) => {

      Elkaisar.MysqlHome.query(`SELECT EXISTS(SELECT * FROM ${Table} WHERE ${Where}) AS val`, Parmter, (error, results) => {
          if (error) {
              return reject(error);
          }
          if (!results)
              resolve(false);
          if (!results[0])
              resolve(false);
          if (results[0].val === 0)
              resolve(false);
          if (results[0].val === 1)
              resolve(true);
      });
  });
};