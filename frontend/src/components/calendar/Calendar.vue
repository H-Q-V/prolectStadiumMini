<script setup>
import FullCalendar from "@fullcalendar/vue3";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
const calendarOptions = {
  plugins: [timeGridPlugin, interactionPlugin],
  initialView: "timeGridWeek",
  weekends: true,
  events: [
    {
      title: "event 1",
      start: "2024-07-17T10:00:00",
      end: "2024-07-17T12:00:00",
    },
  ],
};
</script>

<template>
  <FullCalendar :options="calendarOptions">
    <template v-slot:eventContent="arg">
      <b>{{ arg.timeText }}</b>
      <i>{{ arg.event.title }}</i>
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
