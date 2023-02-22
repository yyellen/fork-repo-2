<template>
  <!-- desk -->
  <div class="container">
    <div class="row justify-content-center">
      <div class="wrapper flex-column align-items-center">
        <div class="content">
          <div class="d-flex mt-3">
            <div class="pt-3 bd-highlight">
              <img
                :src="coverPhoto"
                alt=""
                style="border-radius: 3px; width: 100%; height: 145px"
              />
            </div>
            <div class="p-2 bd-highlight">
              <a
                ><b style="font-size: 20px">{{ storeName }}</b></a
              >
              <br />
              <a><b style="font-size: 20px" class="">&emsp;</b></a>

              <p style="margin: 0px 0px 0px">&emsp;</p>
              <div class="d-flex flex-row bd-highlight">
                <div>
                  <button type="button" class="btn btn-primary btn-sm mt-2">
                    {{ rating }}</button
                  >&ensp;
                </div>
                <div style="line-height: 20px">
                  <span class="">
                    <b style="color: #4590d5; font-size: 14px">非常棒!</b>
                    <br />
                    <b
                      style="
                        font-size: 13.8425px;
                        color: #767676;
                        margin: 0px 0px;
                      "
                      >50則評論</b
                    >
                  </span>
                </div>
              </div>
            </div>
          </div>
          <!-- modal button -->
          <p style="padding: 0px">
            {{ address }}
            <a
              :href="`https://www.google.com.tw/maps/place/${address}`"
              target="_blank"
              title="Google Map"
              >查看路線</a
            >
          </p>
          <!-- modal button end -->
          <template v-for="tag in bookingStore.Tags" :key="tag">
            <span class="badge bg-primary me-1">{{ tag }}</span>
          </template>
          <hr style="margin: 5px 10px" />
        </div>
        <!-- component -->

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
          已預訂
        </p>
        <p
          v-else
          style="
            background-color: #a6ff87;
            color: rgb(255, 255, 255);
            text-align: center;
          "
        >
          已完成
        </p>
        <!-- component end -->
        <!-- 細項 -->
        <div class="d-flex justify-content-between mt-5">
          <a
            v-if="
              orderInfo.Status == '揪團已訂位' ||
              orderInfo.Status == '揪團已取消' ||
              orderInfo.Status == '揪團已結束'
            "
            >揪團搜</a
          >
          <a v-else>店家搜</a>
          <a
            ><b>{{ orderInfo.Name }}</b></a
          >
        </div>
        <hr />
        <div class="d-flex justify-content-between">
          <a>訂位時間</a><a>{{ orderInfo.PlayDate }} </a>
        </div>
        <hr />
        <div class="d-flex justify-content-between">
          <a>定位時段</a
          ><a>{{ orderInfo.StartTime }} - {{ orderInfo.EndTime }}</a>
        </div>
        <hr />
        <div class="d-flex justify-content-between">
          <a>遊玩桌遊</a>
          <a>{{ orderInfo.GameName[0] }}</a>
        </div>
        <hr />
        <div class="d-flex justify-content-between">
          <a>定位人數</a><a>{{ orderInfo.Quantity }} 人</a>
        </div>
        <hr />
        <div class="d-flex justify-content-between">
          <a>遊玩時數</a><a>{{ orderInfo.TimeCount }}</a>
        </div>
        <hr />
        <div class="d-flex justify-content-between">
          <a>套用優惠</a><a>{{ orderInfo.CouponName }}</a>
        </div>
        <hr />
        <div class="d-flex justify-content-between">
          <a>優惠折扣</a><a>{{ orderInfo.CouponDiscount }}</a>
        </div>
        <hr />
        <div class="d-flex justify-content-between">
          <a>點數折扣</a><a>{{ orderInfo.PointDiscount }}</a>
        </div>
        <hr />
        <div class="row justify-content-between">
          <div class="col-4 text-start"><a>聯絡人姓名</a></div>
          <div class="col-8 text-end" style="word-wrap: break-word">
            <a>{{ orderInfo.Contact }}</a>
          </div>
        </div>
        <hr />
        <div class="d-flex justify-content-between">
          <a>聯絡人電話</a><a>{{ orderInfo.Phone }}</a>
        </div>
        <hr />
        <div class="d-flex justify-content-between">
          <a>Email</a><a>{{ orderInfo.Email }}</a>
        </div>
        <hr />
        <div class="row justify-content-between">
          <div class="col-4 text-start"><a>備註</a></div>
          <div class="col-8 text-end" style="word-wrap: break-word">
            <a>{{ orderInfo.Note }}</a>
          </div>
        </div>
        <hr />
        <!-- 細項end -->
        <p class="text-end">
          金額&ensp;
          <span style="font-size: 48px; color: rgb(246, 18, 18)"
            ><b>{{ orderInfo.Price * orderInfo.Quantity }}</b></span
          >&ensp;元&ensp;整
        </p>
      </div>
    </div>
  </div>
  <!-- desk end -->

  <!-- 紅色狀態 -->
  <div v-if="status === 1" class="btn-block d-flex justify-content-center">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col col-lg-2 text-center"></div>
        <div class="col-md-2 text-center">
          <button
            class="send btn rounded-pill text-center mb-2"
            @click="this.$router.go(-1)"
            style="color: gray"
          >
            回上一頁
          </button>
        </div>
        <div class="col col-lg-2 text-center">
          <button class="send btn rounded-pill text-center mb-5" @click="back">
            再次預訂
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 藍色狀態 -->
  <div v-else-if="status === 2" class="btn-block d-flex justify-content-center">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col col-lg-2 text-center"></div>
        <div class="col-md-2 text-center">
          <button
            @click="this.$router.go(-1)"
            class="send btn rounded-pill text-center mb-2"
          >
            回上一頁
          </button>
        </div>
        <div class="col col-lg-2 text-center">
          <button
            @click="cancelOrder"
            class="send btn rounded-pill text-center mb-5"
            style="color: red"
          >
            取消訂單
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 綠色狀態 -->
  <div v-else class="btn-block d-flex justify-content-center">
    <div class="container">
      <div class="row justify-content-md-center">
        <div class="col col-lg-2 text-center">
          <button
            class="send btn rounded-pill text-center mb-2"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal4"
          >
            評價
          </button>
        </div>
        <div class="col-md-2 text-center">
          <button
            @click="this.$router.go(-1)"
            class="send btn rounded-pill text-center mb-2"
          >
            回上一頁
          </button>
        </div>
        <div class="col col-lg-2 text-center">
          <button class="send btn rounded-pill text-center mb-5" @click="back">
            再次預訂
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- 狀態end -->
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal3"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" style="background-color: #f6d55e">
          <h5 class="modal-title" id="exampleModalLabel">logo</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <img :src="coverPhoto" alt="" width="450px" />
        </div>
      </div>
    </div>
  </div>
  <!-- Modal end -->

  <!-- Modal3 -->
  <div
    class="modal fade"
    id="exampleModal4"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header" style="background-color: #f6d55e">
          <h5 class="modal-title" id="exampleModalLabel">
            <b>&emsp;{{ storeName }}</b>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container m-3">
            <p>日期&emsp;&emsp;&emsp;&emsp;{{ orderInfo.PlayDate }}</p>
            <p>
              時間&emsp;&emsp;&emsp;&emsp;{{ orderInfo.StartTime }} -
              {{ orderInfo.EndTime }}
            </p>
            <p>
              狀態&emsp;&emsp;&emsp;&emsp;<span style="color: green"
                >已完成</span
              >
            </p>
            <p>
              價位&emsp;&emsp;&emsp;&emsp;
              <span style="font-size: 48px; color: rgb(246, 18, 18)">
                <b>680</b>
              </span>
              元/人
            </p>
            <p>地址&emsp;&emsp;&emsp;&emsp;{{ address }}</p>
            <hr style="margin: 10px 0px" />
            <p>評價&emsp;&emsp;&emsp;&emsp;星星</p>
            <p>評語</p>
            <textarea name="" id="" cols="40" rows="5"></textarea>
            <hr style="margin: 10px 0px" />
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-4">
                  <button type="button" class="btn btn-warning">
                    確認評價
                  </button>
                </div>
                <div class="col-4">
                  <button type="button" class="btn btn-secondary">關閉</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal3 end -->
</template>

<script>
import { db } from "@/firebase/config";
import {
  //getDoc,
  //doc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
export default {
  data() {
    return {
      status: 2,
      bookingStore: {},
      dbResult: {},
      storeName: "",
      coverPhoto: "",
      rating: "",
      address: "",
    };
  },
  // props: ["currentOrder"],
  computed: {
    bookingStoreID() {
      // console.log(typeof this.$store.state.bookingStoreID);
      return this.$store.state.bookingStoreID;
    },
    orderCheckData() {
      return this.$store.state.orderCheckData;
    },
    orderInfo() {
      // convert string back to object
      let x = JSON.parse(this.$route.params.currentOrder);
      console.log(x);
      return x;
    },
  },

  methods: {
    back() {
      alert("開發中");
    },
    async cancelOrder() {
      this.status = 1;
      if (this.orderInfo.Status.substring(0, 1) == "揪團") {
        this.orderInfo.Status = "揪團已取消";
      } else {
        this.orderInfo.Status = "一般已取消";
      }
      console.log(typeof this.orderInfo.BookingListId);
      const ref = collection(db, "BookingLists");
      const q = query(
        ref,
        where("BookingListId", "==", this.orderInfo.BookingListId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
        this.$store.commit("setBookingListID", doc.id);
      });
      this.$store.commit("setOrderCheckData", this.orderInfo);
      this.$store.dispatch("updateBookingStatus");
      this.$router.push({ name: "orderlist" });
    },
    getStatus() {
      let sta = this.orderInfo.Status;
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
  },

  async mounted() {
    // 取得店家資料
    let colRef = collection(db, "Store");
    const q = query(
      colRef,
      where("StoreID", "==", String(this.orderInfo.StoreId))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let result = doc.data();
      this.storeName = result.StoreName;
      this.coverPhoto = result.CoverPhoto;
      this.rating = result.Rating;
      this.address = result.StoreLocation.Address;
      console.log(this.storeName);
    });
    this.getStatus();
  },
  /*
  mounted() {
    // convert string back to object
    console.log(JSON.parse(this.$route.params.currentOrder));
  },
  */
};
</script>
<style scoped>
@media screen and (max-width: 580px) {
  .wrapper {
    width: 90vw;
  }
}
.wrapper {
  max-width: 700px;
  border: 4px solid rgb(246, 213, 94);
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

.send {
  background-color: rgb(246, 213, 94);
  color: rgb(69, 144, 212);
  width: 160px;
  text-align: center;
  font-weight: bolder;
  font-size: 24px;
  line-height: 1.8;
  box-shadow: 0 4px 6px rgb(180, 180, 180);
}
</style>
