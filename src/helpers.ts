export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  // Extract date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  // const seconds = String(date.getSeconds()).padStart(2, "0");

  // Format the date string
  const formattedDate = `${day}.${month}.${year} at ${hours}:${minutes}`;

  return formattedDate;
};