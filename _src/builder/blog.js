
export function getBlogPostsHtml(blogPosts = []) {
  blogPosts = sortBlogPosts(blogPosts);
  const blogPostsHtml = `<div id="blog_posts">
    ${createBlogPosts(blogPosts)}
  </div>`;

  return blogPostsHtml;
}

function sortBlogPosts(blogPosts) {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function createBlogPosts(blogPosts) {
  const posts = [];
  for (const blogPost of blogPosts) {
    posts.push(createBlogPostElement(blogPost));
  }
  return posts.join('\n');
}

function createBlogPostElement(blogPost) {
  const link = `<a href="${blogPost.link}" class="blog-post-link">
    ${getBlogPostImage(blogPost)}
    ${getBlogPostTitle(blogPost)}
    ${getBlogPostDescription(blogPost)}
  </a>`;
  return link;
}

function getBlogPostTitle(blogPost) {
  const title = `<p class="title center pt1">${blogPost.title}</p>`;
  return title;
}

function getBlogPostImage(blogPost) {
  const img = `<div class="blog-post-image">
    <img src="${blogPost.link}/blog-post-image.jpg" alt="Blog Post Image">
  </div>`;
  return img;
}

function getBlogPostDescription(blogPost) {
  const description = `<p class="blog-post-description p1">${blogPost.description || ''}</p>`;
  return description;
}
