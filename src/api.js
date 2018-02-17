import axios from 'axios'
import { Listing, User } from '@/models'
import EventBus from '@/event-bus'

const baseUrl = '/api/v1'

function logIt(x) {
  console.log(x)
  return x
}

const get = (path, options) => axios.get(`${baseUrl}${path}`, options).then(logIt).then(x => x.data)
const del = (path, options) => axios.delete(`${baseUrl}${path}`, options).then(logIt)
const post = (path, options) => axios.post(`${baseUrl}${path}`, options).then(logIt).then(x => x && x.data)
const patch = (path, options) => axios.patch(`${baseUrl}${path}`, options).then(logIt).then(x => x && x.data)

// if (state[path]) fn(state[path])
//   .then(response => state[path] = response)
//   .then(fn)

function makeApi(model, api) {
  if (!api.state) api.state = {}
  api.promises = []

  const trackPromise = function (p) {
    api.promises.push(p)
    EventBus.$emit('api-me-state', api.pending())
    return p.finally(() => {
      api.promises = api.promises.filter(x => x !== p)
      EventBus.$emit('api-me-state', api.pending())
    })
  }

  const castAndCache = function(json) {
    const instance = model.from(json || {})
    api.cache(instance)
    return instance
  }

  const plural = model.plural
  const index = api.index
  if (index) {
    api.indexRaw = index
    api.index = (...args) => trackPromise(index(...args)).then(data => data[plural].map(castAndCache))
  }

  const singular = model.singular
  const methods = ['show', 'create', 'update', 'login']
  for (var name of methods) {
    const m = api[name]
    if (!m) break
    api[`${name}Raw`] = m
    api[name] = (...args) => trackPromise(m(...args)).then(x => castAndCache(x[singular]))
  }

  api.pending = () => api.promises.length > 0
  api.queue = function(fn) {
    if (api.pending()) api.promises[api.promises.length - 1].finally(fn)
    else fn()
  }

  return api
}

const listing = makeApi(Listing, {
  cache(l) { this.state[`/listing/${l.uniq_hash}`] = l },
  index: (params) => get('/listings', { params }),
  show: (id) => get(`/listing/${id}`),
  neighborhoods: () => get('/listings/neighborhoods')
})

const me = makeApi(User, {
  state: new User(),
  cache(me) { Object.assign(this.state, me) },
  show: () => get('/me'),
  create: (user) => post('/me', { user }),
  update: (user) => patch('/me', { user }),
  updatePassword: (user) => patch('/me/update_password', { user }),
  login: (user) => post('/sessions', { user }),
  logout(user) {
    del('/sessions', { user }).then(() => this.cache(new User()))
  }
})

export default { listing, me }
