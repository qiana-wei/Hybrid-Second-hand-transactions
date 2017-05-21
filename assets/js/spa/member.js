Vue.component('members', {
    name: 'members',
    props: ['members'],
    template: getMembersTemplate(),
    data() {
        return {
            myrole: this.$root.myrole
        }
    },
    mounted() {
        this.fetchMembers();
    },
    methods: {
        inviteMember() {
            this.$emit('event', 'showInviteModal');
        },
        deleteMember(name) {
            let orgName = this.$root.orgName;
            let url = `/api/v1/orgs/${orgName}/members/${name}`;
            let self = this;
            utils.Alert.openWithWarning(`You will DELETE ${name} ?`, () => {
                utils.DataService.delete(url)
                    .done(res => {
                        self.fetchMembers();
                        utils.toast(`Delete ${name} successfully`,'success')
                    })
                utils.Alert.close();
            })
        },
        changeRole(user, $event) {
            let self = this;
            let name = user.name;
            let role = user.role;
            let orgName = this.$root.orgName;
            let url = `/api/v1/orgs/${orgName}/members/${name}`;
            let data = {
                role
            };
            user.role = role === 'Admin' ? 'Members' : 'Admin';
            let changeMsg = `You will change the Member's role to ${role}`;
            utils.Alert.openWithSuccess(changeMsg, () => {
                utils.DataService.patch(url, data)
                    .done(res => {
                        user.role = role;
                        utils.toast('Change role successfully','success')
                    })
                utils.Alert.close();
            })
        },
        leaveOrg() {
            let orgName = this.$root.orgName;
            let url = `/api/v1/orgs/${orgName}/leave`;
            let leaveOrgMsg = `You will LEAVE the organization ${orgName}`
            utils.Alert.openWithWarning(leaveOrgMsg, () => {
                utils.DataService.get(url)
                    .done(res => {
                        window.location.pathname = '/user/profile';
                    })
                utils.Alert.close();
            })
        },
        fetchMembers() {
            this.$parent.fetchMembers();
        },
        filterMembersRole(roleValue) {
            this.$emit('event', 'filterMembersRole', roleValue)
        },
        watchCheckedAll(ev) {
            this.$emit('event', 'watchCheckedAll', ev);
        },
        roleColor(role) {
            let color;
            let colorTable = {
                owner: '#F85766',
                admin: '#61af55',
                members: '#3b7cff'
            }
            role = role.split(' ')[0].toLowerCase();
            return {
                color: colorTable[role]
            };
        },
        roleWeight(role) {
            let roleNum = {
                Owner: 3,
                Admin: 2,
                Members: 1
            }
            return roleNum[role]
        }
    }
})