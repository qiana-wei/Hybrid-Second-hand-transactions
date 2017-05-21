Vue.component('add-project-member-dialog', {
    name: 'add-project-member-dialog',
    props: ['projectMembers', 'projectInviters'],
    template: getAddProjectMemberDialogTemplate(),
    data() {
        return {
            inviterName: '',
            hasProjectInviters: '',
        }
    },
    mounted() {
        this.hasProjectInviters = this.projectInviters.length > 0 ? true : false;
        this.hasProjectInviters ? this.inviterName = this.projectInviters[0].name : ''
    },
    methods: {
        close() {
            this.$emit('event', 'closeAddProjectMemberModal')
        },
        addProjectMembers() {
            let orgName = this.$root.orgName;
            let projectName = this.$parent.projectName;
            let data = {
                username: this.inviterName
            }
            let self = this;
            let url = `/api/v1/${orgName}/projects/${projectName}/members`
            utils.DataService.post(url, data).done(res => {
                self.close();
                utils.toast(`Add ${this.inviterName} to ${projectName} successfully`,'success')
                self.$parent.fetchProjects()
            })
        },
    }
})