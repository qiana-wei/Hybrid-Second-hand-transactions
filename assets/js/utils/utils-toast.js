let createDataNode = require('./utils-createDataNode')
let toast = (msg, type = 'success') => {
    let toastElement = $('[data-type="notification"]');
    if (!toastElement.length) {
        toastElement = createToastElement(type);
    }
    setToastElement(toastElement, msg, type);
};

let createToastElement = (type) => {
    let toastElement = createDataNode('type', 'notification');
    let textNode = createDataNode('text');
    let iconNode = createDataNode('icon', type);
    return toastElement.append(iconNode).append(textNode).appendTo($('body'));
};

let setToastElement = (toastElement, msg, type) => {
    toastElement.find('>[data-icon]').attr('data-icon', type);
    toastElement.show().find('>[data-text]').text(msg);
    var timer = setTimeout(() => {
        toastElement.hide();
        clearTimeout(timer);
    }, 2000);
};
module.exports=toast