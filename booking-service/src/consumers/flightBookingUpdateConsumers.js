const kafka = require("../config/kafka");
const {updateBookingStatus} = require("../services/booking");

const consumer = kafka.consumer({
  groupId: "flight-booking-update-group",
});

const startConsumer = async () => {
  await consumer.connect();

  await consumer.subscribe({
    topic: "flight-booking-updates",
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const event = JSON.parse(message.value.toString());

      const {
        flightId,
        bookingId,
        status
      } = event;

      console.log("booking-updated event received:", event);

      if(status === "success") {
        console.log(`Booking ${bookingId} for flight ${flightId} was successful. Updating seat status... `+ new Date().toISOString());
        await updateBookingStatus(bookingId, "confirmed");
      } else {
        console.log(`Booking ${bookingId} for flight ${flightId} cancelled. No seat update needed. `+ new Date().toISOString());
        await updateBookingStatus(bookingId, "cancelled");
      }
    },
  });
}

module.exports = {startConsumer};