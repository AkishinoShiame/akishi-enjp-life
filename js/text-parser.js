/**
 *  parser for content
 */

async function loadFileContent(url) {
    fetch('url')
    .then((response) => {
        console.log(response); 
        return response.json();
    })
    .catch((error) => {
        console.log(`Error: ${error}`);
    })
}

function FillSelfInto() {
    let MySection1 = loadFileContent("../src/raw-Section1");
    alert(MySection1);
    document.getElementById("japanese-content").innerText = MySection1["#Japanese"];
    document.getElementById("english-content").innerText = MySection1["#English"];
}

addEventListener("DOMContentLoaded", (event) => {
    FillSelfInto();
});