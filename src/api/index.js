const handleResponse = (response) => {
  return response.json()
    .then(json => {
      if (response.ok) {
        return json;
      } else {
        return Promise.reject(json);
      }
    })
}

class ApiHelper {
  static get(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
      .then(handleResponse)
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }

  static post(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        body:JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(handleResponse)
      .then(data => resolve(data))
      .catch(error => reject(error));
    });
  }

  static patch(url, data) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'PATCH',
        body:JSON.stringify(data),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          resolve(res);
        } else {
          Promise.reject(res.error.message);
        }
      })
      .catch(error => reject(error));
    });
  }
}

export default ApiHelper;
