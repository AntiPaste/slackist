import Promise from 'bluebird';


class ApiUtils {

  constructor(apiBaseUrl) {
    this._apiBaseUrl = apiBaseUrl;
  }

  _checkStatus(response) {
    if (response.status >= 200 && response.status <= 399) {
      return Promise.resolve(response);
    }

    return Promise.reject(new Error(response));
  }

  _parseJSON(response) {
    return response.json();
  }

  // This is used as convenience for converting fetch promises to Bluebird
  request(path, options) {
    const request = fetch(path, options);
    return Promise.resolve(request);
  }

  get(path) {
    return this.request(`${this._apiBaseUrl}${path}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      credentials: 'same-origin',
    })
      .then(this._checkStatus)
      .then(this._parseJSON);
  }

  post(path, data) {
    return this.request(`${this._apiBaseUrl}${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
      .then(this._checkStatus)
      .then(this._parseJSON);
  }

  put(path, data) {
    return this.request(`${this._apiBaseUrl}${path}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data),
    })
      .then(this._checkStatus)
      .then(this._parseJSON);
  }

  delete(path) {
    return this.request(`${this._apiBaseUrl}${path}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    })
      .then(this._checkStatus)
      .then(this._parseJSON);
  }

}

export default ApiUtils;
