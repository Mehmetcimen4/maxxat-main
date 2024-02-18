  // Temel veriler
  let likes = {
    1: 10,
    2: 25,
    3: 40
  };
  let dislikes = {
    1: 2,
    2: 3,
    3: 8
  };
  let comments = {
    1: [],
    2: [{
      id: 1,
      user: "YorumYapan1",
      content: "Harika bir gönderi!"
    }, {
      id: 2,
      user: "YanitYapan1",
      content: "Teşekkür ederim!"
    }],
    3: []
  };
  let reactions = {
    1: {
      like: 0,
      love: 0,
      laugh: 0
    },
    2: {
      like: 0,
      love: 0,
      laugh: 0
    },
    3: {
      like: 0,
      love: 0,
      laugh: 0
    }
  };

  // Temel işlevler
  function updateLikes(postId) {
    document.getElementById(`likeCount${postId}`).innerText = likes[postId];
    document.getElementById(`dislikeCount${postId}`).innerText = dislikes[postId];
  }

  function likePost(postId) {
    likes[postId]++;
    updateLikes(postId);
  }

  function dislikePost(postId) {
    dislikes[postId]++;
    updateLikes(postId);
  }

  function toggleComments(commentsId) {
    const commentsElement = document.getElementById(commentsId);
    commentsElement.classList.toggle("show-comments");
    const isOpen = commentsElement.classList.contains("show-comments");

    // Eğer yorumlar gösteriliyorsa, yorum sayısını güncelle
    if (isOpen) {
      const postId = commentsId.replace("comments", "");
      document.getElementById(`commentCount${postId}`).innerText = comments[postId].length;
    }
  }

  function updateReactions(postId) {
    document.getElementById(`reactionCount${postId}`).innerText = reactions[postId].like + reactions[postId].love + reactions[postId].laugh;
  }

  function reactToPost(reaction, postId) {
    reactions[postId][reaction]++;
    updateReactions(postId);
  }

  function updateComments(commentsId) {
    const postId = commentsId.replace("comments", "");
    const commentsElement = document.getElementById(commentsId);

    // Temizle ve güncelle
    commentsElement.innerHTML = "";
    comments[postId].forEach(comment => {
      const commentElement = createCommentElement(comment);
      commentsElement.appendChild(commentElement);
    });
  }

  function createCommentElement(comment) {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    const userProfile = document.createElement("div");
    userProfile.classList.add("user-profile");

    const userProfileImage = document.createElement("img");
    userProfileImage.src = "https://placekitten.com/50/50";
    userProfileImage.alt = "User Profile Image";

    const usernameSpan = document.createElement("span");
    usernameSpan.innerText = comment.user;

    userProfile.appendChild(userProfileImage);
    userProfile.appendChild(usernameSpan);

    const contentParagraph = document.createElement("p");
    contentParagraph.innerText = comment.content;

    const replyButton = document.createElement("button");
    replyButton.innerText = "Yanıt Ver";
    replyButton.onclick = () => replyComment(comment.id, `comments${comment.postId}`);

    commentElement.appendChild(userProfile);
    commentElement.appendChild(contentParagraph);
    commentElement.appendChild(replyButton);

    return commentElement;
  }

  function postComment(commentsId) {
    const postId = commentsId.replace("comments", "");
    const commentInput = document.getElementById(`commentInput${postId}`);
    const commentContent = commentInput.querySelector("input").value;
    const commentId = comments[postId].length + 1; // Yeni yorumun ID'si

    const newComment = {
      id: commentId,
      user: "YorumYapanYeni", // Yorum yapan kullanıcının adını buradan alabilirsiniz
      content: commentContent,
      postId: postId
    };

    comments[postId].push(newComment);
    updateComments(commentsId);

    // Yorum sayısını güncelle
    document.getElementById(`commentCount${postId}`).innerText = comments[postId].length;

    // Yorum girişini temizle
    commentInput.querySelector("input").value = "";
  }

  function replyComment(parentCommentId, commentsId) {
    const postId = commentsId.replace("comments", "");
    const parentComment = comments[postId].find(comment => comment.id === parentCommentId);

    if (parentComment) {
      const replyContent = prompt("Yanıtınızı buraya yazın:");
      const replyId = comments[postId].length + 1;

      const newReply = {
        id: replyId,
        user: "YanitYapanYeni", // Yanıt yapan kullanıcının adını buradan alabilirsiniz
        content: replyContent,
        postId: postId
      };

      parentComment.replies = parentComment.replies || [];
      parentComment.replies.push(newReply);
      updateComments(commentsId);

      // Yorum sayısını güncelle
      document.getElementById(`commentCount${postId}`).innerText = comments[postId].length;
    }
  }