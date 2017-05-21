Vue.component('invite-dialog', {
    name: 'inviteDialog',
    props: ['isShow'],
    template: getInviteDialogTemplate(),
    data() {
        return {
            inviteName: '',
            isSearchMembers: false,
            searchMembers: []
        }
    },
    mounted() {

    },
    watch: {
        inviteName: function (hasInviteName) {
            hasInviteName ? this.searchInvite(hasInviteName) : this.isSearchMembers = false;
        }
    },
    methods: {
        searchInvite(name) {
            let url = `/api/v1/user/${name}`;
            utils.DataService.get(url).done(res => {
                res.result.data.length > 0 ? this.isSearchMembers = true : this.isSearchMembers = false;
                this.searchMembers = []
                res.result.data.forEach(user => this.searchMembers.push(user));
            })
        },
        sendInvite(name) {
            this.close();
            let orgName = this.$root.orgName;
            let self = this;
            let url = `/api/v1/orgs/${orgName}/members`;
            let data = {
                username: name
            };
            utils.loading.open(' Sending invitation email.')
            utils.DataService.post(url, data)
                .done(res => {
                    utils.loading.close();
                    utils.toast('Invitation email sent successfully','success')
                    self.$parent.fetchMembers();
                }).fail(res=>{
                    utils.loading.close();                    
                })
            this.inviteName = '';
        },
        close() {
            this.$emit('event', 'closeInviteModal');
        }
    }
})