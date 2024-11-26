import { useRef, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import StudentIcon from "/src/assets/student.svg";
import TeacherIcon from "/src/assets/teacher.svg";
import StaffIcon from "/src/assets/admin.svg";

const InfosheetPageOne = ({ register, setValue, errors }) => {
  const addressRef = useRef(null);

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
        addressRef.current,
      );
      autocomplete.setTypes(["geocode"]);

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
          setValue("address", place.formatted_address); // Update form state
        }
      });
    };

    loadGoogleMapsApi();
  }, []);

  return (
    <div className="h-[50rem] w-[40rem] p-[2rem] flex flex-col items-center justify-start">
      <header className="mb-[4rem] h-fit w-full">
        <h1 className="font-bold text-[2rem]">Hello, there!</h1>
        <p className="text-gray-500">
          We just need you to fill out some info so that we can get to know you
          better.
        </p>
      </header>
      <div className="grid grid-rows-[auto_auto_auto] grid-cols-[1fr_1fr_1fr] w-full gap-[3rem]">
        <div className="min-h-[5rem] flex flex-col">
          <p>First Name</p>
          <input
            placeholder="Simon Benedict"
            className={`${
              errors.firstname ? "mb-[1rem]" : ""
            } w-full border-b-[1px] border-gray-400 px-[0] py-[0.5rem] focus:border-blue-400 focus:outline-none`}
            {...register("firstname", {
              required: "First name is required",
            })}
          ></input>
          {errors.firstname && (
            <div className="w-full flex h-fit bg-red-50 p-[0.2rem] text-[0.8rem] border-red-500 border-[1px] rounded-md text-center text-red-900 items-center justify-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
              <p>{errors.firstname.message}</p>
            </div>
          )}
        </div>
        <div className="h-[5rem] flex flex-col">
          <p>Middle Name</p>
          <input
            placeholder="Alcantara"
            className={`${
              errors.middlename ? "mb-[1rem]" : ""
            } w-full border-b-[1px] border-gray-400 px-[0] py-[0.5rem] focus:border-blue-400 focus:outline-none`}
            {...register("middlename", {
              required: "Middle name is required",
            })}
          ></input>
          {errors.middlename && (
            <div className="w-full flex h-fit bg-red-50 p-[0.2rem] text-[0.8rem] border-red-500 border-[1px] rounded-md text-center text-red-900 items-center justify-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
              <p className="text-left pl-[0.5rem]">
                {errors.middlename.message}
              </p>
            </div>
          )}
        </div>
        <div className="h-[5rem] flex flex-col">
          <p>Last Name</p>
          <input
            placeholder="Magleo"
            className={`${
              errors.lastname ? "mb-[1rem]" : ""
            } w-full border-b-[1px] border-gray-400 px-[0] py-[0.5rem] focus:border-blue-400 focus:outline-none`}
            {...register("lastname", {
              required: "last name is required",
            })}
          ></input>
          {errors.lastname && (
            <div className="w-full flex h-fit bg-red-50 p-[0.2rem] text-[0.8rem] border-red-500 border-[1px] rounded-md text-center text-red-900 items-center justify-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
              <p className="text-left pl-[0.5rem]">{errors.lastname.message}</p>
            </div>
          )}
        </div>
        <div className="w-full col-span-2">
          <p>Address</p>
          <input
            className={`${
              errors.address ? "mb-[1rem]" : ""
            } w-full border-b-[1px] border-gray-400 px-[0] py-[0.5rem] focus:border-blue-400 focus:outline-none`}
            {...register("address", {
              required: "Address is required",
            })}
            ref={(e) => {
              register("address").ref(e);
              addressRef.current = e;
            }}
          ></input>
          {errors.address && (
            <div className="w-full flex h-fit bg-red-50 p-[0.2rem] text-[0.8rem] border-red-500 border-[1px] rounded-md text-center text-red-900 items-center justify-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
              <p className="text-left pl-[0.5rem]">
                {errors.address && errors.address.message}
              </p>
            </div>
          )}
        </div>
        <div>
          <p className="text-[0.85rem] mb-[0.2rem]">Birthday</p>
          <input
            type="date"
            className={`${
              errors.birthday ? "mb-[1rem]" : ""
            } w-full text-gray-700 w-full border-b-[1px] border-gray-400 px-[0] py-[0.5rem] text-gray-700 focus:border-blue-400 focus:outline-none`}
            {...register("birthday", {
              required: "Birthday is required",
            })}
          ></input>
          {errors.birthday && (
            <div className="w-full flex h-fit bg-red-50 p-[0.2rem] text-[0.8rem] border-red-500 border-[1px] rounded-md text-center text-red-900 items-center justify-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
              </svg>
              <p className="text-left pl-[0.5rem]">{errors.birthday.message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InfosheetPageTwo = ({ control }) => {
  return (
    <div className="h-[50rem] w-[40rem] p-[2rem] grid grid-rows-[auto_1fr] items-center justify-start">
      <header className="mb-[4rem] h-fit w-full">
        <h1 className="font-bold text-[2rem]">
          What role do you hold in the school?
        </h1>
        <p className="text-gray-500">
          Make sure to fill in the correct info so that your account can get
          approved sooner!
        </p>
      </header>
      <Controller
        name="role"
        control={control}
        defaultValue="student"
        render={({ field }) => (
          <div className="w-full h-full grid grid-rows-3 gap-[1.5rem]">
            <div
              className={`border-[2px] rounded-md cursor-pointer grid grid-cols-[0.3fr_1fr] ${
                field.value === "student"
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() => field.onChange("student")}
            >
              <div className="flex items-center justify-center">
                <div className="w-fit h-fit p-[1rem] bg-white border-[2px] border-gray-200 rounded-md">
                  <img src={StudentIcon} className="h-[2rem]" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-[70%]">
                  <h2 className="font-bold text-[1.1rem]">I am a student.</h2>
                  <p>
                    Choose this if you are currently enrolled as student in the
                    school
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`border-[2px] rounded-md cursor-pointer grid grid-cols-[0.3fr_1fr] ${
                field.value === "faculty"
                  ? "border-blue-500"
                  : "border-gray-300"
              }`}
              onClick={() => field.onChange("faculty")}
            >
              <div className="flex items-center justify-center">
                <div className="w-fit h-fit p-[1rem] bg-white border-[2px] border-gray-200 rounded-md">
                  <img src={TeacherIcon} className="h-[2rem]" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-[70%]">
                  <h2 className="font-bold text-[1.1rem]">I am a faculty.</h2>
                  <p>
                    Choose this if you are currently employed by the school as a
                    teacher.
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`border-[2px] rounded-md cursor-pointer grid grid-cols-[0.3fr_1fr] ${
                field.value === "admin" ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => field.onChange("admin")}
            >
              <div className="flex items-center justify-center">
                <div className="w-fit h-fit p-[1rem] bg-white border-[2px] border-gray-200 rounded-md">
                  <img src={StaffIcon} className="h-[2rem]" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-[70%]">
                  <h2 className="font-bold text-[1.1rem]">I am a faculty.</h2>
                  <p>
                    Choose this if you are currently employed by the school as a
                    teacher.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
};

const InfosheetPageThree = ({ control }) => {
  return (
    <div className="h-[50rem] w-[40rem] p-[2rem] grid grid-rows-[auto_1fr] items-center justify-start">
      <header className="mb-[4rem] h-fit w-full">
        <h1 className="font-bold text-[2rem]">Just one more thing...</h1>
        <p className="text-gray-500">
          Read the privacy statement below before confirming your account info.
          Remember, the information will be shown to the school admin, if it's
          wrong, you have to start over!
        </p>
      </header>
      <Controller
        name="privacy_statement"
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <div className="w-full h-full grid grid-rows-3 gap-[1.5rem]">
            <div
              className={`border-[2px] rounded-md cursor-pointer grid grid-cols-[0.3fr_1fr] ${
                field.value === true ? "border-blue-500" : "border-gray-300"
              }`}
              onClick={() => field.onChange(!field.value)}
            >
              <div className="flex items-center justify-center">
                <div className="w-fit h-fit p-[1rem] bg-white border-[2px] border-gray-200 rounded-md">
                  <img src={StudentIcon} className="h-[2rem]" />
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div className="w-[70%]">
                  <h2 className="font-bold text-[1.1rem]">
                    Privacy statement.
                  </h2>
                  <p>
                    I hereby certify that all the information I have entered
                    here is correct.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
};

const InfosheetPageFour = ({ register }) => {
  return <></>;
};

export {
  InfosheetPageOne,
  InfosheetPageTwo,
  InfosheetPageThree,
  InfosheetPageFour,
};
