/**
 *  parser for content
 */

async function FillSelfInto() {
    let MySection1 = fetch("./src/raw-Section1")
    .then((response) => response.json())
    .catch((error) => {
        console.log(`Error: ${error}`);
    })
    alert(MySection1);
    document.getElementById("japanese-content").innerText = MySection1["#Japanese"];
    document.getElementById("english-content").innerText = MySection1["#English"];
}

addEventListener("DOMContentLoaded", (event) => {
    FillSelfInto();
});