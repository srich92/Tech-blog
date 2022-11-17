const newBlogFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#blog-title').value.trim();
  const content = document.querySelector('#blog-content').value.trim();

  if (title && content) {
    const response = await fetch('/api/blogs/createpost', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
      document.location.redirect('/')
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.create-blog-form')
  .addEventListener('submit', newBlogFormHandler);
