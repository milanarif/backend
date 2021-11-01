class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createTable() {
        const sql = `CREATE TABLE user (id INTEGER PRIMARY KEY, name TEXT, password TEXT, email TEXT)`
        return this.dao.run(`CREATE TABLE user (id INTEGER PRIMARY KEY, name TEXT, password TEXT, email TEXT)`);
    }

    async create(name, password, email) {
        let newUser = await this.dao.run(
          `INSERT INTO user (name, password, email)
            VALUES (?, ?, ?)`,
          [name, password, email]);
        return newUser.id;
    }

    async delete(id) {
        return this.dao.run(
          `DELETE FROM user WHERE id = ?`,
          [id]);
    }
    
    async get(id) {
      let user = await this.dao.get(
        `SELECT id, name, email FROM user WHERE id = ?`,
        [id]);
      return user;
    }

    async search(email) {
      let user = await this.dao.get(
        `SELECT id, name, email FROM user WHERE email = ?`,
        [email]);
      return user;
    }

    async getPasswordHashByEmail(email) {
      let user = await this.dao.get(
        `SELECT password FROM user WHERE email = ?`,
        [email]);
      return user.password;
    }

    getAll() {
      return this.dao.all(`SELECT id, name, email FROM user`)
    }
}

module.exports = UserRepository;
