let createDataNode = require('./utils-createDataNode')
let loading = (function(){
    function open (msg){
        let toastElement = $('[data-type="loading"]');
        if (!toastElement.length) {
            toastElement = createLoadingElement();
        }
        toastElement.find('>[data-text]').text(msg);
        toastElement.show();
    }
    function close(){
        let toastElement = $('[data-type="loading"]');
        if (toastElement.length) {
            toastElement.hide();
        }
    }
    function createLoadingElement () {
        let toastElement = createDataNode('type', 'loading');
        let textNode = createDataNode('text');
        let iconNode = createDataNode('icon', '', 'i').addClass('fa fa-spinner fa-pulse fa-fw');
        return toastElement.append(iconNode).append(textNode).appendTo($('body'));
    }
    return{
        open,
        close,
        createLoadingElement
    }
})()

module.exports=loading;