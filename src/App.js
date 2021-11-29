import { useEffect } from "react";
import { fetchYearlyHollidays } from "./apis/calender";

function App() {
  useEffect(() => {
    fetchYearlyHollidays().then((res) => {
      console.log(res.data.response.holidays);
    });
  }, []);

  return (
    <div>
      <p>Calender App</p>
    </div>
  );
}

export default App;
