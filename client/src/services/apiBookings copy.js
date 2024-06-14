import axios from "axios";
import { getToday } from "../utils/helpers";
import { PAGE_SIZE } from "../utils/constants";

const apiUrl = process.env.REACT_APP_API_URL; // Get the base API URL from the environment variable

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

    const response = await axios.get(`${apiUrl}/api/bookings`, {
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
    const response = await axios.get(`${apiUrl}/api/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
}

export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  try {
    const response = await axios.put(`${apiUrl}/api/bookings/${id}`, obj);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
}

export async function deleteBooking(id) {
  try {
    const response = await axios.delete(`${apiUrl}/api/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
}
