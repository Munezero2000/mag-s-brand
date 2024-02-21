function displayBlogPosts() {
  const container = document.getElementById("blogs-m-cards");
  container.innerHTML = "";

  const blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

  blogPosts.forEach((blogPost) => {
    const blogCardDiv = document.createElement("div");
    blogCardDiv.classList.add("blog-m-card");

    const datePublishedP = document.createElement("p");
    datePublishedP.classList.add("date-published");
    datePublishedP.textContent = new Date(blogPost.dateCreated).toDateString();

    const blogTitleP = document.createElement("p");
    blogTitleP.classList.add("blog-title");
    blogTitleP.textContent = blogPost.title;

    const flexContainerDiv = document.createElement("div");
    flexContainerDiv.classList.add("flex", "item-center", "flex", "flex-end");

    const thumbsUpIcon = createIconLink("#", "fa-thumbs-up", "25");
    const editIcon = createIconLink(
      `./update-blog.html#${blogPost.id}`,
      "fa-pen-to-square"
    );
    const deleteIcon = createIconLink(
      `./delete.html#${blogPost.id}`,
      "fa-trash-can"
    );
    const eyeIcon = createIconLink("", "fa-eye", blogPost.id);

    flexContainerDiv.append(thumbsUpIcon, editIcon, deleteIcon, eyeIcon);
    blogCardDiv.append(datePublishedP, blogTitleP, flexContainerDiv);

    container.appendChild(blogCardDiv);
  });
}

function createIconLink(href, iconClass, blogId = null) {
  const iconLink = document.createElement("a");
  iconLink.classList.add("blog-card-icon");
  iconLink.setAttribute("href", href);

  const icon = document.createElement("i");
  icon.classList.add("fas", iconClass);

  if (blogId !== null) {
    iconLink.addEventListener("click", function(event) {
      event.preventDefault();
      window.location.href = `blogdetails.html#${blogId}`;
    });
  }

  iconLink.appendChild(icon);
  return iconLink;
}



displayBlogPosts();
