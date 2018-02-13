import axios from 'axios'
import { Listing, User } from '@/models'

const baseUrl = '/api/v1'

function logIt(x) {
  console.log(x)
  return x
}

const get = (path, options) => axios.get(`${baseUrl}${path}`, options).then(logIt).then(x => x.data)
const post = (path, options) => axios.post(`${baseUrl}${path}`, options).then(logIt).then(x => x && x.data)
const patch = (path, options) => axios.patch(`${baseUrl}${path}`, options).then(logIt).then(x => x && x.data)

// if (state[path]) fn(state[path])
//   .then(response => state[path] = response)
//   .then(fn)

function makeApi(model, api) {
  api.state = {}
  api.promises = []

  const trackPromise = function (p) {
    api.promises = api.promises.concat(p)
    return p.finally(() => { console.log(30, api.promises, p); api.promises = api.promises.filter(x => x !== p) })
  }

  const castAndCache = function(json) {
    const instance = model.from(json)
    api.state[api.showPath(instance)] = instance
    return instance
  }

  const plural = model.plural
  const index = api.index
  if (index) {
    api.indexRaw = index
    api.index = (...args) => trackPromise(index(...args)).then(data => data[plural].map(castAndCache))
  }

  const singular = model.singular
  const methods = ['show', 'create', 'update']
  for (var name of methods) {
    const m = api[name]
    if (!m) break
    api[`${name}Raw`] = m
    api[name] = (...args) => trackPromise(m(...args)).then(x => castAndCache(x[singular]))
  }

  api.pending = () => api.promises.length > 0

  return api
}

const listing = makeApi(Listing, {
  showPath: (listing) => `/listing/${listing.uniq_hash}`,
  index: (params) => get('/listings', { params }),
  show: (id) => get(`/listing/${id}`),
  neighborhoods: () => get('/listings/neighborhoods')
})

const me = makeApi(User, {
  showPath: () => '/me',
  show: () => get('/me'),
  create: (user) => post('/me', { user }),
  update: (user) => patch('/me', { user }),
  updatePassword: (user) => patch('/me/update_password', { user })
})

export default { listing, me }
