<script setup>
import IconClose from "@/assets/svg/close.svg";
import IconXMark from "@/assets/svg/x-mark.svg";
// import * as yup from "yup";
import { useForm } from "vee-validate";
import { useToast } from "vue-toastification";
import { useMotelStore } from "@/store/motel";
//props
const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
});
//composable

const emit = defineEmits(["close"]);
const fetchListMotel = useEventBus(`fetch-list-motel`);
const toast = useToast();
const route = useRoute();

//store
const motelStore = useMotelStore();

//state
const { values, errors, defineComponentBinds, handleSubmit } = useForm({});

// const validateFormData = reactive({
//   password: defineComponentBinds("password"),
// });

const loading = ref(false);

//methods
const deleteMotel = handleSubmit(async () => {
  loading.value = true;
  const res = await motelStore.deleteMotel(props.item._id);
  if (res.data) {
    loading.value = false;
    toast.success("Xoá nhà trọ thành công!");
    emit("close");
    fetchListMotel.emit();
  }
  if (res.error) {
    loading.value = false;
    toast.error(res.error.data.message);
    emit("close");
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
        Xoá nhà trọ
        <span class="tw-italic tw-text-red-600">"{{ props.item.name }}"</span>
      </h5>
    </div>
    <div class="modal-change-information__form">
      <p>
        Sau khi thực hiện hành động xoá thì mọi thông tin về cơ sở nhà trọ này
        sẽ bị mất và KHÔNG THỂ KHÔI PHỤC
      </p>
      <!-- <div class="tw-flex-col tw-gap-y-4">
        <g-input
          class="tw-pt-4"
          label="Mật khẩu"
          required
          v-bind="validateFormData.password"
          :error="errors.password"
        ></g-input>
      </div> -->
    </div>
    <div
      class="tw-grid tw-grid-cols-2 tw-justify-between tw-gap-x-3 tw-bg-white tw-px-[24px] tw-py-[22px] tw-rounded-b-xl"
    >
      <g-button :loading="loading" @click="deleteMotel">Xoá</g-button
      ><g-button variant="bezeled" class="tw-w-full" @click="$emit('close')">
        <template #prepend>
          <IconXMark />
        </template>
        Hủy
      </g-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
