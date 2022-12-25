import '../middleware/auth.js';
import passport from "passport";
import jwt from'jsonwebtoken';

const signIn = (req, res, next) => {
    let exp =  '2h';
    // console.log(req.body);
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            return res.status(401).json({ message: info.message })
          }
          req.login(
            user, { session: false },
            async (error) => {
              if (error) return next(error);
              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: exp});
              return res.json({message:info.message, user_id:user._id, token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }

  export default signIn;