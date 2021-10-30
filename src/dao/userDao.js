const db = require('../database/database')


async function getId(id) {
    let sql = "select * from user where userId = " + id;
    const user = db.get(sql, async (err, row) => {
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


module.exports = {getId}
