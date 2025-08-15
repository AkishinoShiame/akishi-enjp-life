/**
 *  parser for content
 */

async function loadFileContent(url) {
    
}

function FillSelfInto() {
    let MySection1;
    fetch("./src/raw-Section1")
    .then((response) => {
        MySection1 = response.json();
        console.log(MySection1); 
    })
    .catch((error) => {
        console.log(`Error: ${error}`);
    })
    document.getElementById("japanese-content").innerText = MySection1["#Japanese"];
    document.getElementById("english-content").innerText = MySection1["#English"];
}

addEventListener("DOMContentLoaded", (event) => {
    FillSelfInto();
});