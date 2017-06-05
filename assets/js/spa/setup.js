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
function getSTTemplate() {
    return {
        gulp_inject: '../templates/ST.html'
    };
}
function getWelcomeTemplate(){
    return{
        gulp_inject:'../templates/welcome.html'
    }
}
function getHomeTemplate(){
    return{
        gulp_inject:'../templates/home.html'
    }
}
function getLoginTemplate(){
    return{
        gulp_inject:'../templates/login.html'
    }
}
function getSearchTemplate(){
    return {
        gulp_inject:'../templates/search.html'
    }
}
function getMineTemplate(){
    return {
        gulp_inject:'../templates/mine.html'
    }
}
function getDetailsTemplate(){
    return {
        gulp_inject:'../templates/goods-details.html'
    }
}
function getPublishTemplate(){
    return {
        gulp_inject:'../templates/publish.html'
    }
}
function getSupplementTemplate(){
    return{
        gulp_inject:'../templates/supplement.html'
    }
}