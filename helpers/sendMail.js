import nodemailer from "nodemailer";
import "dotenv/config";

const { META_FROM, META_PASSWORD } = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: META_FROM,
        pass: META_PASSWORD,
    },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = data => {
    const email = {...data, from: META_FROM};
    return transport.sendMail(email)
}

export default sendEmail