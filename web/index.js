const R =  require('ramda')

// 初步处理数据
const resolvedUserList = (data) => {
  return data.data ? data.data: []
}

// 返回拼接字符串
const cvs = (userList) => {
  let html = ''

  userList.forEach((item) => {
    html += `
    <li>
      <span>用户名：</span>
      <span>${item.username}</span>
    </li>
    <li>
      <span>密码：</span>
      <span>${item.password}</span>
    </li>
    <hr>`  
  })

  return html
}

// 把字符串放在节点里面
const append = (selector, html) => {
  document.querySelector(selector).innerHTML = html
}

// curry化append函数
const curryAppend = R.curry(append)

// ajax请求
let xml = new XMLHttpRequest()
xml.onreadystatechange = () => {
  if (xml.readyState === 4 && xml.status === 200) {
    let data = JSON.parse(xml.responseText)
    console.log(JSON.parse(xml.responseText))
    // 组合函数并处理数据
    const handleData = R.pipe(
      resolvedUserList, 
      cvs, 
      curryAppend('#userList')
    )

    handleData(data)
  }
}
xml.open('GET','http://localhost:7001/user')
xml.send()