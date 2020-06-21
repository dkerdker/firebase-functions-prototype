<template>
  <div class="auth open">
    <div ref="login" class="modal active">
      <h2>Login</h2>
      <form ref="loginForm" class="login">
        <input type="text" name="email" placeholder="Email" v-model="email" />
        <input type="password" name="password" placeholder="Password" v-model="password" />
        <button @click.prevent="loginUser">Login</button>
        <p class="error">{{ error }}</p>
      </form>
      <div>
        No account?
        <a class="switch" @click="switchBox">Register instead</a>
      </div>
    </div>
    <div ref="register" class="modal">
      <h2>Register</h2>
      <form ref="regForm" class="register">
        <input type="text" name="email" placeholder="Email" v-model="email" />
        <input type="password" name="password" placeholder="Password" v-model="password" />
        <button @click.prevent="registerUser">Register</button>
        <p class="error"></p>
      </form>
      <div>
        Got an account?
        <a class="switch" @click="switchBox">Login instead</a>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
require("firebase/auth");

export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      error: null
    };
  },
  methods: {
    switchBox() {
      const authModelLogin = this.$refs.login;
      const authModelRegister = this.$refs.register;
      authModelLogin.classList.toggle("active");
      authModelRegister.classList.toggle("active");
    },
    loginUser() {
      const loginForm = this.$refs.loginForm;
      // login form
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log("logged in", user);
          loginForm.reset();
          this.$router.push({ name: "Threads" });
        })
        .catch(error => {
          loginForm.reset();
          this.error = error.message;
        });
    },
    registerUser() {
      const loginForm = this.$refs.loginForm;
      // login form
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log("user registered", user);
          loginForm.reset();
          this.switchBox();
        })
        .catch(error => {
          loginForm.reset();
          this.error = error.message;
        });
    }
  }
};
</script>

<style>
/* auth styles */
.auth {
  width: 100%;
  height: 100%;
  position: fixed;
  background: #fafafa;
  display: none;
  z-index: 1;
}
.auth.open {
  display: block;
}
.auth a {
  text-decoration: underline;
  cursor: pointer;
}
.auth .modal {
  display: none;
}
.auth .modal.active {
  display: block;
}
</style>