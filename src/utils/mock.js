//官网：https://github.com/nuysoft/Mock/wiki/Syntax-Specification
// 属性名   name
// 生成规则 rule
// 属性值   value
//'name|rule': value



const Mock = require('mockjs')
// 使用mockjs模拟数据
let userPage = Mock.mock({
  'msg': "Success",
  'success': true,
  'data': {
    'current': 1,
    'size': 10,
    'total': 1,
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'records|1-10': [{
      // 属性 id 是一个自增数，起始值为 1，每次增 1
      'id|+1': 1,
      'name': '@FIRST',
      'createDate': '@date("yyyy-MM-dd HH:mm:ss")',
      'asset|1-80': 8,
      'l1Reward|888-9999': 0,
      'l2Reward|288-9999': 0,
      'origin': '@FIRST',
      'status|0-1': 0,
      'statusStr': "正常",
      'username': /^1[385][1-9]\d{8}/
    }]
  }
})
Mock.mock('/admin/user/page', 'post', (req, res) => {
  return userPage
})


// detail
let detailPage = Mock.mock({
  'msg': "Success",
  'success': true,
  'data': {
    'current': 1,
    'size': 10,
    'total': 1,
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'records|1-10': [{
      'amount|1-80': 8,
      'coinType': "AMY",
      'createDate': '@date("yyyy-MM-dd HH:mm:ss")',
      'fromUsername': '@FIRST',
      'id|+1': 1,
      'remark': "AMYadsasdasdasdasd",
      'toUsername': /^1[385][1-9]\d{8}/,
      'tradeTypeId|1-5': 3
    }]
  }
})
Mock.mock('/admin/tradeLog/page', 'post', (req, res) => {
  return detailPage
})

// email 

let subscribe = Mock.mock({
  'msg': "Success",
  'success': true,
  'data': {
    'current': 1,
    'size': 10,
    'total': 1,
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'records|1-10': [{
      'email': "@email",
      'createDate': '@date("yyyy-MM-dd HH:mm:ss")',
      'id|+1': 1,
    }]
  }
})
Mock.mock('/admin/subscribe/page', 'post', (req, res) => {
  return subscribe
})


let contact = Mock.mock({
  'msg': "Success",
  'success': true,
  'data': {
    'current': 1,
    'size': 10,
    'total': 1,
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'records|1-10': [{
      'company': "@FIRST",
      'contacts': "@FIRST",
      'method': /^1[385][1-9]\d{8}/,
      'remarks': "AMY test",
      'email': "@email",
      'createDate': '@date("yyyy-MM-dd HH:mm:ss")',
      'id|+1': 1,
    }]
  }
})
Mock.mock('/admin/contact/page', 'post', (req, res) => {
  return contact
})
Mock.mock('/admin/login', 'post', (req, res) => {
  return Mock.mock({
    'msg': "Success",
    'success': true})
})