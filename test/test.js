const fetch = require('node-fetch')

const email = 'nico666@gmail.com'
const password = '123'
let userToken

describe('Request Api', () => {
  it('do request login api', done => {
    fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(({ token, msg, isAuthenticated }) => {
        userToken = token

        expect.stringContaining(msg)
        expect.stringContaining(token)
        expect(isAuthenticated).not.toBe(false)
        expect(!isAuthenticated).toBeFalsy()
        expect(isAuthenticated).toBeTruthy()
        expect(msg).toBe('user nico666@gmail.com authenticated')
        done()
      })
      .catch(err => done(err))
  })
})

describe('Response token', () => {
  it('verify token', done => {
    expect.stringContaining(userToken)
    expect(userToken).not.toBe(false)
    expect(userToken).toBe(userToken)

    done()
  })
})
