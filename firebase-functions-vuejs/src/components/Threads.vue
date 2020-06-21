<template>
  <div>
    <section class="content" id="app">
      <h1>The Comment Section Website</h1>
      <!-- comment section -->
      <ul class="request-list">
        <li v-for="(request, index) in requests" :key="index">
          <span class="text">{{ request.text }}</span>
          <div>
            <span class="votes">{{ request.upvotes }}</span>
            <i class="material-icons upvote" @click="upvoteRequest(request.id)">arrow_upward</i>
          </div>
        </li>
      </ul>
    </section>

    <!-- notification dropdown -->
    <div ref="notification" class="notification">{{ notificationMessage }}</div>
  </div>
</template>

<script>
import { database, firebaseFunction } from "@/firebase/init";

export default {
  name: "Navbar",
  data() {
    return {
      requests: [{ text: "Actually this movie kinda sucks.", upvotes: 5 }],
      notificationMessage: ""
    };
  },
  methods: {
    upvoteRequest(id) {
      //console.log(id);
      const upvote = firebaseFunction.httpsCallable("upvote");
      upvote({ id }).catch(error => {
        this.showNotification(error.message);
      });
    },
    showNotification(message) {
      // notification
      const notification = this.$refs.notification;
      this.notificationMessage = message;
      notification.classList.add("active");
      setTimeout(() => {
        notification.classList.remove("active");
        this.notificationMessage = "";
      }, 4000);
    }
  },
  mounted() {
    const ref = database.collection("requests").orderBy("upvotes", "desc");
    ref.onSnapshot(snapshot => {
      let requests = [];
      snapshot.forEach(doc => {
        requests.push({ ...doc.data(), id: doc.id });
      });
      this.requests = requests;
    });
  }
};
</script>

<style>
/* request list styles */
.request-list li {
  padding: 20px;
  margin: 10px auto;
  list-style-type: none;
  background: white;
  border-radius: 10px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
}
.request-list .votes {
  position: relative;
  top: -5px;
  z-index: 0;
}
.request-list .upvote {
  cursor: pointer;
  border-radius: 50%;
}
.request-list .upvote:active {
  color: black;
  background: #ffe100;
}
</style>