<template>
  <!-- step-block -->
  <Loading v-show="loading" />
  <div class="container mt-5">
    <StepProgressBar :step="step" />
  </div>
  <!-- step-block end -->
  <!-- desk -->
  <div class="container">
    <div class="row justify-content-center">
      <div class="wrapper flex-column align-items-center">
        <div class="content p-3">
          <div class="d-flex">
            <div class="bd-highlight">
              <img
                :src="bookingStore.CoverPhoto"
                alt=""
                style="border-radius: 3px; width: 100%; height: 145px"
              />
            </div>
            <div class="p-2 bd-highlight">
              <a
                ><b style="font-size: 20px">{{ bookingStore.StoreName }}</b></a
              >
              <!-- <a><b style="font-size: 20px" class="">(兩行版型預留位)</b></a> -->

              <p style="margin: 0px 0px 0px">-</p>
              <div class="d-flex flex-row bd-highlight">
                <div>
                  <p class="m-0">&nbsp;</p>
                  <button type="button" class="btn btn-primary btn-sm mt-2">
                    {{ orderCheckData.Rating }}</button
                  >&ensp;
                </div>

                <div style="line-height: 20px">
                  <span class="">
                    <p class="m-0">&nbsp;</p>
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
          <p style="padding: 0px; margin: 0px" class="grayColor">
            {{ bookingStore.StoreLocation.Address }}&ensp;<a
              :href="`https://www.google.com.tw/maps/place/${bookingStore.StoreLocation.Address}`"
              target="_blank"
              title="Google Map"
              >查看路線</a
            >
          </p>
          <!-- modal button end -->
          <template v-for="tag in bookingStore.Tags" :key="tag">
            <span class="badge bg-primary me-1 my-1">{{ tag }}</span>
          </template>
          <hr style="margin: 5px 0px" />
        </div>
        <div class="container pt-3">
          <!-- 細項 -->
          <div class="d-flex justify-content-between">
            <a>訂位時間</a><a>{{ orderCheckData.PlayDate }}</a>
          </div>
          <hr />
          <div class="d-flex justify-content-between">
            <a>訂位時段</a
            ><a
              >{{ orderCheckData.StartTime }} - {{ orderCheckData.EndTime }}</a
            >
          </div>
          <hr />
          <div class="d-flex justify-content-between">
            <a>訂位人數</a><a>{{ orderCheckData.Quantity }} 人</a>
          </div>
          <hr />
          <div class="d-flex justify-content-between">
            <a>遊玩桌游</a><a>{{ orderCheckData.GameName[0] }}</a>
          </div>
          <hr />
          <div class="d-flex justify-content-between">
            <a>遊玩時數</a><a>{{ orderCheckData.TimeCount }} 小時</a>
          </div>
          <hr />
          <div class="d-flex justify-content-between">
            <a>套用優惠</a><a>{{ orderCheckData.CouponName }} </a>
          </div>
          <hr />
          <div class="d-flex justify-content-between">
            <a>優惠折扣</a><a>{{ orderCheckData.CouponDiscount }}</a>
          </div>
          <hr />
          <div class="d-flex justify-content-between">
            <a>點數折扣</a><a>{{ orderCheckData.PointDiscount }}</a>
          </div>
          <hr />
          <div class="row justify-content-between">
            <div class="col-4 text-start text-nowrap"><a>聯絡人姓名</a></div>
            <div class="col-8 text-end" style="word-wrap: break-word">
              <a>{{ orderCheckData.Contact }}</a>
            </div>
          </div>
          <hr />
          <div class="row justify-content-between">
            <div class="col-4 text-start text-nowrap"><a>聯絡人電話</a></div>
            <div class="col-8 text-end" style="word-wrap: break-word">
              <a>{{ orderCheckData.Phone }}</a>
            </div>
          </div>
          <hr />
          <div class="row justify-content-between">
            <div class="col-4 text-start text-nowrap"><a>Email</a></div>
            <div class="col-8 text-end" style="word-wrap: break-word">
              <a>{{ orderCheckData.Email }}</a>
            </div>
          </div>
          <hr />
          <div class="row justify-content-between">
            <div class="col-4 text-start text-nowrap"><a>備註</a></div>
            <div class="col-8 text-end" style="word-wrap: break-word">
              <a>{{ orderCheckData.Note }}</a>
            </div>
          </div>
          <hr />
          <!-- 細項end -->
          <p class="text-end">
            金額&ensp;
            <span style="font-size: 48px; color: rgb(246, 18, 18)"
              ><b>{{ orderCheckData.Price * orderCheckData.Quantity }}</b></span
            >&ensp;元&ensp;整
          </p>
        </div>
      </div>
      <div class="d-flex justify-content-center pb-5">
        <div
          @click="submitOrder(orderCheckData)"
          class="mainBtn"
          style="width: 200px"
        >
          確認預訂
        </div>
      </div>
    </div>
  </div>
  <!-- desk end -->

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
          <img src="https://picsum.photos/450/450" alt="" width="450px" />
        </div>
      </div>
    </div>
  </div>
  <!-- Modal end -->
</template>
<script>
import { db } from "@/firebase/config";
import { getDoc, doc, addDoc, collection } from "firebase/firestore";
import StepProgressBar from "../../components/StoreBooking/StepProgressBar.vue";
export default {
  components: {
    StepProgressBar,
  },
  data() {
    return {
      step: 2,
      bookingStore: {},
      loading: null,
    };
  },
  created() {
    this.getSingleStore();
  },
  computed: {
    bookingStoreID() {
      return this.$store.state.bookingStoreID;
    },
    orderCheckData() {
      return this.$store.state.orderCheckData;
    },
  },
  methods: {
    async getSingleStore() {
      // console.log("get single store");
      // const docRef = doc(db, "Store", String(this.bookingStoreID));
      const result = await getDoc(
        doc(db, "Store", String(this.bookingStoreID))
      );
      // const result = await getDoc(docRef)
      // console.log(result.data())
      this.bookingStore = result.data();
      console.log(this.bookingStore);
    },
    submitOrder(orderCheckData) {
      this.loading = true;
      addDoc(collection(db, "BookingLists"), {
        BookingListId: orderCheckData.BookingListId,
        StoreId: Number(orderCheckData.StoreId),
        BookingId: [
          {
            Count: orderCheckData.BookingId.Count,
            Id: Number(orderCheckData.BookingId.Id),
            Comfirm: orderCheckData.BookingId.Comfirm,
          },
        ],
        Participant: orderCheckData.Participant,
        PlayDate: orderCheckData.PlayDate,
        Quantity: orderCheckData.Quantity,
        StartTime: orderCheckData.StartTime,
        // Rating: orderCheckData.Rating,
        EndTime: orderCheckData.EndTime,
        TimeCount: orderCheckData.TimeCount,
        Status: "一般已訂位",
        Name: "一般訂位",
        Tags: [],
        Contact: orderCheckData.Contact,
        Phone: orderCheckData.Phone,
        Email: orderCheckData.Email,
        Note: orderCheckData.Note,
        CouponName: orderCheckData.CouponName,
        CouponDiscount: Number(orderCheckData.CouponDiscount),
        PointDiscount: Number(orderCheckData.PointDiscount),
        Price: Number(orderCheckData.Price),
        GameName: orderCheckData.GameName,
      })
        .then(() => {
          this.loading = false;
          this.$snackbar.add({
            type: "success",
            text: "訂位成功！",
          });
          this.$store.commit("clearOrderCheckData");
          setTimeout(() => {
            this.$router.push("/ordercompletion");
          }, 4500);
        })
        .catch((err) => {
          this.loading = false;
          this.$snackbar.add({
            type: "error",
            text: `${err.message}\n請重新輸入訂位資訊`,
          });
          setTimeout(() => {
            this.$router.push("/booking");
          }, 4000);
        });
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 580px) {
  .wrapper {
    width: 90vw;
  }
}

.wrapper {
  background-color: #fff;
  max-width: 700px;
  margin-top: 8vh;
  margin-bottom: 8vh;
  padding-top: 6vh 4vw;
  border-radius: 5px;
  border: 3px solid rgb(246, 213, 94);
  box-shadow: 0px 4px 4px 2px rgb(200, 200, 200);
}
.send {
  background-color: rgb(246, 213, 94);
  color: rgb(69, 144, 212);
  width: 300px;
  text-align: center;
  font-weight: bolder;
  font-size: 24px;
  line-height: 1.8;
  box-shadow: 0 4px 6px rgb(180, 180, 180);
}

.send {
  background-color: var(--primary-color);
  letter-spacing: 3px;
  padding: 20px;
  color: var(--accent-color);
}
.badge {
  background-color: #4590d5 !important;
}
.btn {
  background-color: #4590d5 !important;
}
.checkRoute {
  color: #4590d5 !important;
}
</style>
