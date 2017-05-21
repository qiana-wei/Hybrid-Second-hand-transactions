'use strict';

Vue.component('add-project-member-dialog', {
    name: 'add-project-member-dialog',
    props: ['projectMembers', 'projectInviters'],
    template: getAddProjectMemberDialogTemplate(),
    data: function data() {
        return {
            inviterName: '',
            hasProjectInviters: ''
        };
    },
    mounted: function mounted() {
        this.hasProjectInviters = this.projectInviters.length > 0 ? true : false;
        this.hasProjectInviters ? this.inviterName = this.projectInviters[0].name : '';
    },

    methods: {
        close: function close() {
            this.$emit('event', 'closeAddProjectMemberModal');
        },
        addProjectMembers: function addProjectMembers() {
            var _this = this;

            var orgName = this.$root.orgName;
            var projectName = this.$parent.projectName;
            var data = {
                username: this.inviterName
            };
            var self = this;
            var url = '/api/v1/' + orgName + '/projects/' + projectName + '/members';
            utils.DataService.post(url, data).done(function (res) {
                self.close();
                utils.toast('Add ' + _this.inviterName + ' to ' + projectName + ' successfully', 'success');
                self.$parent.fetchProjects();
            });
        }
    }
});
Vue.component('create-project-dialog', {
    name: 'create-project-dialog',
    props: ['isShow', 'appList', 'members', 'projectInviters'],
    template: getCreateProjectDialogTemplate(),
    computed: {
        otherMembers: function otherMembers() {
            var _this2 = this;

            return this.members.filter(function (member) {
                return Boolean(member.join_time) && member.name !== _this2.$root.username;
            });
        }
    },
    data: function data() {
        return {
            projectInfo: {
                app_sname: 'simright-viewer',
                private: 'false',
                name: '',
                owner: this.$root.orgName,
                user_list: []
            },
            validStringReg: /^[\u4E00-\u9FA5A-Za-z0-9_-]+$/
        };
    },

    methods: {
        checkName: function checkName() {
            if (!this.validStringReg.test(this.projectInfo.name)) {
                utils.toast('Projectname contains an illegal character', 'error');
            }
        },
        splitName: function splitName() {
            if (this.projectInfo.name.length > 100) {
                this.projectInfo.name = this.projectInfo.name.substring(0, 100);
                utils.toast('Projectname should less 100 characters', 'error');
            }
        },
        createProject: function createProject() {
            var _this3 = this;

            if (this.projectInfo.name == '') {
                utils.toast('Project name is required ', 'error');
            } else {
                var self = this;
                var url = '/project/new';
                utils.DataService.post(url, this.projectInfo).then(function (res) {
                    _this3.$parent.fetchProjects();
                    self.close();
                    self.clearProjectInfo();
                });
            }
        },
        close: function close() {
            this.$emit('event', 'closeCreateProjectModal');
        },
        clearProjectInfo: function clearProjectInfo() {
            this.projectInfo.app_sname = 'simright-viewer';
            this.projectInfo.private = 'false';
            this.projectInfo.name = '';
            this.projectInfo.owner = this.$root.orgName;
        }
    }
});
Vue.component('crop-dialog', {
    name: 'cropDialog',
    props: ['isShow'],
    template: getCropDialogTemplate(),
    mounted: function mounted() {
        utils.CropService.initialize('#upload-picture');
    },

    methods: {
        upload: function upload() {
            this.$emit('event', 'addUploading');
            var orgName = this.$root.orgName;
            var url = '/api/v1/upload_avatar/' + orgName;
            var defer_sm = new $.Deferred();
            var defer_lg = new $.Deferred();
            var self = this;

            utils.CropService.save(64, 64, function (res) {
                defer_sm.resolve(res);
            });
            utils.CropService.save(128, 128, function (res) {
                defer_lg.resolve(res);
            });

            $.when(defer_sm, defer_lg).done(function () {
                $('.org-avatar').attr('src', arguments[1]);
                utils.DataService.post(url, {
                    'avatar_sm': arguments[0],
                    'avatar_lg': arguments[1]
                }).done(function (res) {
                    self.$emit('event', 'closeUploading');
                });
            });
            this.close();
        },
        close: function close() {
            this.$emit('event', 'closeCropModal');
        }
    }
});
Vue.component('import-project-dialog', {
    name: 'import-project-dialog',
    props: ['appList', 'members'],
    template: getImportProjectDialogTemplate(),
    computed: {
        otherMembers: function otherMembers() {
            var _this4 = this;

            return this.members.filter(function (member) {
                return Boolean(member.join_time) && member.name !== _this4.$root.username;
            });
        }
    },
    data: function data() {
        return {
            validStringReg: /^[\u4E00-\u9FA5A-Za-z0-9_-]+$/,
            username: this.$root.username,
            usersProjects: [],
            importProjectInfo: {
                uuid: '',
                private: 'false',
                rename: '',
                user_list: []
            }
        };
    },
    mounted: function mounted() {
        this.fetchUserProjects();
    },

    methods: {
        close: function close() {
            this.$emit('event', 'closeImportProjectModal');
        },
        importProject: function importProject() {
            var _this5 = this;

            //导入project
            this.updateImportProjectInfo();
            var orgName = this.$root.orgName;
            var url = '/api/v1/' + orgName + '/projects';
            var data = this.importProjectInfo;
            utils.DataService.post(url, data).done(function (res) {
                _this5.$parent.fetchProjects();
                _this5.close();
            });
        },
        fetchUserProjects: function fetchUserProjects() {
            var _this6 = this;

            var username = this.username;
            var url = '/api/v1/' + username + '/projects';
            utils.DataService.get(url).done(function (res) {
                res.result.data.forEach(function (projects) {
                    _this6.usersProjects.push(projects);
                });
                _this6.importProjectInfo.uuid = _this6.usersProjects[0].uuid;
            });
        },
        updateImportProjectInfo: function updateImportProjectInfo() {
            var _this7 = this;

            var filterProjectCallback = function filterProjectCallback(projectList) {
                return projectList.uuid == _this7.importProjectInfo.uuid;
            };
            var originalName = this.usersProjects.filter(filterProjectCallback, this.importProjectInfo.uuid)[0];
            this.importProjectInfo.rename = this.importProjectInfo.rename ? this.importProjectInfo.rename : originalName.name;
        }
    }
});
Vue.component('invite-dialog', {
    name: 'inviteDialog',
    props: ['isShow'],
    template: getInviteDialogTemplate(),
    data: function data() {
        return {
            inviteName: '',
            isSearchMembers: false,
            searchMembers: []
        };
    },
    mounted: function mounted() {},

    watch: {
        inviteName: function inviteName(hasInviteName) {
            hasInviteName ? this.searchInvite(hasInviteName) : this.isSearchMembers = false;
        }
    },
    methods: {
        searchInvite: function searchInvite(name) {
            var _this8 = this;

            var url = '/api/v1/user/' + name;
            utils.DataService.get(url).done(function (res) {
                res.result.data.length > 0 ? _this8.isSearchMembers = true : _this8.isSearchMembers = false;
                _this8.searchMembers = [];
                res.result.data.forEach(function (user) {
                    return _this8.searchMembers.push(user);
                });
            });
        },
        sendInvite: function sendInvite(name) {
            this.close();
            var orgName = this.$root.orgName;
            var self = this;
            var url = '/api/v1/orgs/' + orgName + '/members';
            var data = {
                username: name
            };
            utils.loading.open(' Sending invitation email.');
            utils.DataService.post(url, data).done(function (res) {
                utils.loading.close();
                utils.toast('Invitation email sent successfully', 'success');
                self.$parent.fetchMembers();
            }).fail(function (res) {
                utils.loading.close();
            });
            this.inviteName = '';
        },
        close: function close() {
            this.$emit('event', 'closeInviteModal');
        }
    }
});
Vue.component('logs', {
    name: 'logs',
    template: getLogsTemplate(),
    data: function data() {
        return {
            logs: [],
            logsPage: '',
            page: 1
        };
    },
    mounted: function mounted() {
        this.logs = [];
        this.fetchLogs(this.page);
    },

    methods: {
        fetchLogs: function fetchLogs(pageNum) {
            var orgName = this.$root.orgName;
            var page = pageNum ? pageNum : ++this.page;
            var url = '/api/v1/orgs/' + orgName + '/log?per_page=12&page=' + page;
            var self = this;
            utils.DataService.get(url).then(function (res) {
                res.result.data.forEach(function (log) {
                    self.logs.push(log);
                });
                self.updataLogsPage(res.result.maxpage);
            });
        },
        watchCheckedAll: function watchCheckedAll(ev) {
            var bool = ev.target.checked ? true : false;
            this.logs.forEach(function (log) {
                log.checked = bool;
            });
        },
        countToday: function countToday() {
            var now = new Date();
            var start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
            return this.logs.filter(function (log) {
                return new Date(log.time).getTime() > start;
            }).length;
        },
        updataLogsPage: function updataLogsPage(logsPage) {
            this.logsPage = logsPage;
        }
    }
});
Vue.component('members', {
    name: 'members',
    props: ['members'],
    template: getMembersTemplate(),
    data: function data() {
        return {
            myrole: this.$root.myrole
        };
    },
    mounted: function mounted() {
        this.fetchMembers();
    },

    methods: {
        inviteMember: function inviteMember() {
            this.$emit('event', 'showInviteModal');
        },
        deleteMember: function deleteMember(name) {
            var orgName = this.$root.orgName;
            var url = '/api/v1/orgs/' + orgName + '/members/' + name;
            var self = this;
            utils.Alert.openWithWarning('You will DELETE ' + name + ' ?', function () {
                utils.DataService.delete(url).done(function (res) {
                    self.fetchMembers();
                    utils.toast('Delete ' + name + ' successfully', 'success');
                });
                utils.Alert.close();
            });
        },
        changeRole: function changeRole(user, $event) {
            var self = this;
            var name = user.name;
            var role = user.role;
            var orgName = this.$root.orgName;
            var url = '/api/v1/orgs/' + orgName + '/members/' + name;
            var data = {
                role: role
            };
            user.role = role === 'Admin' ? 'Members' : 'Admin';
            var changeMsg = 'You will change the Member\'s role to ' + role;
            utils.Alert.openWithSuccess(changeMsg, function () {
                utils.DataService.patch(url, data).done(function (res) {
                    user.role = role;
                    utils.toast('Change role successfully', 'success');
                });
                utils.Alert.close();
            });
        },
        leaveOrg: function leaveOrg() {
            var orgName = this.$root.orgName;
            var url = '/api/v1/orgs/' + orgName + '/leave';
            var leaveOrgMsg = 'You will LEAVE the organization ' + orgName;
            utils.Alert.openWithWarning(leaveOrgMsg, function () {
                utils.DataService.get(url).done(function (res) {
                    window.location.pathname = '/user/profile';
                });
                utils.Alert.close();
            });
        },
        fetchMembers: function fetchMembers() {
            this.$parent.fetchMembers();
        },
        filterMembersRole: function filterMembersRole(roleValue) {
            this.$emit('event', 'filterMembersRole', roleValue);
        },
        watchCheckedAll: function watchCheckedAll(ev) {
            this.$emit('event', 'watchCheckedAll', ev);
        },
        roleColor: function roleColor(role) {
            var color = void 0;
            var colorTable = {
                owner: '#F85766',
                admin: '#61af55',
                members: '#3b7cff'
            };
            role = role.split(' ')[0].toLowerCase();
            return {
                color: colorTable[role]
            };
        },
        roleWeight: function roleWeight(role) {
            var roleNum = {
                Owner: 3,
                Admin: 2,
                Members: 1
            };
            return roleNum[role];
        }
    }
});
Vue.component('projects', {
    name: 'projects',
    props: ['myrole', 'members', 'appList'],
    data: function data() {
        return {
            isCreateProjectModalVisible: false,
            isAddProjectMemberModalVisible: false,
            isImportProjectModalVisible: false,
            projectList: [],
            projectName: '',
            projectMembers: [],
            projectInviters: []
        };
    },

    template: getProjectsTemplate(),
    mounted: function mounted() {
        this.fetchProjects();
    },

    methods: {
        eventManager: function eventManager(type, params) {
            this[type](params);
        },
        showCreateProjectModal: function showCreateProjectModal() {
            this.isCreateProjectModalVisible = true;
        },
        closeCreateProjectModal: function closeCreateProjectModal() {
            this.isCreateProjectModalVisible = false;
        },
        showAddProjectMemberModal: function showAddProjectMemberModal(projectName) {
            this.isAddProjectMemberModalVisible = true;
            this.updataProjectName(projectName);
            this.filterProjectMembers(projectName);
            this.filterProjectInviters();
        },
        closeAddProjectMemberModal: function closeAddProjectMemberModal() {
            this.isAddProjectMemberModalVisible = false;
        },
        showImportProjectModal: function showImportProjectModal() {
            this.isImportProjectModalVisible = true;
        },
        closeImportProjectModal: function closeImportProjectModal() {
            this.isImportProjectModalVisible = false;
        },
        updataProjectName: function updataProjectName(projectName) {
            this.projectName = projectName;
        },
        filterProjectMembers: function filterProjectMembers(projectName) {
            var _this9 = this;

            this.projectMembers = [];
            var filterProjectMembersCallback = function filterProjectMembersCallback(projectList) {
                return projectList.name == projectName;
            };
            this.projectList.filter(filterProjectMembersCallback, projectName)[0].members.forEach(function (members) {
                _this9.projectMembers.push(members.user);
            });
        },
        filterProjectInviters: function filterProjectInviters() {
            var _this10 = this;

            this.projectInviters = [];
            this.members.forEach(function (user, index) {
                flag = 0;
                _this10.projectMembers.forEach(function (members) {
                    user.name === members.name || !user.join_time ? flag += 1 : '';
                });
                flag === 0 ? _this10.projectInviters.push(user) : '';
            });
        },
        fetchProjects: function fetchProjects() {
            var _this11 = this;

            var orgName = this.$root.orgName;
            var url = '/api/v1/' + orgName + '/projects?per_page=20';
            utils.DataService.get(url).done(function (res) {
                _this11.projectList = [];
                _this11.updataProjectNum(res.result.count);
                res.result.data.forEach(function (project) {
                    _this11.projectList.push(project);
                });
            });
        },
        updataProjectNum: function updataProjectNum(ProjectNum) {
            this.$emit('event', 'updataProjectNum', ProjectNum);
        },
        deleteProjectMembers: function deleteProjectMembers(projectName, deleteMemberName) {
            var orgName = this.$root.orgName;
            var self = this;
            var url = '/api/v1/' + orgName + '/projects/' + projectName + '/members/' + deleteMemberName;
            utils.Alert.openWithWarning('Make sure you want to delete ' + deleteMemberName + ' !', function () {
                utils.DataService.delete(url).done(function (res) {
                    self.fetchProjects();
                    utils.toast('Successfully delete member ' + deleteMemberName + ' !', 'succcess');
                });
                utils.Alert.close();
            });
        },
        deleteProject: function deleteProject(projectName) {
            var _this12 = this;

            var orgName = this.$root.orgName;
            var url = '/api/v1/' + orgName + '/projects/' + projectName;

            utils.Alert.openWithWarning('Make sure you want to disband ' + projectName + ' !', function () {
                utils.DataService.delete(url).done(function (res) {
                    _this12.fetchProjects();
                    utils.toast('Successfully disband project ' + projectName + ' !', 'success');
                });
                utils.Alert.close();
            });
        },
        leaveProject: function leaveProject(projectName) {
            var _this13 = this;

            var orgName = this.$root.orgName;
            var url = '/api/v1/' + orgName + '/projects/' + projectName + '/leave';
            utils.Alert.openWithWarning('Make sure you want to leave ' + projectName + ' !', function () {
                utils.DataService.delete(url).done(function (res) {
                    _this13.fetchProjects();
                    utils.toast('Successfully leave project ' + projectName + ' !', 'success');
                });
                utils.Alert.close();
            });
        },
        appColor: function appColor(app) {
            if (typeof app !== 'string') return;
            if (typeof app.split(' ')[1] !== 'string') return;
            var color = void 0;
            var colorTable = {
                simulator: 'red',
                viewer: 'green',
                toptimizer: 'yellow',
                converter: 'blue'
            };
            app = app.split(' ')[1].toLowerCase();
            return {
                color: colorTable[app]
            };
        }
    }
});
Vue.component('settings', {
    name: 'settings',
    props: ['myrole'],
    data: function data() {
        return {
            isEdit: false,
            orgs: {}
        };
    },

    template: getSettingsTemplate(),
    mounted: function mounted() {
        this.fetchOrgInfo();
    },

    methods: {
        fetchOrgInfo: function fetchOrgInfo() {
            var _this14 = this;

            var orgName = this.$root.orgName;
            var url = '/api/v1/orgs/' + orgName;
            var data = {
                organization_name: orgName
            };
            utils.DataService.get(url, data).then(function (res) {
                res.result.data.displayName = res.result.data.name;
                _this14.orgs = res.result.data;
            });
        },
        editOrgInfoOver: function editOrgInfoOver() {
            var orgName = this.$root.orgName;
            var url = '/api/v1/orgs/' + orgName;
            var data = this.orgs;
            var self = this;
            var changOrgInforMsg = 'You will change the information for the organization!';
            utils.Alert.openWithWarning(changOrgInforMsg, function () {
                utils.DataService.patch(url, data).done(function (res) {
                    utils.toast('Change information successfully', 'success');
                    self.updataDescription(self.orgs.description);
                });
                utils.Alert.close();
            });
        },
        updataDescription: function updataDescription(orgDescription) {
            this.$emit('event', 'updataDescription', orgDescription);
        }
    }
});
Vue.filter('time', function (value) {
    return window.utils.formateDate(value);
});

Vue.filter('lowercase', function (value) {
    if (value) return value.toLowerCase();
});

Vue.filter('authority', function (value) {
    return value ? 'Private' : 'Public';
});

Vue.filter('short_appname', function (value) {
    return value.split(' ')[1];
});
Vue.filter('ago', function (value) {
    var seconds = Math.floor((new Date() - new Date(value.replace(' ', 'T'))) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
        return interval + " years ago";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return interval + " months ago";
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return interval + " days ago";
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return interval + " hours ago";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
});

function getGroupTemplate() {
    return "<div class=\"group-wp\">\n    <section class=\"caption\">\n        <div class=\"container\">\n            <div class=\"clearfix\">\n                <div class=\"pull-left\">\n                    <div class=\"avatar-wrap\">\n                        <img width=\'100\' height=\'100\' :src=\"orgInfo.avatar || \'/home/static/images/icon-org.png\'\" class=\"org-avatar\">\n                        <span id=\"upload-loading-wrap\"  v-if=\"isUploading\" >\n                            <span class=\"upload-loading\"></span>\n                        </span>\n                    </div>\n                    <label for=\"upload-avatar\" class=\"bn bn-sm text-center\" v-if=\"myrole==\'Owner\'\">\n                        Upload\n                    </label>\n                </div>\n                <div class=\"col-xs-6 desc\">\n                    <h1>{{orgName}}</h1>\n                    <p class=\"sub-text\">{{ orgInfo.description }}</p>\n                </div>\n                <input type=\"file\" id=\"upload-avatar\" class=\"hide\" accept=\"image/png, image/jpeg, image/gif, image/jpg, image/bmp\" @change=\'uploadOrgAvatar($event)\' />\n            </div>\n            <ul class=\"nav nav-tabs\" role=\"tablist\">\n                <li role=\"presentation\" v-for=\"tab in tabs\" @click=\'currentView = tab.name; members = allMembers\' :class=\"{\'active\': currentView === tab.name }\">\n                    <a>\n                        <i class=\"fa\" aria-hidden=\"true\" :class=\"\'fa-\' + tab.icon\"></i> {{tab.name}}\n                        <span class=\"badge\" v-if=\"typeof tab.num === \'number\'\">\n                            {{tab.num}}\n                        </span>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </section>\n    <div class=\"container\">\n        <transition name=\"fade\">\n            <component v-on:event=\"eventManager\" :appList=\"appList\" :is=\"currentView\" :myrole=\"myrole\" :members=\"members\"></component>\n        </transition>\n    </div>\n\n    <crop-dialog v-on:event=\"eventManager\" :isShow=\"isCropModalVisible\"/>\n    <invite-dialog v-on:event=\"eventManager\" v-if = \"isInviteModalVisible\" />\n</div>";
}

function getOverviewTemplate() {
    return "";
}

function getMembersTemplate() {
    return "<section class=\"group-panel\">\n    <div>\n        <div class=\"clearfix toolbar\">\n            <button class=\"bn danger pull-right\" v-if=\'myrole !== \"Owner\"\' @click=\'leaveOrg()\'>Leave</button>            \n            <button class=\"bn primary pull-right\" v-if =\'myrole !==\"Members\"\' @click=\'inviteMember()\'>Invite member</button>\n            <!--<button class=\"bn primary pull-right\" @click=\'inviteMember()\'>Transfer</button>-->\n        </div>\n        <section class=\"panel member-list\">\n            <div class=\"panel panel-heading clearfix\">\n                <div class=\"select\">\n                    <label for=\"all\" class=\"select_checkbox\">\n                        <input type=\"checkbox\" name=\"all\"  @change=\"watchCheckedAll($event)\"/>\n                    </label>\n                    <span class=\"select_word\">\n                        Select All\n                    </span>\n                </div>\n                <div class=\"dropdown\">\n                    <button id=\"dLabel\" class=\"bn bn-sm\" type=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n                        Filter by role\n                        <span class=\"caret\"></span>\n                    </button>\n                    <ul class=\"dropdown-menu\" aria-labelledby=\"dLabel\">\n                        <li @click=\"fetchMembers()\"><a>Everyone</a></li>\n                        <li @click=\"filterMembersRole(\'Owner\')\"><a>Owner</a></li>\n                        <li @click=\"filterMembersRole(\'Admin\')\"><a>Admin</a></li>\n                        <li @click=\"filterMembersRole(\'Members\')\"><a>Members</a></li>\n                    </ul>\n                </div>\n            </div>\n            <div class=\"panel panel-body\">\n                <ul class=\"list-unstyled\">\n                    <li class=\"clearfix \" v-for=\"(user, index) in  members\">\n                        <div class=\"cell cell_checkbox\">\n                            <input type=\"checkbox\" v-model=\"user.checked\">\n                        </div>\n                        <div class=\"cell cell_avatar\">\n                            <img v-bind:src=\"user.avatar_sm || \'/home/static/images/avatar.png\'\">\n                        </div>\n                        <div class=\"cell memberInfo\">\n                            <span class=\"info-name\">{{user.name}}</span>\n                            <span class=\"sub-text\">{{user.email}}</span>\n                        </div>\n                        <div class=\"cell_right\">\n                            <div class=\"cell cell_right_role\">\n                                <i class=\"fa fa-circle\" :style=\"roleColor(user.role)\"></i>\n                                <select class=\"form-select\" v-if=\'myrole ==\"Owner\" && user.role !=\"Owner\"\' @change=\'changeRole(user,$event)\' v-model=\'user.role\'>\n                                    <option value =\"Admin\">Admin</option>\n                                    <option value=\"Members\">Members</option>\n                                </select>\n                                <span v-else >{{user.role}}</span>\n                            </div>\n                            <div class=\"cell cell_right_action\">\n                                <span v-if=\"user.role !== \'Owner\' && !user.join_time\" class=\"sub-text\">Invited</span>\n                                <button class=\"bn bn-sm danger\" v-if=\"user.join_time && roleWeight(myrole) > roleWeight(user.role) && myrole !== \'Members\'\" @click=\'deleteMember(user.name)\'>Delete</button>                            \n                            </div>\n                        </div>\n                    </li>\n                </ul>\n            </div>\n        </section>\n    </div>\n    <!--<div v-if=\'!isAdd && isTransfer\'>\n        <div class=\"form-group\">\n            <label class=\"col-sm-3 col-xs-12 control-label\">Transfer Organization to :</label>\n            <div class=\"col-sm-4 col-xs-8\">\n                <input type=\"text\" class=\"form-control\" placeholder=\"username or email address\" v-model=\'newOwner\'>\n            </div>\n        </div>\n        <button @click=\'changeRole(newOwner,\"Owner\");isTransfer=false\'>Transfer</button>\n        <button @click=\'isTransfer=false\'>cancel</button>\n    </div>-->\n</section>";
}

function getProjectsTemplate() {
    return "<section class=\"group-panel\">\n    <div>\n        <div class=\"clearfix toolbar\">\n            <button class=\"bn primary pull-right\" @click=\'showImportProjectModal()\'>Import project</button>\n            <!--<button class=\"bn primary pull-right\" @click=\'showCreateProjectModal()\'>Creat new project</button>-->\n        </div>\n        <section>\n            <ul class=\"list-unstyled project-list\">\n                <li v-for=\"(project, index) in projectList\">\n                    <div class=\"panel\">\n                        <div class=\"panel-heading clearfix\">\n                            <h5 class=\"panel-heading-title\">\n                                <a :href=\"project.link\">\n                                    <i class=\"fa fa-navicon\"></i> {{project.name}}\n                                </a>\n                                <button class=\"bn bn-sm danger pull-right\" v-if=\"myrole ===\'Owner\' || project.creator\" @click=\"deleteProject(project.name)\">Disband</button>\n                                <button class=\"bn bn-sm danger pull-right\" v-if=\"!(myrole ===\'Owner\' || project.creator) && project.private \"  @click=\"leaveProject(project.name)\">Leave</button>\n                            </h5>\n                        </div>\n                        <div class=\"panel-body\">\n                            <div class=\"row clearfix\">\n                                <div class=\"col-sm-3 col-xs-6\" v-for=\'member in project.members\'>\n                                    <div class=\"user-badge text-center text-overflow\">\n                                        <img class=\"user-badge-avatar\" :src=\'member.user.avatar_sm\' :alt=\'member.user.name\' />\n                                        <span>{{member.user.name}}</span>\n                                        <button v-if=\"(myrole ===\'Owner\' || project.creator) && member.role !=\'Admin\' \" class=\"user-badge-del\" @click=\"deleteProjectMembers(project.name,member.user.name)\">×</button>\n                                    </div>\n                                </div>\n                                <div class=\"col-sm-3 col-xs-6\" v-if=\"myrole ===\'Owner\' || project.creator\" @click=\'showAddProjectMemberModal(project.name)\'>\n                                    <div class=\"user-badge text-center text-overflow\">\n                                        <img class=\"user-badge-avatar\" src=\"/home/static/images/icon-add.png\" />\n                                        <span>Add</span>\n                                    </div>\n                                </div>\n                            </div>\n                            <hr/>\n                            <span>\n                                <span class=\"inb100\">\n                                    <i class=\"fa fa-circle\" :style=\"appColor(project.app.name)\"></i>\n                                    {{project.app.name | short_appname}}\n                                </span>\n                            <span class=\"label label-private\" v-if=\"project.private\">\n                                    <i class=\"icon icon-private\"></i>\n                                    Private\n                                </span>\n                            </span>\n                            <span class=\"pull-right\">\n                                <i class=\"fa fa-calendar\"></i>Created {{project.created_time | ago}}\n                            </span>\n                        </div>\n                    </div>\n                </li>\n            </ul>\n        </section>\n    </div>\n    <transition name=\"fade\">\n        <create-project-dialog v-on:event=\"eventManager\" v-if=\"isCreateProjectModalVisible\" :appList=\"appList\" :members=\"members\" />\n        <add-project-member-dialog v-on:event=\"eventManager\" v-if=\"isAddProjectMemberModalVisible\" :projectInviters=\'projectInviters\' :projectMembers=\"projectMembers\" />\n        <import-project-dialog v-on:event=\"eventManager\" v-if=\"isImportProjectModalVisible\" :appList=\"appList\" :members=\"members\" />\n    </transition>\n</section>";
}

function getSettingsTemplate() {
    return "<section class=\"group-panel\">\n    <div class=\"col-md-12\">\n        <h3>Organization profile</h3>\n        <hr/>\n        <form>\n            <dl class=\"form-group clearfix\">\n                <dt>\n                    <label>Contact:</label>\n                </dt>\n                <dd>\n                  <input type=\"text\" class=\"form-ctl input-contrast col-sm-5 col-xs-8\" placeholder=\"Contact\" v-model=\'orgs.contact\' :disabled=\'myrole==\"Members\"\' />\n                </dd>    \n            </dl>\n            <dl class=\"form-group clearfix\">\n                <dt>\n                    <label>Description: </label>\n                </dt>\n                <dd>\n                    <textarea type=\"textarea\" class=\"form-ctl input-contrast col-sm-5 col-xs-8\" rows=\"3\" placeholder=\"Description\" style=\"resize:none\" v-model=\'orgs.description\' :disabled=\'myrole==\"Members\"\' />\n                </dd> \n            </dl>\n            <dl class=\"form-group clearfix\">\n                <dt>\n                    <label>Billing contact: </label>\n                </dt>\n                <dd>\n                    <input type=\"textarea\" class=\"form-ctl input-contrast col-sm-5 col-xs-8\" placeholder=\"Billing contact email\" v-model=\'orgs.billing_contact\' :disabled=\'myrole==\"Members\"\' />\n                </dd> \n            </dl>\n            <dl class=\"form-group clearfix\">\n                <dt>\n                    <label>Technology contact: </label>\n                </dt>\n                <dd>\n                    <input type=\"textarea\" class=\"form-ctl input-contrast col-sm-5 col-xs-8\" placeholder=\"Technology contact email\" v-model=\'orgs.tech_contact\' :disabled=\'myrole==\"Members\"\' />\n                </dd> \n            </dl>\n            <dl class=\"form-group clearfix\">\n                <dt>\n                    <label>Website:</label>\n                </dt>\n                <dd>\n                    <input type=\"text\" class=\"form-ctl input-contrast col-sm-5 col-xs-8\" id=\"website\" placeholder=\"https://www.simright.com\" v-model=\'orgs.website\' :disabled=\'myrole==\"Members\"\' />\n                </dd> \n            </dl>\n            <dl class=\"form-group clearfix\">\n                <dt>\n                    <label>Location: </label>\n                </dt>\n                <dd>\n                    <div class=\"clearfix\">\n                        <input type=\"text\" class=\"form-ctl input-contrast col-sm-5 col-xs-8\" placeholder=\"Country\" v-model=\'orgs.country\' :disabled=\'myrole==\"Members\"\'>\n                    </div>\n                    <br/>\n                    <div class=\"clearfix\">\n                        <input type=\"text\" class=\"form-ctl input-contrast col-sm-5 col-xs-8\" placeholder=\"Province\" v-model=\'orgs.province\' :disabled=\'myrole==\"Members\"\'>\n                    </div>  \n                    <br/>\n                    <div class=\"clearfix\">\n                        <input type=\"text\" class=\"form-ctl input-contrast col-sm-5 col-xs-8\" placeholder=\"City\" v-model=\'orgs.city\' :disabled=\'myrole==\"Members\"\'>\n                    </div>\n                </dd> \n            </dl>\n            <button type=\"button\" class=\"bn\" @click=\'editOrgInfoOver()\' v-if=\'myrole!=\"Members\"\'>Update Profile</button>\n            <br/>\n            <small>\n                We store your personal data in our database. See our <a href=\"\">privacy policy</a>  for more information.\n            </small>\n        </form>\n    </div>\n</section>";
}

function getLogsTemplate() {
    return "<section class=\"group-panel\">\n    <h3>Today({{ countToday(logs) }}):</h3>\n    <hr/>\n    <ul class=\"list-group\">\n        <li class=\"list-group-item clearfix\" v-for=\"(log, index) in logs\">\n            <span class=\"col-sm-8 col-xs-12 icon-dot6\">{{log.log}}</span>\n            <span class=\"col-sm-3 col-xs-9 pull-right text-right pdt1 sub-text\"  \n                :title=\"log.name\">\n                {{log.time | time}}\n                <img class=\"avatar_sm\" :src=\"log.avatar_sm || \'/home/static/images/avatar.png\'\">\n            </span>\n        </li>\n        <button class=\"bn bn-block\"  @click=\"fetchLogs()\" v-if=\'logsPage > page\'>\n            Click here to load more log records!\n        </button>\n    </ul>\n</section>";
}

function getCropDialogTemplate() {
    return "<div class=\"dialog-mask crop-dialog\" :style=\"{ display: isShow? \'flex\' : \'none\' }\">\n    <div class=\"dialog\" role=\"dialog\">\n        <div class=\"heading\">\n            <h4 class=\"modal-title\">Crop your new avatar.</h4>\n            <button class=\"pull-right close-button\" @click=\"close()\">&times;</button>\n        </div>\n        <div class=\"body\">\n            <div class=\"crop\">\n                <div id=\"upload-picture\"></div>\n            </div>\n        </div>\n        <div class=\"footer\">\n            <button type=\"button\" class=\"bn pull-right\" id=\"upload-result\" @click=\"upload()\">Set your avatar</button>\n        </div>\n    </div>\n</div>";
}

function getInviteDialogTemplate() {
    return "<div class=\"dialog-mask\" style=\"display:flex\">\n    <div class=\"dialog dialog-sm project-create-dialog inviter-dialog\" role=\"dialog\">\n        <div class=\"heading text-center\">\n            <button class=\"pull-right close-button\" @click=\"close()\">&times;</button>\n            <div class=\"caption\">\n                <h1>\n                    <i class=\"fa fa-envelope-o\" aria-hidden=\"true\"></i>\n                </h1>\n                <h4>Add member to the project</h4>\n            </div>\n        </div>\n        <div class=\"body\">\n            <input type=\"text\" class=\"form-control\" id=\"invite\" placeholder=\"username or email address\" v-model=\"inviteName\">\n            <ul class=\"_list_inviter\" v-if=\'isSearchMembers\'>\n                <li v-for=\"member in searchMembers\" class=\"clearflex\">\n                    <img :src=\"member.avatar_sm\" alt=\"\">\n                    <b>{{member.name}}</b>\n                    <span>{{member.email}}</span>\n                    <button class=\"bn pull-right add-button\" @click=\"sendInvite(member.name)\">+</button>\n                </li>\n            </ul>\n        </div>\n    </div>\n</div>";
}

function getCreateProjectDialogTemplate() {
    return "<div class=\"dialog-mask\" style=\"display:flex\">\n    <div class=\"dialog project-create-dialog\" role=\"dialog\">\n        <div class=\"heading text-center\">\n            <button class=\"pull-right close-button\" @click=\"close()\">&times;</button>\n            <div class=\"caption\">\n                <h1>\n                    <i class=\"fa fa-cubes\"></i>\n                </h1>\n                <h4>Create a project for workflow</h4>\n                <p class=\"sub-text\">All the members in the project will involve in the workflow</p>\n            </div>\n        </div>\n        <div class=\"body\">\n            <form>\n                <div class=\"form-group clearfix\">\n                    <label class=\"col-xs-5\">\n                        Project name:\n                    </label>\n                    <input type=\"text\" class=\"form-ctl col-xs-7\" v-model=\"projectInfo.name\" placeholder=\"Project name...\" @blur=\"checkName()\" @keyup=\"splitName()\">\n                </div>\n                <div class=\"form-group clearfix\">\n                    <label class=\"col-xs-5\">\n                        Choose application:\n                    </label>\n                    <select class=\"form-select col-xs-7\" v-model=\"projectInfo.app_sname\" name=\"\">\n                        <option :value=app.name v-for=\"app in appList\">{{app.name}}</option>\n                    </select>\n                </div>\n                <div class=\"form-group clearfix\">\n                    <label class=\"col-xs-5\">\n                        Choose authority:\n                    </label>\n                    <select class=\"form-select col-xs-7\" v-model=\"projectInfo.private\" name=\"\" id=\"\">\n                        <option value=\"true\">Private</option>\n                        <option value=\"false\">Public</option>\n                    </select>\n                </div>\n                <div class=\"form-group clearfix\" v-if=\"otherMembers.length > 0\">\n                    <label class=\"col-xs-5\">\n                        Choose members:\n                    </label>\n                    <div class=\"col-xs-12\">\n                        <div class=\"row\">\n                            <label v-for=\"user in otherMembers\" class=\"col-xs-3 text-overflow\">\n                                <input type=\"checkbox\" :value=\"user.name\" v-model=\"projectInfo.user_list\">\n                                <span :title=\"user.name\">{{user.name}}</span>\n                            </label>\n                        </div>\n                    </div>\n                </div>\n            </form>\n        </div>\n        <div class=\"footer\">\n            <button type=\"button\" class=\"bn pull-right\" @click=\"createProject()\">Create</button>\n        </div>\n    </div>\n</div>";
}

function getAddProjectMemberDialogTemplate() {
    return "<div class=\"dialog-mask\" style=\"display:flex\">\n    <div class=\"dialog dialog-sm add-members-dialog\" role=\"dialog\">\n        <div class=\"heading text-center\">\n            <button class=\"pull-right close-button\" @click=\"close()\">&times;</button>\n            <div class=\"caption\">\n                <h4>Add member to the project</h4>\n            </div>\n        </div>\n        <div class=\"body\">\n            <form v-if = \'hasProjectInviters\'>\n                <div class=\"form-group clearfix\">\n                    <label>\n                        Choose member:\n                    </label>\n                    <select class=\"form-select col-xs-6\" v-model=\"inviterName\" name=\"\">\n                        <option :value=user.name v-for=\"user in projectInviters\">{{user.name}}</option>\n                    </select>\n                    <button type=\"button\" class=\"bn bn-sm\" @click=\"addProjectMembers()\">Add</button>\n                </div>\n            </form>\n            <p v-else class=\"text-center\">No more member</p>\n        </div>\n    </div>\n</div>";
}
function getImportProjectDialogTemplate() {
    return "<div class=\"dialog-mask\" style=\"display:flex\">\n    <div class=\"dialog dialog-sm\" role=\"dialog\">\n        <div class=\"heading text-center\">\n            <button class=\"pull-right close-button\" @click=\"close()\">&times;</button>\n            <div class=\"caption\">\n                <h1>\n                    <i class=\"fa fa-cubes\"></i>\n                </h1>\n                <h4>Import a project for workflow</h4>\n                <p class=\"sub-text\">All the members in the project will involve in the workflow</p>\n            </div>\n        </div>\n        <div class=\"body\">\n            <form v-if=\'usersProjects.length > 0\'>\n                <div class=\"form-group clearfix\">\n                    <label class=\"col-xs-5\">\n                        Select Project:\n                    </label>\n                    <select class=\"form-select col-xs-7\" v-model=\'importProjectInfo.uuid\'>\n                        <option :value=\"project.uuid\"  v-for=\'project in usersProjects\' >{{project.name}}</option>\n                    </select>\n                </div>\n                <div class=\"form-group clearfix\">\n                    <label class=\"col-xs-5\">\n                        Rename project:\n                    </label>\n                        <input class=\" form-ctl col-xs-7\" type=\"text\" v-model=\'importProjectInfo.rename\'>\n                </div>\n                <div class=\"form-group clearfix\">\n                    <label class=\"col-xs-5\">\n                        Choose authority:\n                    </label>\n                    <select class=\"form-select col-xs-7\" name=\"\" id=\"\" v-model=\'importProjectInfo.private\'>\n                        <option value=\"true\">Private</option>\n                        <option value=\"false\">Public</option>\n                    </select>\n                </div>\n                <div class=\"form-group clearfix\" v-if=\"otherMembers.length > 0\">\n                    <label class=\"col-xs-5\">\n                        Choose members:\n                    </label>\n                    <div class=\"col-xs-12\">\n                        <div class=\"row\">\n                            <label v-for=\"user in otherMembers\" class=\"col-xs-3 text-overflow\">\n                                <input type=\"checkbox\" :value=\"user.name\" v-model=\"importProjectInfo.user_list\">\n                                <span :title=\"user.name\">{{user.name}}</span>\n                            </label>\n                        </div>\n                    </div>\n                </div>\n            </form>\n            <p v-else class=\"text-center\">No Project</p>\n        </div>\n        <div class=\"footer\" v-if=\'usersProjects.length > 0\'>\n            <button type=\"button\" class=\"bn pull-right\" @click=\"importProject()\">Create</button>\n        </div>\n    </div>\n</div>";
}
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
        appList: [{
            id: 0,
            name: 'simright-viewer'
        }, {
            id: 1,
            name: 'simright-simulator'
        }, {
            id: 2,
            name: 'simright-converter'
        }, {
            id: 3,
            name: 'simright-toptimizer'
        }],
        members: [],
        allMembers: [],
        myrole: ''
    },
    template: getGroupTemplate(),
    methods: {
        eventManager: function eventManager(type, params) {
            this[type](params);
        },
        updateMemberNum: function updateMemberNum(count) {
            this.tabs.filter(function (tab) {
                return tab.name === 'members';
            })[0].num = count;
        },
        updataProjectNum: function updataProjectNum(count) {
            this.tabs.filter(function (tab) {
                return tab.name === 'projects';
            })[0].num = count;
        },
        changeMyRole: function changeMyRole(myrole) {
            this.myrole = myrole;
        },
        changeCurrentView: function changeCurrentView(name) {
            this.currentView = name;
        },
        updataOrgInfo: function updataOrgInfo(orgName, avatar, description) {
            this.orgName = orgName;
            this.orgInfo.avatar = avatar;
            this.orgInfo.description = description;
        },
        updataDescription: function updataDescription(description) {
            this.orgInfo.description = description;
        },
        fetchOrgInfo: function fetchOrgInfo() {
            var _this15 = this;

            var orgName = this.orgName;
            var url = '/api/v1/orgs/' + orgName + '/info';
            utils.DataService.get(url).done(function (res) {
                _this15.username = res.result.username;
                _this15.updateMemberNum(res.result.member_count);
                _this15.updataProjectNum(res.result.project_count);
                _this15.changeMyRole(res.result.role);
                _this15.updataOrgInfo(res.result.organization.name, res.result.organization.avatar_lg, res.result.organization.description);
            });
        },
        fetchMembers: function fetchMembers() {
            var _this16 = this;

            var orgName = this.orgName;
            var url = '/api/v1/orgs/' + orgName + '/members?per_page=20';
            utils.DataService.get(url).then(function (res) {
                _this16.members = [];
                _this16.allMembers = [];
                res.result.data.forEach(function (user) {
                    user.checked = false;
                    _this16.members.push(user);
                });
                res.result.data.forEach(function (user) {
                    return _this16.allMembers.push(user);
                });
                _this16.updateMemberNum(res.result.members);
            });
        },
        closeCropModal: function closeCropModal() {
            this.isCropModalVisible = false;
        },
        showCropModal: function showCropModal() {
            this.isCropModalVisible = true;
        },
        addUploading: function addUploading() {
            this.isUploading = true;
        },
        closeUploading: function closeUploading() {
            this.isUploading = false;
        },
        showInviteModal: function showInviteModal() {
            this.isInviteModalVisible = true;
        },
        closeInviteModal: function closeInviteModal() {
            this.isInviteModalVisible = false;
        },
        filterMembersRole: function filterMembersRole(roleValue) {
            var filterRoleCallback = function filterRoleCallback(allMembers) {
                return allMembers.role == roleValue;
            };
            this.members = this.allMembers.filter(filterRoleCallback, roleValue);
        },
        watchCheckedAll: function watchCheckedAll(ev) {
            var bool = ev.target.checked ? true : false;
            this.members.forEach(function (user) {
                user.checked = bool;
            });
        },
        uploadOrgAvatar: function uploadOrgAvatar(e) {
            utils.CropService.execute(e.target);
            this.showCropModal();
        }
    },
    mounted: function mounted() {
        var name = window.location.search.split('?')[1];
        if (name) {
            this.changeCurrentView(name);
        }
        this.fetchMembers();
        this.fetchOrgInfo();
    }
});