
const { User } = require("../models/models")
const bcrypt = require('bcrypt');
const ApiError = require("../exceptions/api-error")

class UserService {
    async registration(email, password) {
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с таким email существует - ${email}`)
        }
        
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await User.create({ email, password: hashPassword, role: "USER" })
        return {  user }
    }
    

    async getUsers() {
        const usersData = await User.findAll({ attributes: ['id', 'email', 'role'] })
        return usersData
    }
    async getUser(id) {
        const usersData = await User.findOne({ where: { id }, attributes: ['id', 'email', 'role',] })
        return usersData
    }

   
}


module.exports = new UserService()