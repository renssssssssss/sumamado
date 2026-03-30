function addElement(element, attributes) {
  const newElement = document.createElement(element);
  for (const property in attributes) {
    newElement.setAttribute(property, attributes[property]);
  }
  document.body.appendChild(newElement);
}

function url_to_youtubeid(urltext) {
  if (!urltext) return null;
  const regExp =
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|live\/|embed\/|v\/))([a-zA-Z0-9_-]{11})/;
  const match = urltext.match(regExp);
  if (match) {
    console.log("id:" + match[1]);
    return match[1];
  } else {
    console.log("IDが見つかりませんでした");
    return null;
  }
}

function get_youtubeid(rawText) {
  const lines = rawText.split(/[\n\r,\s]+/);
  const seen = new Set();
  const ids = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const id = url_to_youtubeid(trimmed);
    if (id && !seen.has(id)) {
      seen.add(id);
      ids.push(id);
    }
  }
  return ids;
}

const form = document.createElement("form");
form.innerHTML = `
    <textarea id="url" placeholder="URLを改行・スペース・カンマで区切って複数入力できます" style="width:300px;height:80px;"></textarea>
    <input type="number" id="width"  placeholder="width(幅)"   value="400">
    <input type="number" id="height" placeholder="height(高さ)" value="225">
    <button type="submit">追加</button>
    <button type="button" id="clear-btn" accesskey="r">クリア</button>`;

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const rawText = document.getElementById("url").value;
  const width = document.getElementById("width").value || "400";
  const height = document.getElementById("height").value || "225";

  const ids = get_youtubeid(rawText);

  if (ids.length === 0) {
    alert("有効なURLが見つかりませんでした");
    return;
  }

  for (const videoId of ids) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1`;
    addElement("iframe", {
      src: embedUrl,
      width,
      height,
      frameborder: "0",
      allow:
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
      allowfullscreen: "true",
    });
  }

  console.log(`${ids.length}本追加`);
});


form.querySelector("#clear-btn").addEventListener("click", () => {
  document.getElementById("url").value = "";
});

document.body.appendChild(form);
