const storage = require('node-persist');
const fetch = require('../fetch');
const { authApi, clientSecret, clientID } = require('../config');

/**
 * @typedef { import('node-fetch').Response } Response
 */

async function fetchAccessToken() {
  return fetch.post(`${authApi}/oauth2/token`, {
    client_id: clientID,
    client_secret: clientSecret,
    grant_type: 'client_credentials',
  });
}

/**
 * @return {boolean}
 */
async function fetchRefreshToken() {
  try {
    /** @type {Response} */
    const res = await fetch.post(`${authApi}/oauth2/token`, {
      access_token: await storage.getItem('accessToken'),
      refresh_token: await storage.getItem('refreshToken'),
      client_id: clientID,
      client_secret: clientSecret,
      grant_type: 'refresh_token',
    });

    if (res.status === 200) {
      const data = await res.json();
      await storage.setItem('accessToken', data.access_token);
      await storage.setItem('refreshToken', data.refresh_token);
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
}

module.exports = {
  fetchAccessToken,
  fetchRefreshToken,
};
