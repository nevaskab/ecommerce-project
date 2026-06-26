import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    userId?: string;
}

export function authTokenMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ message: 'Invalid authorization header format' });
    }

    const token = parts[1];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        req.userId = decoded.userId;
        next();
    });
}