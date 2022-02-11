import { EntityManager } from '@mikro-orm/postgresql';
import { Request, Response, NextFunction } from 'express';
import { HttpException, HttpStatus, Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

const TENANT_HEADER = 'x-tenant-id';

@Injectable()
export class TenancyMiddleware implements NestMiddleware{
    use( req: Request, res: Response, next: NextFunction ) {
        const header = req.headers[TENANT_HEADER] as string;
        if( !header ){
            // throw new UnauthorizedException();
            throw new HttpException({
                status : HttpStatus.UNAUTHORIZED,
                error : "No existe el tenant en la peticion",

            }, HttpStatus.UNAUTHORIZED );
        }
        // req.body.tenantId = header?.toString() || null;
        next();
    }
}

@Injectable()
export class ExistTenantMiddleware implements NestMiddleware{

    constructor(
        private readonly em : EntityManager
    ){}

    async use( req: Request, res: Response, next: NextFunction ) {
        const { tenantId } = req.body;
        const schemas = await this.em.execute(`select schema_name as name from information_schema.schemata where schema_name = '${tenantId}';`);
        if( !(schemas[0]?.name === tenantId) ){
            throw new UnauthorizedException();
        }
        next();
    }
}