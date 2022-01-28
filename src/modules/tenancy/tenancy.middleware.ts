import { Request, Response, NextFunction } from 'express';

const TENANT_HEADER = 'x-tenant-id';

export function tenancyMiddleware(req: Request, res: Response, next: NextFunction): void {
    const header = req.headers[TENANT_HEADER] as string;
    req.body.tenantId = header?.toString() || null;
    next();
}