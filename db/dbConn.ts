import mysql from 'mysql2/promise';
export const connectInfo = {
    // mysql 접속 설정
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT ? process.env.MYSQL_PORT : ""),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}

type ThandleMySQLQuery = {
    sqlStr: string,
}

export const handleMySQLQuery = async ({sqlStr}: ThandleMySQLQuery) => {
    const connection = await mysql.createConnection(connectInfo);
    
    return new Promise((resolve, reject) => {
        connection.query(sqlStr).then(([results, fields]) => {
            resolve(results);
        }).catch((error) => {
            reject(error);
        })
        connection.end();
    })
}