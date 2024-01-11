<script setup>
import IconRemove from "@/assets/svg/remove.svg";
import IconEdit from "@/assets/svg/edit.svg";
import { VDataTable } from "vuetify/lib/labs/components.mjs";
const tableHeaders = ref([
  {
    title: "STT",
    key: "STT",
    sortable: false,
    width: "73px",
  },
  {
    title: "Ngày đặt",
    key: "depositDate",
    sortable: false,
    width: "200px",
  },
  {
    title: "Nhà",
    key: "house",
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
    title: "Họ và tên",
    key: "name",
    sortable: false,
    width: "200px",
  },
  {
    title: "SĐT",
    key: "phoneNumber",
    sortable: false,
    width: "200px",
  },
  {
    title: "Tiền cọc",
    key: "depositMoney",
    sortable: true,
    width: "200px",
  },
  {
    title: "Ngày dự kiến đến",
    key: "comingDate",
    sortable: false,
    width: "200px",
  },
  {
    title: "Trạng thái",
    key: "status",
    sortable: false,
    width: "150px",
  },
]);

const deposits = ref([
  {
    depositDate: "12-03-2001",
    house: "House 1",
    room: "Room 1",
    name: "Tran Trung Nghia",
    phoneNumber: "0354655462",
    depositMoney: 100000,
    comingDate: "13-05-2003",
    status: true,
  },
  {
    depositDate: "12-03-2001",
    house: "House 2",
    room: "Room 2",
    name: "Tran Trung Nghia",
    phoneNumber: "0354655462",
    depositMoney: 200000,
    comingDate: "13-05-2003",
    status: true,
  },
  {
    depositDate: "12-03-2001",
    house: "House 3",
    room: "Room 3",
    name: "Tran Trung Nghia",
    phoneNumber: "0354655462",
    depositMoney: 300000,
    comingDate: "13-05-2003",
    status: true,
  }
]);
</script>

<template>
  <div>
    <v-data-table :headers="tableHeaders" :items="deposits" class="s-table">
      <template #item="{ item, index }">
        <tr class="tw-relative tw-group">
          <td class="tw-text-center">{{ index + 1 }}</td>
          <td>{{ item.depositDate }}</td>
          <td>{{ item.house }}</td>
          <td>{{ item.room }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.phoneNumber }}</td>
          <td>{{ formatCurrency(item.depositMoney) }}</td>
          <td>{{ item.comingDate }}</td>
          <td>{{ convertDepositRoomType(item.status) }}</td>
          <div
            class="tw-absolute tw-right-3 tw-top-[50%] tw-translate-y-[-50%] tw-hidden group-hover:tw-flex tw-space-x-2"
          >
            <div>
              <g-button
                class="bg-white !tw-ml-0 !tw-p-1 hover:!tw-bg-[#f3f3f3]"
              >
                <IconEdit />
              </g-button>
            </div>
            <div>
              <g-button
                class="bg-white !tw-ml-0 !tw-p-1 hover:!tw-bg-[#f3f3f3]"
              >
                <IconRemove class="!tw-ml-0" />
              </g-button>
            </div>
          </div>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
