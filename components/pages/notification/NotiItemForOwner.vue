<script setup>
import IconDelete from "@/assets/svg/delete.svg";
import { useToast } from "vue-toastification";
import { useNotificationStore } from "~/store/notification";
import IconThreeDots from "@/assets/svg/bill-info.svg";
import IconDone from "@/assets/svg/done.svg";
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});

const route = useRoute();
const toast = useToast();

console.log(props.item);

const getListNotiEventBus = useEventBus(`get-list-noti`);

const notificationStore = useNotificationStore();

const isShowConfirmDeleteNoti = ref(false);

const handleRemoveNoti = async () => {
  const res = await notificationStore.deleteNotificationForOwner(
    props.item._id
  );
  if (res.data) {
    toast.success("Xóa thông báo thành công!");
    isShowConfirmDeleteNoti.value = false;
    getListNotiEventBus.emit();
  }
};

const handleUpdateNotiStatus = async (e) => {
  const payload = {
    status: e,
  };
  const res = await notificationStore.updateNotificationStatusForOwner(
    props.item._id,
    payload
  );
  if (res.data) {
    toast.success(`Đã cập nhật trạng thái thành ${e}`);
    getListNotiEventBus.emit();
  }
};
</script>
<template>
  <article
    class="tw-rounded-xl tw-border-2 tw-border-gray-100 tw-bg-white tw-mb-5"
  >
    <div class="tw-w-full tw-justify-end tw-flex tw-p-4">
      <div v-if="item.status !== 'Đã hoàn thành'">
        <IconThreeDots class="tw-cursor-pointer" />
        <v-menu activator="parent" class="tw-mt-3">
          <ul
            class="tw-bg-white tw-p-3 tw-rounded-t-[10px] tw-cursor-pointer hover:tw-bg-[#e3e3e3]"
            @click="handleUpdateNotiStatus('Chưa xử lý')"
            v-if="item.status !== 'Chưa xử lý'"
          >
            Cập nhật thành chưa xử lý
          </ul>
          <ul
            class="tw-bg-white tw-p-3 tw-rounded-t-[10px] tw-cursor-pointer hover:tw-bg-[#e3e3e3]"
            @click="handleUpdateNotiStatus('Đang xử lý')"
            v-if="item.status !== 'Đang xử lý'"
          >
            Cập nhật thành đang xử lý
          </ul>
          <ul
            class="tw-bg-white tw-p-3 tw-rounded-b-[10px] tw-cursor-pointer hover:tw-bg-[#e3e3e3]"
            @click="handleUpdateNotiStatus('Đã hoàn thành')"
            v-if="item.status !== 'Đã hoàn thành'"
          >
            Cập nhật thành đã hoàn thành
          </ul>
        </v-menu>
      </div>
      <IconDelete
        class="tw-cursor-pointer tw-ml-3"
        @click="isShowConfirmDeleteNoti = true"
      />
    </div>
    <div class="tw-flex tw-items-start tw-gap-4 tw-p-4 sm:tw-p-6 lg:tw-pr-8">
      <a href="#" class="block shrink-0">
        <img
          alt="Speaker"
          src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
          class="tw-h-14 tw-w-14 tw-rounded-lg tw-object-cover"
        />
      </a>

      <div>
        <h3 class="ftw-ont-medium sm:tw-text-lg">
          <a href="#" class="hover:tw-underline">
            {{ item.title }}
          </a>
        </h3>

        <p class="tw-line-clamp-2 tw-text-sm tw-text-gray-700">
          {{ item.content }}
        </p>

        <!-- <div class="tw-mt-2 sm:tw-flex sm:tw-items-center">
          <span class="tw-hidden sm:tw-block" aria-hidden="true">&middot;</span>

          <p class="tw-hidden sm:tw-block sm:tw-text-xs sm:tw-text-gray-500">
            Người gửi
            <a
              href="#"
              class="tw-font-medium tw-underline hover:tw-text-gray-700"
            >
              John
            </a>
          </p>
        </div> -->
      </div>
    </div>

    <div class="tw-flex tw-justify-end" v-if="item.status === 'Chưa xử lý'">
      <strong
        class="tw--mb-[2px] tw--me-[2px] tw-inline-flex tw-items-center tw-gap-1 tw-rounded-ee-xl tw-rounded-ss-xl tw-bg-red-600 px-3 tw-py-1.5 tw-text-white"
      >
        <span class="tw-text-[10px]tw-font-medium sm:tw-text-xs"
          >Chưa xử lý!</span
        >
      </strong>
    </div>
    <div class="tw-flex tw-justify-end" v-if="item.status === 'Đang xử lý'">
      <strong
        class="tw--mb-[2px] tw--me-[2px] tw-inline-flex tw-items-center tw-gap-1 tw-rounded-ee-xl tw-rounded-ss-xl tw-bg-blue-600 px-3 tw-py-1.5 tw-text-white"
      >
        <span class="tw-text-[10px]tw-font-medium sm:tw-text-xs"
          >Đang xử lý</span
        >
      </strong>
    </div>
    <div class="tw-flex tw-justify-end" v-if="item.status === 'Đã hoàn thành'">
      <strong
        class="tw--mb-[2px] tw--me-[2px] tw-inline-flex tw-items-center tw-gap-1 tw-rounded-ee-xl tw-rounded-ss-xl tw-bg-green-600 px-3 tw-py-1.5 tw-text-white"
      >
        <span class="tw-text-[10px]tw-font-medium sm:tw-text-xs"
          >Đã xử lý!</span
        >
      </strong>
    </div>
  </article>
  <g-modal-confirm
    v-model="isShowConfirmDeleteNoti"
    title="Xóa thông báo này?"
    description="Hành động không thể hoàn tác"
    @ok="handleRemoveNoti"
  ></g-modal-confirm>
</template>
