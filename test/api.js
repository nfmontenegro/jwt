const should = require('should')
const fetch = require('node-fetch')

const email = 'nico666@gmail.com'
const password = '123'
let postToken

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
        postToken = token
        isAuthenticated.should.be.ok()

        msg.should.be.eql('user nico666@gmail.com authenticated')
        isAuthenticated.should.be.eql(true)
        should.equal(isAuthenticated, true, 'Boolean authenticated')

        should(msg).be.a.String()
        should(isAuthenticated).be.an.Boolean()
        done()
      })
      .catch(err => done(err))
  })
})

describe('token', () => {
  it('verify token', done => {
    should(postToken).be.a.String()
    postToken.should.startWith('e')
    done()
  })
})
