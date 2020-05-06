# Cookies

封装了Document.cookie，这边的处理是直接挂载到window对象上。



## 文档

### Cookies.get(key)

获取指定cookie

|  参数名称   | 是否必填  | 默认值  |  描述  |
|  :----  | :----  | :----  | :----  |
| key  | 是 | 无 |  |

|  返回值 |
|  :----  |
| 获取成功返回对应值，失败返回false  |

``` javascipt
let account = Cookies.get('account');
console.log(account); // "adada"
```


### Cookies.set(key, value, [op])

设置指定cookie

|  参数名称   | 是否必填  | 默认值  |  描述  |
|  :----  | :----  | :----  | :----  |
| key  | 是 | 无 | 要设置的cookie键 |
| value  | 是 | 无 | 要设置的cookie值 |
| op  | 否 | 无 | 数字/字符串/对象/Date对象，数字表示设置cookie期限天数，相当于op.d；<br/>字符串必须是UTC日期字符串；<br/>对象需要需要主要，不同参数设置cookie期限会叠加； |
| op.y  | 否 | 无 | 设置cookie期限，年 |
| op.m  | 否 | 无 | 设置cookie期限，月 |
| op.d  | 否 | 无 | 设置cookie期限，日 |
| op.h  | 否 | 无 | 设置cookie期限，时 |
| op.i  | 否 | 无 | 设置cookie期限，分 |
| op.s  | 否 | 无 | 设置cookie期限，秒 |

``` javascipt
Cookies.set('account', 'adada');

// 设置期限
Cookies.set('account', 'adada', 1); // 1天
Cookies.set('account', 'adada', {
    d: 2
}); // 2天
Cookies.set('account', 'adada', {
    d: 2,
    h: 24
}); // 3天
```


### Cookies.del(key)

删除指定cookie

|  参数名称   | 是否必填  | 默认值  |  描述  |
|  :----  | :----  | :----  | :----  |
| key  | 是 | 无 |  |


``` javascipt
Cookies.del('account');
```

### Cookies.data()

获取cookie对象（全部）

``` javascipt
let datas = Cookies.data();
console.log(datas); 
// {account: "adada", password: "123456"}
```


## 参考资料

[Document.cookie - MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie)

[JS设置cookie、读取cookie、删除cookie - Endv](https://www.cnblogs.com/endv/p/8089506.html)
