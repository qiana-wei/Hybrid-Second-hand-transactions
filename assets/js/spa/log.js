Vue.component('logs', {
    name: 'logs',
    template: getLogsTemplate(),
    data() {
        return {
            logs: [],
            logsPage:'',
            page:1
        }
    },
    mounted() {
        this.logs = [];
        this.fetchLogs(this.page)
    },
    methods: {
        fetchLogs(pageNum) {
            let orgName = this.$root.orgName;
            let page = pageNum ? pageNum : ++this.page
            let url = `/api/v1/orgs/${orgName}/log?per_page=12&page=${page}`;
            let self = this
            utils.DataService.get(url)
                .then(res => {
                    res.result.data.forEach(log => {
                        self.logs.push(log);
                    })
                    self.updataLogsPage(res.result.maxpage)                         
                })
        },
        watchCheckedAll(ev){
            let bool = ev.target.checked ? true : false;
            this.logs.forEach(log => {
                log.checked = bool;
            })
        },
        countToday(){
            let now = new Date();
            let start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
            return this.logs.filter(log => {
                return new Date(log.time).getTime() > start;
            }).length;
        },
        updataLogsPage(logsPage){
            this.logsPage = logsPage
        }
    }
})