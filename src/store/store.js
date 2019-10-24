import Vue from 'vue'
import Vuex from 'vuex'
import API from '../service/API'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: window.localStorage.getItem('username'),
    isLogin: false,
    isAdmin: false,
    dialog_login: false,
    azure_config: {
      headers: {
        "content-type": "application/octet-stream",
        "Ocp-Apim-Subscription-Key": "a193aaa4368842fea4098fa4489c17ca"
      },
      timeout: 5000
    },
    azure_api: "https://australiaeast.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true",

    snackbar: {
      showing: null,
      text: '',
      color: '',

    },
    courses: [],
    barItems: [
      //
      {
        icon: "mdi-account-box-outline",
        title: "Account",
        link: "/user/account",
        admin: false,
        show: true
      },
      {
        icon: "mdi-book",
        title: "Suggested",
        link: "/suggest",
        admin: false,
        show: true
      },
      {
        icon: "mdi-book-open-variant",
        title: "My Courses",
        link: "/user/suggest",
        admin: false,
        show: true
      },
      {
        icon: "mdi-content-paste",
        title: "Report",
        link: "/user/report",
        admin: false,
        show: true,
      },
      {
        icon: "mdi-history",
        title: "History",
        link: "/user/history",
        admin: false,
        show: true
      }
      ,
      {
        icon: "mdi-credit-card",
        title: "QR Code Scan",
        link: "/admin/qr",
        admin: true,
        show: false
      },
      {
        icon: "mdi-credit-card",
        title: "Manage Courses",
        link: "/admin/manage",
        admin: true,
        show: false
      }
    ],
    randomPics: [
      {
        src:
          "https://images.unsplash.com/photo-1569025743873-ea3a9ade89f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMDk0fQ&auto=format&fit=crop&w=1050&q=80"
      },
      {
        src:
          "https://images.unsplash.com/photo-1563283323-afa46a75568c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1029&q=80"
      },
      {
        src:
          "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      },
      {
        src:
          "https://images.unsplash.com/photo-1474377207190-a7d8b3334068?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
      },
      {
        src:
          "https://images.unsplash.com/photo-1558986377-c44f6a2b50f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
      },
      {
        src:
          "https://images.unsplash.com/photo-1459499362902-55a20553e082?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1049&q=80"
      }
    ]
  },
  getters: {
    //
    findCourseById: state => (id) => {
      return state.courses.find(c => c.course_id == id) || {}
    },
  },
  mutations: {
    //
    SET_SNACKBAR(state, data) {
      state.snackbar.showing = data.showing
      state.snackbar.text = data.text
      state.snackbar.color = data.color
    },
    //
    SET_ADMIN_LOGIN(state, data) {
      state.isAdmin = true
      state.isLogin = true
      this.username = data/////
      window.localStorage.setItem('username', data)
    },
    //
    SET_USER_LOGIN(state, data) {
      state.isLogin = true
      state.isAdmin = false
      this.username = data/////
      window.localStorage.setItem('username', data)
    },
    //
    DO_NOTHING(state, data) {
      // console.log(state)
      // console.log(data)
    },
    LOG_OUT(state, data) {
      // console.log(state)
      // console.log(data)
      window.localStorage.removeItem('username')
      state.isLogin = false
      state.isAdmin = false
    }
  },
  actions: {
    async callAzure({ commit }, file) {
      // console.log('calling azure')
      // console.log(this.state.azure_config)
      // console.log(this.state.azure_api)
      // let Axios = axios.create({
      //   baseURL: this.state.azure_api,
      //   headers: this.state.azure_config.headers
      // })
      let res = await
        axios.post(
          this.state.azure_api,
          file,
          this.state.azure_config)
      commit('DO_NOTHING', {})

      // console.log(res)
      return res.data


    },
    async set_courses() {
      // try{
      // console.log("=======================store set courses=============================")
      let res = await this.dispatch('callAPI', {
        send: {},
        branch: '/get_all_courses/',
        call: 'DO_NOTHING',
        setData: {}
      })
      // console.log("=======================courses results===============================")
      // console.log(res.courses)
      this.state.courses = res.courses
      var pics = this.state.randomPics
      for (var i = 0; i < this.state.courses.length; i++) {
        this.state.courses[i].src = pics[i % 5].src;
        this.state.courses[i].ran = parseInt(Math.random() * 100000 * Math.random());
        if (this.state.courses[i].course_desc.length < 1) {
          this.state.courses[i].course_desc = "No Description";
        }
        // if()
        // {}
        this.state.courses[i].bgc = 'background-color:red'
      }
      // }
      // catch(err){
      //   return err
      // }
    },
    async callAPI({ commit }, data) {
      // try {
      let branch = data.branch
      // see branch info
      // console.log(`The branch is ${branch}`)
      let send = data.send
      // see FormData info
      // if (send instanceof FormData) {
      //   for (var pair of send.entries()) {
      //     console.log(`The send data is ${pair[0]} : ${pair[1]}`)
      //   }
      // }

      let call = data.call
      // console.log(call)
      let setData = data.setData
      // console.log(setData)
      let res = await API().post(branch, send);
      // console.log(res)
      // console.log(res.data)
      if (branch == '/authenticate/') {
        if (res.data.code == 'true') {
          this.state.isLogin = true
          let res2 = await API().post('/authenticate_staff/')
          if (res2.data.code == 'true') {
            this.state.isAdmin = true
          }
          else {
            this.state.isAdmin = false
          }
        }
        else {
          commit('LOG_OUT', {})
        }
      }

      // if (res.data.code == "ok") {
      //   commit(call, setData)
      // }
      return res.data
      // }
      // catch{
      //   this.state.snackbar = {
      //     showing: true,
      //     text: 'Error in calling API',
      //     color: 'error'
      //   }
      //   console.log('Error')
      // }
    }
  }
})
