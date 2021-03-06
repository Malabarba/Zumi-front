import axios from 'axios'
import { Listing, Property, User } from '@/models'
import EventBus from '@/event-bus'

const baseUrl = '/api/v1'

function logIt(x) {
  console.log('[Received]', x)
  return x
}

function request(method, path, options) {
  console.log('[Requesting]', method, path, options)
  return axios[method](`${baseUrl}${path}`, options).then(logIt)
}

const get = (...args) => request('get', ...args).then(x => x.data)
const del = (...args) => request('delete', ...args)
const post = (...args) => request('post', ...args).then(x => x && x.data)
const patch = (...args) => request('patch', ...args).then(x => x && x.data)

function makeApi(model, api) {
  if (!api.state) api.state = {}

  // Caching common methods
  const castAndCache = function(json) {
    const instance = model.from(json || {})
    api.cache(instance)
    return instance
  }

  const plural = model.plural
  if ('index' in api) {
    const index = api.index.bind(api)
    api.indexNoCache = index
    api.index = (...args) => index(...args).then(data => data[plural].map(castAndCache))
  }

  const singular = model.singular
  const methods = ['show', 'create', 'update', 'login']
  for (var name of methods) {
    if (!(name in api)) break
    const m = api[name].bind(api)
    api[`${name}NoCache`] = m
    api[name] = (...args) => m(...args).then(x => castAndCache(x[singular]))
  }

  // Tracking promises and pending status
  const eventKey = `api-${api.singular}-state`
  api.promises = []

  const trackPromise = function(p) {
    api.promises.push(p)
    EventBus.$emit(eventKey, api.pending())
    return p.finally(() => {
      api.promises = api.promises.filter(x => x !== p)
      EventBus.$emit(eventKey, api.pending())
    })
  }

  for (name of api.promiseMethods) {
    if (!(name in api)) console.log(`API Method declared but not defined:`, name)
    const m = api[name].bind(api)
    api[`${name}NoTrack`] = m
    api[name] = (...args) => trackPromise(m(...args))
  }

  api.pending = () => api.promises.length > 0
  api.queue = function(fn) {
    if (api.pending()) api.promises[api.promises.length - 1].finally(fn)
    else fn()
  }

  api.mixin = {
    data() { return { running: api.pending() } },
    created() { EventBus.$on(eventKey, (state) => this.running = state) }
  }

  return api
}

export const property = makeApi(Property, {
  cache() {},

  promiseMethods: ['index', 'show', 'create', 'update', 'list'],
  index: () => get('/properties'),
  show: (id) => get(`/property/${id}`),
  create: (property) => post('/properties', { property }),
  update: (id, property) => patch(`/property/${id}`, { property }),
  list: (id, listing) => post(`/property/${id}/list`, { listing })
})

export const listing = makeApi(Listing, {
  // cache(l) { this.state[`/listing/${l.uniq_hash}`] = l },
  cache() {},

  promiseMethods: ['index', 'show', 'neighborhoods'],
  index: (params) => get('/listings', { params }),
  show: (id) => get(`/listing/${id}`),
  neighborhoods: () => get('/listings/neighborhoods')
})

export const me = makeApi(User, {
  state: new User(),
  get loggedIn() { return !!this.state.email },
  cache(me) { Object.assign(this.state, me) },

  promiseMethods: ['show', 'create', 'update', 'updatePassword', 'login', 'logout'],
  show: () => get('/me'),
  create: (user) => post('/me', { user }),
  update: (user) => patch('/me', { user }),
  updatePassword: (user) => patch('/me/update_password', { user }),
  login: (user) => post('/sessions', { user }),
  logout() { return del('/sessions').then(() => this.cache(new User())) }
})

export default { listing, property, me }
