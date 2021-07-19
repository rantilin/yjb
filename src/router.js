import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'botnav',
            redirect: '/botnav/index'
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('./views/Login.vue'), //路由懒加载
            meta: {
                title: '登录'
            }
        },
        {
            path: '/audio',
            name: 'audio',
            component: () =>
                import ('./views/Audio.vue'),
            meta: {
                title: '课程详情'
            }
        },
        {
            path: '/babyto',
            name: 'babyto',
            component: () =>
                import ('./views/Babyto.vue'),
            meta: {
                title: '宝宝听听'
            }
        },
        {
            path: '/videoclass',
            name: 'videoclass',
            component: () =>
                import ('./views/Videoclass.vue'),
            meta: {
                title: '宝宝看看'
            }
        },
        {
            path: '/Courselist',
            name: 'Courselist',
            component: () =>
                import ('./views/Courselist.vue'),
            meta: {
                title: '列表'
            }
        },
        {
            path: '/knowledge',
            name: 'knowledge',
            component: () =>
                import ('./views/Knowledge.vue'),
            meta: {
                title: '知识库'
            }
        },
        {
            path: '/knowledgelist',
            name: 'knowledgelist',
            component: () =>
                import ('./views/KnowledgeList.vue'),
            meta: {
                title: '知识列表'
            }
        }, {
            path: '/knowledgedetails',
            name: 'knowledgedetails',
            component: () =>
                import ('./views/KnowledgeDetails.vue'),
            meta: {
                title: '知识详情'
            }
        },
        {
            path: '/class',
            name: 'class',
            component: () =>
                import ('./views/Class.vue'),
            meta: {
                title: '课程详情'
            }
        },
        {
            path: '/groupclass',
            name: 'groupclass',
            component: () =>
                import ('./views/groupclass.vue'),
            meta: {
                title: '拼团详情'
            }
        },
        {
            path: '/consult',
            name: 'consult',
            component: () =>
                import ('./views/Consult.vue'),
            meta: {
                title: '咨询'
            }
        },
        {
            path: '/column',
            name: 'column',
            component: () =>
                import ('./views/Column.vue'),
            meta: {
                title: '栏目'
            }
        },
        {
            path: '/doctor',
            name: 'doctor',
            component: () =>
                import ('./views/Doctor.vue'),
            meta: {
                title: '医生主页'
            }
        },
        {
            path: '/issuedetail',
            name: 'issuedetail',
            component: () =>
                import ('./views/Issuedetail.vue'),
            meta: {
                title: '问题详情'
            }
        },
        {
            path: '/conversation',
            name: 'conversation',
            component: () =>
                import ('./views/Conversation.vue'),
            meta: {
                requireAuth: true,
                title: '对话详情'
            }
        },
        {
            path: '/myorder',
            name: 'myorder',
            component: () =>
                import ('./views/Myorder.vue'),
            meta: {
                requireAuth: true,
                title: '我的订单'
            }
        }, {
            path: '/mycourse',
            name: 'mycourse',
            component: () =>
                import ('./views/Mycourse.vue'),
            meta: {
                requireAuth: true,
                title: '我的课程'
            }
        },
        {
            path: '/myconsult',
            name: 'myconsult',
            component: () =>
                import ('./views/Myconsult.vue'),
            meta: {
                requireAuth: true,
                title: '我的咨询'
            }
        },
        {
            path: '/mycollect',
            name: 'mycollect',
            component: () =>
                import ('./views/Mycollect.vue'),
            meta: {
                requireAuth: true,
                title: '我的收藏'
            }
        },
        {
            path: '/learningrecord',
            name: 'learningrecord',
            component: () =>
                import ('./views/Learningrecord.vue'),
            meta: {
                requireAuth: true,
                title: '学习记录'
            }
        },
        {
            path: '/set',
            name: 'set',
            component: () =>
                import ('./views/Set.vue'),
            meta: {
                requireAuth: true,
                title: '设置'
            }
        },
        {
            path: '/chat',
            name: 'chat',
            component: () =>
                import ('./views/Chat.vue'),
            meta: {
                title: '聊天对话'
            }
        },
        {
            path: '/shouquan',
            name: 'shouquan',
            component: () =>
                import ('./views/Shouquan.vue'),
            meta: {
                title: '授权'
            }
        }, {
            path: '/crowd',
            name: 'crowd',
            component: () =>
                import ('./views/Crowd.vue'),
            meta: {
                title: '医教宝交流群'
            }
        }, {
            path: '/feedback',
            name: 'feedback',
            component: () =>
                import ('./views/Feedback.vue'),
            meta: {
                title: '意见反馈'
            }
        },
        {
            path: '/comment',
            name: 'comment',
            component: () =>
                import ('./views/Comment.vue'),
            meta: {
                title: '发表评价'
            }
        },
        {
            path: '/success',
            name: 'success',
            component: () =>
                import ('./views/Success.vue'),
            meta: {
                title: '意见反馈'
            }
        },
        {
            path: '/pay',
            name: 'pay',
            component: () =>
                import ('./views/Pay.vue'),
            meta: {
                title: '支付'
            }
        },
        {
            path: '/agree',
            name: 'agree',
            component: () =>
                import ('./views/Agreement.vue'),
            meta: {
                title: '指导协议声明'
            }
        },
        {
            path: '/qusertpay',
            name: 'qusertpay',
            component: () =>
                import ('./views/Qusertpay.vue'),
            meta: {
                title: '支付'
            }
        },
        {
            path: '/paygroup',
            name: 'paygroup',
            component: () =>
                import ('./views/Paygroup.vue'),
            meta: {
                title: '班级详情',
                keepAlive: false
            }
        },
        {
            path: '/mywallet',
            name: 'mywallet',
            component: () =>
                import ('./views/Mywallet.vue'),
            meta: {
                title: '我的钱包',
                keepAlive: false
            }
        },
        {
            path: '/withdraw',
            name: 'withdraw',
            component: () =>
                import ('./views/withdraw.vue'),
            meta: {
                title: '提现记录',
                keepAlive: false
            }
        },
        {
            path: '/information',
            name: 'information',
            component: () =>
                import ('./views/Information.vue'),
            meta: {
                title: '信息填写'
            }
        },
        {
            path: '/welfare',
            name: 'welfare',
            component: () =>
                import ('./views/Welfare.vue'),
            meta: {
                title: '本月福利'
            }
        },
        {
            path: '/binding',
            name: 'binding',
            component: () =>
                import ('./views/binding.vue'),
            meta: {
                title: '绑定用户'
            }
        },
        {
            path: '/yuyue',
            name: 'yuyue',
            component: () =>
                import ('./views/yuyue.vue'),
            meta: {
                title: '医生详情'
            }
        },
        {
            path: '/yuyuedeil',
            name: 'yuyuedeil',
            component: () =>
                import ('./views/yuyuedeil.vue'),
            meta: {
                title: '医生详情'
            }
        },
        {
            path: '/yuyuepay',
            name: 'yuyuepay',
            component: () =>
                import ('./views/yuyuepay.vue'),
            meta: {
                title: '立即支付'
            }
        },
        {
            path: '/yysuccee',
            name: 'yysuccee',
            component: () =>
                import ('./views/yysuccee.vue'),
            meta: {
                title: '预约成功'
            }
        },
        {
            path: '/botnav',
            name: 'botnav',
            component: () =>
                import ('./views/Botnav.vue'),
            children: [{
                    path: 'index',
                    name: 'index',
                    component: () =>
                        import ('./views/Index.vue'),
                    meta: {
                        title: '医教宝'
                    }
                },
                {
                    path: 'specialist',
                    name: 'specialist',
                    component: () =>
                        import ('./views/Specialist.vue'),
                    meta: {
                        title: '问专家'
                    }
                },
                {
                    path: 'message',
                    name: 'message',
                    meta: {
                        requireAuth: true,
                        title: '消息'
                    },
                    component: () =>
                        import ('./views/Message.vue'),
                },
                {
                    path: 'mine',
                    name: 'mine',
                    meta: {
                        requireAuth: true, //当为true的时候，这个路由是要登录权限
                        title: '我的'
                    },
                    component: () =>
                        import ('./views/Mine.vue')
                }
            ]
        },
    ]
})