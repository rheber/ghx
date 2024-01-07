const fsPromises = require('fs/promises');
const untildify = require('untildify');
const { contextBridge } = require('electron');

// Calculate path to file that meets the XDG Base Directory specification.
const xdgCachePath = () => {
    const homeDir = process.env.HOME || untildify('~');
    const dataDir = process.env.XDG_DATA_HOME || homeDir;
    return `${dataDir}/.ghx.cache`;
}

const loadCache = async () => {
    const cachePath = xdgCachePath();
    try {
        const data = await fsPromises.readFile(cachePath, 'utf-8');
        return data;
    } catch (readErr) {
        try {
            const newData = '{"users":[]}';
            await fsPromises.writeFile(cachePath, newData);
            return newData;
        } catch (writeErr) {
            console.error(writeErr);
        }
    }
};

const saveCache = async (data) => {
    const cachePath = xdgCachePath();
    try {
        const serialized = JSON.stringify(data);
        await fsPromises.writeFile(cachePath, serialized);
        console.log('Wrote cache.');
    } catch (writeErr) {
        console.error(writeErr);
    }
};

contextBridge.exposeInMainWorld('preload', {
    loadCache,
    saveCache,
});

window.addEventListener('DOMContentLoaded', () => {
});
