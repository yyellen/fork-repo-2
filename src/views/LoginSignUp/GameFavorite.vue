<template>
      <Loading v-show="loading" />

  <div class="container">
    <div class="row justify-content-center">
      <div class="width mx-4">
        <div class="w-360">
          <p class="grayColor">請選擇喜歡的桌遊類型(多選)</p>
          <div class="row">
            <div class="col-6 px-3" v-for="Type in GameType" :key="Type">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="Type"
                  v-model="checkedGameTypes"
                  :value="Type"
                />
                <label class="form-check-label" :for="Type">{{ Type }}</label>
              </div>
            </div>
          </div>
        </div>
        <hr style="background-color: #f6d55e; height: 2px; border: none" />
        <div class="w-360">
          <p class="grayColor">請選擇喜歡的機制(多選)</p>
          <div class="row">
            <!-- v-for迴圈先bind Mechanisms to id，再bind value，由此可得個別單一值 -->
            <div
              class="col-6 px-3"
              v-for="Mechanisms in GameMechanisms"
              :key="Mechanisms"
            >
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="Mechanisms"
                  v-model="checkedGameMechanisms"
                  :value="Mechanisms"
                />
                <label class="form-check-label" :for="Mechanisms">{{
                  Mechanisms
                }}</label>
              </div>
            </div>
          </div>
        </div>
        <hr style="background-color: #f6d55e; height: 2px; border: none" />
        <div class="w-360">
          <p class="grayColor">請選擇喜歡的遊戲主題(多選)</p>
          <div class="row">
            <div
              class="col-6 px-3"
              v-for="Category in GameCategory"
              :key="Category"
            >
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="checkbox"
                  :id="Category"
                  v-model="checkedCategories"
                  :value="Category"
                />
                <label class="form-check-label" :for="Category">{{
                  Category
                }}</label>
              </div>
            </div>
          </div>
        </div>
        <hr style="background-color: #f6d55e; height: 2px; border: none" />
        <div class="w-360">
          <p class="grayColor">以下幾款桌遊，你喜歡哪一款呢?(單選)</p>
          <div class="row">
            <div class="col-6 px-3" v-for="Game in GameName" :key="Game">
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  :id="Game.name"
                  :value="Game.name"
                  v-model="checkedGameName"
                />
                <label class="form-check-label" :for="Game.name">
                  {{ Game.name }}
                  <br /><img :src="Game.load" width="125" height="125" alt="" />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center my-3">
          <button class="mainBtn" @click="handleSubmit(userRegInfo)">
            註冊會員
          </button>
        </div>

        <div class="toggle-form d-flex justify-content-center">
          <router-link to="login">已有會員？登入</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from "@/components/LoadingComponent.vue";
import { db } from "@/firebase/config";
import {
  // collection,
  doc,
  updateDoc,
} from "firebase/firestore";
export default {
  components: { Loading },
  data() {
    return {
      checkedGameTypes: [],
      checkedGameMechanisms: [],
      checkedCategories: [],
      checkedGameName: "",

      loading: null,
      error: null,
      errorMsg: "",
      //   類型
      GameType: [
        "家庭遊戲",
        "主題遊戲",
        "派對遊戲",
        "深度策略",
        "棋奕遊戲",
        "輕度策略",
        "戰爭遊戲",
        "集換式遊戲",
      ],
      //   主題
      GameCategory: [
        "冒險",
        "驚悚",
        "戰爭",
        "奇幻",
        "動物",
        "幽默",
        "中世紀",
        "抽象",
        "經濟",
        "中國風",
        "諜報",
        "電玩改編",
      ],
      //機制
      GameMechanisms: [
        "合作",
        "角色扮演",
        "隱藏身分",
        "動作",
        "區域控制",
        "區域移動",
        "標記物放置",
        "版圖拼放",
        "棋盤",
        "賭博",
        "抽牌",
        "手牌控制",
        "卡片遊戲",
        "想像力",
        "投票",
        "競標",
        "判斷力",
        "決策力",
        "行動點控制",
        "骰子",
      ],
      // 名稱
      GameName: [
        {
          name: "詐賭巫師",
          load: "https://firebasestorage.googleapis.com/v0/b/bgip-2205.appspot.com/o/Assets%2FgameImage%2F%E8%A9%90%E8%B3%AD%E5%B7%AB%E5%B8%AB.png?alt=media&token=f9fe2ca1-a26f-4264-b4b5-486f7587bc92",
        },
        {
          name: "矮人礦坑",
          load: "https://firebasestorage.googleapis.com/v0/b/bgip-2205.appspot.com/o/Assets%2FgameImage%2F%E7%9F%AE%E4%BA%BA%E7%A4%A6%E5%9D%91.png?alt=media&token=0db15f48-85be-409e-88f2-a9a670ffcf58",
        },
        {
          name: "農家樂",
          load: "https://firebasestorage.googleapis.com/v0/b/bgip-2205.appspot.com/o/Assets%2FgameImage%2F%E8%BE%B2%E5%AE%B6%E6%A8%82.png?alt=media&token=3895ebf0-7a6a-4fae-934c-e0db09960330",
        },
        {
          name: "富饒之城",
          load: "https://firebasestorage.googleapis.com/v0/b/bgip-2205.appspot.com/o/Assets%2FgameImage%2F%E6%A6%AE%E8%80%80%E4%B9%8B%E5%9F%8E.png?alt=media&token=7e561fd4-4370-4510-9641-d91b09fe7b67",
        },
        {
          name: "德古拉之怒",
          load: "https://firebasestorage.googleapis.com/v0/b/bgip-2205.appspot.com/o/Assets%2FgameImage%2F%E5%BE%B7%E5%8F%A4%E6%8B%89%E4%B9%8B%E6%80%92.png?alt=media&token=0e53111c-440e-43e2-bf20-3c706b3ce0e7",
        },
        {
          name: "寶石陣",
          load: "https://firebasestorage.googleapis.com/v0/b/bgip-2205.appspot.com/o/Assets%2FgameImage%2F%E5%AF%B6%E7%9F%B3%E9%99%A3.png?alt=media&token=2a036462-aa88-4ac7-bf06-a32690d463e3",
        },
        {
          name: "魔戒",
          load: "https://firebasestorage.googleapis.com/v0/b/bgip-2205.appspot.com/o/Assets%2FgameImage%2F%E9%AD%94%E6%88%92.png?alt=media&token=34061564-00e1-4030-8416-57883006b68a",
        },
        {
          name: "魔法風雲會",
          load: "https://firebasestorage.googleapis.com/v0/b/bgip-2205.appspot.com/o/Assets%2FgameImage%2F%E9%AD%94%E6%B3%95%E9%A2%A8%E9%9B%B2%E6%9C%83.png?alt=media&token=946af241-d925-40ec-bbef-8c308ece8f66",
        },
      ],
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
    userUid() {
      return this.$store.state.user.uid;
    },
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
      this.bookingListId = ID;
      return ID;
    },
    //write data onto firebase
    async handleSubmit() {
      if (this.checkedGameTypes.length == 0) {
        this.$snackbar.add({
          type: "error",
          text: "請選擇喜歡的桌遊類型！",
        });
        return;
      } else if (this.checkedGameMechanisms.length == 0) {
        this.$snackbar.add({
          type: "error",
          text: "請選擇喜歡的桌遊機制！",
        });
        return;
      } else if (this.checkedCategories.length == 0) {
        this.$snackbar.add({
          type: "error",
          text: "請選擇喜歡的桌遊主題！",
        });
        return;
      } else if (this.checkedGameName == "") {
        this.$snackbar.add({
          type: "error",
          text: "請選擇喜歡的桌遊！",
        });
        return;
      } else {
        this.loading = true;

        await updateDoc(doc(db, "Account", this.userUid), {
          //這頁要寫入的資料，用v-model binding
          //陣列內要給值才會有data
          //key:value
          GameCategory: this.checkedCategories,
          GameName: Array(this.checkedGameName),
          GameType: this.checkedGameTypes,
          GameMechanisms: this.checkedGameMechanisms,
        });
        this.loading = false;
        this.$snackbar.add({
          type:"success",
          text:"註冊完成，請重新登入！"
        })
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style scoped>
.width {
  max-width: 708px;
  min-width: 374px;
  background-color: rgb(255, 255, 255);
  margin-top: 8vh !important;
  margin-bottom: 8vh !important;
  padding: 6vh 6vw !important;
  border-radius: 12px;
  box-shadow: 0px 4px 4px 2px rgb(200, 200, 200);
  overflow: hidden; /* 切邊 */
  flex: auto;
  justify-content: center;
  align-items: center;
}
@media (min-width: 992px) {
}
@media (max-width: 400px) {
}
</style>
