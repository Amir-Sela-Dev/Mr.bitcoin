import { storageService } from "./storage.service";
import { dbService } from "./db.service";
import { contactService } from "./contact.service";
export const userService = {
    getUser,
    getEmptyUser,
    getLoggedinUser,
    signup,
    login,
    logout,
    getEmptyFunds,
    transferFunds
}


const user = {
    name: "Puki Ben David",
    balance: 100,
    transactions: [],
    imgUrl: 'https://robohash.org/Puki'
}

const KEY = 'user'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

function getUser() {
    return user
}

async function login(userCred) {
    const users = await storageService.load('user')
    const user = users.find(user => user.name === userCred.name)
    if (user) {
        return saveLocalUser(user)
    } else throw new Error('You have no account, please sign up')
}
async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await dbService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    // return await httpService.post('auth/logout')
}

function saveLocalUser(user) {
    user = { _id: user._id, name: user.name, imgUrl: user.imgUrl, balance: user.balance, transactions: user.transactions }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

async function update(updatedUser) {
    let user = await dbService.put('user', updatedUser)
    return user
}


async function transferFunds(funds) {
    console.log('funds', funds)
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.transactions.push(funds)
    user.balance -= funds.amount
    await update(user)
    saveLocalUser(user)
    return user
}

function getEmptyFunds() {
    return {
        toId: "",
        to: "",
        at: '',
        amount: ''
    }
}




function _saveUserToStorage(user) {
    storageService.save(KEY, user)
}

function getEmptyUser() {
    const user =
    {
        name: "",
        balance: 100,
        transactions: [],
        imgUrl: ''
    }
    return user
}


// ; (async () => {
//     await userService.signup({
//         name: "Puki Ben David",
//         balance: 100,
//         transactions: [],
//         imgUrl: 'https://robohash.org/Puki'
//     })
//     await userService.signup({
//         name: "Muki Bat yosef",
//         balance: 100,
//         transactions: [],
//         imgUrl: 'https://robohash.org/Muki'
//     })
//     await userService.signup({
//         name: "Shuki Ben Porat",
//         balance: 100,
//         transactions: [],
//         imgUrl: 'https://robohash.org/Shuki'
//     })
// })()



