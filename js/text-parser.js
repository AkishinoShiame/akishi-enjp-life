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

function ttpcode(inp) {
  const ttb = atob(inp); const bit = new Uint8Array(ttb.length);
  for (let i = 0; i < bit.length; i++) {
    bit[i] = ttb.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bit.buffer));
}


async function titleGen(){
  let title = "QwBIAEkAVQAsACAAUwBIAEUATgBHAC0AWQBVACAAKACxkNt2h1spACAAfAAgAFMAaABpAGEAbQBlACAAQQBrAGkAcwBoAGkAbgBvAA=="
  const canvas = document.getElementById("res-title");
  const ctx = canvas.getContext('2d');
  //canvas size
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
  const tWid = 38;
  // set font and size 
  ctx.font = "2.5rem Migu2M";
  ctx.fillStyle = 'black'; // Text color
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // Draw
  await ctx.fillText(ttpcode(title),(canvas.width - tWid) / 2,canvas.height / 2)
}

function jobEduGen(data,content) {
  let ElemId = "ul-" + content;
  let listContainer = document.getElementById(ElemId);
  listContainer.innerHTML = ""; //cleanup
    data.profiles.forEach(profile => {
      if(profile.type == content){
        let li = document.createElement("li");
        li.className = "mb-2";
        // Format timestamp (optional: normalize to ISO or simplified range)
        let timestamp = profile.timestamp;
        // Combine Japanese and English labels
        let jaText = `${profile.ja.name}・${profile.ja.title}`;
        let enText = `${profile.en.name}, ${profile.en.title}`;
        li.innerHTML = `
          <strong>${timestamp}</strong><br>
          <span class="text-muted">${jaText}</span><br>
          <small class="text-muted">${enText}</small>
        `;
        listContainer.appendChild(li);
      }
    });
}

function acpFill(jsondata) {
  let award = document.getElementById("awar");
  let certification = document.getElementById("cert");
  let publication = document.getElementById("publ");
  award.innerHTML = ""; //cleanup
  certification.innerHTML = ""; //cleanup
  publication.innerHTML = ""; //cleanup
    jsondata.Awards.forEach(awar => {
      let ul = document.createElement("ul");
      ul.className = "list-unstyled mb-0";
      ul.innerHTML = `
        <h6>${awar.title}</h6>
        <span class="me-2" style="width: 8px; height: 8px; background-color: #000; border-radius: 50%; display: inline-block;"></span>
        <span>${awar.time}</span>
        <li class="mb-1">
            ${awar.langjp}
            <br><small class="text-muted ms-4">${awar.langen}</small>
        </li>
      `;
      award.appendChild(ul);
    });
    jsondata.Certifications.forEach(profile => {});
    jsondata.Publications.forEach(profile => {});
}

/** Below will load all content from the requests chk file */
addEventListener("DOMContentLoaded", (event) => {
    ;
    (async () => {
    const url = './src/raw-Section1';
    const MySection1 = await fetchData(url);
    document.getElementById("japanese-content").innerText = MySection1["#Japanese"];
    document.getElementById("english-content").innerText = MySection1["#English"];
    titleGen();
    const MySection2 = await fetchData('./src/raw-Section2');
    jobEduGen(MySection2,"career");
    jobEduGen(MySection2,"education");
    const MySection3 = await fetchData('./src/raw-Section3');
    acpFill(MySection3);
    })();
});