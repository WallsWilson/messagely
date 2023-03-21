const { BCRYPT_WORK_FACTOR } = require("../config");
const ExpressError = require("../expressError");
const { register } = require("../models/user");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post('/login', async function (req, res ,next) {
    try {
        const {username, password} = req.body;
        const results = await db.query(
            `SELECT password FROM useres WHERE username = $1`, [username]);
        const user = results.rows[0];

        if(user) {
            if(await bcrypt.compare(password,user.password) === True) {
                return res.json({message: 'Logged in!'})
            }
        }
        throw new ExpressError("Invalid user/password", 400);
    }catch (err){
        return next(err);
    }
});


/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post("/register", async function(req, res, next){
    try{
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        const results = register()

        return res.json(results.rows[0]);
    } catch (err){
        return next(err);
    }
});