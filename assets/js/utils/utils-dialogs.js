dialog.open = (msg, confirmCallback, options) => {
            let toastElement = $('[data-type="dialog"]');
            createDialogElement(toastElement);
            setDialogElement(toastElement, msg, confirmCallback, options)
            toastElement.removeClass('hide').modal('show');
            handelDialogElement(toastElement, confirmCallback, options)
        }

        dialog.openWithWaring = (msg, confirmCallback) => {
            let options = {};
            options.type = 'warning';
            dialog.open(msg, confirmCallback, options);
        }

        dialog.hide = () => {
            let toastElement = $('[data-type="dialog"]');
            toastElement.find($('.btn')).remove();
            toastElement.addClass('hide').modal('hide');
        }

        let createDialogElement = (toastElement) => {
            let dialogFooter = toastElement.find($('.modal-footer'));
            let cancelBtn = utils.createDataNode('cancel');
            let confirmBtn = utils.createDataNode('confirm');
            return dialogFooter.append(confirmBtn).append(cancelBtn).appendTo(toastElement.find($('.modal-content')));
        }

        let setDialogElement = (toastElement, msg, confirmCallback, options) => {
            toastElement.find('[data-confirm]').addClass('btn btn-primary').text('ok');
            toastElement.find('[data-cancel]').addClass('btn btn-dafault').text('cancel');
            toastElement.find($('.modal-body')).text(msg);
            toastElement.find('[data-icon]').attr('data-icon', 'success');
            if (options) {
                options.type ? toastElement.find('[data-icon]').attr('data-icon', options.type) : toastElement.find('[data-icon]').attr('data-icon', 'success');
                options.cancel ? toastElement.find('[data-cancel]').text(options.cancel) : toastElement.find('[data-cancel]').text('cancel');
                options.confirm ? toastElement.find('[data-confirm]').text(options.confirm) : toastElement.find('[data-confirm]').text('ok');
            }
            toastElement.find('[data-icon]').attr('data-icon') == 'warning' ? toastElement.find($('.modal-title')).text('Are you sure?') : toastElement.find($('.modal-title')).text('Good job!');
        }
        let setDialogElementWithWarning = (toastElement, msg) => {
            toastElement.find('[data-confirm]').addClass('btn btn-primary').text('ok');
            toastElement.find('[data-cancel]').addClass('btn btn-dafault').text('cancel');
            toastElement.find($('.modal-body')).text(msg);
            toastElement.find('[data-icon]').attr('data-icon', 'warning');
        }

        let handelDialogElement = (toastElement, confirmCallback, options) => {
            toastElement.find('[data-confirm]').bind('click', function() {
                if (confirmCallback) {
                    confirmCallback();
                }
                dialog.hide();
            })
            toastElement.find('[data-cancel]').bind('click', function() {
                if (options && options.cancelCallback) {
                    options.cancelCallback();
                }
                dialog.hide();
            })
        }