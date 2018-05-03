const chai = require('chai')
const fetch = require('node-fetch')

const should = chai.should()
const expect = chai.expect
const assert = chai.assert

const email = 'nico666@gmail.com'
const password = '123'

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
      .then(data => {
        console.log(data)
        expect(data).to.be.a('object')
        assert.typeOf(data, 'object')
        done()
      })
      .catch(err => done(err))
  })
})
