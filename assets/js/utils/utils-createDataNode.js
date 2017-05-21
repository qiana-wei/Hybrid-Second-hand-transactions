let createDataNode = (type, value = '', tag = 'div') => {
    return $(document.createElement(tag)).attr(`data-${type}`, value);
};
module.exports = createDataNode;