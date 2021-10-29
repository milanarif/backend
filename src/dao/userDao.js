const db = require('../database/database')


async function getId(id) {
    let sql = "select * from user where userId = " + id;
    db.get(sql, (err, row) => {
        if (err) {
            return err.message;

        }
        if (row == null) {
            return "UNABLE"
        }
        else {
            return row
        }
    });
}

exports.getId = getId;