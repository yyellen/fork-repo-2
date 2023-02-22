<template>
  <div class="container">
    <div class="wrapper">
      <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="reserve-tab"
            data-bs-toggle="tab"
            data-bs-target="#reserve"
            type="button"
            role="tab"
            aria-controls="reserve"
            aria-selected="true"
          >
            已預訂
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="complete-tab"
            data-bs-toggle="tab"
            data-bs-target="#complete"
            type="button"
            role="tab"
            aria-controls="complete"
            aria-selected="false"
          >
            已結束
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="cancel-tab"
            data-bs-toggle="tab"
            data-bs-target="#cancel"
            type="button"
            role="tab"
            aria-controls="cancel"
            aria-selected="false"
          >
            已取消
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active rounded-bottom"
          id="reserve"
          role="tabpanel"
          aria-labelledby="reserve-tab"
        >
          <template v-for="(order, index) in reserved" :key="index">
            <!-- convert params(obj) to string -->
            <router-link
              :to="{
                name: 'OrderCheck',
                params: { currentOrder: JSON.stringify(order) },
              }"
              class="link"
            >
              <OrderComponent :order="order" />
            </router-link>
          </template>
        </div>
        <div
          class="tab-pane fade rounded-bottom"
          id="complete"
          role="tabpanel"
          aria-labelledby="complete-tab"
        >
          <template v-for="(order, index) in ended" :key="index">
            <router-link
              :to="{
                name: 'OrderCheck',
                params: { currentOrder: JSON.stringify(order) },
              }"
              class="link"
            >
              <OrderComponent :order="order" />
            </router-link>
            <!-- <OrderComponent :order="order" /> -->
          </template>
        </div>
        <div
          class="tab-pane fade rounded-bottom"
          id="cancel"
          role="tabpanel"
          aria-labelledby="cancel-tab"
        >
          <template v-for="(order, index) in canceled" :key="index">
            <router-link
              :to="{
                name: 'OrderCheck',
                params: { currentOrder: JSON.stringify(order) },
              }"
              class="link"
            >
              <OrderComponent :order="order" />
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderComponent from "../../components/BookingRec/OrderComponent.vue";
import { db } from "@/firebase/config";
import {
  collection,
  query,
  where,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

export default {
  async created() {
    console.log("view start");
    // 取得使用者資料
    if (this.user !== null) {
      const dbResult = await getDoc(doc(db, "Account", String(this.user.uid)));
      var result = dbResult.data();
      var userId = result.UserId;

      var colRef = collection(db, "BookingLists");
      console.log(userId);
      var q = query(
        colRef,
        where("Participant", "array-contains", Number(userId))
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.orderList.push({ ...doc.data() });
      });
      this.reserved = this.orderList.filter(function (order) {
        return order.Status == "一般已訂位" || order.Status == "揪團已訂位";
      });

      this.ended = this.orderList.filter(function (order) {
        return order.Status == "一般已結束" || order.Status == "揪團已結束";
      });

      this.canceled = this.orderList.filter(function (order) {
        return order.Status == "一般已取消" || order.Status == "揪團已取消";
      });
    } else {
      this.$snackbar.add({
        type: "warning",
        text: "請先登入以查看訂位紀錄！",
      });
      this.$router.push('/login')
      // setTimeout(() => {
      //   this.$router.push('/login')
      // },2000)
    }
  },
  components: {
    OrderComponent,
  },
  data() {
    return {
      currentUser: {},
      orderList: [],
      reserved: [],
      ended: [],
      canceled: [],
      statusAlive: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {},
};
</script>

<style scoped>
.wrapper {
  padding: 0 !important;
}
/* 導覽頁籤 */
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
.tab-pane {
  background: #ffffff;
  padding: 1rem;
}
.link {
  text-decoration: none;
}
</style>
