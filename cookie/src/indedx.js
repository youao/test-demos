(function(window) {
    let c = {};
    c._data = null;
    c.data = function() {
        if (!c._data) {
            c.init();
        }
        return c._data;
    }
    c.init = function() {
        c._data = {};
        let str = document.cookie.replace(/\s*/g, "");
        if (!str) {
            return false;
        }
        let arr = str.split(';');
        for (let i = 0, ln = arr.length; i < ln; i++) {
            let obj = arr[i].split('=');
            c._data[obj.shift()] = obj.join('=');
        }
    }
    c.get = function(key) {
        if (!c._data) {
            c.init();
        }
        return c._data[key] || false;
    }
    c.set = function(key, val, day) {
        if (!c._data) {
            c.init();
        }
        day = day || 7;
        c._data[key] = val;
        let exp = new Date();
        exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
        document.cookie = key + "=" + val + ";expires=" + exp.toGMTString();  
    }
    c.del = function(key) {
        c.set(key, '');  
    }
    window.cookies = c;
})(window)
