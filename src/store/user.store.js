import { userService } from "../services/user.service.js"

export const userStore = {
    state: {
        user: userService.getLoggedinUser(),
    },
    getters: {
        user({ user }) { return user },
        // products(state) {
        //     return []
        // },
    },
    mutations: {
        updateOrder(state, { order }) {
            const idx = state.user.orders.findIndex(o => o._id === order._id)
            state.user.orders.splice(idx, 1, order)
        },
        setUser(state, { user }) {
            state.user = user
        },
        setUserBalance(state, { balance }) {
            state.user.balance = balance
        }
    },
    actions: {
        async transfer(context, { funds }) {
            try {
                let user = await userService.transferFunds(funds)
                context.commit({ type: 'setUser', user })
                // return balance
            } catch (err) {
                console.log('err', err)
            }

        },
        async login({ commit }, payload) {
            try {
                let user = await userService.login(payload.user)
                commit({ type: 'setUser', user })
                return user
            } catch (err) {
                throw err
            }
        },
        async signup({ commit }, payload) {
            try {
                let user = await userService.signup(payload.user)
                commit({ type: 'setUser', user })
                return user
            } catch (err) {
                throw err
            }
        },

    }
}