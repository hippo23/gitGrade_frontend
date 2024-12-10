const CheckboxForm = ({
  dataset,
  register,
  field_name,
  value_key,
  label_key,
  onChangeCallback,
}) => {
  // return a container with all the checkboxes for selected users
  return (
    <div className="gap-[0.4rem] h-full bg-gray-100 rounded-md flex flex-col items-start p-[1rem] overflow-y-auto">
      {dataset.map((data, index) => {
        return (
          <div
            key={`${data[`${value_key}`]}+${index}`}
            class="flex items-center bg-white p-[0.5rem] rounded-md h-fit w-full"
          >
            <input
              type="checkbox"
              value={data[value_key]}
              className="m-0 flex w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              {...register(`${field_name}.${index}.value`, {
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
      })}
    </div>
  );
};

export default CheckboxForm;
