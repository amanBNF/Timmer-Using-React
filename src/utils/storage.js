export const saveDailySession = (seconds) => {
  const today = new Date().toISOString().split("T")[0];
  const minutes = Math.floor(seconds / 60);
  const data = JSON.parse(localStorage.getItem("focusData")) || [];

  const existing = data.find(d => d.date === today);
  if (existing) {
    existing.minutes += minutes;
  } else {
    data.push({ date: today, minutes });
  }

  // Optional: sort chronologically for chart display
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  localStorage.setItem("focusData", JSON.stringify(data));
};
