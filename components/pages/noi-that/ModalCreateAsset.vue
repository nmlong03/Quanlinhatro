<script setup>
import IconXMark from "@/assets/svg/x-mark.svg";
import IconClose from "@/assets/svg/close.svg";
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useAssetStore } from "~/store/assets";
import { useToast } from "vue-toastification";

//composable

const toast = useToast();
const route = useRoute();

const emit = defineEmits(["close"]);
const fetchListAssetEventBus = useEventBus(
  `get-list-asset-${route.params.motelId}`
);

//store

const assetStore = useAssetStore();

const { values, errors, defineComponentBinds, handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().required("Tên không được bỏ trống"),
    price: yup.number().required("Giá không được để trống").positive("Giá phải lớn hơn 0").typeError("Giá phải là số"),
    description: yup.string(),
  }),
  //  .positive("Số khách tối đa phải lớn hơn 0")
  //   .required("Khách tối đa không được để trống"),
});

const validateFormData = reactive({
  name: defineComponentBinds("name"),
  price: defineComponentBinds("price"),
  description: defineComponentBinds("description"),
});

const handleAddAsset = handleSubmit(async () => {
  const payload = {
    name: validateFormData.name.modelValue,
    price: validateFormData.price.modelValue,
    note: validateFormData.description.modelValue,
  };
  const res = await assetStore.createNewAsset(payload);
  if (res.data) {
    toast.success("Tạo nội thất mới thành công!");
    fetchListAssetEventBus.emit();
    emit("close");
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
        Thêm nội thất
      </h5>
    </div>
    <div class="modal-change-information__form">
      <div class="tw-mt-6 tw-flex-col tw-gap-y-4">
        <g-input
          label="Tên"
          required
          v-bind="validateFormData.name"
          :error="errors.name"
        ></g-input>

        <g-input
          class="tw-pt-4"
          label="Giá"
          v-bind="validateFormData.price"
          :error="errors.price"
          required
        >
        </g-input>
        <g-input
          class="tw-pt-4"
          label="Miêu tả"
          v-bind="validateFormData.description"
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
      <g-button @click="handleAddAsset">Thêm</g-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import url("./index.scss");
</style>
