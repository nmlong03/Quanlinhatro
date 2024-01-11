<script lang="ts" setup>
import IconUpload from "@/assets/svg/upload.svg";
import CloseIcon from "@/assets/svg/close.svg";
import { useToast } from "vue-toastification";
import { useUploadImagesStore } from "~/store/uploadImages";

const props = defineProps({
  modelValue: {},
});

//composable
const toast = useToast();

//store
const uploadStore = useUploadImagesStore();

//emit
const emit = defineEmits(["update:modelValue", "loading", "remove"]);

//state

// const avatar: any = ref(null);
const fileInputRef: any = ref(null);
const avatarName = ref("");

//method

const handleFileChange = async (event: any) => {
  emit("loading", true);
  const file = event.target.files[0];
  console.log(event.target.files[0]);
  const formData = new FormData();
  formData.append("images", file);
  const res: any = await uploadStore.uploadImages(formData);
  if (res.data) {
    emit("update:modelValue", res.data.data[0].url);
    avatarName.value = event.target.files[0].name
  } else {
    toast.error("Tải lên thất bại.");
  }

  emit("loading", false);
};

// const truncateString = (str: string, maxLength: number) => {
//   if (str.length <= maxLength) {
//     return str;
//   }

//   const truncatedString = str.slice(0, maxLength - 3) + "..." + str.slice(-3);
//   return truncatedString;
// };

const handleRemoveAvatar = () => {
  avatarName.value = "";
  emit("update:modelValue", null);
  emit("remove");
};

const handleInputImg = () => {
  fileInputRef.value.click();
};
</script>

<template>
  <section class="">
    <p class="tw-mb-1">Tải ảnh</p>
    <div class="tw-flex tw-items-end">
      <div
        class="tw-w-[138px] tw-h-[138px] tw-border tw-bg-[#e9e9e9] tw-overflow-hidden tw-flex tw-justify-center tw-items-center tw-rounded-lg tw-relative"
      >
        <g-button
          for="imageInput"
          class="btn-bezeled-white !tw-px-3 !tw-py-1 !tw-rounded-full tw-absolute"
          v-if="!modelValue"
          @click="handleInputImg"
        >
          <IconUpload />
        </g-button>
        <input
          type="file"
          ref="fileInputRef"
          @change="handleFileChange"
          id="imageInput"
          class="tw-ml-4 tw-opacity-0 !tw-px-3 !tw-py-1 !tw-rounded-full !tw-cursor-pointer tw-hidden"
        />
        <div v-if="modelValue">
          <img
            :src="modelValue.toString()"
            class="tw-w-full tw-h-full tw-object-cover"
          />
        </div>
      </div>
      <div class="tw-relative">
        <input
          type="file"
          ref="fileInputRef"
          @change="handleFileChange"
          class="tw-ml-4 tw-opacity-0 tw-absolute tw-z-20 tw-w-[100px] tw-hidden"
        />
        <div class="tw-flex tw-items-center tw-space-x-3 tw-relative">
          <g-button
            size="none-size"
            class="btn-bezeled-white btn-rounded tw-py-2 tw-px-[14px] tw-ml-[14px]"
            @click="handleInputImg"
          >
            <span class="tw-text-black">Chọn ảnh</span>
          </g-button>
          <span class="tw-opacity-40" v-if="!modelValue"
            >Chưa có ảnh nào được chọn</span
          >
          <span class="" v-if="modelValue">{{ avatarName }}</span>
          <div
            v-if="modelValue"
            @click="handleRemoveAvatar"
            class="tw-absolute tw-z-10 tw-p-1 -tw-right-6 tw-rounded-full tw-bg-[#dbdbdb] hover:tw-opacity-75 tw-duration-200 tw-cursor-pointer"
          >
            <CloseIcon />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
