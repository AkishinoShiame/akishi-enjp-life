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

addEventListener("DOMContentLoaded", (event) => {
    ;
    (async () => {
    const url = './src/raw-Section1';
    const MySection1 = await fetchData(url);
    console.log(MySection1); // Process the returned value
    document.getElementById("japanese-content").innerText = MySection1["#Japanese"];
    document.getElementById("english-content").innerText = MySection1["#English"];
    })();
});