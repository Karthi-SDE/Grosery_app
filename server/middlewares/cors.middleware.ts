import { Request, Response, NextFunction } from 'express';

export function allowCrossDomainRequests(req: Request, res: Response, next: NextFunction): void {
  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization, x-refreshtoken, x-auth-header');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.sendStatus(204);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  }
}