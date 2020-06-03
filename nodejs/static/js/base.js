(function() {
    let xhr = {
        get(url, callback, dataTpye = 'json') {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    res = dataTpye == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
                    typeof callback == 'function' && callback(res);
                }
            }
            xhr.open('GET', url, true);
            xhr.send();
        },
        post(url, data, callback, dataTpye = 'json') {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    res = dataTpye == 'json' ? JSON.parse(xhr.responseText) : xhr.responseText;
                    typeof callback == 'function' && callback(res);
                }
            }
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhr.send(this.jsonToUrl(data));
        },
        jsonToUrl(data, url) {
            url = url || '';
            for (const i in data) {
                if (data.hasOwnProperty(i)) {
                    url += i+'='+data[i]+'&';
                }
            }
            return url.substr(0, url.length - 1);
        }
    }

    window.Xhr = xhr;

})()