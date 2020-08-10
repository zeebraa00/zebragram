import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

import { adjectives, nouns } from "./words";
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

export const generateSecret = () => {
    const randomNumber = Math.floor( Math.random() * adjectives.length );
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

 const sendMail = (email) => {
    const options = {
        auth: {
            api_user: process.env.SENDGRID_USERNAME,
            api_key: process.env.SENDGRID_PASSWORD
           }
    };
    const client = nodemailer.createTransport(sgTransport(options));
    return client.sendMail(email);
};
 
export const sendSecretMail = (address, secret) => {
    const email = {
        from : "zeebraa00@gmail.com",
        to : address,
        subject : "🦓zebragram🦓 로그인 Secret Key🔒",
        html : `안녕하세요! 🦓zebragram🦓 운영팀입니다. <br /><br /> 회원님의 로그인 Secret Key는 <strong>${secret}</strong>입니다. <br /><br /> 즐거운 이용하세요~ 🥰🥰`
    };
    return sendMail(email);
}