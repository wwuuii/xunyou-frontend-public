import Team from '../pages/team/Team.vue'
import Index from '../pages/Index.vue'
import Search from '../pages/Search.vue';
import UserPage from '../pages/user/UserPage.vue';
import UserEditPage from '../pages/user/UserEditPage.vue';
import UserResultPage from '../pages/user/UserResultPage.vue';
import UserLoginPage from '../pages/user/UserLoginPage.vue';
import UserRegisterPage from '../pages/user/UserRegisterPage.vue';
import TeamAddPage from '../pages/team/TeamAddPage.vue';
import TeamUpdatePage from '../pages/team/TeamUpdatePage.vue';
import UserDetailPage from '../pages/user/UserDetailPage.vue'
import TeamCreatePage from '../pages/team/TeamCreatePage.vue'
import TeamJoinPage from '../pages/team/TeamJoinPage.vue'
import Message from '../pages/message/Message.vue'
import PrivateMessage from '../pages/message/PrivateMessage.vue'
import UpdateTag from '../pages/tag/UpdateTag.vue'

const routes = [
    {path: '/', redirect: '/index'},
    {
        path: '/index',
        component: Index
    },
    {
        path: '/team',
        component: Team
    },
    {
        path: '/team/add',
        component: TeamAddPage,
    },
    {path: '/team/update', component: TeamUpdatePage},
    {path: '/team/create', component: TeamCreatePage},
    {path: '/team/join', component: TeamJoinPage},
    {path: '/search', component: Search},
    {path: '/user', component: UserPage},
    {path:'/user/detail', component: UserDetailPage},
    {path: '/userEdit', component: UserEditPage},
    {path: '/userResult', component: UserResultPage},
    {path: '/userLogin', component: UserLoginPage},
    {path: '/userRegister', component: UserRegisterPage},
    {path: '/message', component: Message},
    {path: '/privateMessage', component: PrivateMessage},
    {path: '/updateTag', component: UpdateTag},
    {path: '/*', redirect: '/index'}
]

export default routes