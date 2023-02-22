<template>
  <div class="initiating-view container">
    <div class="row justify-content-center">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <div class="col-lg-8 col-md-10 col-sm-11 initiating-wrapper">
          <div class="text-center">
            <h1>創立揪團</h1>
          </div>
          <div class="d-flex justify-content-between mt-5">
            <div>選擇地點</div>
            <div class="accentColor">
              {{ bookingStore.StoreName }}
            </div>
          </div>
          <hr />
          <div class="row justify-content-center">
            <div class="">
              <DatePicker
                is-expanded
                container
                :min-date="new Date()"
                :columns="$screens({ default: 1, lg: 2 })"
                @click="chooseDate"
                v-model="date"
                class="my-5"
              />
            </div>
            <div class="d-flex justify-content-between">
              <div>訂位日期</div>
              <div>{{ getDate() }}</div>
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-between">
            <div>開始時段</div>
            <div class="beginningtime-block">
              <div class="input-group input-group-sm">
                <div
                  type="input"
                  class="time-select-output btn btn-outline-secondary"
                >
                  {{ BeginningTime }}
                </div>
                <button
                  type="button"
                  class="
                    split-btn
                    btn btn-outline-secondary
                    dropdown-toggle dropdown-toggle-split
                  "
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="time-dropdown-menu dropdown-menu dropdown-menu-end">
                  <li
                    class="dropdown-item"
                    v-for="dropdownValue in dropdownValues"
                    :key="dropdownValue"
                    @click="getBeginningTime(dropdownValue)"
                  >
                    {{ dropdownValue }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-between">
            <div>結束時段</div>
            <div class="enddingtime-block">
              <div class="input-group input-group-sm">
                <div
                  type="input"
                  class="time-select-output btn btn-outline-secondary"
                >
                  {{ EnddingTime }}
                </div>
                <button
                  type="button"
                  class="
                    split-btn
                    btn btn-outline-secondary
                    dropdown-toggle dropdown-toggle-split
                  "
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="time-dropdown-menu dropdown-menu dropdown-menu-end">
                  <li
                    class="dropdown-item"
                    v-for="dropdownValue in dropdownValues"
                    :key="dropdownValue"
                    @click="getEnddingTime(dropdownValue)"
                  >
                    {{ dropdownValue }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div class="col-12 d-flex justify-content-between align-items-center">
            <div>遊玩桌遊</div>
            <div class="enddingtime-block">
              <div class="input-group input-group-sm">
                <div
                  type="input"
                  class="time-select-output btn btn-outline-secondary"
                >
                  {{ selectedGame }}
                </div>
                <button
                  type="button"
                  class="
                    split-btn
                    btn btn-outline-secondary
                    dropdown-toggle dropdown-toggle-split
                  "
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span class="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul class="time-dropdown-menu dropdown-menu dropdown-menu-end">
                  <li
                    class="dropdown-item"
                    v-for="dropdownGame in dropdownGames"
                    :key="dropdownGame"
                    @click="selectGame(dropdownGame)"
                  >
                    {{ dropdownGame }}
                  </li>
                </ul>
              </div>
              <div class="d-flex justify-content-end mt-2">
                <div
                  class="accentColor xs-font"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  @click="getRecommendGame"
                >
                  點我推薦！
                </div>
              </div>

              <!-- Modal Start -->
              <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div
                  class="
                    modal-dialog
                    modal-lg
                    modal-dialog-centered
                    modal-dialog-scrollable
                  "
                >
                  <div class="modal-content">
                    <div class="d-flex justify-content-center">
                      <h1 class="modal-title" id="staticBackdropLabel">
                        我們推薦您！
                      </h1>
                    </div>

                    <div class="modal-body d-flex justify-content-center">
                      <div class="flex-text-content">
                        依照您的桌遊類型喜好,推薦您
                        <div class="game mt-2 d-flex justify-content-center">
                          {{ recommendation }} ！
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <button
                        class="modal-Btn"
                        @click="selectedGame = recommendation"
                        data-bs-dismiss="modal"
                      >
                        <h4>聽起來不錯</h4>
                      </button>
                      <button class="modal-Btn" data-bs-dismiss="modal">
                        <h4>沒興趣</h4>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Modal End -->
            </div>
          </div>
          <hr />
          <div class="col-12 d-flex justify-content-between align-items-center">
            <div>人數範圍</div>
            <div class="d-flex flex-column">
              <div>
                最少
                <input type="number" name="attendance" v-model="minMember" />人
              </div>
              <div>
                最多
                <input type="number" name="attendance" v-model="maxMember" />人
              </div>
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-between align-items-center">
            <div>揪團名稱</div>
            <input
              type="text"
              placeholder="揪團名稱最多十個字"
              maxlength="10"
              v-model="teamName"
            />
          </div>
          <hr />
          <div class="d-flex justify-content-between align-items-center">
            <div>揪團標籤</div>
            <div class="taginput-group d-flex text-center">
              <input
                type="text"
                name="tags"
                placeholder="最多十個字 空白無效"
                maxlength="10"
                v-model.trim="newTag"
                @focus="menuHandler" 
                @input="menuHandler" 
                @blur="menuHandler"
              />
              
              <ul class="tag-menu">
                <li class="tag-option"
                v-for="tag in search" :key="tag" @mousedown="newTag=tag">{{tag}}</li>
              </ul>
              
              <input type="submit" value="＋" @click="addTag" />
            </div>
          </div>
          <div
            class="tag-block d-flex justify-content-end align-items-center mt-2"
          >
            <div
              class="tag mt-2 d-flex align-items-center"
              v-for="(selectedTag, index) in selectedTags"
              :key="selectedTag"
            >
              {{ selectedTag
              }}<span class="delete-button ms-1" @click="deleteTag(index)">
                <i class="fa-solid fa-xmark"></i>
              </span>
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-between align-items-center">
            <div>截止日期</div>
            <div><input type="date" v-model="deadline"/></div>
          </div>
          <hr />
          <div>
            <div class="mb-3">揪團描述</div>
            <div>
              <textarea
                name=""
                id=""
                rows="10"
                class="col-12"
                v-model="teamDescription"
              ></textarea>
            </div>
          </div>
        </div>
        <button class="Booking-Btn" @click="submitOrder">下一步</button>
      </div>
    </div>
  </div>
</template>
<script>
import { DatePicker } from "v-calendar";
import { db } from "@/firebase/config";
import { getDoc, doc } from "firebase/firestore";
import axios from "axios";

export default {
  name: "InitiatingView",
  setup() {},
  components: {
    DatePicker,
  },
  data() {
    return {
      date: "",
      bookingDate: "",
      bookingDateString: "",
      teamDescription: "",
      bookingHour: 0,
      BeginningTime: "選擇時段",
      EnddingTime: "選擇時段",
      selectedGame: "選擇桌遊",
      dropdownValues: [],
      dropdownGames: [
        "德古拉之怒",
        "戰場：奇幻之戰",
        "挪亞方舟(鐵盒)",
        "矮人礦坑",
        "魔戒",
        "寶石陣",
        "詐賭巫師",
        "說書人",
        "工業革命",
        "權力遊戲:冰與火之歌",
        "波多黎各",
        "農家樂",
        "電力公司",
        "卡卡頌2014新版",
        "印加寶藏;鑽石(Diamant)",
        "富饒之城",
        "山中小屋(中文版)",
        "抵抗組織：阿瓦隆",
        "拉密：標準版",
        "暗影獵人",
        "風聲",
        "魔法風雲會",
        "鍛鑰者",
        "寶可夢TCG",
        "神秘大地",
      ],
      minMember: 2,
      maxMember: 3,
      teamName: "",
      recommendation: "",
      tags: [],
      newTag: "",
      selectedTags: [],
      bookingStore: {},
      deadline: "",
      status: "",
      userId: "",
    };
  },
  created() {
    this.getSingleStore();
    this.setBookingContact();
  },
  computed: {
    userUID() {
      return this.$store.state.user.uid;
    },
    bookingStoreID() {
      return this.$store.state.bookingStoreID;
    },
    dateDifference() {
      var bookDate = new Date(this.bookingDate);
      var dueDate = new Date(this.deadline);

      var difference = Math.abs(dueDate - bookDate);
      var days = difference / (1000 * 3600 * 24);
      return days;
    },
    isDueDayLater() {
      var bookDate = new Date(this.bookingDate);
      var dueDate = new Date(this.deadline);

      var result = bookDate < dueDate;
      return result;
    },
    search(){
      if(this.newTag){
        let result = this.tags.filter(item => 
          item.toUpperCase().includes(this.newTag.toUpperCase()) === true )
        return result
      }else{
        return this.tags
      }
    }
  },
  methods: {
    async setBookingContact() {
      const getData = await getDoc(doc(db, "Account", this.userUID));
      const result = getData.data();
      this.userId = result.UserId;
    },
    selectGame(dropdownGame) {
      this.selectedGame = dropdownGame;
      if (!this.tags.includes(dropdownGame)) {
        this.tags.push(dropdownGame);
      }
    },
    getDate: function () {
      let dateBase = this.date;
      let getDate = "";
      let Chinese = ["日", "一", "二", "三", "四", "五", "六"];

      if (this.date != "") {
        let day = dateBase.getDay();
        let getChineseDay = Chinese[day];
        let year = dateBase.getFullYear();
        let month = dateBase.getMonth() + 1;
        let date = dateBase.getDate();

        getDate =
          year + "年" + month + "月" + date + "日 " + " 星期" + getChineseDay;
      }
      // this.infos[0].value = getDate;
      return getDate;
    },
    chooseDate() {    
      let dateBase = this.date;
      let year = dateBase.getFullYear();
      let month = dateBase.getMonth() + 1;
      let date = dateBase.getDate();
      // let year = dateBase.getFullYear();
      this.bookingDateString = month + "月" + date + "日 ";
      this.bookingDate = year + "-" + month + "-" + date;
      // var string = dateBase.toISOString();
      // var result = string.split("T");
      // this.bookingDate = result[0];

      var dayIndex = dateBase.getDay();
      var open = this.bookingStore.WeekPlan[dayIndex].Open;
      var close = this.bookingStore.WeekPlan[dayIndex].Close;
      var openSplit = open.split(":");
      var closeSpit = close.split(":");

      var basicHour = this.bookingStore.WeekPlan[dayIndex].BasicHour;
      var fee = this.bookingStore.WeekPlan[dayIndex].Fee;
      if (this.bookingHour <= basicHour) {
        this.price = fee;
      } else if (this.bookingHour > basicHour) {
        if (Number.isInteger(this.bookingHour / basicHour)) {
          this.price = (this.bookingHour / basicHour) * fee;
        } else {
          this.price = (Math.floor(this.bookingHour / basicHour) + 1) * fee;
        }
      }

      var openH = Number(openSplit[0]);
      var openM = Number(openSplit[1] / 60);

      var closeH = Number(closeSpit[0]);
      var closeM = Number(closeSpit[1] / 60);

      var openValue = openH + openM;
      var closeValue = closeH + closeM;

      const generateHoursInterval = (
        startHourInMinute,
        endHourInMinute,
        interval
      ) => {
        const times = [];

        for (let i = 0; startHourInMinute < 24 * 60; i++) {
          if (startHourInMinute > endHourInMinute) break;

          var hh = Math.floor(startHourInMinute / 60); // getting hours of day in 0-24 format

          var mm = startHourInMinute % 60; // getting minutes of the hour in 0-55 format

          times[i] = ("0" + (hh % 24)).slice(-2) + ":" + ("0" + mm).slice(-2);

          startHourInMinute = startHourInMinute + interval;
        }

        return times;
      };

      const interval = 30; //minutes interval
      const startDate = 60 * openValue; // start time in minutes
      const endDate = 60 * closeValue; // end time in minutes

      const foo = generateHoursInterval(startDate, endDate, interval);

      this.dropdownValues = foo;
    },
    getBeginningTime: function (dropdownValue) {
      let BeginningArr = dropdownValue.split(":");
      let EnddingArr = this.EnddingTime.split(":");
      let BeginningNumber =
        (Number(BeginningArr[0]) * 60 + Number(BeginningArr[1])) / 60;
      let EnddingNumber =
        (Number(EnddingArr[0]) * 60 + Number(EnddingArr[1])) / 60;
      if (EnddingNumber > BeginningNumber || isNaN(EnddingNumber)) {
        this.BeginningTime = dropdownValue;
        this.bookingPeriod = this.BeginningTime + "-" + this.EnddingTime;
        this.bookingHour = EnddingNumber - BeginningNumber;
      }
    },
    getEnddingTime: function (dropdownValue) {
      let BeginningArr = this.BeginningTime.split(":");
      let EnddingArr = dropdownValue.split(":");
      let BeginningNumber =
        (Number(BeginningArr[0]) * 60 + Number(BeginningArr[1])) / 60;
      let EnddingNumber =
        (Number(EnddingArr[0]) * 60 + Number(EnddingArr[1])) / 60;
      if (EnddingNumber > BeginningNumber || isNaN(BeginningNumber)) {
        this.EnddingTime = dropdownValue;
        this.bookingPeriod = this.BeginningTime + "-" + this.EnddingTime;
        this.bookingHour = EnddingNumber - BeginningNumber;
      }
    },
    addTag: function () {
      if (
        this.tags.includes(this.newTag) === false &&
        this.newTag.trim() != ""
      ) {
        this.tags.push(this.newTag);
        this.selectedTags.push(this.newTag);
      } else if (
        this.tags.includes(this.newTag) === true &&
        this.newTag != "" &&
        this.selectedTags.includes(this.newTag) === false
      ) {
        this.selectedTags.push(this.newTag);
      }
      this.newTag = "";
    },
    deleteTag(index) {
      this.selectedTags.splice(index, 1);
    },
    async getSingleStore() {
      // console.log("get single store");
      // const docRef = doc(db, "Store", String(this.bookingStoreID));
      const result = await getDoc(
        doc(db, "Store", String(this.bookingStoreID))
      );
      // const result = await getDoc(docRef)
      // console.log(result.data())
      this.bookingStore = result.data();
      this.tags = this.bookingStore.Tags;
      this.date = this.$store.state.bookingDate;
      this.chooseDate()
      // console.log(this.bookingStore);
    },
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
      console.log(this.bookingListId);
      return ID;
    },
    submitOrder() {
      let dateBase = this.date;
      // var dayIndex = dateBase.getDay();

      if (this.bookingDate == "") {
        this.$snackbar.add({
          type: "error",
          text: "尚未選擇揪團日期",
        });
        return;
      } else if (isNaN(this.bookingHour)) {
        this.$snackbar.add({
          type: "error",
          text: "請務必選擇開始及結束時間",
        });
        return;
      } else if (
        this.bookingHour <
        this.bookingStore.WeekPlan[dateBase.getDay()].BasicHour
      ) {
        this.$snackbar.add({
          type: "warning",
          text: `遊玩時數未達基礎時數【${
            this.bookingStore.WeekPlan[dateBase.getDay()].BasicHour
          }小時】，金額仍將以基礎消費計算`,
        });
        return;
      } else if (this.selectedGame == "選擇桌遊") {
        this.$snackbar.add({
          type: "error",
          text: "請選擇想玩的桌遊",
        });
        return;
      } else if (this.minMember > this.maxMember) {
        this.$snackbar.add({
          type: "error",
          text: "請正確填寫人數範圍",
        });
        return;
      } else if (this.teamName == "") {
        this.$snackbar.add({
          type: "error",
          text: "請填寫揪團名稱",
        });
        return;
      } else if (this.teamName.length > 10) {
        this.$snackbar.add({
          type: "error",
          text: "揪團名稱不得超過十字",
        });
        return;
      } else if (this.deadline == "") {
        this.$snackbar.add({
          type: "error",
          text: "請務必選擇截止時間",
        });
        return;
      } else if (this.isDueDayLater) {
        this.$snackbar.add({
          type: "error",
          text: "揪團截止時間不可晚於揪團時間",
        });
        return;
      } else if (this.dateDifference < 1) {
        this.$snackbar.add({
          type: "error",
          text: "揪團截止時間與揪團時間請至少相隔1日",
        });
        return;
      } else {
        var teamDetail = {
          BookingListId: this.getRandomID("7000"),
          StoreId: this.bookingStore.StoreID,
          StoreLocation: {
            Address: this.bookingStore.StoreLocation.Address,
            lat: this.bookingStore.StoreLocation.lat,
            lng: this.bookingStore.StoreLocation.lng,
          },
          Game: this.selectedGame,
          StoreName: this.bookingStore.StoreName,
          PlayDate: this.bookingDate,
          TeamMembers: {
            min: this.minMember,
            max: this.maxMember,
          },
          StartTime: this.BeginningTime,
          EndTime: this.EnddingTime,
          TimeCount: this.bookingHour,
          Status: this.status,
          Name: this.teamName,
          Tags: this.selectedTags,
          DueDate: this.deadline,
          Note: this.teamDescription,
          TeamLimit: this.maxMember,
          Price: this.price,
        };
        this.$store.commit("setTeamData", teamDetail);
        console.log(this.$store.state.teamData);
        this.$router.push("/CreateTeam");
      }
    },
    getRecommendGame() {
      axios
        .get(`https://tgame-api.ddns.net/${this.userId}`)
        .then((res) => {
          var gameList = res.data.gameList;
          this.recommendation = gameList[0].name;
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    menuHandler(e){
      let menu = e.target.nextSibling
      if(e.type==="focus" || e.type==="input"){
        this.search.length === 0 ? 
        menu.style.display = "none" : 
        menu.style.display = "block"
      }else if(e.type==="blur"){
        menu.style.display = "none"
      }
    },
  },
  
};
</script>

<style scoped>
@media screen and (max-width: 449px) {
  .initiating-wrapper {
    width: 90%;
  }
  input[name="tags"] {
    width: 160px;
  }
  .tag-menu.tag-menu{
    width: 160px;
  }
}

* {
  --input-gray: rgb(118, 118, 118);
  --input-btn-gray-hover: rgba(118, 118, 118, 0.7);
}

.vc-day {
  min-height: 100px !important;
}
.initiating-view {
  padding: 100px 0;
}
.initiating-wrapper {
  background-color: #fff;
  padding: 8vh 8vw;
  border-radius: 12px;
  box-shadow: 0px 4px 4px 2px rgb(200, 200, 200);
  margin-bottom: 50px;
}

.grade-font {
  font-size: 18px;
}
.xs-font {
  font-size: 16px;
}
.xs-font:hover {
  color: var(--accent-color-800);
  cursor: pointer;
}
p,
h4 {
  margin-bottom: 0;
}
.game {
  font-weight: bolder;
}
.modal-content {
  padding: 50px 14%;
}
.flex-text-content {
  padding: 10% 0;
}

.modal-Btn {
  font-size: 2rem;
  font-weight: bolder;
  padding: 3% 2%;
  background-color: #f6d55e;
  color: #4590d4;
  width: 170px;
  text-align: center;
  line-height: 1.8;
  box-shadow: 0 4px 6px rgb(180, 180, 180);
  border-radius: 100rem;
  border: none;
  text-decoration: none;
}

input[name="tags"] {
  outline: none;
  border: 0;
  border-bottom: solid 1px black;
  font-size: 16px;
  /* position: relative; */
}
input[type="submit"] {
  all: unset;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: solid 2px var(--accent-color);
  color: var(--accent-color);
  cursor: pointer;
  text-align: center;
  font-weight: 600;
}
input[type="submit"]:hover {
  font-size: 20px;
  background-color: var(--accent-color);
  color: #fff;
  border: solid 2px var(--accent-color);
}


input[name="attendance"] {
  width: 50px;
}
img {
  object-fit: cover;
  border-radius: 10px;
  width: 100%;
  height: 12vw;
  min-height: 100px;
  margin: 5px;
}

/* time-select-block */
.time-select-output {
  width: 90px;
  cursor: default;
}
.time-select-output:hover {
  background-color: #fff;
  color: var(--input-gray);
  cursor: default;
}
.split-btn {
  width: 30px;
  background-color: var(--input-gray);
  color: #fff;
}
.split-btn:hover {
  background: var(--input-btn-gray-hover);
}
.split-btn:focus:hover {
  background-color: var(--input-btn-gray-hover);
}
.time-dropdown-menu {
  min-width: 120px;
  max-height: 170px;
  overflow-y: overlay;
  cursor: pointer;
}
.time-dropdown-menu::-webkit-scrollbar,
.tag-menu::-webkit-scrollbar {
  width: 10px;
}
.time-dropdown-menu::-webkit-scrollbar-thumb,
.tag-menu::-webkit-scrollbar-thumb {
  border-radius: 99px;
  background-color: var(--input-gray);
  border: 2px solid rgba(255, 255, 255, 0.14);
  background-clip: padding-box;
}
.tag-block {
  flex-wrap: wrap;
}
textarea {
  resize: none;
  padding: 20px;
  outline: none;
}
.Booking-Btn {
  font-size: 2rem;
  font-weight: bolder;
  padding: 6px 20px;
  background-color: #f6d55e;
  color: #4590d4;
  width: 200px;
  text-align: center;
  line-height: 1.8;
  box-shadow: 0 4px 6px rgb(180, 180, 180);
  border-radius: 100rem;
  border: none;
  text-decoration: none;
}
.taginput-group{
  position: relative;
}
.tag-menu{
  display: none;
  position: absolute;
  top: 36px;
  left: 0px;
  width: 180px;
  background-color: #fff;
  list-style: none;
  text-align: left;
  z-index: 1000;
  padding: 0.5rem 0;
  max-height: 170px;
  overflow-y: overlay;
  cursor: pointer;
  font-size: 1rem;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: 0.25rem;
}
.tag-option{
  width: 100%;
  padding: 0.25rem 1rem;
  font-weight: 400;
  white-space: nowrap;
}
.tag-option:hover{
  background-color: #ccc;
}
</style>
