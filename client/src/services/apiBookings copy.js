import axios from "axios";
import { getToday } from "../utils/helpers";
import { PAGE_SIZE } from "../utils/constants";

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

    const response = await axios.get("http://DB_HOST:3000/api/bookings", {
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
      `http://DB_HOST:3000/api/bookings/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Booking not found");
  }
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
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

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    // .select('*')
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, obj) {
  try {
    const response = await axios.put(
      `http://DB_HOST:3000/api/bookings/${id}`,
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
      `http://DB_HOST:3000/api/bookings/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
}
