"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeDB = void 0;
const mysql_1 = require("mysql");
class HomeDB {
    Connect() {
        if (!HomeDB.pool) {
            HomeDB.pool = (0, mysql_1.createPool)({
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
    static ASelectFrom(Query, Table, Where, Parmter, ComFunc) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                HomeDB.pool.query("SELECT " + Query + " FROM " + Table + " WHERE " + Where, Parmter, (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    ;
    static AUpdate(Query, Table, Where, Parmter, ComFunc) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                HomeDB.pool.query(`UPDATE ${Table} SET ${Query} WHERE ${Where}`, Parmter, (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    ;
    static ADelete(Table, Where, Parmter, ComFunc) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                HomeDB.pool.query(`DELETE FROM ${Table} WHERE ${Where}`, Parmter, (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(results);
                });
            });
        });
    }
    ;
    static AInsert(Query, Table, Parmter, ComFunc) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                HomeDB.pool.query(`INSERT IGNORE INTO ${Table} SET ${Query}`, Parmter, (error, Result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(Result);
                });
            });
        });
    }
    ;
    static AQueryExc(Query, Parmter) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                HomeDB.pool.query(Query, Parmter, (error, Result) => {
                    if (error) {
                        return reject(error);
                    }
                    return resolve(Result);
                });
            });
        });
    }
    ;
}
exports.HomeDB = HomeDB;
;
