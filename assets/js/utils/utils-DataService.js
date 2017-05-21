let toast = require('./utils-toast')
let DataService = {
    get: function (url, data) {
        return this.ajax('GET', url, data)
    },
    post: function (url, data) {
        let csrftoken = $('meta[name=csrf-token]').attr('content');
        return this.ajax('POST', url, data, csrftoken)
    },
    delete: function (url, data) {
        let csrftoken = $('meta[name=csrf-token]').attr('content');        
        return this.ajax('DELETE', url, data, csrftoken)
    },
    patch: function (url, data) {
        let csrftoken = $('meta[name=csrf-token]').attr('content');        
        return this.ajax('PATCH', url, data, csrftoken)
    },
    put:function(url,data){
        let csrftoken = $('meta[name=csrf-token]').attr('content');        
        return this.ajax('PUT', url, data, csrftoken)
    }
};

DataService.ajax = function (type, url, data, csrftoken) {
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
                xhr.setRequestHeader("X-CSRFToken", csrftoken)
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