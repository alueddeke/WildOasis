import axios from "axios";
import moment from "moment";
import { PAGE_SIZE } from "../utils/constants";

const formatDate = (date) => moment(date).format("ddd, MMM DD YYYY");

export async function getBookings({ filter, sortBy, page }) {
  try {
    const params = {};
    if (filter) {
      params.status = filter.value;
    }
    if (sortBy) {
      params.sortBy = sortBy.field;
      params.sortDirection = sortBy.direction;
    }
    if (page) {
      params.page = page;
    }

    const response = await axios.get("http://localhost:3000/api/bookings", {
      params,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }
}

export async function getBooking(id) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/bookings/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
}

export async function getBookingsAfterDate(date) {
  try {
    const response = await axios.get("http://localhost:3000/api/bookings", {
      params: { afterDate: formatDate(date) },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
}

export async function getStaysAfterDate(date) {
  try {
    const formattedDate = formatDate(date);

    const response = await axios.get("http://localhost:3000/api/bookings", {
      params: { startDateAfter: formattedDate },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
}

export async function getStaysTodayActivity() {
  try {
    const response = await axios.get("http://localhost:3000/api/bookings", {
      params: { todayActivity: true },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
}

export async function updateBooking(id, obj) {
  try {
    const response = await axios.put(
      `http://localhost:3000/api/bookings/${id}`,
      obj
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
}

export async function deleteBooking(id) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/bookings/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
}
