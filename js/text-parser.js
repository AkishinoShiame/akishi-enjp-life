/**
 *  parser for content
 */

async function loadFileContent(url) {
    
}

function FillSelfInto() {
    fetch("../src/raw-Section1")
    .then((response) => {
        console.log(response); 
    })
    .catch((error) => {
        console.log(`Error: ${error}`);
    })
    let MySection1 = response.json();
    document.getElementById("japanese-content").innerText = MySection1["#Japanese"];
    document.getElementById("english-content").innerText = MySection1["#English"];
}

addEventListener("DOMContentLoaded", (event) => {
    FillSelfInto();
});