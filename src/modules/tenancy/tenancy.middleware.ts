import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

const TENANT_HEADER = 'x-tenant-id';

@Injectable()
export class TenancyMiddleware implements NestMiddleware{
    use( req: Request, res: Response, next: NextFunction ) {
        const header = req.headers[TENANT_HEADER] as string;
        console.log( "header:", header );
        req.body.tenantId = header?.toString() || null;
        next();
    }
}