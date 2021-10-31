class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `CREATE TABLE user (id INTEGER PRIMARY KEY, username TEXT, password TEXT, email TEXT)`
        return this.dao.run(`CREATE TABLE user (id INTEGER PRIMARY KEY, username TEXT, password TEXT, email TEXT)`);
    }

    async create(username, password, email) {
        let newUser = await this.dao.run(
          `INSERT INTO user (username, password, email)
            VALUES (?, ?, ?)`,
          [username, password, email]);
        return newUser.id;
    }

    async delete(id) {
      console.log(id);
        return this.dao.run(
          `DELETE FROM user WHERE id = ?`,
          [id]);
    }
    
    async get(id) {
      let user = await this.dao.get(
        `SELECT * FROM user WHERE id = ?`,
        [id]);
      return user;
    }

    getAll() {
      return this.dao.all(`SELECT * FROM user`)
    }
}

module.exports = UserRepository;
