export async function cmsGet(action, params = {}) {
  const url = "https://script.google.com/macros/s/AKfycbwrrZpcfughJvAGZgjfQFqAMbuRErHLPJtdfVgTQIlwQE0ASBqV3nBpwrl1MkqsXRV1bA/exec";
  const query = new URLSearchParams({ action, ...params }).toString();
  const res = await fetch(`${url}?${query}`);
  return res.json();
}

export async function cmsPost(body) {
  const url = "https://script.google.com/macros/s/AKfycbwrrZpcfughJvAGZgjfQFqAMbuRErHLPJtdfVgTQIlwQE0ASBqV3nBpwrl1MkqsXRV1bA/exec";
  const token = localStorage.getItem('cms_token');
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ ...body, token }),
    redirect: 'follow'
  });
  return res.json();
}
