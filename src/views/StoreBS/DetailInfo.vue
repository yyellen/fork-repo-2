<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="cardWidth">
        <div class="container p-4">
          <div style="margin: 0px; color: black; text-align: start">
            <h2>{{ storeName }}</h2>
          </div>
        </div>
        <hr class="d-block d-md-none" style="margin: 0px" />
        <!-- status -->
        <div class="status">
          <p
            v-if="status === 1"
            style="
              background-color: red;
              color: rgb(255, 255, 255);
              text-align: center;
              margin: 0px auto;
            "
          >
            已取消
          </p>
          <p
            v-else-if="status === 2"
            style="
              background-color: #68caf4;
              color: rgb(255, 255, 255);
              text-align: center;
              margin: 0px 0px;
            "
          >
            已訂位
          </p>
          <p
            v-else
            style="background-color: #a6ff87; text-align: center; color: black"
          >
            已結束
          </p>
        </div>
        <!-- status end -->
        <hr class="d-none d-md-block" style="margin: 0px" />

        <!-- 細項 -->
        <div class="container p-5">
          <div
            class="d-flex justify-content-between grayColor"
            v-if="listDetail.Name != '一般訂位'"
          >
            <a>揪團搜</a
            ><a>
              <b>{{ listDetail.Name }}</b></a
            >
          </div>
          <hr />
          <div class="d-flex justify-content-between grayColor">
            <a>訂位日期</a><a>{{ listDetail.PlayDate }}</a>
          </div>
          <hr />
          <div class="d-flex justify-content-between grayColor">
            <a>定位時段</a
            ><a>{{ listDetail.StartTime }}~{{ listDetail.EndTime }}</a>
          </div>
          <hr />
          <div class="d-flex justify-content-between grayColor">
            <a>定位人數</a><a>{{ listDetail.Quantity }}</a>
          </div>
          <hr />
          <div class="d-flex justify-content-between grayColor">
            <a>遊玩時數</a><a>{{ listDetail.TimeCount }}</a>
          </div>
          <hr />
          <div class="d-flex justify-content-between grayColor">
            <a>套用優惠</a><a>{{ listDetail.CouponName }}</a>
          </div>
          <hr />
          <div class="d-flex justify-content-between grayColor">
            <a>優惠折扣</a><a>{{ listDetail.CouponDiscount }}</a>
          </div>
          <hr />
          <div class="d-flex justify-content-between grayColor">
            <a>點數折扣</a><a>{{ listDetail.PointDiscount }}</a>
          </div>
          <hr />
          <div class="d-flex justify-content-between grayColor">
            <a>聯絡人姓名</a><a>{{ listDetail.Contact }}</a>
          </div>
          <hr />
          <div class="d-flex justify-content-between grayColor">
            <a>聯絡人電話</a><a>{{ listDetail.Phone }}</a>
          </div>
          <hr />
          <div class="d-flex justify-content-between grayColor">
            <a>Email</a><a>{{ listDetail.Email }}</a>
          </div>
          <hr />
          <div class="d-flex justify-content-between grayColor">
            <a>備註</a><a>{{ listDetail.Note }}</a>
          </div>
          <p class="text-end pt-5">
            金額&ensp;
            <span style="font-size: 48px; color: rgb(246, 18, 18)">
              <b>{{ listDetail.Quantity * 150 }}</b>
            </span>
            &ensp;元&ensp;整
          </p>
        </div>
        <!-- 細項end -->
      </div>
    </div>
  </div>
  <!-- 按鈕status -->
  <!-- 紅色status已取消 -->
  <div v-if="status === 1" class="d-flex justify-content-center pb-5">
    <div class="mainBtn" style="width: 200px" @click="this.$router.go(-1)">
      回上一頁
    </div>
  </div>
  <!-- 紅色status已取消 end -->
  <!-- 藍色status已訂位-->
  <div class="container">
    <div class="row justify-content-center">
      <div class="btnw">
        <div v-if="status === 2" class="d-flex">
          <div class="row row-cols-1 row-cols-sm-3">
            <div class="col">
              <div class="d-flex pb-2">
                <div
                  class="mainBtn"
                  style="width: 200px"
                  @click="this.$router.go(-1)"
                >
                  回上一頁
                </div>
              </div>
            </div>
            <div class="col">
              <div class="d-flex pb-2">
                <div class="mainBtn" style="width: 200px" @click="gameEnd()">
                  確認已結束
                </div>
              </div>
            </div>
            <div class="d-flex pb-5">
              <div class="mainBtn" style="width: 200px" @click="doMsg()">
                聯絡
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 藍色status已訂位 end -->
  <!-- 綠色status已結束 -->
  <div v-if="status === 3" class="d-flex justify-content-center pb-5">
    <div class="mainBtn" style="width: 200px" @click="this.$router.go(-1)">
      回上一頁
    </div>
  </div>
  <!-- 綠色status已結束 end -->
  <!-- 按鈕status end -->
</template>
<style  scoped>
@media screen and (max-width: 580px) {
  .cardWidth {
    width: 89%;
  }
  .mainBtn {
    position: relative;
    /* left: 100px; */
    /* justify-content: center; */
    justify-content: center !important;
  }
}
.cardWidth {
  max-width: 700px;
  border: 4px solid rgb(246, 213, 94);
  background-color: rgb(255, 255, 255);
  margin-top: 8vh !important;
  margin-bottom: 8vh !important;
  /* padding: 6vh 6vw !important; */
  border-radius: 12px;
  box-shadow: 0px 4px 4px 2px rgb(200, 200, 200);
  overflow: hidden; /* 切邊 */
  flex: auto;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.btnw {
  max-width: 700px;
  flex: auto;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
<script>
import { db } from "@/firebase/config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
export default {
  data() {
    return {
      status: "",
      dbLists: [],
      listDetail: "",
      storeName: "",
    };
  },
  async created() {
    //呼叫資料庫
    await this.getBookingList();
    //選出該筆資料
    await this.getListDetail();
    //呼叫店家
    await this.getSingleStore();
    this.getStatus();
  },
  methods: {
    async getBookingList() {
      const dataBase = await collection(db, "BookingLists");
      const dbResult = await getDocs(query(dataBase, orderBy("BookingListId")));
      dbResult.docs.forEach((doc) => {
        let base = doc.data();
        base.uid = doc.id;
        console.log("base", base);
        this.dbLists.push({ ...base });
      });
      // console.log("dbLists", this.dbLists);
    },
    async getListDetail() {
      this.listDetail = await this.dbLists.find(
        (item) => item.BookingListId == this.$route.params.listId
      );
      console.log("listDetail", this.listDetail);
    },
    async getSingleStore() {
      let storeData = [];
      const q = query(
        collection(db, "Store"),
        where("StoreID", "==", String(this.listDetail.StoreId))
      );
      const dataBase = await getDocs(q);
      dataBase.forEach((doc) => {
        storeData = { ...doc.data() };
      });
      this.storeName = storeData.StoreName;
      console.log(this.storeName);
    },
    getStatus() {
      let sta = this.listDetail.Status;
      if (sta == "一般已取消" || sta == "揪團已取消") {
        this.status = 1;
      } else if (sta == "一般已訂位" || sta == "揪團已訂位") {
        this.status = 2;
      } else if (sta == "一般已結束" || sta == "揪團已結束") {
        this.status = 3;
      } else {
        !this.status;
      }
      console.log("Status", this.status);
    },
    doMsg() {
      alert("開發中");
    },
    async gameEnd() {
      // let msg = "";
      let update = async (msg) => {
        await updateDoc(doc(db, "BookingLists", this.listDetail.uid), {
          Status: msg,
        })
          .then(() => {
            this.$snackbar.add({
              type: "success",
              text: "已更改為結束訂單！",
            });
            setTimeout(() => {
              this.$router.go(0);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      };
      if (this.listDetail.Status == "一般已訂位") {
        let msg = "一般已結束";
        update(msg);
      } else if (this.listDetail.Status == "揪團已訂位") {
        let msg = "揪團已結束";
        update(msg);
      }
    },
  },
};
</script>