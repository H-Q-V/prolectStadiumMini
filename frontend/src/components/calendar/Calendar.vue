<script setup>
import { ref, onMounted, watchEffect } from "vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import interactionPlugin from "@fullcalendar/interaction";
import { useBookPitch, useStadium } from "../../stores";
import { useRoute, useRouter } from "vue-router";
import Dialog from "primevue/dialog";
import { formatDateTime } from "../../utils";
import Button from "primevue/button";

const stadiumStore = useStadium();
const bookStore = useBookPitch();
const route = useRoute();
const router = useRouter();
const id = route.params.id;
const stadiumstyle = ref([]);
const bookPitch = ref([]);
const showTime = ref(false);
const start = ref("");
const end = ref("");
const stadiumStyleID = ref("");
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
  slotMaxTime: "22:00:00",
  slotDuration: "01:30:00",
  resourceAreaHeaderContent: "Sân vận động",
  selectable: true,
  resources: [],
  events: [],
  select(info) {
    start.value = info.startStr;
    end.value = info.endStr;
    stadiumStyleID.value = info.resource.id;
    showTime.value = true;
  },
  selectOverlap(event) {
    return event.color === "#f0f0f0";
  },
});

onMounted(async () => {
  await stadiumStore.getStadiumsStyle(id);
  await bookStore.getBooked(id);
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
  const currentTime = new Date();
  const pastTime = {
    start: new Date(currentTime.getFullYear(), 0, 1),
    end: currentTime,
    display: "background",
    color: "#f0f0f0",
    allDay: true,
  };

  const events = [
    pastTime,
    ...bookPitch.value.flatMap(
      (pitch) =>
        pitch?.bookedTimes?.map((timeSlot) => ({
          resourceId: pitch.id,
          start: timeSlot.start,
          end: timeSlot.end,
          display: "background",
          color: "#C7253E",
        })) || []
    ),
  ];
  calendarOptions.value.events = events;
});
const confirm = () => {
  router.push({
    path: `/book-pitch/${id}/${stadiumStyleID.value}`,
    query: { start: start.value, end: end.value },
  });
};
</script>

<template>
  <FullCalendar :options="calendarOptions" />
  <Dialog
    header="Đặt lịch"
    :visible.sync="showTime"
    v-model:visible="showTime"
    :modal="true"
    class="w-[380px] px-3 py-3"
  >
    <p>Thời gian bắt đầu: {{ formatDateTime(start) }}</p>
    <p>Thời gian kết thúc: {{ formatDateTime(end) }}</p>
    <div class="flex justify-end gap-2 mt-2">
      <Button
        type="button"
        label="Hủy"
        severity="secondary"
        @click="showTime = false"
        class="bg-blue-500 px-4 py-2 text-white"
      ></Button>
      <Button
        type="button"
        label="Xác nhận"
        @click="confirm"
        class="bg-red-500 px-4 py-2 text-white"
      ></Button>
    </div>
  </Dialog>
</template>

<style scoped>
::v-deep .fc {
  padding: 20px 20px !important;
}
::v-deep .fc-scroller {
  overflow-x: hidden !important;
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
