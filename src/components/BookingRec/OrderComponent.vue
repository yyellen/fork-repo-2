<template>
  <div class="order shadow-sm row d-flex align-items-center">
    <!-- store-pic -->
    <div class="store-pic col-3 col-md-1 p-1 mb-1 rounded overflow-hidden">
      <img
        :src="coverPhoto"
        alt="store-pic"
        class="position-relative h-100 top-50 start-50 translate-middle"
      />
    </div>
    <!-- store-pic end -->
    <div class="col-9 col-md-3 p-1">
      <h5 class="m-0" style="color: black">
        <b>{{ storeName }}</b>
      </h5>
    </div>
    <div class="col-12 col-md-3 grayColor p-1">
      <p class="m-0">{{ date }} {{ order.StartTime }}-{{ order.EndTime }}</p>
    </div>
    <div class="col-6 col-md-3 grayColor p-1">
      <p class="m-0">{{ order.Name }} {{ order.Quantity }}人</p>
    </div>
    <div class="col-6 col-md-2 text-end grayColor p-1">
      <p class="m-0">
        金額
        <span style="color: red">{{ order.Price * order.Quantity }}</span> 元
      </p>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase/config";
import {
  collection,
  query,
  where,
  // doc,
  // getDoc,
  getDocs,
} from "firebase/firestore";

export default {
  props: ["order"],
  async created() {
    console.log("component start!");
    console.log(this.$props.order.StoreId);

    // 取得店家資料
    var colRef = collection(db, "Store");
    var q = query(
      colRef,
      where("StoreID", "==", String(this.$props.order.StoreId))
    );
    // const querySnapshot = await getDocs(q);
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      // this.orderStore.push({ ...doc.data() });
      let result = doc.data();
      this.storeName = result.StoreName;
      this.coverPhoto = result.CoverPhoto;
    });
    // console.log(querySnapshot.data());
  },

  data() {
    return {
      storeName: "",
      coverPhoto: "",
    };
  },
  computed: {
    date() {
      var string = this.$props.order.PlayDate;
      var result = string.split(" ");
      return result[0];
    },
  },
};
</script>

<style scoped>
.order {
  border: 0.1px #eeeeee solid;
  margin: 3px 12px;
  padding: 3px;
}

/* 店家圖片大小統一 */
.store-pic {
  height: 60px;
  max-height: 100%;
  background-color: #000;
}
.store-pic img {
  object-fit: cover;
}
</style>
