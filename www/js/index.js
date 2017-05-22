'use strict';

Vue.component('home', {
    name: 'home',
    template: getHomeTemplate(),
    data: function data() {
        return {
            userInfo: this.$root.userInfo
        };
    },

    methods: {}
});
Vue.component('login', {
    name: 'login',
    template: getLoginTemplate(),
    data: function data() {
        return {
            user_phone: '',
            check_code: ''
        };
    },

    methods: {
        getCheckCode: function getCheckCode() {},
        checkCode: function checkCode() {}
    }
});
function getSTTemplate() {
    return "<div data-page=\"welcome\">\n    <transition name=\"fade\">\n        <component v-on:event=\"eventManager\" :is=\"currentView\" ></component>\n    </transition>\n</div>";
}
function getWelcomeTemplate() {
    return "<div class=\"welcome\">\n    <button @click=\"changeCurrentView()\">进入</button>\n</div>";
}
function getHomeTemplate() {
    return "<div class=\"home\">\n    home\n</div>";
}
function getLoginTemplate() {
    return "<div class=\"login\">\n    <form>\n        <div>\n            <label><i class=\"fa fa-phone\" aria-hidden=\"true\"></i></label>\n            <input type=\"text\" name=\"phone\" placeholder=\"请输入手机号\" v-model=\"user_phone\">\n        </div>\n        <div class=\"check_code\">\n            <div>\n                <label><i class=\"fa fa-key\" aria-hidden=\"true\"></i></label>\n                <input type=\"text\" name=\"check_code\" placeholder=\"请输入验证码\" v-model=\"check_code\" >\n            </div>\n            <div>\n                <button class=\"bn\" type=\"button\" @click=\"getCheckCode()\">点击获取</button>\n            </div>\n        </div>\n        <button class=\"login_btn bn\" type=\"button\" @click=\"checkCode()\">登陆</button>\n    </form>\n</div>";
}
Vue.component('welcome', {
    name: 'welcome',
    template: getWelcomeTemplate(),
    data: function data() {
        return {
            userInfo: this.$root.userInfo
        };
    },

    methods: {
        changeCurrentView: function changeCurrentView() {
            if (this.userInfo) {
                console.log('home');
                this.$emit('event', 'changeCurrentView', 'home');
            } else {
                console.log('login');
                this.$emit('event', 'changeCurrentView', 'login');
            }
        }
    }
});
new Vue({
    el: '#app',
    data: {
        userInfo: '',
        currentView: 'welcome',
        pages: [{
            name: 'welcome'
        }, {
            name: 'login'
        }, {
            name: 'home'
        }, {
            name: 'goodsdetails'
        }, {
            name: 'uploadgoods'
        }, {
            name: 'profile'
        }]
    },
    template: getSTTemplate(),
    methods: {
        eventManager: function eventManager(type, params) {
            this[type](params);
        },
        changeCurrentView: function changeCurrentView(name) {
            console.log(name);
            this.currentView = name;
        }
    },
    mounted: function mounted() {
        this.userInfo = localStorage.getItem('userInfo');
    }
});