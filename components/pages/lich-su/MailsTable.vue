<script setup>
import IconSave from "@/assets/svg/save.svg";
import IconViewers from "@/assets/svg/view-details.svg";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useMailsStore } from "~/store/mails";
import { useToast } from "vue-toastification";
import { cloneDeep } from "lodash-es";
import DetailsMail from "~/components/pages/lich-su/DetailsMail.vue";

// composable
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});
const DeepData = cloneDeep(props.data);
const dataTable = ref(DeepData);
const isDisplayDetailsMail = ref(false);
const detailsDataMail = ref({});
const toast = useToast();
// state
// store
const mailsStore = useMailsStore();

const tableHeaders = ref([
  {
    title: "STT",
    key: "index",
    sortable: false,
    width: "20px",
  },
  {
    title: "Chi tiết",
    key: "content",
    sortable: false,
    width: "40px",
  },
  {
    title: "Tiêu đề",
    key: "title",
    sortable: true,
    width: "250px",
  },
  {
    title: "Người nhận",
    key: "email_to",
    sortable: true,
    width: "200px",
  },
  {
    title: "Trạng thái",
    key: "status",
    sortable: true,
    width: "40px",
  },
  {
    title: "Thời gian gửi",
    key: "createdAt",
    sortable: true,
    width: "150px",
  },
]);

// function
const onViewDetailsMail = (item) => {
  detailsDataMail.value = item;
  isDisplayDetailsMail.value = true;
};
</script>
<template>
  <div>
    <v-data-table :headers="tableHeaders" :items="dataTable" class="s-table">
      <template #item="{ item, index }">
        <tr class="tw-relative tw-group">
          <td class="tw-text-center">
            {{ index + 1 }}
          </td>
          <td class="tw-cursor-pointer" @click="onViewDetailsMail(item)">
            <div
              class="tw-line-clamp-2 tw-max-w-sm tw-overflow-hidden tw-flex tw-justify-start tw-items-center"
            >
              <button class="tw-px-3 tw-py-2 tw-bg-gray-300 tw-rounded-md">
                <IconViewers />
              </button>
              <!-- <div v-html="item.content"></div> -->
            </div>
          </td>
          <td>
            {{ item.title }}
          </td>
          <td>
            {{ item.email_to }}
          </td>

          <td>
            <!-- <img
              src="https://i.ibb.co/MZ3ps00/t-i-xu-ng-1.png"
              v-if="item.status == 'success'"
              alt=""
              class="tw-w-[18px] tw-h-[18px] tw-ml-2"
              title="Đã gửi mail thành công"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/4436/4436559.png"
              v-if="item.status == 'fail'"
              alt=""
              class="tw-w-[18px] tw-h-[18px] tw-ml-2"
              title="Gửi mail thất bại"
            /> -->
            <span
              v-if="item.status == 'success'"
              alt=""
              class="tw-w-[18px] tw-h-[18px] tw-font-bold tw-ml-2 tw-text-green-800"
              title="Đã gửi mail thành công"
              >Thành công</span
            >
            <span
              v-if="item.status == 'fail'"
              alt=""
              class="tw-w-[18px] tw-h-[18px] tw-font-bold tw-ml-2 tw-text-red"
              title="Gửi mail thất bại"
              >Thất bại</span
            >
          </td>
          <td>
            {{ item.createdAt }}
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
  <v-dialog v-model="isDisplayDetailsMail" width="944">
    <DetailsMail
      @close="isDisplayDetailsMail = false"
      :data="detailsDataMail"
    />
  </v-dialog>
</template>
<style scoped></style>
