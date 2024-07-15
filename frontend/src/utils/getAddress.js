import { onMounted, ref, watch, watchEffect } from "vue";
import { useAddress } from "../stores/fetchAddress";

export const getAddress = () => {
  const addressStore = useAddress();
  const provinceData = ref([]);
  const districtData = ref([]);
  const wardData = ref([]);
  const province = ref(null);
  const district = ref(null);
  const ward = ref(null);
  const provinceOptions = ref([]);
  const districtOptions = ref([]);
  const wardOptions = ref([]);

  onMounted(async () => {
    await addressStore.getAllProvince();
  });

  watchEffect(() => {
    provinceData.value = addressStore.provinceData;
    provinceOptions.value = provinceData.value.map((province) => ({
      id: province.id,
      name: province.name,
    }));
  });

  watch(province, async (newProvince) => {
    const provinceID = newProvince.id;
    await addressStore.getdistrict(provinceID);
    districtData.value = addressStore.districtData;

    districtOptions.value = districtData.value.map((district) => ({
      id: district.id,
      name: district.name,
    }));
  });

  watch(district, async (newDistrict) => {
    const districtID = newDistrict.id;
    await addressStore.getWard(districtID);
    wardData.value = addressStore.wardData;

    wardOptions.value = wardData.value.map((ward) => ({
      id: ward.id,
      name: ward.full_name,
    }));
  });

  return {
    province,
    district,
    ward,
    provinceOptions,
    districtOptions,
    wardOptions,
  };
};
