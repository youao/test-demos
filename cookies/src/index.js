(function (window) {
    let c = {};
    c._data = null;
    c.data = function () {
        if (!c._data) {
            c.init();
        }
        return c._data;
    }
    c.init = function () {
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
    c.get = function (key) {
        if (!c._data) {
            c.init();
        }
        return c._data[key] || false;
    }
    c.set = function (key, val, day) {
        if (!c._data) {
            c.init();
        }
        day = day || '';
        let str_expires = '';
        switch (day.constructor) {
            case Number:
                let exp = new Date();
                exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
                str_expires = ";expires=" + exp.toUTCString();
                break;
            case String:
                str_expires = ";expires=" + day;
                break;
            case Date:
                str_expires = ";expires=" + day.toUTCString();
                break;
            case Object:
                times = 0;
                if (day.s && parseInt(day.s)) {
                    times += parseInt(day.s) * 1000;
                }
                if (day.i && parseInt(day.i)) {
                    times += parseInt(day.i) * 60 * 1000;
                }
                if (day.h && parseInt(day.h)) {
                    times += parseInt(day.h) * 60 * 60 * 1000;
                }
                if (day.d && parseInt(day.d)) {
                    times += parseInt(day.d) * 24 * 60 * 60 * 1000;
                }
                if (day.m && parseInt(day.m)) {
                    times += parseInt(day.m) * 30 * 24 * 60 * 60 * 1000;
                }
                if (day.y && parseInt(day.y)) {
                    times += parseInt(day.y) * 365 * 24 * 60 * 60 * 1000;
                }
                if (times) {
                    let exp = new Date();
                    str_expires = ";expires=";
                    try {
                        let exp = new Date();
                        exp.setTime(exp.getTime() + times);
                        str_expires = ";expires=" + exp.toUTCString();
                    } catch (err) {
                        console.log(err);
                    }
                }
                break;
        }
        document.cookie = key + "=" + val + str_expires;
    }
    c.del = function (key) {
        c.set(key, '', 'Thu, 01 Jan 1970 00:00:00 GMT');
    }
    window.Cookies = c;
})(window)

