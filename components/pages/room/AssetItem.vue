<script setup>
import { useToast } from "vue-toastification";
import { useAssetStore } from "~/store/assets";

const props = defineProps({
  item: {
    type: Object,
    default: {},
  },
  index: {
    type: Number,
    default: 0,
  },
  roomAssets: {
    type: Array,
    default: [],
  },
});

const route = useRoute();
const toast = useToast();

const assetStore = useAssetStore();

const activeAsset = ref(false);

const getAsset = () => {
  const found = props.roomAssets.find((item) => item.name === props.item.name);
  if (found) {
    activeAsset.value = true;
  }
};
getAsset();

watch(
  () => activeAsset.value,
  async (newVal) => {
    if (newVal) {
      await assetStore
        .addAssetToRoom(route.params.roomId, props.item._id)
        .then(() =>
          toast.success(`Thêm ${props.item.name} vào phòng thành công!`)
        );
    } else {
      await assetStore
        .deleteAssetFromRoom(route.params.roomId, props.item._id)
        .then(() => toast.success(`Xóa ${props.item.name} thành công!`));
    }
  }
);
</script>
<template>
  <tr class="tw-relative tw-group hover:tw-bg-[e3e3e3]">
    <td class="tw-text-center">{{ index + 1 }}</td>
    <td>{{ item.name }}</td>
    <td>
      {{ formatCurrency(item.price) }}
    </td>
    <td>{{ item.note }}</td>
    <td>
      <g-switch v-model="activeAsset" @click="handleActiveStatus"></g-switch>
    </td>
  </tr>
</template>
