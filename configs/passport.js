const User = require ('../models/user');
const bCrypt = require ('bcrypt-nodejs');

function verifyPassword (user, password) {
    return bCrypt.compareSync(password, user.password);
}

function hashPassword (password) {
    return bCrypt.hashSync (password);
}

module.exports = {
    //Set the key to save in the cookie
    serializeUser: (user, done) => {
        done(null, user._id);
    },

    //Provide a way to retrieve the user given the key provided in serializeUser
    deserializeUser: (id, done) => {
        User.findById (id, function(err, user){
            done(err, user);
        });
    },

    verifyLogin: (username, password, done) => {
        User.findOne ({'username': username}, function (err, user){
            if (err) {
                return done (err);
            }

            if (!user){
                console.log ('Invalid username ' + username);
                return done (null, false, {message: 'User not found!'});
            }

            if (!verifyPassword(user, password)){
                console.log ('Invalid password!');
                return done (null, false, {message: 'Invalid password'});
            }

            return done (null, user);
        });
    },

    verifySignup: (username, password, done) => {
        User.findOne ({'username': username}, function (err, user){
            if (err){
                return done (err);
            }

            if (user){
                console.log ('User already exists ' + username);
                return done (null, false, {message: 'User already exists.'});
            } else {
                const newUser = new User ();
                newUser.username = username;
                newUser.password = hashPassword (password);

                newUser.save (function (err){
                    if (err){
                        throw err;
                    } else {
                        console.log ('User ' + username + ' created');
                        return done (null, newUser);
                    }
                });
            }
        });
    }


};