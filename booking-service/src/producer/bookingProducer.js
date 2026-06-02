const kafka = require("../config/kafka");

const producer = kafka.producer();

const connectProducer = async () => {
  try {
    await producer.connect();
    console.log("Booking Service Kafka producer connected successfully");
  } catch (error) {
    console.error("Error connecting Kafka producer:", error);
  }
};

const publishBookingCreated = async (booking) => {
  await producer.send({
    topic: "booking-created",
    messages: [
      {
        key: booking._id.toString(),
        value: JSON.stringify({
          bookingId: booking._id,
          flightId: booking.flightId,
          userId: booking.userId,
          seatRow: booking.seatRow,
          seatNumber: booking.seatNumber,
        }),
      },
    ],
  });
};

module.exports = {
  connectProducer,
  publishBookingCreated,
};
