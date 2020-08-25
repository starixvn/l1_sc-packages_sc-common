import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

import logger from "./../logger";

const getTokenFromHeaders = (req) => {
    const tokenType = "Bearer";
    const {
        headers: { authorization },
    } = req;

    if (authorization && authorization.split(" ")[0] === tokenType) {
        return authorization.split(" ")[1];
    }
    return null;
};

const getSignInKey = (client) => (header, callback) => {
    client.getSigningKey(header.kid, (error, key) => {
        if (error) {
            logger.logError(error);
            callback(error);
        } else {
            callback(null, key.publicKey || key.rsaPublicKey);
        }
    });
};

export const useAuthenticate = ({ authUrl, audiences }) => {
    const jwks = ".well-known/openid-configuration/jwks";
    const jwksUri = new URL(jwks, authUrl).href;
    const client = jwksClient({ jwksUri });

    return (req, res, next) => {
        const token = getTokenFromHeaders(req);

        jwt.verify(token, getSignInKey(client), { ignoreNotBefore: true }, (error, result) => {
            if (error) {
                logger.logWarning({ url: req.url, error: error });
                res.sendStatus(401);
            } else {
                if (audiences.includes(result.aud)) {
                    next();
                } else {
                    logger.logWarning({ token: result, audiences });
                    res.sendStatus(401);
                }
            }
        });
    };
};

export const adminAuthenticate = (token, secretKey) => {
    try {
        jwt.verify(token, secretKey);
        return true;
    } catch (err) {
        return false;
    }
};
