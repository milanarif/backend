const sqlite3 = require('sqlite3').verbose()
const Promise = require('bluebird');
const bcrypt = require('bcrypt');

class AppDao {
    constructor(DBSOURCE) {
        this.db = new sqlite3.Database(DBSOURCE, (err) => {
            if (err) {
                console.log("Could not connect to database", err);
            }
            else {
                console.log('Connected to database');
                this.db.run(`CREATE TABLE user (id INTEGER PRIMARY KEY, name TEXT, password TEXT, email TEXT)`, (err) => {
                    if (err) {
                        // Table already created
                        console.log('Schema Exists');
                    } else {
                        console.log('New Schema');
                        let insert = 'INSERT INTO user (name, password, email) VALUES (?,?,?)'
                        this.db.run(insert, ["Adam Adamsson", bcrypt.hashSync('adamadam123', 11), "adam@adamsson.se"])
                        this.db.run(insert, ["Bertil Bertilsson", bcrypt.hashSync('bertilbertil123', 11), "bertil@bertilsson.se"])
                        this.db.run(insert, ["David Davidsson", bcrypt.hashSync('daviddavid123', 11), "david@davidsson.se"])
                    }
                });
            }
        })
    }

    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function(err) {
                if (err) {
                    console.log('Error with query: ' + sql);
                    console.log(err);
                    reject(err)
                }
                else {
                    resolve({id : this.lastID})
                }
            })
        })
    }

    get(sql, params = []) {
        return new Promise((resolve, reject) => {
          this.db.get(sql, params, (err, result) => {
            if (err) {
              console.log('Error running sql: ' + sql)
              console.log(err)
              reject(err)
            } else {
                resolve(result)
            }
          })
        })
    }

    all(sql, params = []) {
        return new Promise((resolve, reject) => {
          this.db.all(sql, params, (err, rows) => {
            if (err) {
              console.log('Error running sql: ' + sql)
              console.log(err)
              reject(err)
            } else {
              resolve(rows)
            }
          })
        })
      }

}

module.exports = AppDao

