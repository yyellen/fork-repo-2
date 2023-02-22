<template>
  <div class="container py-5 TeamsSecView">
    <div class="d-flex justify-content-end">
      <button class="mainBtn" @click="goToStore">馬上開團</button>
    </div>

    <div class="wrapper /listStyle">
      <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="search-tab"
            data-bs-toggle="tab"
            data-bs-target="#teamsearch"
            type="button"
            role="tab"
            aria-controls="teamsearch"
            aria-selected="true"
            @click="showCurrent('揪團搜尋')"
          >
            揪團搜尋
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="status-tab"
            data-bs-toggle="tab"
            data-bs-target="#teamstatus"
            type="button"
            role="tab"
            aria-controls="teamstatus"
            aria-selected="false"
            @click="showCurrent('揪團狀態')"
          >
            揪團狀態
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="fav-tab"
            data-bs-toggle="tab"
            data-bs-target="#teamfav"
            type="button"
            role="tab"
            aria-controls="teamfav"
            aria-selected="false"
            @click="showCurrent('揪團收藏')"
          >
            揪團收藏
          </button>
        </li>
      </ul>

      <div class="/tab-content" id="/myTabContent">
        <div
          class="/tab-pane fade show active rounded-bottom"
          v-if="currentPage == '揪團搜尋'"
        >
          <TeamsSearch
            :teams="this.searchTeams"
            :userinfo="this.userInfo"
          ></TeamsSearch>
        </div>

        <div
          class="/tab-pane fade show active rounded-bottom"
          v-if="currentPage == '揪團狀態'"
        >
          <TeamsStatus
            :teams="this.userTeams"
            :userinfo="this.userInfo"
          ></TeamsStatus>
        </div>

        <div
          class="/tab-pane fade show active rounded-bottom"
          v-if="currentPage == '揪團收藏'"
        >
          <FavTeams :teams="this.favTeams" :userinfo="this.userInfo"></FavTeams>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TeamsSearch from "@/components/TeamBooking/TeamsSearchView.vue";
import TeamsStatus from "@/components/TeamBooking/TeamsStatusView.vue";
import FavTeams from "@/components/TeamBooking/FavTeamsView.vue";

import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
  where,
} from "firebase/firestore";

export default {
  name: "TeamsSecView",
  components: {
    TeamsSearch,
    FavTeams,
    TeamsStatus,
  },
  data() {
    return {
      // user: this.$store.state.user.uid,
      userInfo: "",
      allTeams: [],
      searchTeams: [],
      userTeams: [],
      favTeams: [],
      currentPage: "揪團搜尋",
    };
  },
  async created() {
    if (this.$store.state.user) {
      console.log("Created Start");
      //呼叫Teams資料庫
      let dataBase = await collection(db, "Teams");
      let dbResult = await getDocs(
        query(dataBase, where("Status", "!=", "已結束"), orderBy("Status"))
      );
      dbResult.docs.forEach((doc) => {
        // console.log(doc.data().TeamId);
        let data = doc.data();
        let id = doc.id;
        data.TeamId = id;
        // console.log(data);
        this.allTeams.push({ ...data });
      });

      //取得使用者資訊
      let getUserInfo = await getDoc(
        doc(db, "Account", this.$store.state.user.uid)
      );
      this.userInfo = getUserInfo.data();
      // console.log("Id", this.userInfo.UserId);

      //篩選出還沒成功訂位的團
      this.allTeams.forEach((element) => {
        if (element.Status !== "成功訂位") {
          this.searchTeams.push(element);
        }
      });
      console.log("this.searchTeams", this.searchTeams);

      //篩選該使用者的揪團清單
      var id = String(this.userInfo.UserId);
      this.allTeams.forEach((element) => {
        const found = element.BookingId.find((user) => user.Id == id);
        if (found) {
          element.UsersTeam = true; //物件添加一個元素判定該帳號是否參加揪團
          this.userTeams.push(element); //將這些訂單另外放到一個userTeams中
        } else {
          element.UsersTeam = false;
        }
      });

      //取得該使用者的最愛揪團
      this.userInfo.FavJoins.forEach((element) => {
        const found = this.allTeams.find((team) => team.TeamId == element);
        if (found) {
          this.favTeams.push(found);
        }
      });
      console.log("Created End");
    } else {
      alert("請先登入");
      this.$router.push("/login");
    }
  },
  methods: {
    showCurrent(val) {
      this.currentPage = val;
    },
    goToStore() {
      alert("那我們先來找店家吧！");
      this.$router.push("/stores");
    },
  },
};
</script>

<style scoped>
.nav-item {
  background-color: #f6d55e;
}
.nav-item button {
  color: #4590d4 !important;
}
.nav-item .active {
  background-color: #4590d4 !important;
  color: #ffffff !important;
}

.wrapper {
  padding: 0 !important;
  overflow: visible;
  margin-top: 5vh !important;
}

.tab-content {
  box-shadow: none;
}

/* .title {
  font-size: 32px;
  font-weight: 900;
} */

.listStyle {
  border-radius: 12px 12px 12px 12px;
  overflow: hidden;
  box-shadow: 0px 4px 4px 2px rgb(200 200 200);
}
</style>
