Vue.filter('time', function(value) {
    return window.utils.formateDate(value);
})

Vue.filter('lowercase', function(value) {
    if(value)
        return value.toLowerCase();
})

Vue.filter('authority', function(value) {
    return value ? 'Private' : 'Public';
})

Vue.filter('short_appname', function(value) {
    return value.split(' ')[1];
})
Vue.filter('ago', function(value) {
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
})


function getGroupTemplate() {
    return {
        gulp_inject: '../templates/group.html'
    };
}

function getOverviewTemplate() {
    return {
        gulp_inject: '../templates/overview.html'
    };
}

function getMembersTemplate() {
    return {
        gulp_inject: '../templates/members.html'
    };
}

function getProjectsTemplate() {
    return {
        gulp_inject: '../templates/projects.html'
    };
}

function getSettingsTemplate() {
    return {
        gulp_inject: '../templates/settings.html'
    };
}

function getLogsTemplate() {
    return {
        gulp_inject: '../templates/logs.html'
    };
}

function getCropDialogTemplate() {
    return {
        gulp_inject: '../templates/crop-dialog.html'
    };
}

function getInviteDialogTemplate() {
    return {
        gulp_inject: '../templates/invite-dialog.html'
    }
}

function getCreateProjectDialogTemplate() {
    return {
        gulp_inject: '../templates/create-project-dialog.html'
    }
}

function getAddProjectMemberDialogTemplate() {
    return {
        gulp_inject: '../templates/add-project-member-dialog.html'
    }
}
function getImportProjectDialogTemplate() {
    return {
        gulp_inject: '../templates/import-project-dialog.html'
    }
}