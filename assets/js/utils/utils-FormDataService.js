let toast = require('./utils-toast')
let csrftoken = $('meta[name=csrf-token]').attr('content');
let FormDataService = function (url, data) {
    return $.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken)
        },
        url: url,
        data: data,
        type: 'POST',
        enctype: "multipart/form-data",
        contentType: false,
        processData: false
    }).fail(res => {
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

module.exports = FormDataService;