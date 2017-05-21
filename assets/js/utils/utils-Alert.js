let Alert = (function () {
    function open(type, msg, callback) {
        let {
            modal,
            confirmBtn
        } = this.createElement();
        modal.find('.alert-msg').text(msg);
        modal.removeClass('warning').removeClass('success').addClass(type).modal({
            backdrop: 'static',
            keyboard: false,
            show: true
        });
        confirmBtn.off().bind('click', function (e) {
            callback(e);
        })
    }

    function tips(type,msg,callback){
        let {
            modal,
            confirmBtn
        } = this.createTipsElement();
        modal.find('.alert-msg').text(msg);
        modal.removeClass('warning').removeClass('success').addClass(type).modal({
            backdrop: 'static',
            keyboard: false,
            show: true
        });
        confirmBtn.off().bind('click', function (e) {
            callback(e);
        })
    }

    function tipsWidthSuccess(msg,callback){
        this.tips('success', msg, callback)
    }

    function tipsWithWarning(msg,callback){
        this.tips('warning', msg, callback);
    }

    function openWithSuccess(msg, callback) {
        this.open('success', msg, callback);
    }

    function openWithWarning(msg, callback) {
        this.open('warning', msg, callback);
    }

    function close() {
        if (this.__init)
            $('#' + this.id).modal('hide');
    }

    function createElement() {
        if (!this.__init) {
            this.__init = true;
            let modal = $('<div/>').addClass('modal fade alert').attr('id', this.id);
            let dialog = $('<div/>').addClass('modal-dialog');
            let cancelBtn = $('<button/>').text('Cancel').attr('data-dismiss', 'modal');
            let confirmBtn = $('<button/>').addClass('primary').text('Confirm');
            let body = $('<div/>').addClass('modal-body')
                .append($('<span/>').addClass('d-icon'))
                .append($('<p/>').addClass('alert-msg'))
                .append($('<button/>').attr('data-dismiss', 'modal').text('×'));
            let footer = $('<div/>').addClass('modal-footer')
                .append(cancelBtn)
                .append(confirmBtn);
            let content = $('<div/>').addClass('modal-content')
                .append(body).append(footer);
            modal.append(dialog.append(content)).appendTo($('body'));
            return {
                modal,
                confirmBtn
            }
        } else {
            let modal = $('#' + this.id);
            return {
                modal,
                confirmBtn: modal.find('button.primary')
            }
        }
    }
    function createTipsElement() {
        if (!this.__init) {
            this.__init = true;
            let modal = $('<div/>').addClass('modal fade alert').attr('id', this.id);
            let dialog = $('<div/>').addClass('modal-dialog');
            let confirmBtn = $('<button/>').addClass('primary').text('Confirm');
            let body = $('<div/>').addClass('modal-body')
                .append($('<span/>').addClass('d-icon'))
                .append($('<p/>').addClass('alert-msg'))
                .append($('<button/>').attr('data-dismiss', 'modal').text('×'));
            let footer = $('<div/>').addClass('modal-footer')
                .append(confirmBtn);
            let content = $('<div/>').addClass('modal-content')
                .append(body).append(footer);
            modal.append(dialog.append(content)).appendTo($('body'));
            return {
                modal,
                confirmBtn
            }
        } else {
            let modal = $('#' + this.id);
            return {
                modal,
                confirmBtn: modal.find('button.primary')
            }
        }
    }
    return {
        __init: false,
        id: Math.random().toString(36).substring(12, 8),
        createElement,
        createTipsElement,
        open,
        tips,
        close,
        openWithSuccess,
        openWithWarning,
        tipsWidthSuccess,
        tipsWithWarning
    }
})();

module.exports= Alert;