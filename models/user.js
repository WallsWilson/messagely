/** User class for message.ly */



/** User of the site. */

class User {

  /** register new user -- returns
   *    {username, password, first_name, last_name, phone}
   */

  static async register({username, password, first_name, last_name, phone}) {
    const results = await db.query(
    `INSERT INTO users (username,
      password,
      first_name,
      last_name,
      phone)
      VALUES($1, $2, $3, $4, $5)
      RETURNING username, password, first_name, last_name, phone
    `, [username, password, first_name, last_name, phone]);
    
    return results.rows[0];
   }

  /** Authenticate: is this username/password valid? Returns boolean. */

  static async authenticate(username, password) {
    const results = await db.query(
      `SELECT username, password FROM users
      RETURNING username, password`, [username, password]);
      const tokenFromBody = req.body._token;
      const payload = jwt.verify(tokenFromBody, SECRET_KEY);
      req.username = payload;
      return next();
   }

  /** Update last_login_at for user */

  static async updateLoginTimestamp(username) {
    const results = await db.query(
      `INSERT INTO users(
        username,
        last_login_at)
        VALUES ($1, current_timestamp)
        RETURNING username, last_login_at`, [username]
    );
        return results.rows[0]
   }

  /** All: basic info on all users:
   * [{username, first_name, last_name, phone}, ...] */

  static async all() { 
    const results = await db.query(
      `SELECt * FROM users`, [username, password, first_name, last_name, phone]
    )
    return results.rows[0];
  }

  /** Get: get user by username
   *
   * returns {username,
   *          first_name,
   *          last_name,
   *          phone,
   *          join_at,
   *          last_login_at } */

  static async get(username) { 
    const results = await db.query(
      `SELECT username,
              first_name,
              last_name,
              phone,
              join_at,
              last_login_at
              FROM username
              RETURNING username, first_name, last_name, phone, join_at, last_login_at` , [username, first_name, last_name, phone, join_at, last_login_at]);
          return results.rows[0]    
  }

  /** Return messages from this user.
   *
   * [{id, to_user, body, sent_at, read_at}]
   *
   * where to_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesFrom(username) { }

  /** Return messages to this user.
   *
   * [{id, from_user, body, sent_at, read_at}]
   *
   * where from_user is
   *   {username, first_name, last_name, phone}
   */

  static async messagesTo(username) { }
}


module.exports = User;