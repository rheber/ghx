const fsPromises = require('fs/promises');
const untildify = require('untildify');
const { contextBridge } = require('electron');

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
            console.error(writeErr);
        }
    }
};

const saveCache = async (data) => {
    const cachePath = untildify('~/.ghx.cache');
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
