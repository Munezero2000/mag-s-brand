function displayFeedbackMessages() {
    const container = document.getElementById("blogs-m-cards");
    container.innerHTML = "";
  
    const feedbackMessages = JSON.parse(localStorage.getItem("feedbacks")) || [];
  
    feedbackMessages.forEach((feedback) => {
      const feedbackCardDiv = document.createElement("div");
      feedbackCardDiv.classList.add("blog-m-card");
  
      const userNameP = document.createElement("p");
      userNameP.classList.add("date-published");
      userNameP.textContent = feedback.name;
  
      const messageP = document.createElement("p");
      messageP.classList.add("blog-title");
      messageP.textContent = feedback.message;
  
      feedbackCardDiv.append(userNameP, messageP);
  
      container.appendChild(feedbackCardDiv);
    });
  }
  
  displayFeedbackMessages();
  