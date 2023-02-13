const user = {
    name: "Puki Ben David",
    balance: 100,
    transactions: [],
    imgUrl: 'https://robohash.org/Puki'
}

function getUser() {
    return user
}

function getLoggedinUser() {
    if (!localStorage.getItem(KEY)) {
        const user = { _id: 'u101', fullname: 'Baba Ji', balance: 1000, orders: [] }
        _saveUserToStorage(user)
    }
    return JSON.parse(localStorage.getItem(KEY) || null)
}

function updateBalance(amount) {
    const user = getLoggedinUser()
    if (user.balance + amount < 0) return Promise.reject('Not enough balanace')
    user.balance += amount
    _saveUserToStorage(user)
    return Promise.resolve(user.balance)
}

function _saveUserToStorage(user) {
    localStorage.setItem(KEY, JSON.stringify(user))
}


export const userService = {
    getUser,
}