import { IsString } from 'class-validator';

export class ClienteDto{

    @IsString()
    email : string;

    @IsString()
    telefono : string;

    @IsString()
    observacionCliente : string;

    @IsString()
    idOrganizacion : string;
}
