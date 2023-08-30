import {createStore} from 'vuex'
import {User} from "../models/user";
import {MessageRespDto} from "../models/message";

const store = createStore({
    state() {
        return {
            active: 'index',
            loginUser: {} as User,
            privateMessageList: [] as MessageRespDto[]
        }

    },
    mutations: {
        changeActive(state: any, active: string) {
            state.active = active;
        },
        changeLoginUser(state: any, loginUser: User) {
            state.loginUser = loginUser;
        },
        changePrivateMessageList(state: any, privateMessageList: MessageRespDto[]) {
            state.privateMessageList = privateMessageList
        }
    },
    actions: {
        changeActive(context: any, active: string) {
            context.commit('changeActive', active);
        },
        changePrivateMessageList(context: any, privateMessageList: MessageRespDto[]) {
            context.commit('changePrivateMessageList', privateMessageList);
        }
    }
})

export default store;