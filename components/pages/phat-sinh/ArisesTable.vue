<script setup>
import IconSave from "@/assets/svg/save.svg";
import IconRemove from "@/assets/svg/remove.svg";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useArisesStore } from "~/store/arises";
import { useToast } from "vue-toastification";
import { cloneDeep } from "lodash-es";
import { convertMonthYear } from "~/utils/helps";

// composable
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
const fetchListArisesEventBus = useEventBus(`fetch-list-arises`);

const DeepData = cloneDeep(props.data);
const JsonData = JSON.parse(JSON.stringify(DeepData));
const dataTable = ref(DeepData);
const isShowConfirmDeleteArises = ref(false);
const data_remove = ref("");

const toast = useToast();
// state
// store
const arisesStore = useArisesStore();

const tableHeaders = ref([
  {
    title: "STT",
    key: "index",
    sortable: true,
    width: "30px",
  },
  {
    title: "Phòng",
    key: "name",
    sortable: true,
    width: "200px",
  },
  {
    title: "Ghi chú",
    key: "note",
    sortable: true,
    width: "400px",
  },
  {
    title: "Chi phí",
    key: "price",
    sortable: true,
    width: "200px",
  },
  {
    title: "Thời gian",
    key: "monthYear",
    sortable: true,
    width: "200px",
  },
  {
    title: "Hành động",
    key: "action",
    sortable: false,
  },
]);

// function
const onHandleSave = async (item) => {
  if (item.roomId == null) {
    return toast.error("Nhà trọ đã bị xoá !");
  }
  // if (item.note == null || item.note == "") {
  //   return toast.error("Ghi chú không được bỏ trống");
  // }
  if (item.price < 0) {
    return toast.warning("Chi phí là một số dương");
  }
  const payload = {
    _id: item._id,
    data: removeEmptyFields({
      note: item.note,
      price: item.price,
      monthYear: item.monthYear,
      roomId: item.roomId._id,
    }),
  };
  try {
    const res = await arisesStore.updateArises(payload);
    if (res.data.success) {
      toast.success("Cập nhật phát sinh phòng thành công");
    }
  } catch (error) {
    toast.error("Cập nhật chi phí phát sinh thất bại ");
  }
};

const onHandleRemove = async (item) => {
  if (item === true) {
    try {
      const res = await arisesStore.deleteArises(data_remove.value._id);
      if (res.data.success) {
        fetchListArisesEventBus.emit();
        toast.success("Xóa phát sinh thành công thành công !");
        isShowConfirmDeleteArises.value = false;
      }
    } catch (error) {
      toast.error("Xoá dịch vụ thất bại !");
    }
    return;
  } else {
    data_remove.value = item;
    isShowConfirmDeleteArises.value = true;
  }
};
</script>

<template>
  <div>
    <v-data-table :headers="tableHeaders" :items="dataTable" class="s-table">
      <template #item="{ item, index }">
        <tr class="tw-relative tw-group">
          <td class="tw-text-center">{{ index + 1 }}</td>
          <td>{{ item?.roomId?.name }}</td>
          <td>
            <g-input type="text" v-model="item.note"> </g-input>
          </td>
          <td>
            <g-input type="number" min="0" v-model="item.price"> </g-input>
          </td>
          <td class="tw-flex tw-justify-center tw-items-center">
            <input
              type="month"
              v-bind:value="convertMonthYear(item.monthYear)"
              @change="item.monthYear = convertMonthYear($event.target.value)"
            />
          </td>

          <td>
            <div class="tw-flex tw-gap-x-4">
              <span class="tw-flex tw-gap-x-3">
                <g-button
                  @click="onHandleSave(item)"
                  class="bg-white !tw-ml-0 !tw-px-[9px] hover:!tw-bg-[#f3f3f3]"
                >
                  <IconSave /> <span class="tw-ml-2">Lưu</span>
                </g-button>
              </span>
              <span class="tw-flex tw-gap-x-3">
                <g-button
                  @click="onHandleRemove(item)"
                  class="bg-white !tw-ml-0 !tw-p-1 hover:!tw-bg-[#f3f3f3]"
                >
                  <IconRemove class="!tw-ml-0" />
                </g-button>
              </span>
            </div>
          </td>
        </tr>
      </template>
    </v-data-table>
    <g-modal-confirm
      v-model="isShowConfirmDeleteArises"
      title="Xoá chi phí phát sinh?"
      description="Một khi đã xóa, không thể hồi lại"
      @ok="onHandleRemove(true)"
    ></g-modal-confirm>
  </div>
</template>
