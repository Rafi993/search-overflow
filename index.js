const stackoverflow = Array.from(document.querySelectorAll(".r > a"))
  .map(a => a.href)
  .filter(link => link.includes("stackoverflow.com"));

const getAnswer = html => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const acceptedAnswer = doc.querySelector(".accepted-answer");
  const answers = doc.querySelector(".answer");
  if (acceptedAnswer) {
    return doc.querySelector(".accepted-answer");
  } else if (answers) {
    return doc.querySelector(".answer");
  }
};

if (stackoverflow.length > 0) {
  const firstLink = stackoverflow[0];
  fetch(`https://test.cors.workers.dev/?${firstLink}`, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain"
    }
  })
    .then(response => response.text())
    .then(html => {
      const answer = getAnswer(html);
      const appBar = document.getElementById("appbar");
      appBar.appendChild(answer);
    })
    .catch(error => {
      console.log("Unable to fetch anwser", error);
    });
}
