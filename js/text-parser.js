/**
 *  parser for content
 */

async function FillSelfInto() {
    let MySection1 = fetch("./src/raw-Section1")
    .then((response) => response.json())
    .catch((error) => {
        console.log(`Error: ${error}`);
    })
    document.getElementById("japanese-content").innerText = await MySection1["#Japanese"];
    document.getElementById("english-content").innerText = await MySection1["#English"];
}

addEventListener("DOMContentLoaded", (event) => {
    FillSelfInto();
});