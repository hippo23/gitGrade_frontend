import { useRef, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { postAccountRequest } from "../../../../api/sql_api";

const SignupCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [role, setRole] = useState("");

  const addressRef = useRef(null);

  const submitRequestListener = () => {
    const data = {
      email: email,
      firstname: firstname,
      middlename: middlename,
      lastname: lastname,
      password: password,
      role: role,
      birthday: birthday,
      address: address,
    };
    console.log(birthday)

    postAccountRequest(data);
  };

  useEffect(() => {
    const loadGoogleMapsApi = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${
        import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY
      }&libraries=places&callback=initAutocomplete`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    window.initAutocomplete = () => {
      const autocomplete = new window.google.maps.places.Autocomplete(
        addressRef.current
      );
      autocomplete.setTypes(["geocode"]);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        console.log("Selected address:", place.formatted_address); // Handle the selected address here
      });
    };

    loadGoogleMapsApi();
  }, []);

  return (
    <div className="border-[1px] border-gray-300 bg-white w-[35rem] h-[40rem] p-[2rem] flex flex-col shadow-lg overflow-y-auto">
      <div className="flex flex-col items-start justify-start mb-[2rem]">
        <h1 className="font-bold text-[2rem] mb-[0.3rem]">Submit a request.</h1>
        <p className="text-black text-[0.9rem]">
          Enter your details below to register for an STCF-RS account.
        </p>
      </div>
      <div className="grid grid-rows-[1fr_1fr_1fr] mb-[1rem] text-[0.85rem]">
        <div className="w-full h-fit flex flex-col">
          <p className="text-[0.85rem mb-[0.3rem]]">Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-b-[1px] border-gray-400 w-full px-[0] py-[0.5rem] focus:border-blue-400 focus:outline-none"
          ></input>
        </div>
        <div class="w-full mb-[2rem] grid grid-cols-3 gap-[1rem]">
          <div className="w-full">
            <p className="">First Name</p>
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              type="text"
              className="w-full border-b-[1px] border-gray-400 px-[0] py-[0.5rem] focus:border-blue-400 focus:outline-none"
            ></input>
          </div>
          <div className="w-full">
            <p>Middle Name</p>
            <input
              value={middlename}
              onChange={(e) => setMiddlename(e.target.value)}
              className="w-full border-b-[1px] border-gray-400 px-[0] py-[0.5rem] focus:border-blue-400 focus:outline-none"
            ></input>
          </div>
          <div className="w-full">
            <p>Last Name</p>
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full border-b-[1px] border-gray-400 px-[0] py-[0.5rem] focus:border-blue-400 focus:outline-none"
            ></input>
          </div>
        </div>
        <div className="w-full h-fit flex flex-col">
          <p className="text-[0.85rem] mb-[0.3rem]">Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b-[1px] border-gray-400 w-full px-[0] py-[0.5rem] focus:border-blue-400 focus:outline-none"
          ></input>
        </div>
      </div>
      <div className="mb-[2rem]">
        <p className="text-[0.85rem] mb-[0.3rem]">Address</p>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          ref={addressRef}
          className="border-b-[1px] border-gray-400 w-full px-[0] py-[0.5rem] focus:border-blue-400 focus:outline-none"
        ></input>
      </div>
      <div className="w-fit mb-[2rem]">
        <p className="text-[0.85rem] mb-[0.2rem]">Birthday</p>
        <input
          onChange={(e) => setBirthday(e.target.value)}
          type="date"
          className="w-full border-b-[1px] border-gray-400 px-[0] py-[0.5rem] text-gray-700 focus:border-blue-400 focus:outline-none"
        ></input>
      </div>
      <div className="w-full mb-[2rem] flex flex-col">
        <p className="mb-[0.5rem]">What position do you hold?</p>
        <div
          className="w-fit flex items-center justify-between"
          onChange={(e) => setRole(e.target.value)}
        >
          <div className="flex items-center mr-[1rem]">
            <input
              className="mr-[0.2rem]"
              type="radio"
              value="student"
              name="role"
            />
            <p>Student</p>
          </div>
          <div className="flex items-center mr-[1rem]">
            <input
              className="mr-[0.2rem]"
              type="radio"
              value="employee"
              name="role"
            />
            <p>Employee</p>
          </div>
        </div>
      </div>
      <div className="mb-[2rem] w-full flex">
        <button
          onClick={submitRequestListener}
          className="w-full p-[0.7rem] bg-yellow-300 hover:bg-yellow-400 hover:shadow-md"
        >
          Submit request
        </button>
      </div>
      <div className="flex items-center">
        <p className="text-[0.8rem]">
          Already have an account? Click{" "}
          <NavLink
            className="text-blue-500 underline"
            to="/authentication/login"
          >
            here
          </NavLink>{" "}
          to sign in.
        </p>
      </div>
    </div>
  );
};

export default SignupCard;
