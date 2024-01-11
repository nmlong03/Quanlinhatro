<script setup>
import IconXMark from "@/assets/svg/x-mark.svg";
import IconClose from "@/assets/svg/close.svg";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useToast } from "vue-toastification";
import { usePaymentStore } from "~/store/payment";

const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});

console.log(props.item);

const toast = useToast();
const route = useRoute();

const emit = defineEmits(["close"]);
const fetchListPaymentEventBus = useEventBus(`fetch-list-payment`);

const paymentStore = usePaymentStore();

//store

const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().trim().required("Tên không được để trống"),
    type: yup.string().trim().required("Kiểu không được để trống"),
    details: yup.string().trim().required("Chi tiết không được để trống"),
    image: yup.string().trim(),
    isActive: yup.boolean().required(),
  }),
  initialValues: {
    name: props.item.name,
    type: props.item.type,
    details: props.item.details,
    isActive: true
  },
});

const validateFormData = reactive({
  name: defineComponentBinds("name"),
  type: defineComponentBinds("type"),
  details: defineComponentBinds("details"),
  isActive: defineComponentBinds("isActive"),
});
const loading = ref(false);
const image = ref(props.item.image);

//method

const handleUpdatePaymentMethod = handleSubmit(async () => {
  loading.value = true;
  const payload = { ...values };
  if (image) {
    payload.image = image.value;
  }
  const res = await paymentStore.updatePaymentMethod(props.item._id, payload);
  if (res.data) {
    loading.value = false;
    toast.success("Cập nhật thức thanh toán thành công!");
    fetchListPaymentEventBus.emit();
    emit("close");
  }
  if (res.error) {
    if (res.error.data?.message?.image) {
      toast.error(res.error.data?.message?.image);
    }
    loading.value = false;
  }
});
</script>
<template>
  <div class="modal-change-information">
    <div class="">
      <button
        @click="$emit('close')"
        class="modal-change-information__btn-close"
      >
        <IconClose />
      </button>
      <h5
        class="tw-text-center tw-text-xl tw-leading-6 tw-font-extrabold tw-mb-3 tw-mt-3"
      >
        Thêm phương thức thanh toán
      </h5>
    </div>
    <div class="modal-change-information__form">
      <div class="tw-mt-6 tw-flex-col tw-gap-y-4">
        <g-upload-image
          class="tw-mb-4"
          @remove="image = ''"
          @loading="(e) => (loading = e)"
          v-model="image"
        ></g-upload-image>
        <g-input
          label="Tên phương thức thanh toán"
          required
          v-bind="validateFormData.name"
          :error="errors.name"
        ></g-input>
        <g-input
          v-bind="validateFormData.type"
          :error="errors.type"
          class="tw-pt-4"
          label="Kiểu"
          required
        ></g-input>
        <g-input
          class="tw-pt-4"
          label="Ghi chú"
          v-bind="validateFormData.details"
          :error="errors.details"
          required
        >
        </g-input>
      </div>
      <hr class="tw-mt-8" />
    </div>
    <div
      class="tw-grid tw-grid-cols-2 tw-justify-between tw-gap-x-3 tw-bg-white tw-px-[24px] tw-py-[22px] tw-rounded-b-xl"
    >
      <g-button variant="bezeled" class="tw-w-full" @click="$emit('close')">
        <template #prepend>
          <IconXMark />
        </template>
        Hủy
      </g-button>
      <g-button @click="handleUpdatePaymentMethod" :loading="loading">
        Cập nhật
      </g-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
