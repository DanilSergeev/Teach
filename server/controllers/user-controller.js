
const userService = require("../service/user-service")
const { validationResult } = require("express-validator")
const ApiError = require("../exceptions/api-error")

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest("Ошибка при валидации", errors.array()))
            }
            const { email, password } = req.body 

            const userData = await userService.registration(email, password)
            return res.json(userData)
        } catch (error) {
            next(error)
        }
    }


    async getUsers(req, res, next) {
        try {
            const usersData = await userService.getUsers()
            res.json(usersData)
        } catch (error) {
            next(error)
        }
    }
    async getUser(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest("ID не передан"))
            }
            const usersData = await userService.getUser(id)
            res.json(usersData)
        } catch (error) {
            next(error)
        }
    }
    

    
}

module.exports = new UserController()