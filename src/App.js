import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
    const [temp, setTemp] = useState(0);
    const [locationfield, setLocationfield] = useState("");
    const [location, setLocation] = useState("bihar sharif");
    const [text, setText] = useState("");
    const [icon, setIcon] = useState("");
    const [locatime, setLocaltime] = useState("");

    const fetchApi = async () => {
        try {
            const url = `https://api.weatherapi.com/v1/current.json?key=5b27a6ef3547402582e62007222306&q=${location}`;

            const response = await axios.get(url);
            // const data = await response.json();

            // console.log(response);

            // destructuring

            const {
                current: {
                    temp_c,
                    condition: { text, icon },
                },
                location: { name, localtime },
            } = response.data;

            // console.log(typeof localtime, localtime)

            setTemp(temp_c);
            setLocation(name);
            setLocaltime(localtime);
            setIcon(icon);
            setText(text);
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect(fetchApi());
    useEffect(() => {
        fetchApi();
    });

    const submitHandler = (e) => {
        e.preventDefault();

        setLocation(locationfield);
        // console.log(location);

        setLocationfield("");
    };

    return (
        <>
            <div className="container">
                <div className="weather">
                    <div className="weather1">{temp} °C</div>
                    <div className="weather2">
                        <p>{location}</p>
                        <span>{locatime}</span>
                    </div>

                    <div className="weather3">
                        <p>
                            <img src={icon} alt="condition" />
                        </p>
                        <span>{text}</span>
                    </div>
                </div>
            </div>
            <nav>
                <form onSubmit={submitHandler}>
                    <input
                        type="text"
                        placeholder="Search Location"
                        className="searchField"
                        required
                        value={locationfield}
                        onChange={(e) => setLocationfield(e.target.value)}
                    />
                    <button type="submit">Search</button>
                </form>
            </nav>
        </>
    );
}

export default App;
