import { contactService } from "../services/contact.service.js"


export const contactStore = {
    state: {
        contacts: [],
        cart: [],
        lastRemovedContact: null

    },
    getters: {
        cartTotal({ cart }) {
            return cart.reduce((acc, prd) => acc + prd.price, 0)
        },
        cart({ cart }) {
            return cart
        },
        contacts({ contacts }) {
            return contacts
        },
        contactCount({ cart }) {
            return cart.length
        },
    },
    mutations: {
        setContacts(state, { contacts }) {
            state.contacts = contacts
        },
        clearCart(state) {
            state.cart = []
        },
        addToCart(state, { contact }) {
            state.cart.push(contact)
        },
        removeFromCart(state, { contactId }) {
            const idx = state.cart.findIndex(p => p._id === contactId)
            state.cart.splice(idx, 1)
        },
        removeContact(state, { contactId }) {
            const idx = state.contacts.findIndex(p => p._id === contactId)
            state.lastRemovedContact = state.contacts[idx]
            state.contacts.splice(idx, 1)
        },
        addContact(state, { contact }) {
            state.contacts.push(contact)
        },
        updateContact(state, { contact }) {
            const idx = state.contacts.findIndex(p => p._id === contact._id)
            state.contacts.splice(idx, 1, contact)
        },
        clearRemoveContact(state) {
            state.lastRemovedContact = null
        },
        undoRemoveContact(state) {
            state.contacts.unshift(state.lastRemovedContact)
            state.lastRemovedContact = null
        },

    },
    actions: {
        loadContacts({ commit }, payload) {
            contactService.getContacts(payload.filterBy)
                .then((contacts) => {
                    commit({ type: 'setContacts', contacts })
                })
        },
        async removeContact({ commit }, payload) {
            commit(payload)
            try {
                await contactService.deleteContact(payload.contactId)
                commit({ type: 'clearRemoveContact' })
            } catch (err) {
                commit({ type: 'undoRemoveContact' })
                throw err
            }
        },
        async saveContact({ commit }, { contact }) {
            try {
                const actionType = (contact._id) ? 'updateContact' : 'addContact'
                console.log('actionType', actionType)
                let savedContact = await contactService.saveContact(contact)
                // commit({ type: actionType, contact: savedContact })
                return savedContact
            } catch (err) {
                console.log('cannot save', err);
            }
        },
    }
}