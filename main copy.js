// 要素を追加する関数
function addElement(element, target) {
    // 要素を生成
    const newElement = document.createElement(element);

    // 属性を設定
    for (const property in target) {
        newElement[property] = target[property];
    }

    // 要素を追加
    target.appendChild(newElement);
}
  
// 利用者が要素を追加できるフォームを作成
const form = document.createElement("form");
form.innerHTML = `
    <input type="text" id="element" placeholder="要素名">
    <input type="text" id="property1" placeholder="属性1">
    <input type="text" id="value1" placeholder="属性1の値">
    <input type="text" id="property2" placeholder="属性2">
    <input type="text" id="value2" placeholder="属性2の値">
    <button type="submit">追加</button>`;

// フォームにイベントを登録
form.addEventListener("submit", (event) => {
    // イベントをキャンセル
    event.preventDefault();
  
    // 要素名を取得
    const element = document.getElementById("element").value;
    console.log(element);
  
    // 属性1を取得
    const property1 = document.getElementById("property1").value;
    const value1 = document.getElementById("value1").value;
    console.log(property1);
    console.log(value1);

  
    // 属性2を取得
    const property2 = document.getElementById("property2").value;
    const value2 = document.getElementById("value2").value;
    console.log(property2);
    console.log(value2);
  
    // 要素を追加
    addElement(element, {
        [property1]: value1,
        [property2]: value2,
        });
    });

// フォームを画面に追加
document.body.appendChild(form);