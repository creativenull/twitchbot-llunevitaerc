const fetch = require('isomorphic-unfetch');

/**
 * @param {string} url
 *
 * @returns {Promise<any>}
 */
async function get(url) {
  return fetch(`${encodeURI(url)}`, {
    method: 'GET',
    // body: JSON.stringify(body),
  });
}

/**
 * @param {string} url
 * @param {any} body
 *
 * @returns {Promise<any>}
 */
async function post(url, body) {
  return fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
}

module.exports = {
  get,
  post,
};
