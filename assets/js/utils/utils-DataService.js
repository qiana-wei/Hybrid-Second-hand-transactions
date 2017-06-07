let toast = require('./utils-toast')
let DataService = {
    get: function (url, data) {
        return this.ajax('GET', url, data)
    },
    post: function (url, data) {
        return this.ajax('POST', url, data )
    },
    delete: function (url, data) {
        return this.ajax('DELETE', url, data)
    },
    patch: function (url, data) {
        return this.ajax('PATCH', url, data)
    },
    put:function(url,data){
        return this.ajax('PUT', url, data)
    }
};

DataService.ajax = function (type, url, data, ) {
    url = `http://128.199.156.9:3000${url}`
    let re = /\?\?/;
    if (re.test(url)) {
        console.error('please dont\'t add GET string after url which is incluid \'?\'. ');
    }
    if (type === 'GET' && data != undefined) {
        url += '?' + $.param(data);
        data = undefined;
    }
    return $.when($.ajax({
        beforeSend: function (xhr) {
            if (type !== 'GET' && !this.crossDomain) {
                xhr.setRequestHeader("X-", )
            }
        },
        type,
        url,
        data: data ? JSON.stringify(data) : '',
        dataType: 'json',
        contentType: 'application/json',
    })).fail(res => {
        try {
            let obj = JSON.parse(res.responseText);
            let msg = typeof obj.msg === 'string' ? obj.msg : obj.msg[0]
            toast(msg, 'error');
            return true;
        } catch (e) {
            return false;
        }
    })
}

module.exports = DataService;