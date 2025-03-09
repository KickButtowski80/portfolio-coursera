document.addEventListener("DOMContentLoaded", () => {
  const dateElement = document.querySelector(".today");
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthNames[month];
  dateElement.textContent = day;
  dateElement.setAttribute("data-month", `${monthName}`);

});
