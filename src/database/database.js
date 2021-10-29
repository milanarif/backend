const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "./user.db"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    }else{
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE user (userId INTEGER PRIMARY KEY, userName TEXT, password TEXT, email TEXT)`,
            (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                let insert = 'INSERT INTO user (userName, password, email) VALUES (?,?,?)'
                db.run(insert, ["Adam Adamsson","adamadam123","adam@adamsson.se"])
                db.run(insert, ["Bertil Bertilsson","bertilbertil123","bertil@bertilsson.se"])
                db.run(insert, ["David Davidsson","daviddavid123","david@davidsson.se"])
            }
        })
    }
})

module.exports = db

