const fsPromises = require('fs/promises');
const untildify = require('untildify');

const loadCache = async () => {
    const cachePath = untildify('~/.ghx.cache');
    try {
        const data = await fsPromises.readFile(cachePath, 'utf-8');
        return data;
    } catch (readErr) {
        try {
            const newData = '{users:[]}';
            await fsPromises.writeFile(cachePath, newData);
            return newData;
        } catch (writeErr) {
            console.log(writeErr);
        }
    }
}
loadCache().then(data => console.log(data));

window.addEventListener('DOMContentLoaded', () => {
});
