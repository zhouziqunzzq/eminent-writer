export const isChinese = (s) => {
  const re = /^[\u4E00-\u9FA5]+$/
  return re.test(s)
}

export const http = (request) => {
  return new Promise((resolve, reject) => {
    let response
    fetch(request)
      .then((res) => {
        response = res
        return res.json()
      })
      .then((body) => {
        if (response.ok) {
          response.parsedBody = body
          resolve(response)
        } else {
          reject(response)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const getJson = async (path) => {
  const args = {
    method: 'GET',
    credentials: 'include'
  }
  return http(new Request(path, args))
}

export const postJson = async (path, body) => {
  const args = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    credentials: 'include'
  }
  return http(new Request(path, args))
}

export const postForm = async (path, data) => {
  const formData = new FormData()
  for (const name in data) {
    if (data.hasOwnProperty(name)) {
      formData.append(name, data[name])
    }
  }
  const args = {
    method: 'POST',
    body: formData,
    credentials: 'include'
  }
  return http(new Request(path, args))
}
