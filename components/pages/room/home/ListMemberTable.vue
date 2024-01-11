<script setup>
import { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useMemberStore } from "@/store/member";
import IconRemove from "@/assets/svg/remove.svg";
import IconEdit from "@/assets/svg/edit.svg";
import ModalEditRoomHost from "../ModalEditRoomHost.vue";
import ModalEditRoomMember from "../ModalEditRoomMember.vue";
import { useToast } from "vue-toastification";

const props = defineProps({
  roomInfo: {
    type: Object,
    default: {},
  },
});

const route = useRoute();
const toast = useToast();
const fetchRoomEventBus = useEventBus(`fetch-room-${route.params.roomId}`);

const emit = defineEmits(["fetchRoomDetail"]);

const memberStore = useMemberStore();

const headers = [
  {
    title: "STT",
    sortable: false,
    key: "STT",
    width: "73px",
  },
  {
    title: "Họ và tên",
    sortable: false,
    key: "fullName",
    width: "213px",
  },
  {
    title: "Giới tính",
    sortable: false,
    key: "gender",
    width: "150px",
  },
  {
    title: "CMND/CCCD",
    sortable: false,
    key: "identify_code",
    width: "150px",
  },
  {
    title: "Địa chỉ",
    sortable: false,
    key: "address",
    width: "213px",
  },
  {
    title: "Điện thoại",
    sortable: false,
    key: "phone",
    width: "150px",
  },
  {
    title: "Số xe",
    sortable: false,
    key: "vehicle_number",
    width: "150px",
  },
  {
    title: "Ngày bắt đầu",
    sortable: false,
    key: "start_date",
  },
];

const roomMembers = ref([]);
const isShowAddRoomHost = ref(false);
const isShowAddRoomMember = ref(false);
const userInfo = ref(null);
const isShowConfirmDeleteMember = ref(false);
const isShowConfirmDeleteHost = ref(false);
const roomInfo = ref({});
const isHavingContract = ref(false);

const getAllMemberInRoom = async () => {
  const res = await memberStore.getAllMemberInRoom(route.params.roomId);
  if (res.data) {
    roomMembers.value = res.data.roomMembers;
  }
};

getAllMemberInRoom();

const handleEdit = (e) => {
  userInfo.value = e;
  if (e.isHost) {
    isShowAddRoomHost.value = true;
  } else {
    isShowAddRoomMember.value = true;
  }
};

const handleConfirmDeleteMember = (e) => {
  if (e.isHost) {
    isShowConfirmDeleteHost.value = true;
  } else {
    isShowConfirmDeleteMember.value = true;
  }
  userInfo.value = e;
};

const handleRemoveMember = async (e) => {
  const res = await memberStore.deleteMember(e._id);
  if (res.data) {
    toast.success("Xóa thành viên trong phòng thành công!");
    isShowConfirmDeleteHost.value = false;
    isShowConfirmDeleteMember.value = false;
    getAllMemberInRoom().then((e) => {
      if (roomMembers.value.length === 0) {
        useRouter().back();
      }
    });
    emit("fetchRoomDetail");
  }
  if (res.error) {
    toast.error(res.error.data.message);
  }
};

fetchRoomEventBus.on(() => {
  getAllMemberInRoom();
});

watch(
  () => props.roomInfo,
  (newVal) => {
    roomInfo.value = newVal;
    if (roomInfo.value.contractId) {
      isHavingContract.value = true;
    }
  }
);
</script>
<template>
  <v-data-table :headers="headers" class="s-table" :items="roomMembers">
    <template #item="{ item, index }">
      <tr class="tw-relative tw-group hover:tw-bg-[e3e3e3]">
        <td class="tw-text-center">{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.gender || "Không có" }}</td>
        <td>{{ item.identify_code || "Không có" }}</td>
        <td>
          {{ item.address || "Không có" }}
        </td>
        <td>{{ item.phone || "Không có" }}</td>
        <td>{{ item.vehicle_number || "Không có" }}</td>
        <td>
          {{ convertDateType(item.date_start, "DD/MM/YYYY") || "Không có" }}
        </td>
        <div
          class="tw-absolute tw-right-3 tw-top-[50%] tw-translate-y-[-50%] tw-hidden group-hover:tw-flex tw-space-x-2"
        >
          <div>
            <g-button
              class="!tw-ml-0 !tw-p-1"
              variant="bezeled"
              @click="handleEdit(item)"
            >
              <IconEdit />
            </g-button>
          </div>
          <div>
            <g-button
              class="!tw-ml-0 !tw-p-1"
              variant="bezeled"
              @click="handleConfirmDeleteMember(item)"
            >
              <IconRemove class="!tw-ml-0" />
            </g-button>
          </div>
        </div>
      </tr>
    </template>
  </v-data-table>
  <v-dialog v-model="isShowAddRoomHost" width="544">
    <ModalEditRoomHost
      @close="isShowAddRoomHost = false"
      :userInfo="userInfo"
      :isHavingContract="isHavingContract"
    />
  </v-dialog>
  <v-dialog v-model="isShowAddRoomMember" width="544">
    <ModalEditRoomMember
      @close="isShowAddRoomMember = false"
      :userInfo="userInfo"
    />
  </v-dialog>
  <g-modal-confirm
    v-model="isShowConfirmDeleteHost"
    title="Xóa chủ phòng?"
    description="Nếu xóa chủ phòng, tất cả thành viên sẽ bị xóa theo"
    @ok="handleRemoveMember(userInfo)"
  ></g-modal-confirm>
  <g-modal-confirm
    v-model="isShowConfirmDeleteMember"
    title="Xóa thành viên?"
    description="Một khi đã xóa, không thể phục hồi lại"
    @ok="handleRemoveMember(userInfo)"
  ></g-modal-confirm>
</template>
