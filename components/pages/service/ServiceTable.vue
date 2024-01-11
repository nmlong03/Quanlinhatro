<script setup>
import IconRemove from "@/assets/svg/remove.svg";
import IconEdit from "@/assets/svg/edit.svg";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { render } from "vue";
import ModalUpdateService from "~/components/pages/service/ModalUpdateService.vue";
import { useServiceStore } from "~/store/services";
import { useToast } from "vue-toastification";
// composable
const fetchListServiceEventBus = useEventBus(`fetch-list-service`);
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
const toast = useToast();
// state
const isDisplayUpdateService = ref(false);
const isShowConfirmDeleteService = ref(false);
const data_update = ref("");
const data_remove = ref("");
// store
const serviceStore = useServiceStore();

const tableHeaders = ref([
  {
    title: "STT",
    key: "STT",
    sortable: false,
    width: "73px",
  },
  {
    title: "Tên dịch vụ",
    key: "name",
    sortable: true,
    width: "200px",
  },
  {
    title: "Loại dịch vụ",
    key: "type",
    sortable: true,
    width: "200px",
  },
  {
    title: "Đơn giá (VNĐ)",
    key: "price",
    sortable: true,
    width: "200px",
  },
  {
    title: "Ghi chú",
    key: "note",
    sortable: false,
    width: "200px",
  },
  {
    title: "Trạng thái",
    key: "isActive",
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
const onHandleEdit = (item) => {
  data_update.value = item;
  isDisplayUpdateService.value = true;
};
const onHandleRemove = async (item) => {
  if (item === true) {
    const res = await serviceStore.deleteService(data_remove.value._id);
    const resDelAll = await serviceStore.deleteAllServiceRoom(
      data_remove.value._id
    );
    if (res.data.success) {
      fetchListServiceEventBus.emit();
      toast.success("Xóa dịch vụ thành công !");
      isShowConfirmDeleteService.value = false;
      isDisplayUpdateService.value = false;
    }
    if (resDelAll.data.success) {
      fetchListServiceEventBus.emit();
      toast.success("Xóa dịch vụ ra khỏi tất cả các phòng thành công !");
      isShowConfirmDeleteService.value = false;
      isDisplayUpdateService.value = false;
    }
    if (!res.data.success) {
      fetchListServiceEventBus.emit();
      toast.success("Xóa dịch vụ thất bại !");
      isShowConfirmDeleteService.value = false;
      isDisplayUpdateService.value = false;
    }
    if (!resDelAll.data.success) {
      fetchListServiceEventBus.emit();
      toast.success("Xóa tất cả dịch vụ ra khỏi phòng thất bại !");
      isShowConfirmDeleteService.value = false;
      isDisplayUpdateService.value = false;
    }
  } else {
    data_remove.value = item;
    isShowConfirmDeleteService.value = true;
  }
};
</script>

<template>
  <div>
    <v-data-table :headers="tableHeaders" :items="props.data" class="s-table">
      <template #item="{ item, index }">
        <tr class="tw-relative tw-group">
          <td class="tw-text-center">{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.type }}</td>
          <td>{{ formatCurrency(item.price) }}</td>
          <td>{{ item.note }}</td>
          <td>{{ convertStatusServiceType(item.isActive) }}</td>
          <td>
            <span class="tw-flex tw-gap-x-3">
              <g-button
                @click="onHandleEdit(item)"
                class="bg-white !tw-ml-0 !tw-p-1 hover:!tw-bg-[#f3f3f3]"
              >
                <IconEdit />
              </g-button>
              <g-button
                @click="onHandleRemove(item)"
                class="bg-white !tw-ml-0 !tw-p-1 hover:!tw-bg-[#f3f3f3]"
              >
                <IconRemove class="!tw-ml-0" />
              </g-button>
            </span>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="isDisplayUpdateService" width="544">
      <ModalUpdateService
        :data="data_update"
        @close="isDisplayUpdateService = false"
      />
    </v-dialog>
    <g-modal-confirm
      v-model="isShowConfirmDeleteService"
      title="Xoá dịch vụ ?"
      description="Một khi đã xóa, không thể hồi lại"
      @ok="onHandleRemove(true)"
    ></g-modal-confirm>
  </div>
</template>
