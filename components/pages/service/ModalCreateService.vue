<script setup>
import IconClose from "@/assets/svg/close.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
import IconRequired from "@/assets/svg/required.svg";
import IconCalendar from "@/assets/svg/manage-student/calendar.svg";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useToast } from "vue-toastification";
import { useServiceStore } from "~/store/services";
//props

//composable
const toast = useToast();
const route = useRoute();
const fetchListServiceEventBus = useEventBus(`fetch-list-service`);

//emit

const emit = defineEmits("close");

//store

const serviceStore = useServiceStore();

//state
const note = ref("");
const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup
      .string()
      .trim("Tên không được bỏ trống ")
      .required("Tên dịch vụ là trường bắt buộc")
      .min(3, "Tên tối thiểu 3 ký tự"),
    price: yup
      .number()
      .typeError("Giá dịch vụ phải là số")
      .required("Giá dịch vụ là trường bắt buộc")
      .min(0, "Giá phải lớn hơn 0"),
    type: yup
      .string()
      .trim("Loại dịch vụ không được bỏ trống ")
      .required("Loại dịch vụ là trường bắt buộc")
      .min(3, "Loại dịch vụ tối thiểu 3 ký tự"),
    isActive: yup.string().required("Trạng thái là trường bắt buộc"),
  }),
});
const isActive_data = [
  {
    title: "Hoạt động",
    status: true,
  },
  {
    title: "Không hoạt động",
    status: false,
  },
];
const typeService_data = [
  {
    title: "ĐIỆN",
    status: "ĐIỆN",
  },
  {
    title: "NƯỚC",
    status: "NƯỚC",
  },
  {
    title: "KHÁC",
    status: "KHÁC",
  },
];
const validateFormData = reactive({
  name: defineComponentBinds("name"),
  price: defineComponentBinds("price"),
  type: defineComponentBinds("type"),
  isActive: defineComponentBinds("isActive"),
});

const formData = reactive({});

const loading = ref(false);

//methods

const createService = handleSubmit(async () => {
  loading.value = true;
  //   const status = values.isActive == "Hoạt động" ? true : false;
  const payload = {
    ...values,
    isActive: values.isActive == "Hoạt động" ? true : false,
    note: String(note?._value),
  };
  const res = await serviceStore.createService(payload);
  if (res.data !== null) {
    fetchListServiceEventBus.emit();
    toast.success("Tạo dịch vụ thành công!");
    loading.value = false;
    emit("close");
  }
  if (res.error !== null) {
    loading.value = false;
    // console.log(res.error.data.message);
    for (const key in res.error.data.message) {
      if (Object.prototype.hasOwnProperty.call(res.error.data.message, key)) {
        toast.error(`${res.error.data.message[key]}`);
      }
    }
  }
});
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
        class="tw-text-center tw-text-xl tw-leading-6 tw-font-extrabold tw-mb-3 tw-mt-3"
      >
        Thêm mới dịch vụ
      </h5>
    </div>
    <div class="modal-change-information__form">
      <div class="tw-mt-6 tw-flex-col tw-gap-y-4">
        <g-input
          label="Tên dịch vụ"
          required
          v-bind="validateFormData.name"
          :error="errors.name"
        ></g-input>
        <g-input
          class="tw-pt-4"
          label="Giá dịch vụ"
          required
          v-bind="validateFormData.price"
          :error="errors.price"
        >
        </g-input>
        <g-select
          class="tw-pt-4"
          label="Loại dịch vụ"
          :items="typeService_data"
          required
          v-bind="validateFormData.type"
          :error="errors.type"
        >
        </g-select>
        <div class="tw-gap-y-1 tw-grid tw-pt-4">
          <p>Ghi chú</p>
          <textarea
            :value="note"
            @input="note = $event.target.value"
            class="tw-resize-none tw-rounded-[10px] tw-bg-white tw-outline tw-p-3 !tw-outline-[#c0c0c0] tw-outline-[1px] focus:!tw-outline-[#f88125] tw-w-full tw-h-[158px] focus:!tw-shadow-[0px_0px_0px_2px_rgba(248,129,37,0.2)]"
          ></textarea>
        </div>
        <g-select
          class="tw-pt-4"
          label="Trạng thái"
          :items="isActive_data"
          required
          v-bind="validateFormData.isActive"
          :error="errors.isActive"
        >
        </g-select>
      </div>
    </div>
    <div
      class="tw-grid tw-grid-cols-2 tw-justify-between tw-gap-x-3 tw-bg-white tw-px-[24px] tw-py-[22px] tw-rounded-b-xl"
    >
      <g-button variant="bezeled" class="tw-w-full" @click="emit('close')">
        <template #prepend>
          <IconXMark />
        </template>
        Hủy
      </g-button>
      <g-button @click="createService" :loading="loading">Tạo</g-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
