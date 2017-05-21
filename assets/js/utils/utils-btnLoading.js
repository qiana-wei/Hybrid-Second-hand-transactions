let btnLoading = (function(){
    function add (button){
        var pin = $(document.createElement('i')).addClass('fa fa-spinner fa-pulse fa-fw');
        button.prepend(pin).attr('disabled', 'disabled');
    }
    function remove(button){
        button.removeAttr('disabled').find('>.fa-spinner').remove();
    }
    return{
        add,
        remove
    }
})()
module.exports = btnLoading