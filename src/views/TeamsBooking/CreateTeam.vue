<template>
  <!-- 確認訂單頁面 -->
  <form action="">
    <div class="container">
      <div class="row justify-content-center">
        <div class="cardWidth">
          <div class="container p-5">
            <h1 class="pt-3">創立揪團</h1>
          </div>
          <div
            class="div"
            style="
              max-width: 480px;
              min-width: 300px;
              height: auto;
              margin: 0px auto;
            "
          >
            <div class="d-flex justify-content-between grayColor py-2">
              <a>聯絡人姓名</a
              ><a
                ><input
                  type="text"
                  placeholder="姓名"
                  size="10"
                  style="text-align: center"
                  v-model="contactName"
              /></a>
            </div>
            <hr />
            <div class="d-flex justify-content-between grayColor py-2">
              <a>電話</a
              ><a
                ><input
                  type="text"
                  placeholder="0912345678"
                  size="10"
                  style="text-align: center"
                  v-model="contactPhone"
              /></a>
            </div>
            <hr />
            <div class="d-flex justify-content-between grayColor py-2">
              <a>Email</a
              ><a
                ><input
                  type="text"
                  placeholder="aa123@gmail.com"
                  size="20"
                  style="text-align: center"
                  v-model="contactEmail"
              /></a>
            </div>
            <hr />
            <div class="d-flex justify-content-between grayColor py-2">
              <p>套用優惠</p>
              <div class="coupon-block">
                <div class="input-group input-group-sm">
                  <button
                    type="button"
                    class="coupon-select-output btn btn-outline-secondary"
                  >
                    {{ Coupon }}
                  </button>
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
                  <ul
                    class="coupon-dropdown-menu dropdown-menu dropdown-menu-end"
                  >
                    <li
                      class="dropdown-item"
                      v-for="coupon in useCoupon"
                      :key="coupon"
                      @click="getCoupon(coupon)"
                    >
                      {{ coupon.key }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr />
            <div class="d-flex justify-content-between grayColor pt-2 pb-5">
              <a>訂位人數</a>

              <a>
                <div
                  class="d-flex justify-content-center align-items-center"
                  style="width: 130px"
                >
                  <div class="btn-group btn-group-sm me-1">
                    <button
                      class="btn btn-secondary"
                      type="button"
                      @click="quantity >= 2 ? quantity-- : quantity == 1"
                    >
                      －
                    </button>
                    <input
                      type="text"
                      class="form-control text-center"
                      oninput="value=value.replace(/[^\d]/g,'')"
                      v-model="quantity"
                    />
                    <button
                      class="btn btn-secondary"
                      type="button"
                      @click="quantity++"
                    >
                      ＋
                    </button>
                  </div>
                  <p class="pt-2">人</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 按鈕 -->

    <div class="d-flex justify-content-center pb-5">
      <div class="mainBtn" style="width: 250px" @click="submitContact">
        確認資訊
      </div>
    </div>

    <!-- 按鈕 end -->
  </form>
</template>
<style  scoped>
@media screen and (max-width: 580px) {
  .cardWidth {
    width: 89%;
  }
  .mainBtn {
    position: relative;
    justify-content: center !important;
    text-decoration: none !important;
  }
}
.cardWidth {
  max-width: 700px;
  border: 4px solid rgb(246, 213, 94);
  background-color: rgb(255, 255, 255);
  margin-top: 8vh !important;
  margin-bottom: 8vh !important;
  /* padding: 6vh 6vw !important; */
  border-radius: 8px;
  box-shadow: 0px 4px 4px 2px rgb(200, 200, 200);
  overflow: hidden; /* 切邊 */
  flex: auto;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
<script>
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
export default {
  async mounted() {
    // get user info
    const docRef = doc(db, "Account", this.userUID);
    const getData = await getDoc(docRef);
    const result = getData.data();
    this.contactEmail = result.Email;
    this.contactPhone = result.Phone;
    this.userId = result.UserId;
  },
  data() {
    return {
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      userId: "",
      quantity: 1,
      Coupon: "選擇優惠券",
      useCoupon: [
        { key: "免費點心", value: 0 },
        { key: "折價30元", value: 30 },
        { key: "折價50元", value: 50 },
      ],
      couponName: "",
      couponDiscount: "",
    };
  },
  computed: {
    userUID() {
      return this.$store.state.user.uid;
    },
    bookingStoreID() {
      return this.$store.state.bookingStoreID;
    },
  },
  methods: {
    getCoupon: function (coupon) {
      this.Coupon = coupon.key;
      this.couponName = this.Coupon;
      this.couponDiscount = coupon.value;
    },
    submitContact() {
      if (this.contactName == "") {
        this.$snackbar.add({
          type: "error",
          text: "請填寫聯絡人姓名",
        });
        return;
      } else if (this.contactPhone == "") {
        this.$snackbar.add({
          type: "error",
          text: "請填寫聯絡人電話",
        });
        return;
      } else if (this.contactEmail == "") {
        this.$snackbar.add({
          type: "error",
          text: "請填寫聯絡人Email",
        });
        return;
      } else {
        var teamContact = {
          BookingId: {
            Count: this.quantity,
            Id: Number(this.userId),
          },
          Quantity: this.quantity,
          Participant: [Number(this.userId)],
          Contact: this.contactName,
          Phone: this.contactPhone,
          Email: this.contactEmail,
          CouponName: this.couponName,
          CouponDiscount: this.couponDiscount,
        };
        this.$store.commit("setTeamContact", teamContact);
        console.log(this.$store.state.teamContact);
        this.$router.push("/ConfirmOrder");
      }
    },
  },
};
</script>