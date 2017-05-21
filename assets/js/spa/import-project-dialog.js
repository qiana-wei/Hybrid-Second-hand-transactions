Vue.component('import-project-dialog', {
    name: 'import-project-dialog',
    props: ['appList', 'members'],
    template: getImportProjectDialogTemplate(),
    computed: {
        otherMembers(){
            return this.members.filter(member => Boolean(member.join_time) && member.name !== this.$root.username);
        }
    },
    data() {
        return {
            validStringReg : /^[\u4E00-\u9FA5A-Za-z0-9_-]+$/,
            username:this.$root.username,
            usersProjects:[],
            importProjectInfo:{
                uuid:'',
                private: 'false',
                rename: '',
                user_list: []
            }
        }
    },
    mounted () {
        this.fetchUserProjects()
    },
    methods: {
        close() {
            this.$emit('event', 'closeImportProjectModal')
        },
        importProject(){//导入project
            this.updateImportProjectInfo();
            let orgName = this.$root.orgName;
            let url=`/api/v1/${orgName}/projects`;
            let data = this.importProjectInfo;
            utils.DataService.post(url,data).done(res=>{
                this.$parent.fetchProjects();
                this.close()
            })
        },
        fetchUserProjects(){
            let username = this.username
            let url=`/api/v1/${username}/projects`;
            utils.DataService.get(url).done(res=>{
                res.result.data.forEach(projects => {
                        this.usersProjects.push(projects);
                    });
                this.importProjectInfo.uuid = this.usersProjects[0].uuid
            })
        },
        updateImportProjectInfo(){
            let filterProjectCallback = (projectList) => {
                return projectList.uuid == this.importProjectInfo.uuid
            }
            let originalName = this.usersProjects.filter(filterProjectCallback, this.importProjectInfo.uuid)[0]
            this.importProjectInfo.rename = this.importProjectInfo.rename ? this.importProjectInfo.rename : originalName.name;
        }
    }
})