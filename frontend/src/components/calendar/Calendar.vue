<script setup>
import { ref, onMounted, watchEffect } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import { useBookPitch, useStadium } from "../../stores";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
const stadiumStore = useStadium();
const bookStore = useBookPitch();
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const stadiumstyle = ref([]);
const bookPitch = ref([]);
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
  slotMinTime: "05:00:00",
  slotMaxTime: "23:00:00",
  slotDuration: "01:30:00",
  navLinks: true,
  resourceAreaHeaderContent: "Sân vận động",
  resources: [],
  events: [],
  eventClick(info) {
    const stadiumStyleID = info.event._def.resourceIds;
    router.push(`/book-pitch/${id}/${stadiumStyleID}`);
  },
});

onMounted(async () => {
  await stadiumStore.getStadiumsStyle(id);
  await bookStore.getFreeTime(id);
});

watchEffect(() => {
  stadiumstyle.value = stadiumStore?.stadiumStyleData;
  const resources = stadiumstyle.value?.stadium_styles
    ? stadiumstyle.value?.stadium_styles.map((style) => ({
        id: style._id,
        title: `${style.name} (sân ${style.type})`,
      }))
    : [];

  calendarOptions.value.resources = resources;
});

watchEffect(() => {
  bookPitch.value = bookStore.bookPitchData;

  const events = bookPitch.value.flatMap((pitch) =>
    pitch.availableTimes.map((timeSlot) => ({
      resourceId: pitch.id,
      start: timeSlot.start,
      end: timeSlot.end,
      display: "background",
      color: "#c0c0c0",
    }))
  );
  calendarOptions.value.events = events;
});
</script>

<template>
  <FullCalendar :options="calendarOptions" />
</template>
<style scoped>
::v-deep .fc {
  padding: 20px 20px !important;
}
::v-deep .fc-scroller {
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}

::v-deep .fc-datagrid-cell-cushion {
  width: 100%;
}

::v-deep .fc-datagrid-cell-frame {
  text-align: center;
}

::v-deep .fc-license-message {
  display: none;
}
</style>
