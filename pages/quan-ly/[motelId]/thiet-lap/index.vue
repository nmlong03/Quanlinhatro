<script setup>
import { useContractStore } from "@/store/contract";
import { useToast } from "vue-toastification";

const toast = useToast();

const contractStore = useContractStore();

const contract = ref(null);
const loading = ref(false);

const getSampleContract = async () => {
  const res = await contractStore.getSampleContract();
  if (res.data) {
    contract.value = res.data.contract.sample_contract;
  }
};
getSampleContract();

const updateSampleContract = async () => {
  loading.value = true;
  const payload = { sample_contract: contract.value };
  const res = await contractStore.updateSampleContract(payload);
  if (res.data) {
    getSampleContract();
    loading.value = false;
    toast.success("Chỉnh sửa hợp đồng mẫu thành công")
  }
};
</script>
<template>
  <span class="tw-text-[16px] tw-font-bold">Chỉnh sửa hợp đồng mẫu</span>
  <div class="tw-w-full tw-flex tw-justify-center tw-mt-4">
    <div class="tw-w-[80%] tw-flex tw-flex-col tw-gap-y-4">
      <quill-editor
        id="exportAll"
        v-model:content="contract"
        contentType="html"
        toolbar="full"
        theme="snow"
        class=""
      />
      <g-button
        class="tw-w-[20%]"
        @click="updateSampleContract"
        :loading="loading"
        >Cập nhật hợp đồng mẫu</g-button
      >
    </div>
  </div>
</template>
