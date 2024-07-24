<script setup>
import FullCalendar from "@fullcalendar/vue3";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useBookPitch } from "../../stores/fetchBookPitch";
import { onMounted, ref, watch, computed, watchEffect } from "vue";

const bookPitchData = ref([]);
const bookPitchStore = useBookPitch();

onMounted(async () => {
  await bookPitchStore.getAllBookPitches();
});

watchEffect(() => {
  bookPitchData.value = bookPitchStore.bookPitchData;
});

const calendarOptions = computed(() => ({
  plugins: [timeGridPlugin, interactionPlugin],
  initialView: "timeGridWeek",
  weekends: true,
  events: bookPitchData.value.map((pitch) => ({
    stadium_name: pitch.stadium_name,
    start: pitch.startTime,
    end: pitch.endTime,
    extendedProps: {
      stadium_name: pitch.stadium_name,
      name: pitch.name,
    },
  })),
}));
</script>

<template>
  <FullCalendar :options="calendarOptions">
    <template v-slot:eventContent="arg" class="w-[250px]">
      <h1>{{ arg.event.extendedProps.stadium_name }}</h1>
      <p class="capitalize">{{ arg.event.extendedProps.name }}</p>
      <b>{{ arg.timeText }}</b>
    </template></FullCalendar
  >
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
</style>
