import 'dotenv/config';

export const dbConfig =
{
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPwd: process.env.DB_PWD
}

export const svConfig =
{
    port: process.env.PORT,
    host: process.env.HOST
}

export const authConfig =
{
    mailType: process.env.MAIL_TYPE,
    mailUser: process.env.MAIL_USER,
    mailSupport: process.env.MAIL_SUPPORT,
    ClientID: process.env.CLIENT_ID,
    ClientSecret: process.env.CLIENT_SECRET,
    RefreshToken: process.env.REFRESH_TOKEN,
    AccessToken: "",
    jwtSecret: process.env.JWT_SECRET
}

export const cloudinaryConfig = 
{
    cloudName: process.env.CLOUD_NAME,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
}