import { readdirSync } from 'fs';

const getEntries = source =>
    readdirSync(source).reduce((entries, fileName) => {
        const [ , key ] = fileName.match(/([\d\w-_]+).tsx/i);
        entries[key] = source + '/' + fileName;
        return entries;
    }, {});
export default getEntries;
