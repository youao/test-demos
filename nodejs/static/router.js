const fs = require('fs');

const baseUrl = '.';

const routes = [{
    name: ['/', '/index'],
    src: '/static/index.html'
}, {
    name: '/admin',
    src: '/static/admin.html'
}];

const resSufs = ['css', 'js', 'html'];

const load = (path) => { 
    for (let i = 0; i < routes.length; i++) {
        const {name, src} = routes[i];
        if (typeof name == 'string') {
            if (name == path) {
                path = src;
            }
        } else if (typeof name == 'object') {
            if (name.indexOf(path) > -1) {
                path = src;
            }
        }
    }
    
    let suf = path.split('.').pop();
    return resSufs.indexOf(suf) === -1 ? !1 : {
        head: { 'Content-Type': 'text/'+ suf +'; charset=utf-8' },
        file: fs.readFileSync(baseUrl+path)
    };
}; 
module.exports = {
    load
};