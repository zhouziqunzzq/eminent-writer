export const isChinese = (s) => {
  const re = /^[\u4E00-\u9FA5]+$/
  return re.test(s)
}

export const isChineseAndPunc = (s) => {
  const re = /^[\r\n\u4e00-\u9fa5\u3002\uff1f\uff01\uff0c\u3001\uff1b\uff1a\u201c\u201d\u2018\u2019\uff08\uff09\u300a\u300b\u3008\u3009\u3010\u3011\u300e\u300f\u300c\u300d\ufe43\ufe44\u3014\u3015\u2026\u2014\uff5e\ufe4f\uffe5]+$/
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
