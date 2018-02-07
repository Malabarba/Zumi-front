import axios from 'axios'

const baseUrl = '/api/v1'

// function handleError(error) {
//   return Observable.throw(error)
// }

function logIt(x) {
  console.log(x)
  return x
}

const get = (path, options) => axios.get(`${baseUrl}${path}`, options)
      .then(logIt).then(x => x.data)

// if (state[path]) fn(state[path])
//   .then(response => state[path] = response)
//   .then(fn)

const listing = {
  state: {},

  index(params) {
    let x = get('/listings', { params: params })
    console.log(x)
    return x
  },

  show(id) {
    return get(`/listing/${id}`)
  },

  neighborhoods() {
    return get('/listings/neighborhoods')
  }
}

export default { listing }
