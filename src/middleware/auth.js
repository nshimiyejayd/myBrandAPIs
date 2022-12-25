import passport from 'passport';
import passportLocal from 'passport-local';
import adminModel from "../models/admin.js";
import JWTstrategy from 'passport-jwt';
import ExtractJWT from 'passport-jwt' ;
import dotenv from "dotenv";
dotenv.config();

let localStrategy = passportLocal.Strategy;
let jwtStrategy = JWTstrategy.Strategy;
let extractJWT = ExtractJWT.ExtractJwt;


// Receive and save user infromation
    passport.use(
      'signup',
      new localStrategy(
        {
          usernameField: 'email',
          passwordField: 'password'
        },
        async (email, password, done) => {
          try {
            const user = await adminModel.create({ email, password });
            return done(null, user);
          } catch (error) {
            done(error);
          }
        }
      )
    );


  // Verify user information if match with what are already saved
    passport.use(
      'login',
      new localStrategy(
        {
          usernameField: 'email',
          passwordField: 'password'
        },
        async (email, password, done) => {
          try {
            const user = await adminModel.findOne({ email });
            if (!user) {
              return done(null, false, { message: 'Email does not found' });
            }
            const validate = await user.isValidPassword(password);
            if (!validate) {
              return done(null, false, { message: 'Wrong Password' });
            }
            return done(null, user, { message: 'Logged in Successfully' });
          } catch (error) {
            return done(error);
          }
        }
      )
    );
    
    passport.use(
      new jwtStrategy(
        {
          secretOrKey: process.env.ACCESS_TOKEN_SECRET,
          jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken()
        },
        async (token, done) => {
          try {
            return done(null, token.user);
          } catch (error) {
            done(error);
          }
        }
      )
    );


// }

// adminInfo();

// export default adminInfo