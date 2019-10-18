import Vue from 'vue'
import API from '../service/API'
import User from '../views/User.vue'
import store from '../store/store'
import Router from 'vue-router'
import Admin from '../views/Admin.vue'
import Index from '../views/Index.vue'
import GetApp from '../views/GetApp.vue'
import Survey from '../views/Survey.vue'
import Policy from '../views/Policy.vue'
import Report from '../views/Report.vue'
import Courses from '../views/Courses.vue'
import Account from '../views/Account.vue'
import History from '../views/History.vue'
import TestView from '../views/TestView.vue'
import FaceScan from '../views/FaceScan.vue'
import AllCourses from '../views/AllCourses.vue'
import ManageScan from '../views/ManageScan.vue'
import Certificates from '../views/Certificates.vue'
import MyCourseView from '../views/MyCourseView.vue'
import CourseDetail from '../views/CourseDetail.vue'
import ManageCourse from '../views/ManageCourse.vue'
import SurveySubmitted from '../views/SurveySubmitted.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/submit_sv',
      name: 'submmitted survey',
      component: SurveySubmitted
    },
    {
      path: '/test',
      name: 'test',
      component: TestView
    }, {
      path: '/getapp',
      name: 'get app',
      component: GetApp
    },
    {
      path: '/policy',
      name: 'policy',
      component: Policy
    },
    {
      path: '/suggest/:id',
      name: 'course detail',
      component: CourseDetail
    },
    {
      path: '/suggest',
      name: 'all courses',
      component: AllCourses
    },
    // test below
    {
      path:'/facecam',
      name:'test face cam',
      component: FaceScan
    },
    {
      path: '/qrcam',
      name: 'test scan QR',
      component: ManageScan
    },
    {
      path: '/manage',
      name: 'manage courses',
      component: ManageCourse
    },
    // test above
    {
      path: '/',
      name: 'index',
      component: Index
    }, 
    // {
    //   path: '/mcam',
    //   name: 'test cam',
    //   component: FaceScan
    // },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,

      beforeEnter: async (to, from, next) => {
        let res1 = await API().post('/authenticate_staff/')
        if (res1.data.code != 'true') {
          store.state.isAdmin = false
          next('/')
          store.state.snackbar = {
            showing: true,
            text: 'Not Admin!',
            color: 'error'
          }
        }
        else {
          store.state.isAdmin = true
          next()
        }
      },
      children: [
        {
          path: 'qr',
          name: 'QR scan',
          component: ManageScan
        },
        {
          path: 'manage',
          name: 'course management',
          component: ManageCourse
        },
        {
          path: 'test',
          name: 'admin test',
          component: TestView

        }
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: User,

      beforeEnter: async (to, from, next) => {

        let res = await API().post('/authenticate/')
        if (res.data.code == 'true') {
          store.state.isLogin = true
          let res1 = await API().post('/authenticate_staff/')
          if (res1.data.is_staff != 'true') {
            store.state.isAdmin = false
            next()
          }
          else {
            store.commit('LOG_OUT', false)
            store.state.snackbar = {
              showing: true,
              text: 'Not User!Please change to user login!',
              color: 'error'
            }

          }
        } 
        else if( res.data == undefined){
          store.state.snackbar = {
            showing: true,
            text: 'No response',
            color: 'error'
          }
          next('/')
        }
        
        else {
          store.state.isLogin = true
          store.commit('LOG_OUT', false)
          store.state.snackbar = {
            showing: true,
            text: 'Not login!Please login!',
            color: 'error'
          }
        }
      }
      ,
      children: [
        {
          path: 'survey/:id',
          name: 'survey',
          component: Survey
        },
        {
          path: 'course/:id',
          name: 'my course view',
          component: MyCourseView
        }, {
          path: 'face/:id',
          name: 'face scan',
          component: FaceScan
        },
        {
          path: 'account',
          name: 'account',
          component: Account
        },
        {
          path: 'suggest',
          name: 'enrollment',
          component: Courses
        },
        {
          path: 'history',
          name: 'history',
          component: History
        },
        {
          path: 'report',
          name: 'report',
          component: Report
        },
        {
          path: 'certificate',
          name: 'certificates',
          component: Certificates
        }
      ]
    }
  ]
})
