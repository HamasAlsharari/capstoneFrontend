export default async function sendRequest(url, method = "GET", body = null) {
  const options = { method, headers: { "Content-Type": "application/json" } };
  if (body) options.body = JSON.stringify(body);

  try {
    const res = await fetch(`http://localhost:8000${url}`, options);
    if (res.ok) return res.json();
    else throw new Error("Request failed");
  } catch (err) {
    console.log(err, "error in send-request");
    return null;
  }
}