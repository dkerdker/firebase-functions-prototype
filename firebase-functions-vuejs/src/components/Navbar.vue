<template>
  <div class="navbar">
    <nav class="nav-extended teal darken-2">
      <div v-if="main" class="nav-content">
        <a @click.prevent="addComment" href class="add-comment">add comment</a>
        <a @click="signOut" href class="sign-out">
          <router-link :to="{ name: 'Login' }">sign out</router-link>
        </a>
      </div>
    </nav>
    <!-- new comment modal -->
    <div ref="commentPanel" @click="closePanel" class="new-comment">
      <div class="modal">
        <h2>Comment something...</h2>
        <form ref="commentBox">
          <input type="text" name="comment" v-model="comment" placeholder="Comment..." />
          <button @click.prevent="submitComment">Submit Comment</button>
          <p class="error"></p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { firebaseFunction } from "@/firebase/init";
import firebase from "firebase";
require("firebase/auth");

export default {
  name: "Navbar",
  data() {
    return {
      comment: ""
    };
  },
  methods: {
    closePanel: function(event) {
      const commentPanel = this.$refs.commentPanel;

      if (event.target.classList.contains("new-comment")) {
        commentPanel.classList.remove("open");
      }
    },
    addComment() {
      const commentPanel = this.$refs.commentPanel;
      commentPanel.classList.add("open");
    },
    submitComment() {
      const commentBox = this.$refs.commentBox;
      const commentPanel = this.$refs.commentPanel;

      console.log(this.comment);
      // add a new comment

      const addRequest = firebaseFunction.httpsCallable("addRequest");
      addRequest({
        text: this.comment
      })
        .then(() => {
          commentBox.reset();
          commentBox.querySelector(".error").textContent = "";
          commentPanel.classList.remove("open");
        })
        .catch(error => {
          commentBox.querySelector(".error").textContent = error.message;
        });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => console.log("signed out"));
    }
  },
  computed: {
    main: function() {
      return this.$route.path === "/";
    }
  }
};
</script>

<style>
/* navbar styles */
.navbar {
  width: 100%;
  padding: 20px;
  text-align: right;
  background: white;
  box-sizing: border-box;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
}
.navbar a {
  margin-left: 10px;
  border-bottom: 2px solid #ffe100;
  padding: 4px;
  cursor: pointer;
}
.navbar a:hover {
  background: #ffe100;
  color: black;
}
.new-comment {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
  display: none;
}
.new-comment.open {
  display: block;
}
</style>