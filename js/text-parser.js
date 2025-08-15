/**
 *  parser for content
 */

async function loadFileContent(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const content = await response.json(); 
    // console.log(content); // Do something with the file content
    return content;
  } catch (error) {
    console.error('Error loading file:', error);
  }
}

function FillSelfInto() {
    let MySection1 = loadFileContent("/src/raw-Section1");
    document.getElementById("japanese-content").innerText = MySection1["#Japanese"];
    document.getElementById("english-content").innerText = MySection1["#English"];
}