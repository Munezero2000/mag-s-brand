import MessageServices from "../service/MessgeServices.js";

document.addEventListener("DOMContentLoaded", async ()=>{
  const response = await MessageServices.getAllMessages();  
  if(response.ok){
    const data = await response.json();
    displayFeedbackMessages(data)
  }
});

function displayFeedbackMessages(feedbacks) {
  const container = document.getElementById("blogs-m-cards");
  container.innerHTML = "";
  feedbacks.forEach((feedback) => {
      const feedbackCardDiv = document.createElement("div");
      feedbackCardDiv.classList.add("blog-m-card");

      const userNameP = document.createElement("p");
      userNameP.classList.add("date-published");
      userNameP.textContent = feedback.name;

      const messageP = document.createElement("p");
      messageP.classList.add("blog-title");
      messageP.textContent = feedback.content;

      const actionDiv = document.createElement("div");
      actionDiv.classList.add(["flex", "space-between", "items-center"]);

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("feed-btn");
      deleteButton.addEventListener("click", function() {
        deleteFeedbackMessage(feedback._id);
    });

      const replyButton = document.createElement("button");
      replyButton.textContent = "Reply";
      replyButton.classList.add("feed-btn");
      replyButton.addEventListener("click", function() {
        const mailtoUrl = `mailto:${feedback.senderEmail}`;
        window.location.href = mailtoUrl;
          console.log("Reply to feedback:", feedback);
      });

      actionDiv.appendChild(deleteButton);
      actionDiv.appendChild(replyButton);

      feedbackCardDiv.append(userNameP, messageP, actionDiv);

      container.appendChild(feedbackCardDiv);
  });
}

async function deleteFeedbackMessage(feedbackId) {
  const response = await MessageServices.deleteMessage(feedbackId); 
  if(response.ok){
    const data = await response.json();
    console.log(data);
    location.reload();
  }
}
  