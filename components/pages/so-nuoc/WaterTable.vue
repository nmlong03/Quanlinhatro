<script setup>
import IconSave from "@/assets/svg/save.svg";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useWaterStore } from "~/store/water";
import { useToast } from "vue-toastification";
import { cloneDeep } from "lodash-es";

// composable
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
  DataMotels: {
    type: Object,
    default: {},
  },
});
const DeepData = cloneDeep(props.data);
const JsonData = JSON.parse(JSON.stringify(DeepData));
const dataTable = ref(DeepData);

const toast = useToast();
// state
// store
const waterStore = useWaterStore();

const tableHeaders = ref([
  {
    title: "Nhà",
    key: "name",
    sortable: false,
    width: "200px",
  },
  {
    title: "Phòng",
    key: "room",
    sortable: true,
    width: "200px",
  },
  {
    title: "CS Nước Cũ",
    key: "prevWaterIndex",
    sortable: true,
    width: "200px",
  },
  {
    title: "CS Nước Mới",
    key: "currentWaterIndex",
    sortable: false,
    width: "200px",
  },
  {
    title: "Sử dụng",
    key: "waterUsed",
    sortable: true,
    width: "150px",
  },
  {
    title: "Hành động",
    key: "action",
    sortable: false,
    width: "150px",
  },
]);

// function
const onHandleSave = async (item) => {
  if (item.roomId == null) {
    return toast.error("Nhà trọ đã bị xoá !");
  }
  if (Number(item.currentWaterIndex) - Number(item.prevWaterIndex) < 0) {
    return toast.error(" Giá nước không phải là số âm!");
  }
  const payload = {
    monthYear: item.monthYear,
    isWarning: true,
    prevWaterIndex: item.prevWaterIndex,
    currentWaterIndex: item.currentWaterIndex,
    roomId: item.roomId._id,
  };
  try {
    const res = await waterStore.updateWater(payload);
    if (res.data.success) {
      toast.success(res.data.message);
    }
  } catch (error) {
    toast.error("Lưu số nước thất bại ");
  }
};

const onChangeWater = (item) => {
  item.prevWaterIndex = Number(item.prevWaterIndex);
  item.currentWaterIndex = Number(item.currentWaterIndex);
  item.waterUsed = Number(item.currentWaterIndex) - Number(item.prevWaterIndex);
};
</script>

<template>
  <div>
    <v-data-table :headers="tableHeaders" :items="dataTable" class="s-table">
      <template #item="{ item, index }">
        <tr class="tw-relative tw-group">
          <td>{{ JSON.parse(JSON.stringify(props.DataMotels))[0]?.title }}</td>
          <td>{{ item?.roomId?.name }}</td>
          <td>
            <g-input
              type="number"
              @change="onChangeWater(item)"
              v-model="item.prevWaterIndex"
            >
            </g-input>
          </td>
          <td>
            <g-input
              type="number"
              min="0"
              @change="onChangeWater(item)"
              v-model="item.currentWaterIndex"
            >
            </g-input>
          </td>
          <td>{{ item.waterUsed }}</td>
          <td>
            <span class="tw-flex tw-gap-x-3">
              <g-button
                @click="onHandleSave(item)"
                class="bg-white !tw-ml-0 !tw-px-[9px] hover:!tw-bg-[#f3f3f3]"
              >
                <IconSave /> <span class="tw-ml-2">Lưu</span>
              </g-button>
            </span>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
