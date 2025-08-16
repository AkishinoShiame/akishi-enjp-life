/**
 *  parser for content
 */

async function fetchData(url) {
  try {
    const response = await fetch(url); // Wait for the fetch to complete
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json(); // Wait for the response to be parsed as JSON
    return data; // Return the fetched data
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // Handle errors gracefully
  }
}

function titleGen(){
  let title = "Q0hJVSwgU0hFTkctWVUgKOmCseebm+WuhykgfCBTaGlhbWUgQWtpc2hpbm8="
  const canvas = document.getElementById("res-title");
  const ctx = canvas.getContex('2d');
  // set font and size 
  ctx.font = "2.5rem Migu2M";
  ctx.fillStyle = 'black'; // Text color
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // Draw
  ctx.fillText(atob(title),40,40)
}

/** Below will load all content from the requests chk file */
addEventListener("DOMContentLoaded", (event) => {
    ;
    (async () => {
    const url = './src/raw-Section1';
    const MySection1 = await fetchData(url);
    console.log(MySection1); // Process the returned value
    document.getElementById("japanese-content").innerText = MySection1["#Japanese"];
    document.getElementById("english-content").innerText = MySection1["#English"];
    })();
    titleGen();
});