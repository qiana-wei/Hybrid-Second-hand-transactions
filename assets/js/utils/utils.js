;
(function(window, $) {
    let Alert = require('./utils-Alert');
    let DataService = require('./utils-DataService')
    let btnLoading = require('./utils-btnLoading')
    let CropService = require('./utils-CropService')    
    let toast = require('./utils-toast')
    let loading = require('./utils-loading')
    let formateDate = require('./utils-formateDate')
    let dialog = require('./utils-dialog')
    let FormDataService = require('./utils-FormDataService')
    let escapeHTML = require('./utils-escapeHTML')
    window.utils = (($) => {
       let utils = {
            DataService,
            toast,
            loading,
            formateDate,
            CropService,
            Alert,
            btnLoading,
            dialog,
            FormDataService,
            escapeHTML,
        };
        return utils;
    })($);
})(window, $);