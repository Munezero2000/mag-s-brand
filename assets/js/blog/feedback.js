checkAdminPrivilage();
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

      const actionDiv = document.createElement("div");
      actionDiv.classList.add("feedback-actions");

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("btn");
      deleteButton.addEventListener("click", function() {
        const feedbackId = feedback.id; // Assuming feedback has an 'id' property
        deleteFeedbackMessage(feedbackId);
    });

      const replyButton = document.createElement("button");
      replyButton.textContent = "Reply";
      replyButton.classList.add("btn");
      replyButton.addEventListener("click", function() {
          // Handle reply action
          console.log("Reply to feedback:", feedback);
      });

      actionDiv.appendChild(deleteButton);
      actionDiv.appendChild(replyButton);

      feedbackCardDiv.append(userNameP, messageP, actionDiv);

      container.appendChild(feedbackCardDiv);
  });
}

function deleteFeedbackMessage(feedbackId) {
  const feedbackMessages = JSON.parse(localStorage.getItem("feedbacks")) || [];
  const updatedFeedbackMessages = feedbackMessages.filter(feedback => feedback.id !== feedbackId);
  localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbackMessages));
  displayFeedbackMessages();
}


  
  displayFeedbackMessages();
  