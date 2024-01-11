import IconPhong from "@/assets/svg/menu/phong.svg";
import IconDichVu from "@/assets/svg/menu/dich-vu.svg";
import IconSoDienNuoc from "@/assets/svg/menu/so-dien.svg";

//route
const route = useRoute();
//state

//store

const menu = computed(() => {
  const motelId = route.params.motelId;
  return [
    {
      text: "Thông tin phòng",
      path: `/quan-ly-guest/${route.params.guestId}/thong-tin-phong`,
      icon: IconPhong,
      mainPath: "thong-tin-phong",
    },
    {
      text: "Hóa đơn",
      path: `/quan-ly-guest/${route.params.guestId}/hoa-don`,
      icon: IconSoDienNuoc,
      mainPath: "hoa-don",
    },
    {
      text: "Thông báo",
      path: `/quan-ly-guest/${route.params.guestId}/thong-bao`,
      icon: IconDichVu,
      mainPath: "thong-bao",
    },
  ];
});

const listMenu = computed(() => {
  const path = route.path;
  if (path.startsWith("")) {
    return menu.value;
  }
  return [];
});

export default listMenu;
