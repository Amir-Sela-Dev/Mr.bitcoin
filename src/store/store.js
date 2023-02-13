
import { contactStore } from './contact.store.js'
import { createStore } from 'vuex'

// Create a new store instance.
export const myStore = createStore({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        increment(state) {
            state.count++
        }
    },
    modules: {
        contactStore
    }

})

// myStore.subscribe((cmd, state) => {
//     console.log('**** Store state changed: ****')
//     console.log('Command:', cmd.payload)
//     console.log('storeState:\n', state)
//     console.log('*******************************')
// })


