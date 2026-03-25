//要素を追加する関数
function addElement(element, attributes) {
    const newElement = document.createElement(element);
    for (const property in attributes) {
        newElement.setAttribute(property, attributes[property]);
    }
    document.body.appendChild(newElement);
}

//pattern配列やjudge_kind_of_url関数は削除し、こっち一つにまとめた
function url_to_youtubeid(urltext){
    if (!urltext) return null;
    
    //javascriptのwatch?v=, shorts/, live/, youtu.be/ などの形式から11桁のIDを抽出する正規表現
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|live\/|embed\/|v\/))([a-zA-Z0-9_-]{11})/;
    const match = urltext.match(regExp);
    
    if (match) {
        console.log("id:" + match[1]);
        return match[1];
    } else {
        console.log("IDが見つかりませんでした");
        return null;
    }
}

//要素追加フォーム
const form = document.createElement("form");
form.innerHTML = `
    <input type="text" id="url" placeholder="URL" value="" style="width: 300px;">
    <input type="number" id="width" placeholder="width(幅)" value="400">
    <input type="number" id="height" placeholder="height(高さ)" value="225">
    <button type="submit">追加</button>
    <button type="reset" accesskey="r">クリア</button>`;

//フォームにイベント登録
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const url = document.getElementById("url").value;
    const width = document.getElementById("width").value;
    const height = document.getElementById("height").value;
    
    // IDを取得
    const videoId = url_to_youtubeid(url);

    if (videoId) {
        //autoplayなどはiframeの属性ではなくURLパラメータに書くようになった
        const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1`;

        const attributes = {
            "src": embedUrl,
            "width": width || "400",
            "height": height || "225",
            "frameborder": "0",
            //自動再生に必要な権限設定
            "allow": "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            "allowfullscreen": "true"
        };
        addElement("iframe", attributes);
    } else {
        alert("有効なYouTube URLを入力してください");
    }
});

//URL削除
form.querySelector('button:last-of-type').addEventListener("click", (event) => {
    const inputs = form.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        input.value = "";
    });
});
form.addEventListener("reset",(event) => {
  
});

//フォームを追加
document.body.appendChild(form);