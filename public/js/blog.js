const newBlogFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();

  if (title && content) {
    const response = await fetch('/api/dashboard/', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/api/dashboard/blog');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.blog-form')
  .addEventListener('submit', newBlogFormHandler);
