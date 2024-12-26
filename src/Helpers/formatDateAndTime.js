export const formatDateAndTime = (createdAt) => {
  const date = new Date(createdAt);

  // Format date as "31 / 01 / 2024"
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).replace(/\//g, ' / ');

  // Format time as "05.30 PM"
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).replace(':', '.');

  return { formattedDate, formattedTime };
};

export const convertTo12HourFormat = (time24) => {
  if (!time24) {
    return ''; // Return an empty string or a default value if time24 is undefined or null
  }

  const [hours, minutes] = time24.split(':'); // Split the time into hours and minutes
  const hour = parseInt(hours, 10); // Convert hour part to an integer
  const minute = parseInt(minutes, 10); // Convert minute part to an integer
  
  const suffix = hour >= 12 ? 'PM' : 'AM'; // Check if it's AM or PM
  const hour12 = hour % 12 || 12; // Convert to 12-hour format (handles 12 AM/PM)
  const minuteFormatted = minute < 10 ? `0${minute}` : minute; // Format minutes with leading zero if needed

  return `${hour12}:${minuteFormatted} ${suffix}`; // Return formatted 12-hour time
}
