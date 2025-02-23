import { Dialog } from "@headlessui/react";

const BookingModal = ({ checkIn, checkOut, guests, property, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-lg font-semibold mb-4">Confirm Your Booking</h2>

        <div className="mb-4">
          <p className="text-gray-600">
            <strong>Property:</strong> {property.name}
          </p>
          <p className="text-gray-600">
            <strong>Location:</strong> {property.smart_location}
          </p>
          <p className="text-gray-600">
            <strong>Check-in:</strong> {checkIn}
          </p>
          <p className="text-gray-600">
            <strong>Check-out:</strong> {checkOut}
          </p>
          <p className="text-gray-600">
            <strong>Guests:</strong> {guests}
          </p>
        </div>

        <div className="flex justify-between">
          <button className="text-gray-600 hover:text-black" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
            Confirm Booking
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default BookingModal;
