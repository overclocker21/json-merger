const fs = require('fs');
const https = require('https')

const getOptions = (file) => {
    return {
        hostname: 'wpd.app',
        port: 443,
        path: `/get/locales/${file}.json`
    }
}

const getLocales = (options) => {
    return new Promise((resolve, reject) => {
        https.get(options,function (res) {
            res.on('data', function (d) {
                resolve(JSON.parse(d));
            });
            res.on('error', function (e) {
                reject(e)
            });
        }).end();
    })
}

const resolveAndMerge = async (options1, options2) => {
    let object1, object2, merged = {};
    object1 = await getLocales(options1);
    object2 = await getLocales(options2);

    Object.keys(object1).forEach(k => merged[k] = object1[k]);
    Object.keys(object2).forEach(k => { 
        if (merged[k] !== object2[k]) {
            Object.assign(merged[k], object2[k])
        }
    });

    fs.writeFileSync('merged4.json', JSON.stringify(merged));
}

resolveAndMerge(getOptions('file1'), getOptions('file2'));