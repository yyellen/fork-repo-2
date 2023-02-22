<template>
  <div class="container d-flex align-items-center justify-content-center">
    <div class="wrapper">
      <!-- v-calender -->
      <div
        class="d-flex flex-column justify-content-center align-items-center mb-5"
      >
        <h1 class="mb-3">訂單記錄</h1>
        <div class="calenderBox">
          <div class="mb-3">
            <DatePicker
              is-expanded
              v-model="date"
              is-date
              :from-date="new Date(this.date)"
              :attributes="attr"
            />
          </div>
          <div
            class="d-flex flex-column justify-content-center align-items-center"
          >
            <div class="mb-3">
              <div>{{ getDate() }}</div>
              <div>剩餘座位 {{ getSeat() }} 人</div>
              <div>營業時間 {{ startTime }} ~ {{ endTime }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 店家搜列表 -->
      <div class="title">店家搜</div>
      <ul
        class="nav nav-tabs nav-justified listStyle"
        id="myTab"
        role="tablist"
      >
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="reserve-tab"
            data-bs-toggle="tab"
            data-bs-target="#storereserve"
            type="button"
            role="tab"
            aria-controls="storereserve"
            aria-selected="true"
            @click="showStoreCurrent('已訂位')"
          >
            已預訂
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="complete-tab"
            data-bs-toggle="tab"
            data-bs-target="#storecomplete"
            type="button"
            role="tab"
            aria-controls="storecomplete"
            aria-selected="false"
            @click="showStoreCurrent('已結束')"
          >
            已結束
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="cancel-tab"
            data-bs-toggle="tab"
            data-bs-target="#storecancel"
            type="button"
            role="tab"
            aria-controls="storecancel"
            aria-selected="false"
            @click="showStoreCurrent('已取消')"
          >
            已取消
          </button>
        </li>
      </ul>
      <div class="/tab-content" id="/myTabContent">
        <div
          class="/tab-pane fade show active rounded-bottom"
          v-if="storePage == '已訂位'"
        >
          <div class="p-2 listBox">
            <div v-for="list in bookinglists" :key="list.BookingListId">
              <div v-if="list.Status == '一般已訂位'">
                <StoreBookingList
                  :name="list.Contact"
                  :Pdate="list.PlayDate"
                  :Stime="list.StartTime"
                  :Etime="list.EndTime"
                  :quantity="list.Quantity"
                  :listId="list.BookingListId"
                ></StoreBookingList>
              </div>
            </div>
          </div>
        </div>
        <div
          class="/tab-pane fade show active rounded-bottom"
          v-if="storePage == '已結束'"
        >
          <div class="p-2 listBox">
            <div v-for="list in bookinglists" :key="list.BookingListId">
              <div v-if="list.Status == '一般已結束'">
                <StoreBookingList
                  :name="list.Contact"
                  :Pdate="list.PlayDate"
                  :Stime="list.StartTime"
                  :Etime="list.EndTime"
                  :quantity="list.Quantity"
                  :listId="list.BookingListId"
                ></StoreBookingList>
              </div>
            </div>
          </div>
        </div>
        <div
          class="/tab-pane fade show active rounded-bottom"
          v-if="storePage == '已取消'"
        >
          <div class="p-2 listBox">
            <div v-for="list in bookinglists" :key="list.BookingListId">
              <div v-if="list.Status == '一般已取消'">
                <StoreBookingList
                  :name="list.Contact"
                  :Pdate="list.PlayDate"
                  :Stime="list.StartTime"
                  :Etime="list.EndTime"
                  :quantity="list.Quantity"
                  :listId="list.BookingListId"
                ></StoreBookingList>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="title mt-5">揪團搜</div>
      <ul
        class="nav nav-tabs nav-justified listStyle"
        id="myTab"
        role="tablist"
      >
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="reserve-tab"
            data-bs-toggle="tab"
            data-bs-target="#teamreserve"
            type="button"
            role="tab"
            aria-controls="teamreserve"
            aria-selected="true"
            @click="showTeamCurrent('已訂位')"
          >
            已預訂
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="complete-tab"
            data-bs-toggle="tab"
            data-bs-target="#teamcomplete"
            type="button"
            role="tab"
            aria-controls="teamcomplete"
            aria-selected="false"
            @click="showTeamCurrent('已結束')"
          >
            已結束
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="cancel-tab"
            data-bs-toggle="tab"
            data-bs-target="#teamcancel"
            type="button"
            role="tab"
            aria-controls="teamcancel"
            aria-selected="false"
            @click="showTeamCurrent('已取消')"
          >
            已取消
          </button>
        </li>
      </ul>
      <div class="/tab-content" id="/myTabContent">
        <div
          class="/tab-pane fade show active rounded-bottom"
          v-if="teamPage == '已訂位'"
        >
          <div class="p-2 listBox">
            <div v-for="list in bookinglists" :key="list.BookingListId">
              <div v-if="list.Status == '揪團已訂位'">
                <StoreBookingList
                  :name="list.Contact"
                  :Pdate="list.PlayDate"
                  :Stime="list.StartTime"
                  :Etime="list.EndTime"
                  :quantity="list.Quantity"
                  :listId="list.BookingListId"
                ></StoreBookingList>
              </div>
            </div>
          </div>
        </div>
        <div
          class="/tab-pane fade show active rounded-bottom"
          v-if="teamPage == '已結束'"
        >
          <div class="p-2 listBox">
            <div v-for="list in bookinglists" :key="list.BookingListId">
              <div v-if="list.Status == '揪團已結束'">
                <StoreBookingList
                  :name="list.Contact"
                  :Pdate="list.PlayDate"
                  :Stime="list.StartTime"
                  :Etime="list.EndTime"
                  :quantity="list.Quantity"
                  :listId="list.BookingListId"
                ></StoreBookingList>
              </div>
            </div>
          </div>
        </div>
        <div
          class="/tab-pane fade show active rounded-bottom"
          v-if="teamPage == '已取消'"
        >
          <div class="p-2 listBox">
            <div v-for="list in bookinglists" :key="list.BookingListId">
              <div v-if="list.Status == '揪團已取消'">
                <StoreBookingList
                  :name="list.Contact"
                  :Pdate="list.PlayDate"
                  :Stime="list.StartTime"
                  :Etime="list.EndTime"
                  :quantity="list.Quantity"
                  :listId="list.BookingListId"
                ></StoreBookingList>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import VCalendar from 'v-calendar';
import { DatePicker } from "v-calendar";
// app.use(VCalendar, {})
import StoreBookingList from "@/components/StoreBS/StoreBookingList.vue";
import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  query,
  doc,
  where,
  getDoc,
} from "firebase/firestore";

export default {
  components: {
    DatePicker,
    StoreBookingList,
  },
  data() {
    return {
      Sdate: this.$store.state.bookingManagementDate,
      date: "",
      currentDate: "",
      startTime: "",
      endTime: "",
      dbLists: [],
      bookinglists: [],
      storeData: [],
      user: this.$store.state.user,
      userInfo: "",
      storePage: "已訂位",
      teamPage: "已訂位",
      // attr: [
      //   {
      //     key: "today",
      //     dot: true,
      //     dates: new Date(),
      //   },
      // ],
    };
  },
  async created() {
    //取得使用者資訊
    // console.log("this.user", this.user);
    let getUserInfo = await getDoc(doc(db, "Account", this.user.uid));
    this.userInfo = getUserInfo.data();
    // console.log("userInfo.userId", this.userInfo.UserId);

    // 先取得UserId起頭，判定是否為店家
    let str = String(this.userInfo.UserId);
    // console.log(str.charAt(0));

    if (str.charAt(0) != 9) {
      this.$snackbar.add({
        type: "error",
        text: "你不是訂家，不該來這裡",
      });
      setTimeout(() => {
        this.$router.push("/");
      }, 4500);
    } else {
      //呼叫該店家資料庫
      console.log("this.userInfo.UserId", this.userInfo.UserId);
      let dbRes = await getDocs(
        query(
          collection(db, "Store"),
          where("StoreOwner", "==", String(this.userInfo.UserId))
        )
      );
      dbRes.docs.forEach((doc) => {
        this.storeData.push({ ...doc.data() });
      });
      console.log("this.storeData", this.storeData);

      this.seat = this.storeData[0].Capacity;

      //呼叫BookingLists資料庫
      let dbResult = await getDocs(
        query(
          collection(db, "BookingLists"),
          where("StoreId", "==", Number(this.storeData[0].StoreID))
        )
      );
      dbResult.docs.forEach((doc) => {
        this.dbLists.push({ ...doc.data() });
      });
      console.log("this.dbLists", this.dbLists);

      //呼叫第一次尋找日期
      this.startGetDate();
    }
  },
  watch: {
    currentDate: function () {
      console.log("currentDateChanged! CurrentDate is :", this.currentDate);

      //訂單篩選
      function filterByDate(aim, currentDate) {
        let result = aim.filter((item) => item.PlayDate == currentDate);
        return result;
      }
      //列出目標訂單
      this.bookinglists = filterByDate(this.dbLists, this.currentDate);
      console.log("this.bookinglists", this.bookinglists);
    },
  },
  methods: {
    getDate: function () {
      // 因為date數值的變化，牽扯到線面的currentDate數值，導致watch偵測到currentDate變化，進而篩選
      let dateBase = this.date;
      let getDate = "";
      if (this.date != "") {
        this.$store.commit("setBookingManagementDate", String(this.date));
        let year = dateBase.getFullYear();
        let month = dateBase.getMonth() + 1;
        let date = dateBase.getDate();
        let day = dateBase.getDay();

        getDate = year + "年" + month + "月" + date + "日";

        //選定日期
        this.currentDate = year + "-" + month + "-" + date;
        // console.log("urrentDate", this.currentDate);

        this.Sdate = this.currentDate;
        //營業時間
        this.startTime = this.storeData[0].WeekPlan[day].Open;
        this.endTime = this.storeData[0].WeekPlan[day].Close;
      }
      return getDate;
    },
    getSeat: function () {
      //剩餘座位
      // this.bookinglists = filterByDate(this.dbLists, this.currentDate);
      console.log(" this.bookinglists", this.bookinglists);
      let seatQuantity = this.bookinglists.filter(
        (item) => item.Status == "一般已訂位" || item.Status == "揪團已訂位"
      );
      console.log("seatQuantity", seatQuantity);
      let seat = this.storeData[0].Capacity;
      if (seatQuantity == "") {
        console.log("沒有相關資訊");
      } else {
        seatQuantity.forEach((element) => {
          seat -= element.Quantity;
        });
      }
      return seat;
    },
    showStoreCurrent(val) {
      this.storePage = val;
    },
    showTeamCurrent(val) {
      this.teamPage = val;
    },
    startGetDate() {
      let dateBase = new Date(this.Sdate);

      if (this.Sdate != "" && this.Sdate) {
        console.log("this.Sdate", dateBase);
        this.date = dateBase;
        // console.log("this.date", this.date);
        // let year = dateBase.getFullYear();
        // let month = dateBase.getMonth() + 1;
        // let date = dateBase.getDate();
        // let day = dateBase.getDay();

        // //選定日期
        // this.currentDate = year + "-" + month + "-" + date;
        // console.log("StartCurrentDate", this.currentDate);

        // //營業時間
        // this.startTime = this.storeData[0].WeekPlan[day].Open;
        // this.endTime = this.storeData[0].WeekPlan[day].Close;
      }
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

.calenderBox {
  box-shadow: 0px 4px 4px 2px rgb(200 200 200);
  width: 300px;
  border-radius: 4px;
}

.title {
  font-size: 32px;
  font-weight: 900;
}

.listStyle {
  border-radius: 12px 12px 0px 0px;
  overflow: hidden;
  box-shadow: 0px 4px 4px 2px rgb(200 200 200);
}

.listBox {
  min-width: 50px;
  background-color: #fff;
  box-shadow: 0px 4px 4px 2px rgb(200 200 200);
}
</style>
