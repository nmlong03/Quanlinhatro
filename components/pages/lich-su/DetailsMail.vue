<script setup>
import IconClose from "@/assets/svg/close.svg";
//props
const props = defineProps({
  data: {
    type: Object,
    default: {},
  },
});

//composable
//emit
const emit = defineEmits("close");
//store
//state
//methods
</script>
<template>
  <div class="modal-change-information">
    <div class="">
      <button
        @click="emit('close')"
        class="modal-change-information__btn-close"
      >
        <IconClose />
      </button>
      <h5
        class="tw-text-center tw-text-xl tw-leading-6 tw-font-extrabold tw-mb-3 tw-mt-3 tw-flex tw-items-center tw-justify-center"
      >
        Chi tiết mail
        <img
          src="https://i.ibb.co/MZ3ps00/t-i-xu-ng-1.png"
          v-if="props.data.status == 'success'"
          alt=""
          class="tw-w-[18px] tw-h-[18px] tw-ml-2"
          title="Đã gửi mail thành công"
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/4436/4436559.png"
          v-if="props.data.status == 'fail'"
          alt=""
          class="tw-w-[18px] tw-h-[18px] tw-ml-2"
          title="Gửi mail thất bại"
        />
      </h5>
      <div class="tw-px-10">
        <div>
          <h3 class="tw-font-bold tw-py-3">
            {{ props.data.title }}
          </h3>
        </div>
        <div class="tw-flex tw-justify-between">
          <span>Email : {{ props.data.email_to }}</span>
          <span>{{ props.data.createdAt }}</span>
        </div>
        <h3 class="tw-font-bold tw-py-2 tw-text-lg tw-pt-6">Nội dung :</h3>
      </div>
    </div>
    <div class="modal-change-information__form">
      <div class="tw-flex-wrap">
        <div v-html="props.data.content"></div>
      </div>
    </div>
    <div
      class="tw-grid tw-grid-cols-2 tw-justify-end tw-gap-x-3 tw-bg-white tw-px-[24px] tw-py-[22px] tw-rounded-b-xl"
    >
      <div></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
