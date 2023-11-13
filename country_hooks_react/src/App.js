import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (name) {
      axios
        .get(`https://restcountries.com/v3.1/name/${name}`)
        .then((response) => {
          const data = response.data;
          console.log("Data from API:", data);
          if (data && data.length > 0) {
            setCountry({ data: data[0], found: true });
          } else {
            setCountry({ found: false });
          }
        })
        .catch((error) => {
          console.error("API request failed:", error);
          setCountry({found: false });
        });
    }
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  console.log("country data in COuntry", country);

  if (!country) {
    return null;
  }

  if (country.found === false) {
    return <div>not found...</div>;
  }

  return (
    <div>
      {country && (
        <div>
          <h3>{country.data.name.common} </h3>
          <div>capital {country.data.capital} </div>
          <div>population {country.data.population}</div>
          <br />

          <img
            src={country.data.flags.svg}
            height="100"
            alt={`alt=${country.data.flags.alt}`}
          />
        </div>
      )}
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
