import { IsString, IsBoolean } from 'class-validator';

export class OrganizacionDto{

    @IsString()
    nombre : string;

    @IsString()
    telefono : string;

    @IsString()
    pagina_web : string;

    @IsString()
    logo : string;

    @IsString()
    email : string;

    @IsBoolean()
    activo : boolean;

    @IsBoolean()
    habilitado : boolean;

}
