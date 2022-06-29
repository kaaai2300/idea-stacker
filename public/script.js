let inputContent = "";
let inputType = 1;
onSearch();

/**
 * Idea一覧を取得
 */
function onSearch () {
  get({},
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  })
}

/**
 * 保存処理
 */
function onSave () {
  post({
    content: inputContent,
    type: inputType
  },
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  })
}

/**
 * API接続 GET
 * @param {*} url 
 * @param {*} params 
 * @param {*} successFunc 
 * @param {*} faildFunc 
 */
async function get(params, successFunc, faildFunc) {
  try {
    const res = await axios.get("http://localhost:3000/ideas", params);
    successFunc(res);
  } catch (err) {
    faildFunc(err);
  }
}

/**
 * API接続 POST
 * @param {*} url 
 * @param {*} body 
 * @param {*} successFunc 
 * @param {*} faildFunc 
 */
async function post(body, successFunc, faildFunc) {
  try {
    const res = await axios.post("http://localhost:3000/idea", body);
    successFunc(res);
  } catch (err) {
    faildFunc(err);
  }
}
