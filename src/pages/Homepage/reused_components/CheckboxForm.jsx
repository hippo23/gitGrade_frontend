import { useEffect } from "react";

const CheckboxForm = ({
  dataset,
  register,
  field_name,
  value_key,
  state_key,
  label_key,
  onChangeCallback,
  search = "",
}) => {
  // return a container with all the checkboxes for selected users
  return (
    <div className="gap-[0.4rem] h-full bg-white rounded-md flex flex-col items-start overflow-y-auto">
      {dataset.map((data, index) => {
        const label = label_key
          .map((key) => {
            return data[key];
          })
          .join("");

        useEffect(() => {
          onChangeCallback(data, index);
        }, []);

        if (search == "" || label.includes(search)) {
          // running on mount to make sure that checkbox has the firstname and lastname ready

          const checked = data[state_key] ? true : false
          return (
            <div
              key={`${data[`${value_key}`]}+${index}`}
              class={`border-[1.5px] shadow-[0_5px_3px_-4px_rgba(0,0,0,0.3)] border-gray-200 flex items-center bg-white p-[0.5rem] rounded-md h-fit w-full`}
            >
              <input
                type="checkbox"
                value={data[value_key]}
                defaultChecked={checked}
                className="accent-black"
                {...register(`${field_name}.${index}.isSelected`, {
                  onChange: () => {
                    onChangeCallback(data, index);
                  },
                })}
              />
              <label className="ms-2 text-sm font-medium text-black">
                {label_key.map((key, index) => {
                  return <span key={`${key}+${index}`}>{data[key]}</span>;
                })}
              </label>
            </div>
          );
        }
      })}
    </div>
  );
};

export default CheckboxForm;
