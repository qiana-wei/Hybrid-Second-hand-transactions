Vue.component('crop-dialog', {
    name: 'cropDialog',
    props: ['isShow'],
    template: getCropDialogTemplate(),
    mounted() {
        utils.CropService.initialize('#upload-picture');
    },
    methods: {
        upload() {
            this.$emit('event', 'addUploading');
            let orgName = this.$root.orgName;
            let url = `/api/v1/upload_avatar/${orgName}`;
            let defer_sm = new $.Deferred();
            let defer_lg = new $.Deferred();
            let self = this;

            utils.CropService.save(64, 64, (res) => {
                defer_sm.resolve(res)
            })
            utils.CropService.save(128, 128, (res) => {
                defer_lg.resolve(res)
            })

            $.when(defer_sm, defer_lg).done(function () {
                $('.org-avatar').attr('src', arguments[1]);
                utils.DataService.post(url, {
                    'avatar_sm': arguments[0],
                    'avatar_lg': arguments[1]
                }).done(res => {
                    self.$emit('event', 'closeUploading');
                })
            })
            this.close()
        },
        close() {
            this.$emit('event', 'closeCropModal');
        }
    }
})