export const camelToSnakeCase = ( str : string ) : string => {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

export const toSnake = ( str : string ) : string => {
    return str.replace(/[-]/g, letter => '_');
}