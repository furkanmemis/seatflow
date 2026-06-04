const kafka = require("../config/kafka");

const producer = kafka.producer();

const connectProducer = async () => {
  try {
    await producer.connect();
    console.log("Flight Service Kafka producer connected successfully");
  } catch (error) {
    console.error("Error connecting Kafka producer:", error);
  }
};

const publishFlightBookingUpdate = async (bookingId, flightId, status) => {
  await producer.send({
    topic: "flight-booking-updates",
    messages: [
      {
        key: bookingId,
        value: JSON.stringify({
          bookingId: bookingId,
          flightId: flightId,
          status: status,
        }),
      },
    ],
  });
}

module.exports = {
  connectProducer,
  publishFlightBookingUpdate,
};