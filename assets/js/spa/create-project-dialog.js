Vue.component('create-project-dialog', {
    name: 'create-project-dialog',
    props: ['isShow', 'appList', 'members','projectInviters'],
    template: getCreateProjectDialogTemplate(),
    computed: {
        otherMembers(){
            return this.members.filter(member => Boolean(member.join_time) && member.name !== this.$root.username);
        }
    },
    data() {
        return {
            projectInfo: {
                app_sname: 'simright-viewer',
                private: 'false',
                name: '',
                owner: this.$root.orgName,
                user_list: []
            },
            validStringReg : /^[\u4E00-\u9FA5A-Za-z0-9_-]+$/,
        }
    },
    methods: {
        checkName(){
            if(!this.validStringReg.test(this.projectInfo.name)){
                utils.toast('Projectname contains an illegal character','error')
            }
        },
        splitName(){
            if(this.projectInfo.name.length > 100){
                this.projectInfo.name = this.projectInfo.name.substring(0,100)
                utils.toast('Projectname should less 100 characters','error')                
            }
        },
        createProject() {
            if(this.projectInfo.name==''){
                utils.toast('Project name is required ','error')
            }
            else{
                let self = this;
                let url = '/project/new'
                utils.DataService.post(url, this.projectInfo).then(res => {
                    this.$parent.fetchProjects();
                    self.close();
                    self.clearProjectInfo()
                })
            }
        },
        close() {
            this.$emit('event', 'closeCreateProjectModal')
        },
        clearProjectInfo(){
            this.projectInfo.app_sname = 'simright-viewer';
            this.projectInfo.private = 'false';
            this.projectInfo.name = '';
            this.projectInfo.owner = this.$root.orgName;
        }
    }
})