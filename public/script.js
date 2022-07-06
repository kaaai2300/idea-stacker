const positiveListDOM = document.getElementById("positive-list");
const negativeListDOM = document.getElementById("negative-list");
const registFormSectionDOM = document.querySelector(".regist-form-section");
const deleteFormSectionDOM = document.querySelector(".delete-form-section");
const radioDOM = document.getElementsByName("idea-type");
const inputTextDOM = document.getElementById("idea-text");
let inputContent = "";
let inputType = 1;

onSearch();

/**
 * 追加ボタン押下時
 */
 registFormSectionDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  inputType = checkType();
  if (!inputContent) {
    return;
  }
  console.log(inputContent, inputType);
  onSave();
});

/**
 * 削除ボタン押下時
 */
deleteFormSectionDOM.addEventListener("submit", (e) => {
  e.preventDefault();
  let deleteItemIdList = [];
  let positiveElementCount = positiveListDOM.childElementCount;
  for (let i = 0; i < positiveElementCount; i++) {
    const e = positiveListDOM.children[i].querySelector("input");
    if (e.checked) {
      deleteItemIdList.push(e.value);
    }
  }
  let negativeElementCount = negativeListDOM.childElementCount;
  for (let i = 0; i < negativeElementCount; i++) {
    const e = negativeListDOM.children[i].querySelector("input");
    if (e.checked) {
      deleteItemIdList.push(e.value);
    }
  }
  console.log("削除", deleteItemIdList);
  const data = {
    deleteItemIdList: deleteItemIdList
  }
  onDelete(data);
});

/**
 * テキスト入力時の処理
 */
inputTextDOM.addEventListener("change", (e) => {
  console.log(e.target.value);
  inputContent = e.target.value;
});

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
  return type;
}

function onClearText () {
  inputTextDOM.value = '';
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
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = data._id
  const label = document.createElement("label");
  const content = document.createTextNode(data.content);
  label.appendChild(checkbox);
  label.appendChild(content);
  li.appendChild(label);
  list.appendChild(li);
}

/**
 * リストの要素をクリアする
 */
function onClear () {
  while (positiveListDOM.firstChild) {
    positiveListDOM.removeChild(positiveListDOM.firstChild);
  }
  while (negativeListDOM.firstChild) {
    negativeListDOM.removeChild(negativeListDOM.firstChild);
  }
}

/**
 * Idea一覧を取得
 */
function onSearch () {
  onClear();
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
    onClearText();
  },
  (err) => {
    console.log(err);
  })
}

/**
 * 削除処理
 * @param {*} data 
 */
function onDelete (data) {
  deleteFunc({
    deleteItemIdList: data.deleteItemIdList
  },
  (res) => {
    console.log(res);
    onSearch();
  },
  (err) => {
    console.log(err);
  });
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

/**
 * API接続 DELETE
 * @param {*} params 
 * @param {*} successFunc 
 * @param {*} faildFunc 
 */
async function deleteFunc(params, successFunc, faildFunc) {
  try {
    console.log(params);
    const res = await axios.delete("http://localhost:3000/idea", {
      data: params
    });
    successFunc(res);
  } catch (err) {
    faildFunc(err);
  }
}
