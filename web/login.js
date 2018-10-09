const axios = require('axios')

const submit = document.querySelector('#submit')
const usernameNode = document.querySelector('#username')
const passwordNode = document.querySelector('#password')

submit.onclick = () => {
  let username = usernameNode.value
  let password = passwordNode.value
  
  if (!username || !password) {
    alert('输入不能为空')

    return false
  }

  axios.post('http://localhost:7001/login', {
    username,
    password
  }).then(res => {
    console.log(res)
    if (res.data.code === 1) {
      window.location.href = '/index.html'
    }
  })
}