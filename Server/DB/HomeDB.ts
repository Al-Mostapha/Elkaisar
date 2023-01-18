import { createPool, Pool } from 'mysql';

export class HomeDB {
  private static pool: Pool;

  Connect(): Pool {
    if (!HomeDB.pool) {
      HomeDB.pool = createPool({
        connectionLimit: 100,
        host: "localhost",
        user: process.env.HomeDBUser || "root",
        password: process.env.HomeDBPass || "",
        database: process.env.HomeDBName || "elkaisar",
        charset: 'utf8mb4',
        multipleStatements: false
      });
    }
    return HomeDB.pool;
  }

  static async ASelectFrom(Query: string, Table: string, Where: string, Parmter: string[], ComFunc?: Function): Promise<any> {
    return new Promise((resolve, reject) => {
      HomeDB.pool.query("SELECT " + Query + " FROM " + Table + " WHERE " + Where, Parmter, (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    });
  };


  static async AUpdate(Query: string, Table: string, Where: string, Parmter: string[], ComFunc: Function) {
    return new Promise((resolve, reject) => {
      HomeDB.pool.query(`UPDATE ${Table} SET ${Query} WHERE ${Where}`, Parmter, (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    });
  };

  static async ADelete(Table: string, Where: string, Parmter: string[], ComFunc: Function) {
    return new Promise((resolve, reject) => {
      HomeDB.pool.query(`DELETE FROM ${Table} WHERE ${Where}`, Parmter, (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    });
  };

  static async AInsert(Query: string, Table: string, Parmter: string[], ComFunc?: Function) {
    return new Promise((resolve, reject) => {
      HomeDB.pool.query(`INSERT IGNORE INTO ${Table} SET ${Query}`, Parmter, (error, Result) => {
        if (error) {
          return reject(error);
        }
        return resolve(Result);
      });
    });
  };


  static async AQueryExc(Query: string, Parmter: string[]) {
    return new Promise((resolve, reject) => {
      HomeDB.pool.query(Query, Parmter, (error, Result) => {
        if (error) {
          return reject(error);
        }
        return resolve(Result);
      });
    });
  };

};