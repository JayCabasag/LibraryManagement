import { NextApiRequest, NextApiResponse } from "next";
import admin from 'firebase-admin'
import base64 from 'base-64'
import nodemailer from 'nodemailer'
const serviceAccount = require("../../../services/tcumobilelibrary-firebase-adminsdk-mceex-a37b6d1191 (1).json");
const generator = require('generate-password');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const userEmail = req.body.email;

        const snapshot = await db.collection("users").where("email", "==", userEmail).get();
        const userData = snapshot.docs.map((doc) => { return { docId: doc.id, ...doc.data() } });

        // Check if there is user registered under the email provided
        if (userData?.length <= 0) {
            return res.json({ success: false, message: "This email is not yet registered" })
        }

        let password = generator.generate({
            length: 8,
            numbers: true,
            uppercase: true
        });

        const userId = userData?.[0].docId ?? ''
        const newDoc = {
            ...userData[0],
            recovery_password: base64.encode(password)
        }
        await db.collection("users").doc(userId).set(newDoc).then((doc) => {
            try {
                new Promise(async (resolve, reject) => {
                    const transporter = nodemailer.createTransport({
                        // Use your own email service provider here
                        host: 'smtp.gmail.com', // Gmail SMTP server
                        port: 465, // Gmail SMTP port
                        secure: true, // Use SSL
                        auth: {
                            user: 'tculibrarymanagement@gmail.com', // Your Gmail address
                            pass: 'czazzphqywqzoxrm' // Your Gmail password
                        }
                    });

                    const mailOptions = {
                        from: '"Techno Library" tculibrarymanagement@gmail.com>',
                        to: userEmail, // changed 'email' to 'userEmail'
                        subject: 'Password Recovery',
                        text: `Please use the following code to reset your password: ${password}`
                    };

                    try {
                        await transporter.sendMail(mailOptions);
                        resolve({ success: true })
                    } catch (err) {
                        reject({ success: false })
                    }
                }).then(() => {
                    res.status(200).json({
                        success: true,
                        message: 'recovery password has been sent'
                    })
                })
            } catch (error) {
                res.json({
                    success: false,
                    message: 'unable to send password recovery to this email'
                })
            }

        }).catch(() => {
            res.status(500).json({ success: false, message: 'An error occured' });
        })
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}