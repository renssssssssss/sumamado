// 要素を追加する関数
function addElement(element, attributes) {
    // 要素を生成
    const newElement = document.createElement(element);

    // 属性を設定
    for (const property in attributes) {
        newElement.setAttribute(property, attributes[property]);
    }

    // 要素を追加
    document.body.appendChild(newElement);
}

function url_to_id(urltext){
    // URLを分割
    const parts = urltext.split("=");

    // IDを取得
    const id = parts[1];
    console.log("id:"+id);
    return id;
}
//https://www.youtube.com/embed/vDJnbPaEHpg
// 利用者が要素を追加できるフォームを作成
const form = document.createElement("form");
form.innerHTML = `
    <input type="text" id="url" placeholder="URL" value="https://www.youtube.com/watch?v=vDJnbPaEHpg">
    <input type="number" id="width" placeholder="width(幅)">
    <input type="number" id="height" placeholder="height(高さ)">
    <button type="submit">追加</button>
    <button type="reset" accesskey="r">クリア</button>`;

// フォームにイベントを登録
form.addEventListener("submit", (event) => {
    // イベントをキャンセル
    event.preventDefault();

    // 属性1を取得
    const url = document.getElementById("url").value;
  
    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;

    // 要素を追加
    const attributes = {
        ["src"]: "https://www.youtube.com/embed/"+url_to_id(url),
    };

    if (width) {
        attributes["width"] = width;
    }else{attributes["width"]="400";}

    if (height) {
        attributes["height"] = height;
    }else{attributes["height"]="200";}
    attributes["webkit-playinline"];
    attributes["autoplay"]=1;
    attributes["playsinline"] = 1;
    attributes["mute"]=1;
    addElement("iframe", attributes);

});
// クリアボタンの処理を追加
form.querySelector('button:last-of-type').addEventListener("click", (event) => {
    // フォーム内の全てのinput要素を取得して、値を空にする
    const inputs = form.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        input.value = "";
    });
});
form.addEventListener("reset",(event) => {
    // イベントをキャンセル
    event.preventDefault();

});

// フォームを画面に追加
document.body.appendChild(form);