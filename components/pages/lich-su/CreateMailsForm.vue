<script setup>
import IconClose from "@/assets/svg/close.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useToast } from "vue-toastification";
import { useMailsStore } from "~/store/mails";
import { useUserStore } from "~/store/user";

//props

//composable
const toast = useToast();
const route = useRoute();
const fetchListMailsEventBus = useEventBus(`fetch-list-mails`);
//emit
const emit = defineEmits("close");
//store
const mailsStore = useMailsStore();
//state
const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    email_to: yup
      .string()
      .email("Email không đúng định dạng")
      .required("Đây là trường bắt buộc"),
    title: yup.string().required("Đây là trường bắt buộc"),
  }),
});
const validateFormData = reactive({
  email_to: defineComponentBinds("email_to"),
  title: defineComponentBinds("title"),
});
const contract = ref(null);
const loading = ref(false);
//methods
const handleSendMails = handleSubmit(async () => {
  const payload = {
    ...values,
    ...{ html: contract.value },
  };
  if (payload.html === null) {
    return toast.warning("Nội dung không được bỏ trống !!!");
  }
  loading.value = true;
  const res = await mailsStore.createMails(payload);
  if (res.data !== null) {
    fetchListMailsEventBus.emit();
    toast.success("Gửi mail thành công!");
    loading.value = false;
    emit("close");
  }
  if (res.error !== null) {
    // console.log(res.error.data.message);
    loading.value = false;
    toast.error("Lỗi gửi mail");
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
        Gửi hộp thư
      </h5>
    </div>
    <div class="modal-change-information__form">
      <div class="tw-mt-2 tw-flex-col tw-gap-y-4">
        <g-input
          class="tw-pt-4"
          label="Email nhận"
          placeholder="email@example.com"
          required
          v-bind="validateFormData.email_to"
          :error="errors.email_to"
        >
        </g-input>
        <g-input
          class="tw-pt-4"
          label="Tiêu đề"
          placeholder="Tiêu đề"
          required
          v-bind="validateFormData.title"
          :error="errors.title"
        >
        </g-input>
        <div class="tw-py-4">
          <quill-editor
            id="exportAll"
            v-model:content="contract"
            contentType="html"
            toolbar="full"
            theme="snow"
            style="height: 230px"
          />
        </div>
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
      <g-button @click="handleSendMails" :loading="loading">Gửi mail</g-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
#exportAll > .ql-editor > .ql-blank {
  height: 300px;
}
</style>
