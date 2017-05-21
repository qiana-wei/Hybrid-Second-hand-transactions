Vue.component('settings', {
    name: 'settings',
    props:['myrole'],
    data() {
        return {
            isEdit: false,
            orgs: {},
        }
    },
    template: getSettingsTemplate(),
    mounted() {
        this.fetchOrgInfo()
    },
    methods: {
        fetchOrgInfo() {
            let orgName = this.$root.orgName;
            let url = `/api/v1/orgs/${orgName}`;
            let data = {
                organization_name: orgName
            };
            utils.DataService.get(url, data).then(res => {
                res.result.data.displayName = res.result.data.name;
                this.orgs = res.result.data
            })
        },
        editOrgInfoOver() {
            let orgName = this.$root.orgName;
            let url = `/api/v1/orgs/${orgName}`;
            let data = this.orgs;
            let self = this;
            let changOrgInforMsg = `You will change the information for the organization!`;
            utils.Alert.openWithWarning(changOrgInforMsg, () => {
                utils.DataService.patch(url, data).done(res => {
                    utils.toast('Change information successfully','success')
                    self.updataDescription(self.orgs.description)
                });
                utils.Alert.close();
            })
        },
        updataDescription(orgDescription) {
            this.$emit('event', 'updataDescription', orgDescription)
        }
    }
})