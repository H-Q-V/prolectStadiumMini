import { onMounted, ref, watch, watchEffect } from "vue";
import { useAddress } from "../stores/fetchAddress";

export const getAddress = () => {
  const addressStore = useAddress();
  const proviceData = ref([]);
  const cityData = ref([]);
  const wardData = ref([]);
  const provice = ref(null);
  const city = ref(null);
  const ward = ref(null);
  const proviceOptions = ref([]);
  const cityOptions = ref([]);
  const wardOptions = ref([]);

  onMounted(async () => {
    await addressStore.getAllProvince();
  });

  watchEffect(() => {
    proviceData.value = addressStore.provinceData;
    proviceOptions.value = proviceData.value.map((province) => ({
      id: province.id,
      name: province.name,
    }));
  });

  watch(provice, async (newProvince) => {
    const provinceID = newProvince.id;
    await addressStore.getCity(provinceID);
    cityData.value = addressStore.cityData;

    cityOptions.value = cityData.value.map((city) => ({
      id: city.id,
      name: city.name,
    }));
  });

  watch(city, async (newCity) => {
    const cityID = newCity.id;
    await addressStore.getWard(cityID);
    wardData.value = addressStore.wardData;

    wardOptions.value = wardData.value.map((ward) => ({
      id: ward.id,
      name: ward.full_name,
    }));
  });

  return {
    provice,
    city,
    ward,
    proviceOptions,
    cityOptions,
    wardOptions,
  };
};
