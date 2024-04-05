const express = require('express')
const router = express.Router()

module.exports = () => {
  const customRouter = new SignupRouter()
  router.post('/signup', ExpressRouterAdapter.adapt(customRouter))
}

class ExpressRouterAdapter {
  static adapt (router) {
    return async (req, res) => {
      const httpRequest = {
        body: req.body
      }
      const httpResponse = await router.route(httpRequest)
      res.status(httpResponse.statusCode).json(httpResponse)
    }
  }
}

// Presentation layer
// file signup-router
class SignupRouter {
  async route (httpRequest) {
    const { email, password, repeatPassword } = httpRequest.body
    const user = new SignupUseCase().signup(email, password, repeatPassword)
    return {
      statusCode: 200,
      body: user
    }
  }
}

// Domain layer
// file signup-usecase
class SignupUseCase {
  async signup (email, password, repeatPassword) {
    if (password === repeatPassword) {
      new AddAccountRepository().add(email, password)
    }
  }
}

// Infra layer
// file add-account-repository
const mongoose = require('mongoose')
const AccountModel = mongoose.model('Account')

class AddAccountRepository {
  async add (email, password) {
    const user = await AccountModel.create({ email, password })
    return user
  }
}
