class LoginRouter {
  route (httpRequest) {
    if (!httpRequest || !httpRequest.body) {
      return HttpResponse.serverError()
    }
    const { email, password } = httpRequest.body
    if (!email || !password) {
      return HttpResponse.badRequest()
    }
  }
}

class HttpResponse {
  static badRequest () {
    return {
      statusCode: 400
    }
  }

  static serverError () {
    return {
      statusCode: 500
    }
  }
}

describe('Login Router', () => {
  test('Should return 400 if no email is provided', () => {
    const sut = new LoginRouter() // sut = system under test
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 400 if no password is provided', () => {
    const sut = new LoginRouter() // sut = system under test
    const httpRequest = {
      body: {
        email: 'test@test.com'
      }
    }
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })

  test('Should return 500 if no httpRequest is provided', () => {
    const sut = new LoginRouter()
    const httpResponse = sut.route()
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 500 if httpRequest has no body', () => {
    const sut = new LoginRouter()
    const httpRequest = {}
    const httpResponse = sut.route(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })
})
