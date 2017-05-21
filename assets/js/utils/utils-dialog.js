let dialog = (function () {
    function open(msg, callback) {
        let {
            mask,
            confirmBtn
        } = this.createElement();
        mask.find('.dialog-title').text(msg.title);
        mask.find('.dialog-tips').text(msg.tips);
        mask.find('.body').html(msg.body);
        confirmBtn.off().bind('click', function (e) {
            callback(e);
            mask.remove()
        })
        mask.find('.close-button').off().bind('click',function(e){
            mask.remove()
        })
    }
    function close() {
        $('#' + this.id).remove()
    }

    function createElement() {
        let mask = $('<div/>').addClass('dialog-mask').attr({'style':'display:flex','id':this.id})
        let logo =$('<h1/>').append($('<i/>').addClass('fa fa-cubes'))
        let caption = $('<div>').addClass('caption')
            .append(logo)
            .append($('<h4/>').addClass('dialog-title'))
            .append($('<p/>').addClass('sub-text dialog-tips'))
        let cancelBtn = $('<button>').addClass('pull-right close-button').text('×')
        let header = $('<div/>').addClass('heading text-center')
            .append(cancelBtn)            
            .append(caption)
        let body = $('<div/>').addClass('body')
        let confirmBtn = $('<button/>').addClass('bn pull-right').text('Confirm')
        let footer = $('<div/>').addClass('footer')
            .append(confirmBtn)
        let dialog = $('<div/>').addClass('dialog').attr('role','dialog')
            .append(header)
            .append(body)
            .append(footer)
        mask.append(dialog).appendTo($('body'));
        return {
            mask,
            confirmBtn
        }
    }
    return {
        __init: false,
        id: Math.random().toString(36).substring(12, 8),
        createElement,
        open,
        close
    }
})();

module.exports= dialog;