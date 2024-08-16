<script setup>
import { ref, onMounted } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";

const calendarEl = ref(null);

const calendarOptions = ref({
  plugins: [resourceTimelinePlugin, dayGridPlugin, interactionPlugin],
  timeZone: "UTC",
  headerToolbar: {
    left: "today prev,next",
    center: "title",
    right:
      "resourceTimelineDay,resourceTimelineTenDay,resourceTimelineMonth,resourceTimelineYear",
  },
  initialView: "resourceTimelineDay",
  scrollTime: "08:00",
  aspectRatio: 1.5,
  editable: true,
  selectable: true,
  resourceAreaHeaderContent: "Sân vận động",
  resources:
    "https://fullcalendar.io/api/demo-feeds/resources.json?with-nesting&with-colors",
});

onMounted(() => {
  const calendar = new FullCalendar.Calendar(
    calendarEl.value,
    calendarOptions.value
  );
  calendar.render();
});
</script>

<template>
  <div ref="calendarEl">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<style scoped>
::v-deep .fc {
  padding: 20px 20px;
}
::v-deep .fc-scroller {
  overflow-y: hidden !important;
}
</style>
