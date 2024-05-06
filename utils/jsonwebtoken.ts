import fs from 'fs';

export const createAccessToken = (userId: string) => {
    const privateKey = fs.readFileSync('private.key', 'utf-8');
    const jwt = require('jsonwebtoken');
    const accessToken = jwt.sign({ userId: userId }, privateKey, {
        algorithm: 'RS256',
        expiresIn: '1h',
        // expiresIn: '3000', // test (3000ms)
    });

    return accessToken;
}

export const verifyAccessToken = (accessToken: string) => {
    const publicKey = fs.readFileSync('public.key', 'utf-8');
    const jwt = require('jsonwebtoken');
    try {
        const verified = jwt.verify(accessToken, publicKey)
        return verified;
    } catch (error) {
        throw error
    }
}

export const createRefreshToken = (userId: string) => {
    const privateKey = fs.readFileSync('private.key', 'utf-8');
    const jwt = require('jsonwebtoken');
    const refreshToken = jwt.sign({ userId: userId}, privateKey, {
        algorithm: 'RS256',
        expiresIn: '7d',
    });

    return refreshToken;
}

export const verifyRefreshToken = (refreshToken: string) => {
    const publicKey = fs.readFileSync('public.key', 'utf-8');
    const jwt = require('jsonwebtoken');
    try {
        const verified = jwt.verify(refreshToken, publicKey)
        return verified;
    } catch (error) {
        throw error
    }
}