<template>
    <Loading v-show="loading" />

  <div class="container">
    <div class="d-flex justify-content-center">
      <div class="userEntry-wrapper row flex-column align-items-center">
        <h1 class="title text-center">會員登入</h1>
        <div class="content">
          <div class="email-input mb-4">
            <p class="input_title">電子信箱</p>
            <div class="form-floating">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                v-model="email"
              />
              <label for="floatingInput">name@example.com</label>
            </div>
          </div>
          <div class="pw-input mb-4">
            <p class="input_title">密碼</p>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                v-model="password"
              />
              <label for="floatingPassword">請輸入密碼</label>
            </div>
          </div>
          <div class="error-message" v-if="error">
            <p>{{ errorMsg }}</p>
          </div>
          <div class="btn-block d-flex justify-content-center mt-5">
            <button class="mainBtn text-center" @click="login">
              登&emsp;&emsp;入
            </button>
          </div>
          <div class="toggle-form d-flex justify-content-center mb-3 p-2">
            <router-link to="signup" style="text-decoration: none"
              ><span>註冊會員</span></router-link
            >&emsp;<router-link to="emailsend" style="text-decoration: none"
              ><span>忘記密碼?</span></router-link
            >
          </div>
        </div>
        <hr
          style="border: 2px solid rgb(246, 213, 94); color: rgb(246, 213, 94)"
        />
        <div class="email-input mb-4">
          <p class="input_title">或使用</p>
          <div class="btn-block d-flex justify-content-center mt-2">
            <button class="googleBtn text-center" @click="googleLogin">
              <img src="../../assets/icon/google.png" alt="" width="" />
              google登入
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "@/firebase/config";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
const providerGoogle = new GoogleAuthProvider();

export default {
  components: {},
  data() {
    return {
      email: null,
      password: null,
      error: null,
      errorMsg: "",
    };
  },
  methods: {
    getRandom(x) {
      return Math.floor(Math.random() * x) + 1;
    },
    getRandomID(ID) {
      var n = 0;
      for (var i = 0; i < 4; i++) {
        n = this.getRandom(9);
        ID += String(n);
      }
      return ID;
    },
    async login() {
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(() => {
          onAuthStateChanged(auth, (user) => {
            if (user) {
              this.$store.commit("setUser", user);
              this.$store.commit("toggleIsLoggedIn",true);
              this.$store.dispatch("getUserInfo", user.uid);
              this.$router.push("/stores");
            }
          });
        })
        .catch((err) => {
          this.$snackbar.add({
            type: "error",
            text: `${err.message}`
          })
          // this.error = true;
          // this.errorMsg = err.message;
          // setTimeout(() => {
          //   this.error = false;
          // }, 3000);
        });
    },
    async googleLogin() {
      try {
        const res = await signInWithPopup(auth, providerGoogle);
        const user = res.user;
        var date = new Date();
        var dateresult = date.toDateString();
        const userInfo = await getDoc(doc(db, "Account", user.uid));
        const userData = userInfo.data();
        console.log(userData);
        if (userData !== undefined) {
          this.$store.commit("toggleIsLoggedIn",true)
          this.$store.dispatch("getUserInfo"); 
          this.$router.push("/stores");
        } else {
          this.loading = true;
          this.$snackbar.add({
            type: "info",
            text: `初次登入，正在建立基礎使用者資料`,
          });
          setDoc(doc(db, "Account", user.uid), {
            PhotoURL: user.photoURL,
            UserId: Number(this.getRandomID("1000")),
            Username: user.displayName,
            Email: user.email,
            Role: "一般用戶",
            RegisterDate: dateresult,
            Points: 0,
            Coupons: [],
            FavStores: [],
            FavJoins: [],
            FavArticles: [],
            PunishDate: "",
          }).then(() => {
            this.$snackbar.add({
              type: "info",
              text: `將跳轉至資料填寫頁面，請完善其餘使用者資料`,
            });
            this.$router.push("/googlesignup");
          });
        }
      } catch {
        (err) => {
          console.log(err.message);
        };
      }
    },
  },
};
</script>

<style scoped>
.title {
  margin-bottom: 4vh;
}
.form-control {
  border-radius: 100px;
  border: 3px solid rgb(246, 213, 94);
  height: 3.5rem !important;
  padding-left: 2rem !important;
}
.form-control:focus {
  border-color: rgb(246, 213, 94, 0.6);
  box-shadow: 0 0 2px 4px rgba(246, 213, 94, 0.3);
}
label {
  color: rgb(150, 150, 150);
  margin-left: 1.3rem;
}
.input_title {
  padding-left: 2rem;
  margin-bottom: 2px;
}
.msg {
  padding-left: 20px;
  margin-bottom: 0px;
  color: rgb(150, 150, 150);
  font-size: 14px;
}
.googleBtn {
  font-size: 1.8rem;
  /* font-weight: bolder; */
  background-color: white;
  color: #4590d4;
  width: 300px;
  max-width: 300px;
  text-align: center;
  line-height: 1.8;
  box-shadow: 0 4px 6px rgb(180, 180, 180);
  border-radius: 100rem;
  border: 3px solid rgb(246, 213, 94);
  text-decoration: none;
}
</style>

    