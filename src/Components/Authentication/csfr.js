export default async function csrfFetch(url, options = {}) {
  options.headers = options.headers || {};
  options.method = options.method || 'GET';

  if (options.method.toUpperCase() !== 'GET') {
    options.headers['Content-Type'] = 'application/json';
    // Use sessionStorage token if available, otherwise use the meta tag token
    options.headers['X-CSRF-Token'] = sessionStorage.getItem('X-CSRF-Token') || document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  }

  const res = await fetch(url, options);
  if (res.status >= 400) throw res;
  return res;

}

