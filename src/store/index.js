import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import { auth, db, storage } from "@/firebase/config";
import {
  sendEmailVerification,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";
import {
  // setDoc,
  updateDoc,
  doc,
  getDoc,
  // collection,
  // getDocs,
  // query,
  // orderBy,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// const providerGoogle = new GoogleAuthProvider();

export default createStore({
  plugins: [createPersistedState()],
  state: {
    user: null,
    isLoggedIn: null,
    userInfo: {},
    bookingStoreID: null,
    bookingListID: null,
    orderCheckData: {},
    teamData: {},
    teamContact: {},
    PhotoName: null,
    bookingManagementDate: "",
    emailVerified: null,
    bookingDate: "",
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      console.log("user state changed:", state.user.uid);
      //console.log(state.user.emailVerified)
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    toggleIsLoggedIn(state, payload) {
      state.isLoggedIn = payload;
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload;
    },
    clearUserInfo(state) {
      state.user = null;
      state.userInfo = {};
    },
    setOrderCheckData(state, payload) {
      state.orderCheckData = payload;
      // console.log(state.orderCheckData)
    },
    clearOrderCheckData(state) {
      state.orderCheckData = {};
      state.teamData = {};
      state.teamContact = {};
    },
    setTeamData(state, payload) {
      state.teamData = payload;
    },
    setTeamContact(state, payload) {
      state.teamContact = payload;
    },
    updateUsername(state, payload) {
      state.userInfo.Username = payload;
    },
    updateUserPhone(state, payload) {
      state.userInfo.Phone = payload;
    },
    updatePhotoURL(state, payload) {
      state.userInfo.PhotoURL = payload;
    },
    fileNameChange(state, payload) {
      state.PhotoName = payload;
    },
    setBookingStoreID(state, payload) {
      state.bookingStoreID = payload;
    },
    setBookingListID(state, payload) {
      state.docId = payload;
    },
    setBookingManagementDate(state, payload) {
      state.bookingManagementDate = payload;
    },
  },
  actions: {
    setUser(context, user) {
      context.commit("setUser", user);
    },
    async getUserInfo() {
      const uid = auth.currentUser.uid;
      console.log("getUser", uid, "'s info");
      const docRef = doc(db, "Account", uid);
      const result = await getDoc(docRef);
      this.commit("setUserInfo", result.data());
    },
    async sendEmailVerification() {
      // console.dir(auth.currentUser);
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log("verification email sent!");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    async updateUserInfo(context) {
      //this.state.isLoading = true;
      const uid = this.state.user.uid;
      //console.log(this.state.userInfo.Username);
      await updateDoc(doc(db, "Account", uid), {
        Username: this.state.userInfo.Username,
        Phone: this.state.userInfo.Phone,
      })
        .then(() => {
          console.log("update user info complete!");
          context.dispatch("getUserInfo", uid);
          this.state.isLoading = false;
        })
        .catch((err) => {
          console.log(err.message);
          this.state.isLoading = false;
        });
    },
    /*
    await updateDoc(doc(db, "collection 的名稱", "document 的名稱"), 要更新的資料);
    */
    async updateBookingStatus() {
      //this.state.isLoading = true;
      const docId = this.state.docId;
      console.log(docId);
      await updateDoc(doc(db, "BookingLists", docId), {
        Status: this.state.orderCheckData.Status,
      })
        .then(() => {
          console.log("update booking status complete!");
        })
        .catch((err) => {
          console.log(err.message);
          this.state.isLoading = false;
        });
    },
    async updatePassword1(context, { oldPassword, newPassword }) {
      /// const auth1 = getAuth();
      // console.dir(auth1);
      return new Promise((resolve, reject) => {
        const user = auth.currentUser;
        // console.dir(oldPassword)
        const authCredential = EmailAuthProvider.credential(
          user.email,
          oldPassword
        );
        // console.log(authCredential);
        reauthenticateWithCredential(user, authCredential)
          .then(() => {
            console.log("User re-authenticated.");
            updatePassword(user, newPassword).then(() => {
              console.log("password updated!");
              resolve("pwd changed");
            });
          })
          .catch((err) => {
            console.log(err.message);
            reject(err);
          });
      });
    },
    async uploadProfilePhoto(context, payload) {
      this.state.isLoading = true;
      const storageRef = ref(
        storage,
        `/UserProfilePhoto/${this.state.user.uid}/${this.state.PhotoName}`
      );
      const uploadTask = uploadBytesResumable(storageRef, payload);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log(snapshot);
        },
        (err) => {
          console.log(err);
          this.state.isLoading = false;
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await updateDoc(doc(db, "Account", this.state.user.uid), {
            PhotoURL: downloadURL,
          });
          await context.dispatch("getUserInfo", this.state.user.uid);
          this.state.isLoading = false;
        }
      );
    },
  },
  modules: {},
});
