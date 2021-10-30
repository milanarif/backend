class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `CREATE TABLE user (userId INTEGER PRIMARY KEY, userName TEXT, password TEXT, email TEXT)`
        return this.dao.run(`CREATE TABLE user (userId INTEGER PRIMARY KEY, userName TEXT, password TEXT, email TEXT)`);
    }

    create(userName, password, email) {
        return this.dao.run(
          `INSERT INTO user (userName, password, email)
            VALUES (?, ?, ?)`,
          [userName, password, email])
    }

    delete(id) {
        return this.dao.run(
          `DELETE FROM user WHERE userId = ?`,
          [id]
        )
    }
    
    async getById(id) {
      let user = await this.dao.get(
        `SELECT * FROM user WHERE userId = ?`,
        [id])
      return user;
    }

    getAll() {
      return this.dao.all(`SELECT * FROM user`)
    }
}

module.exports = UserRepository;