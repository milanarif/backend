class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `CREATE TABLE user (userId INTEGER PRIMARY KEY, userName TEXT, password TEXT, email TEXT)`
        return this.dao.run(`CREATE TABLE user (userId INTEGER PRIMARY KEY, userName TEXT, password TEXT, email TEXT)`);
    }

    async create(userName, password, email) {
        let newUser = await this.dao.run(
          `INSERT INTO user (userName, password, email)
            VALUES (?, ?, ?)`,
          [userName, password, email]);
        return newUser.id;
    }

    delete(id) {
        return this.dao.run(
          `DELETE FROM user WHERE userId = ?`,
          [id]
        )
    }
    
    async get(id) {
      let user = await this.dao.get(
        `SELECT * FROM user WHERE userId = ?`,
        [id]);
      return user;
    }

    getAll() {
      return this.dao.all(`SELECT * FROM user`)
    }
}

module.exports = UserRepository;