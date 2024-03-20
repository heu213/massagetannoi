// const serialize = require('serialize-javascript');

// const serializeObj = (obj) =>
//   serialize(obj, { unsafe: true, ignoreFunction: true });

// const query = {
//   'billing.txDays': { $gte: 5, $lte: 10 },
//   'billing.lastBillDate': {lte: "2021-03-18T00:00:00.000Z"}
// };
// console.log(JSON.stringify(serializeObj(query)));

 const TASK_ITEM_STATUS_NAME = {
  NEW: {
    value:'Mới',
    bg:'#1198AD',
    color:'white',
    name:'NEW',
  },
  CONFIRMED: {
    value:'Đã xác nhận',
    bg:'#42496F',
    color:'white',
    name:'CONFIRMED',
  },
  IN_PROGRESS: {
    value:'Đang thực hiện',
    bg:'#70E85D',
    color:'black',
    name:'IN_PROGRESS',
  },
  COMPLETED: {
    value:'Đã hoàn thành',
    bg:'#FFEA00',
    color:'black',
    name:'COMPLETED',
  },
  ON_HOLD: {
    value:'Đang chờ',
    bg:'#FF6200',
    color:'black',
    name:'ON_HOLD',
  },
  REJECTED: {
    value:'Từ chối',
    bg:'#DEE2E6',
    color:'black',
    name:'REJECTED',
  },
}


let arr = [];
for (const key in TASK_ITEM_STATUS_NAME) {
 const temp = TASK_ITEM_STATUS_NAME[key]
  arr.push( {
    value: temp.value,
    key,
    backgroundColor: temp.bg+'ff',
    color: temp.color ==='white' ? '#ffffffff':'#000000ff',
    isDefault: true,
    justAdmin: false,
  },)
}

console.log(JSON.stringify(arr));
