const SERVER = "http://localhost:3000";

async function analyze() {
  const form = new FormData();
  form.append("name", document.getElementById("name").value);
  form.append("dob", document.getElementById("dob").value);
  form.append("tongue", document.getElementById("tongue").files[0]);
  form.append("eye", document.getElementById("eye").files[0]);

  document.getElementById("result").innerText = "Analyzing...";

  const res = await fetch(`${SERVER}/analyze`, {
    method: "POST",
    body: form
  });

  const data = await res.json();
  document.getElementById("result").innerText = data.report;
}

