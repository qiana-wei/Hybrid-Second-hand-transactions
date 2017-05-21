let CropService = {
    cropElement: undefined,
    options: {
        enableExif: true,
        viewport: {
            width: 200,
            height: 200,
        },
        boundary: {
            width: 300,
            height: 300
        },
        enableOrientation: true
    },
    initialize(selector) {
        this.cropElement = $(selector).croppie(this.options);
    },
    execute(element) {
        let reader = new FileReader();
        let cropElement = this.cropElement;
        reader.onload = function (ev) {
            cropElement.croppie('bind', {
                url: ev.target.result
            })
        }
        reader.readAsDataURL(element.files[0]);
        element.value = '';
    },
    save(width, height, callback) {
        let cropElement = this.cropElement;
        cropElement.croppie('result', {
            type: 'canvas',
            size: {
                width,
                height
            }
        }).then(res => {
            callback(res);
        })
    }
};

module.exports= CropService;