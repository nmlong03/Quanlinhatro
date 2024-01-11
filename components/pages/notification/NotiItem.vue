<script setup>
import IconDelete from "@/assets/svg/delete.svg";
import { useToast } from "vue-toastification";
import { useNotificationStore } from "~/store/notification";
import IconDone from "@/assets/svg/done.svg";
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});

const route = useRoute();
const toast = useToast();

const getListNotiEventBus = useEventBus(`get-list-noti`);

const notificationStore = useNotificationStore();

const isShowConfirmDeleteNoti = ref(false);

const handleRemoveNoti = async () => {
  const res = await notificationStore.deleteNotification(props.item._id);
  if (res.data) {
    toast.success("Xóa thông báo thành công!");
    isShowConfirmDeleteNoti.value = false;
    getListNotiEventBus.emit();
  }
};
</script>
<template>
  <article
    class="tw-rounded-xl tw-border-2 tw-border-gray-100 tw-bg-white tw-mb-5"
  >
    <div class="tw-w-full tw-justify-end tw-flex tw-p-4">
      <IconDelete
        class="tw-cursor-pointer"
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
      <strong class="tw--mb-[2px] tw--me-[2px] tw-inline-flex tw-items-center tw-gap-1 tw-rounded-ee-xl tw-rounded-ss-xl tw-bg-green-600 px-3 tw-py-1.5 tw-text-white">
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
