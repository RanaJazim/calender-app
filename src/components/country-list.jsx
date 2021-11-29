import { useEffect, useState } from "react";
import { fetchAllCountries } from "../apis/calender";
import AppLoading from "./app-loading";

export default function CountryList() {
  const [countries, setCountries] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchAllCountries().then((res) => {
      const countries = res.data.response.countries;
      setCountries(countries);
      setIsLoading(false);
      console.log(countries);
    });
  }, []);

  return (
    <>
      {isLoading && <AppLoading />}
      {countries && (
        <div className="form-group">
          <label>Select Country:</label>
          <select className="form-control">
            {countries.map((country) => (
              <option value={country["iso-3166"]} key={country.uuid}>
                {country.country_name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}
