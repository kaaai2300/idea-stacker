const positiveListDOM = document.getElementById("positive-list");
const negativeListDOM = document.getElementById("negative-list");
const formSectionDOM = document.querySelector(".form-section");
const radioDOM = document.getElementsByName("idea-type");
let inputContent = "";
let inputType = 1;

onSearch();

/**
 * 追加ボタン押下時
 */
formSectionDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  inputContent = e.target[2].value;
  inputType = checkType();
  if (!inputContent) {
    return;
  }
  console.log(inputContent, inputType);
  onSave();
})

/**
 * ラジオボタンの値チェック
 */
function checkType () {
  console.log(radioDOM);
  let type;
  radioDOM.forEach(e => {
    if (e.checked) {
      type = e.value;
      console.log(type);
      return;
    }
  });
  return type
}

/**
 * リスト作成の前処理
 * @param {*} data 
 */
function preCreateList (data) {
  data.forEach(e => {
    let list;
    if (e.type === 1) {
      list = positiveListDOM;
    } else {
      list = negativeListDOM;
    }
    console.log("pre", list, e.content);
    createList(list, e);
  });
}

/**
 * リストの作成
 * @param {*} list 
 * @param {*} data 
 */
function createList (list, data) {
  const li = document.createElement("li");
  const content = document.createTextNode(data.content);
  li.appendChild(content);
  list.appendChild(li);
}

/**
 * Idea一覧を取得
 */
function onSearch () {
  get({},
  (res) => {
    console.log(res);
    console.log(positiveListDOM, negativeListDOM);
    preCreateList(res.data);
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
    onSearch();
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
