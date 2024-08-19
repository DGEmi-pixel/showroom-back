import nodemailer from 'nodemailer'
import {google} from 'googleapis'
import { authConfig } from '../config/config'
import { ApiError } from '../constants/error.constant'

const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
    authConfig.ClientID,
    authConfig.ClientSecret,
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: authConfig.RefreshToken,
});

const getAccessToken = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
            if (err || !token) {
                console.error('Error getting access token', err);
                reject(err || new Error('Failed to obtain access token'));
            } else {
                authConfig.AccessToken = token;
                resolve(token);
            }
        });
    });
};

const sendMail = async(to: string, name: string, subject: string, text: string): Promise<ApiError> => {
    try {
        await getAccessToken();

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: authConfig.mailUser,
                clientId: authConfig.ClientID,
                clientSecret: authConfig.ClientSecret,
                refreshToken: authConfig.RefreshToken,
                accessToken: authConfig.AccessToken
            }
        });

        //[ ] ESTRUCTURA DEL BODY DEL CORREO
        const htmlContent = `
            <div>
                <h3>
                    Mensaje enviado de <span style="color: #0652DD;"> ${name} </span> <span style="color: #0652dd">${to}</span>
                </h3>
                <p>${text}</p>
            </div>
        `;

        let info = await transporter.sendMail({
            from: authConfig.mailUser,
            to: authConfig.mailSupport,
            subject: subject,
            text: text,
            html: htmlContent
        });

        return ({
            message: '¡Correo enviado!',
            statusCode: 200,
            details: info.messageId
        })

    } catch (error) {
        const apiError: ApiError = {
            message: 'Error al enviar el correo',
            statusCode: 500,
            details: error,
        };

        return apiError
    }
}

export const contactService = {
    sendMail
}