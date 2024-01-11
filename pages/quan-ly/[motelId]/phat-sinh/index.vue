<script setup>
import ArisesTable from "@/components/pages/phat-sinh/ArisesTable.vue";
import { useArisesStore } from "~/store/arises";
import { useMotelStore } from "@/store/motel";
import CreateArisesForm from "~/components/pages/phat-sinh/CreateArisesForm.vue";
import { useUserStore } from "~/store/user";

// compatibility
const route = useRoute();
const idMotel = route.params?.motelId;
// store
const userStore = useUserStore();
const arisesStore = useArisesStore();
const motelStore = useMotelStore();

// state
const dataArises = ref(null);
const DateFilter = ref(Date());
const DataMotels = ref(null);
const isDisplayCreateArises = ref(false);
const fetchListArisesEventBus = useEventBus(`fetch-list-arises`);
// function
const getAllMotels = async () => {
  try {
    const resOwner = await userStore.getOneUser();
    const res = await motelStore.getMotels(resOwner.data.message._id);
    if (res.data) {
      const motels = res.data.motels;
      const foundMotel = motels.find((motel) => motel._id === idMotel);
      if (foundMotel) {
        DataMotels.value = [
          {
            title: foundMotel.name,
            id: foundMotel._id,
          },
        ];
      } else {
        DataMotels.value = [];
      }
    }
  } catch (error) {
    throw error;
  }
};
getAllMotels();
const getAllArises = async (monthYear) => {
  try {
    const res = await arisesStore.getAllArises(
      `?motelId=${idMotel}&monthDate=${monthYear}&limit=10000000000000&page=1`
    );
    if (res.data) {
      dataArises.value = null;
      dataArises.value = res.data.arises;
    }
  } catch (error) {}
};
getAllArises(formatMonthYear(Date()));

const onHandleDate = async (event) => {
  if (DateFilter._value == null) {
    dataArises.value = null;
    getAllArises(convertDateType(Date(), "MM/YYYY"));
    return;
  } else {
    dataArises.value = null;
    getAllArises(convertDateType(DateFilter._value, "MM/YYYY"));
  }
};
fetchListArisesEventBus.on(() => {
  dataArises.value = null;
  if (DateFilter._value == null) {
    getAllArises(convertDateType(Date(), "MM/YYYY"));
  } else {
    getAllArises(convertDateType(DateFilter._value, "MM/YYYY"));
  }
});
const handleEmitDateCreate = (e) => {
  DateFilter.value = e;
};
</script>
<template>
  <header class="tw-grid tw-grid-cols-4 tw-items-end tw-gap-x-3">
    <g-date-picker
      class="tw-pt-4"
      label="Theo tháng"
      :placeholder="formatMonthYear(Date())"
      @vnode-updated="onHandleDate($event)"
      v-model="DateFilter"
    ></g-date-picker>

    <g-button
      class="!tw-h-[38px] !tw-w-40"
      @click="isDisplayCreateArises = true"
    >
      Thêm
    </g-button>
  </header>
  <section class="tw-pt-5">
    <ArisesTable v-if="dataArises !== null" :data="dataArises" />
  </section>
  <v-dialog v-model="isDisplayCreateArises" width="544">
    <CreateArisesForm
      @dateCreate="handleEmitDateCreate"
      @close="isDisplayCreateArises = false"
    />
  </v-dialog>
</template>
