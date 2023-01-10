import sql from 'k6/x/sql';

// connectionString = Server=myServerAddress;Database=myDataBase;Uid=myUsername;Pwd=myPassword;SslMode=Preferred;

const db = sql.open(
  'mysql',
  `server=fidismaster.chwyjj5m8m4u.us-east-1.rds.amazonaws.com;
   uid=app-db-ms8-operations-master
   pwd=...;database=db-ms8-operations-master;`,
);

export function execDb(query) {
  // const connectMysql = `server=${server};uid=${user};pwd=${password};database=${dataBase};`;
  // const connectionString = `Server=${server};Database=${dataBase};User=${user};Password=${password};`;

  const results = sql.query(db, query);

  return results;
}

export function teardown() {
  db.close();
}
