import { EntityManager } from '@mikro-orm/postgresql';
import { Connection, MikroORM } from '@mikro-orm/core';
// import configEmpresa from '../../mikro-orm.config.empresa';

export async function getTenantConnection( tenantId : string, em : EntityManager ): Promise<Connection>{
    
    const connection = `tenant_${tenantId}`; 
    const connectionManager = em.getConnection();

    console.log(connectionManager.getConnectionOptions());
    await connectionManager.close();
    // const instancias = await em.execute('select schema_name as name from information_schema.schemata;');
    // const or = await MikroORM.init({
    //     ...configEmpresa   
    // });

    // const empConnection = or.em.getConnection()
    // console.log(empConnection.getConnectionOptions());
    // await empConnection.execute('CREATE TABLE pruebaempresahere();');

    // console.log(connectionManager.getConnectionOptions());
    // console.log(await em.getConnection().isConnected());
    // await connectionManager.close();

    return;
}

