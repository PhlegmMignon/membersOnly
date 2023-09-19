const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

let localStrat = new LocalStrategy(async (username, password, done) => {
  try {
    console.log("local strat active");
    const user = await User.findOne({ username: username });
    if (!user) {
      return done(null, false, { message: "Incorrect username" });
    }
    if (user.password !== password) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

module.exports = localStrat;
