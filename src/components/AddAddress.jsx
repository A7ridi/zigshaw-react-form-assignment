const DynamicInputComponent = ({
  inputFields,
  setInputFields,
  validateInput,
}) => {
  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    values[index].value = event.target.value;
    setInputFields(values);
    validateInput(values);

    values.map(({ value }, id) => {
      if (id === index && value.length === 0) {
        values[index].error = "Cannot be blank.";
      } else values[index].error = "";
    });
  };

  const handleAddFields = (e) => {
    e.preventDefault();
    const values = [...inputFields];
    values.push({ value: "" });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  return (
    <div className="mb-1">
      <label className="block text-sm font-medium text-gray-700">
        Address<span className="text-rose-500"> *</span>
      </label>
      {inputFields.map((inputField, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Enter address"
            className="mt-1 p-2 w-full border rounded-md focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:border-blue-500"
            value={inputField.value}
            onChange={(event) => handleInputChange(index, event)}
          />
          {inputField.error && (
            <p className="text-rose-500">{inputField.error}</p>
          )}
          {inputFields.length > 1 && index !== 0 && (
            <button
              type="button"
              className="bg-rose-500 text-white rounded-md my-2 w-full"
              onClick={() => handleRemoveFields(index)}
            >
              -
            </button>
          )}
        </div>
      ))}
      <button
        className="bg-blue-500 text-white px-4 py-1 rounded-md my-4 w-full"
        type="submit"
        onClick={handleAddFields}
      >
        +
      </button>
    </div>
  );
};

export default DynamicInputComponent;
