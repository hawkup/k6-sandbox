import http from 'k6/http'
import { check } from 'k6'

export let options = {
  concurrentResourceLoading: true
}

export default function () {
  const res = http.get('http://test.k6.io')
  getResources(res)
}

/**
 * Ref: https://stackoverflow.com/a/61075801/1754750
 * @param {http.RefinedResponse<http.ResponseType>} response
*/
export function getResources(response) {
  const resources = []
  response
    .html()
    .find('*[href]:not(a)')
    .each((index, element) => {
      resources.push(element.attributes().href.value)
    })
  
  response
    .html()
    .find('*[src]:not(a)')
    .each((index, element) => {
      resources.push(element.attributes().src.value)
    })

  if (options.concurrentResourceLoading) {
    const responses = http.batch(
      resources.map((r) => {
        return ['GET', `${response.url}${r}`, null]
      })
    )
    responses.forEach(() => {
      check(response, {
        'resource returns status 200': (r) => r.status === 200,
      })
    })
  } else {
    resources.forEach((r) => {
      const res = http.get(`${response.url}${r}`, {
        headers: createHeader(),
      })
      !check(res, {
        'resource returns status 200': (r) => r.status === 200,
      })
    })
  }
}