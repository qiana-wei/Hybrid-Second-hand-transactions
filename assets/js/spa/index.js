new Vue({
    el: '#app',
    data: {
        orgName: decodeURI(window.location.pathname.split('/').pop()),
        isCropModalVisible: false,
        isInviteModalVisible: false,
        isUploading: false,
        username: '',
        logo: '',
        currentView: 'projects',
        tabs: [{
            name: 'projects',
            icon: 'tasks',
            num: 0
        }, {
            name: 'members',
            icon: 'user',
            num: 0
        }, {
            name: 'settings',
            icon: 'cog'
        }, {
            name: 'logs',
            icon: 'file-text-o'
        }],
        orgInfo: {
            avatar: '',
            description: ''
        },
        appList: [
            {
                id: 0,
                name: 'simright-viewer',
            },
            {
                id: 1,
                name: 'simright-simulator',
            },{
                id: 2,
                name: 'simright-converter'
            },{
                id: 3,
                name: 'simright-toptimizer'
            }
        ],
        members: [],
        allMembers: [],
        myrole: ''
    },
    template: getGroupTemplate(),
    methods: {
        eventManager(type, params) {
            this[type](params);
        },
        updateMemberNum(count) {
            this.tabs.filter(tab => tab.name === 'members')[0].num = count;
        },
        updataProjectNum(count) {
            this.tabs.filter(tab => tab.name === 'projects')[0].num = count;
        },
        changeMyRole(myrole) {
            this.myrole = myrole;
        },
        changeCurrentView(name) {
            this.currentView = name;
        },
        updataOrgInfo(orgName,avatar, description) {
            this.orgName = orgName
            this.orgInfo.avatar = avatar;
            this.orgInfo.description = description;
        },
        updataDescription(description){
            this.orgInfo.description = description;
        },
        fetchOrgInfo() {
            let orgName = this.orgName;
            let url = `/api/v1/orgs/${orgName}/info`;
            utils.DataService.get(url).done(res => {
                this.username = res.result.username;
                this.updateMemberNum(res.result.member_count);
                this.updataProjectNum(res.result.project_count);
                this.changeMyRole(res.result.role)
                this.updataOrgInfo(res.result.organization.name,res.result.organization.avatar_lg, res.result.organization.description)
            })
        },
        fetchMembers() {
            let orgName = this.orgName;
            let url = `/api/v1/orgs/${orgName}/members?per_page=20`;
            utils.DataService.get(url)
                .then(res => {
                    this.members = [];
                    this.allMembers = [];
                    res.result.data.forEach(user => {
                        user.checked = false;
                        this.members.push(user);
                    });
                    res.result.data.forEach(user => this.allMembers.push(user));
                    this.updateMemberNum(res.result.members);
                })
        },
        closeCropModal() {
            this.isCropModalVisible = false;
        },
        showCropModal() {
            this.isCropModalVisible = true;
        },
        addUploading() {
            this.isUploading = true;
        },
        closeUploading() {
            this.isUploading = false;
        },
        showInviteModal() {
            this.isInviteModalVisible = true;
        },
        closeInviteModal() {
            this.isInviteModalVisible = false;
        },
        filterMembersRole(roleValue) {
            let filterRoleCallback = (allMembers)=>{
                return allMembers.role == roleValue
            }
            this.members = this.allMembers.filter(filterRoleCallback,roleValue)
        },
        watchCheckedAll(ev) {
            let bool = ev.target.checked ? true : false;
            this.members.forEach(user => {
                user.checked = bool;
            })
        },
        uploadOrgAvatar(e) {
            utils.CropService.execute(e.target);
            this.showCropModal();
        }
    },
    mounted() {
        let name = window.location.search.split('?')[1];
        if (name) {
            this.changeCurrentView(name)
        }
        this.fetchMembers();
        this.fetchOrgInfo();
    }
})