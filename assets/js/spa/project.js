Vue.component('projects', {
    name: 'projects',
    props: ['myrole', 'members', 'appList'],
    data() {
        return {
            isCreateProjectModalVisible: false,
            isAddProjectMemberModalVisible: false,
            isImportProjectModalVisible:false,
            projectList: [],
            projectName: '',
            projectMembers: [],
            projectInviters: [],
        }
    },
    template: getProjectsTemplate(),
    mounted() {
        this.fetchProjects();
    },
    methods: {
        eventManager(type, params) {
            this[type](params);
        },
        showCreateProjectModal() {
            this.isCreateProjectModalVisible = true;
        },
        closeCreateProjectModal() {
            this.isCreateProjectModalVisible = false;
        },
        showAddProjectMemberModal(projectName) {
            this.isAddProjectMemberModalVisible = true;
            this.updataProjectName(projectName)
            this.filterProjectMembers(projectName);
            this.filterProjectInviters()
        },
        closeAddProjectMemberModal() {
            this.isAddProjectMemberModalVisible = false;
        },
        showImportProjectModal(){
            this.isImportProjectModalVisible = true;
        },
        closeImportProjectModal(){
            this.isImportProjectModalVisible = false;            
        },
        updataProjectName(projectName) {
            this.projectName = projectName;
        },
        filterProjectMembers(projectName) {
            this.projectMembers = [];
            let filterProjectMembersCallback = (projectList) => {
                return projectList.name == projectName
            }
            this.projectList.filter(filterProjectMembersCallback, projectName)[0].members.forEach(members => {
                this.projectMembers.push(members.user)
            })
        },
        filterProjectInviters() {
            this.projectInviters = []
            this.members.forEach((user, index) => {
                flag = 0;
                this.projectMembers.forEach(members => {
                    user.name === members.name || !user.join_time ? flag += 1 : ''
                });
                flag === 0 ? this.projectInviters.push(user) : ''
            })
        },
        fetchProjects() {
            let orgName = this.$root.orgName;
            let url = `/api/v1/${orgName}/projects?per_page=20`
            utils.DataService.get(url).done(res => {
                this.projectList = [];
                this.updataProjectNum(res.result.count);
                res.result.data.forEach(project => {
                    this.projectList.push(project)
                });
            })
        },
        updataProjectNum(ProjectNum) {
            this.$emit('event', 'updataProjectNum', ProjectNum)
        },
        deleteProjectMembers(projectName, deleteMemberName) {
            let orgName = this.$root.orgName;
            let self = this;
            let url = `/api/v1/${orgName}/projects/${projectName}/members/${deleteMemberName}`
            utils.Alert.openWithWarning(`Make sure you want to delete ${deleteMemberName} !`, () => {
                utils.DataService.delete(url).done(res => {
                    self.fetchProjects();
                    utils.toast(`Successfully delete member ${deleteMemberName} !`,'succcess');
                })
                utils.Alert.close();                
            })
        },
        deleteProject(projectName) {
            let orgName = this.$root.orgName;
            let url = `/api/v1/${orgName}/projects/${projectName}`

            utils.Alert.openWithWarning(`Make sure you want to disband ${projectName} !`, () => {
                utils.DataService.delete(url).done(res => {
                    this.fetchProjects();
                    utils.toast(`Successfully disband project ${projectName} !`,'success');
                })
                utils.Alert.close();
            })
        },
        leaveProject(projectName) {
            let orgName = this.$root.orgName;
            let url = `/api/v1/${orgName}/projects/${projectName}/leave`;
            utils.Alert.openWithWarning(`Make sure you want to leave ${projectName} !`, () => {
                utils.DataService.delete(url)
                    .done(res => {
                        this.fetchProjects();
                        utils.toast(`Successfully leave project ${projectName} !`,'success');
                    })
                utils.Alert.close();                    
            })
        },
        appColor(app) {
            if (typeof app !== 'string') return;
            if (typeof app.split(' ')[1] !== 'string') return;
            let color;
            let colorTable = {
                simulator: 'red',
                viewer: 'green',
                toptimizer: 'yellow',
                converter: 'blue'
            }
            app = app.split(' ')[1].toLowerCase();
            return {
                color: colorTable[app]
            };
        }
    }
})