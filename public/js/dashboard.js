const dbEditBlogFormHandler = async (event) => {
    event.preventDefault();
  
    const id = document.querySelector('#blog-id').value.trim();
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/blogs/editblog/:id', {
        method: 'GET',
        body: JSON.stringify({ id, title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/editblog');
      } else {
        alert(response.statusText);
      }
    }
  };
  
  document
    .querySelector('.create-blog-form')
    .addEventListener('submit', newBlogFormHandler);
  