import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET
}

const verifyUser = async (payload, done) => {
    try {
         const user = await prisma.user({id : payload.id})
         if (user !== null) {
             return done(null, user);
         } else {
             return done(null, false);
         }
    } catch (error) {
        return done(error, false);
    }
};

export const authenticateJwt = (req, res, next) => 
    passport.authenticate("jwt", { sessions : false }, (error, user) => {
        if(user) {
            req.user=user;
            // verifyUser를 통해 사용자를 받아오고, 사용자가 존재하면 그 사용자 정보를 req 객체에 붙여주는 역할을 함 : 즉 로그인된 상태라면 모든 graphql 요청에 사용자 정보가 추가되어서 요청됨
        } 
        next();
    })(req,res,next);

passport.use(new Strategy(jwtOptions, verifyUser));
passport.initialize();