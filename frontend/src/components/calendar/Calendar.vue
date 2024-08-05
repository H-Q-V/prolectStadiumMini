<script setup>
import FullCalendar from "@fullcalendar/vue3";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { onMounted, ref, computed, watchEffect } from "vue";
import { useBookPitch } from "../../stores";

const bookPitchData = ref([]);
const bookPitchStore = useBookPitch();

onMounted(async () => {
  await bookPitchStore.getAllBookPitches();
});

watchEffect(() => {
  bookPitchData.value = bookPitchStore.bookPitchData;
  console.log("🚀 ~ watchEffect ~ bookPitchData:", bookPitchData);
});

const calendarOptions = computed(() => ({
  plugins: [timeGridPlugin, interactionPlugin],
  initialView: "timeGridDay",
  weekends: true,
  slotMinTime: "00:00:00",
  slotMaxTime: "24:00:00",
  height: "auto",
  events: bookPitchData.value.map((pitch) => ({
    stadium_name: pitch.stadium_name,
    start: pitch.startTime,
    end: pitch.endTime,
    extendedProps: {
      id: pitch._id,
      stadium_name: pitch.stadium_name,
      name: pitch.name,
    },
  })),
}));
</script>

<template>
  <FullCalendar :options="calendarOptions">
    <template #eventContent="{ event }">
      <h1>{{ event.extendedProps.stadium_name }}</h1>
      <p class="capitalize">{{ event.extendedProps.name }}</p>
    </template>
  </FullCalendar>
</template>

<style scoped>
::v-deep .fc-scrollgrid-sync-table {
  display: none;
}

::v-deep .fc-scrollgrid-sync-inner {
  padding: 10px 10px;
}

::v-deep .fc-scroller {
  overflow-y: hidden !important;
}

::v-deep .fc-media-screen {
  padding: 20px 20px;
}
</style>
