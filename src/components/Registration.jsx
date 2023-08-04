import React, { useEffect, useState } from "react";
import InputField from "./InputField";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers, updateUser } from "../redux/actions/action";
import DynamicInputComponent from "./AddAddress";
import { calculateAge } from "../utiils/calculateAge";
import { displayError } from "../utiils/constants";

const emptyState = {
  name: "",
  age: "",
  dob: "",
  phoneNumber: "",
  address: "",
  password: "",
  confirmPassword: "",
};

const Registration = ({ editUser, setEditUser }) => {
  const initialState = {
    name: editUser?.name || "",
    age: editUser?.age || "",
    dob: editUser?.dob || "",
    phoneNumber: editUser?.phoneNumber || "",
    address: editUser?.address || "",
    password: editUser?.password || "",
    confirmPassword: editUser?.confirmPassword || "",
  };
  const [inputData, setInputData] = useState(initialState);
  const [dynamicAddress, setDynamicAddress] = useState([
    { value: editUser?.address || "" },
  ]);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const concatenatedValues = dynamicAddress
    .map((obj) => obj.value)
    .filter((value) => value !== "")
    .join(", ");

  useEffect(() => {
    setInputData(editUser);
    setDynamicAddress([{ value: editUser?.address || "" }]);
  }, [editUser]);

  const validateName = (value, error) => {
    if (value?.trim() === "") {
      error.name = displayError.nameError;
    } else if (value?.length > 20) {
      error.name = "Maximum length should be 20 characters.";
    } else if (/[^a-zA-Z]/.test(value)) {
      error.name = "Cannot contain numbers or special characters.";
    }
  };

  const validateDate = (value, error) => {
    if (value?.trim() === "") {
      error.date = displayError.nameError;
    } else {
      const selectedDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
        error.date = "Date can't be greater than today's date.";
      }
    }
  };

  const validatePhone = (value, error) => {
    if (value?.trim() === "") {
      error.phone = displayError.nameError;
    } else if (/\D/.test(value)) {
      error.phone = "Cannot contain letters.";
    } else if (value?.length < 8) {
      error.phone = displayError.phoneError;
    } else if (value?.length > 10) {
      error.phone = "Maximum length should be 10.";
    }
  };

  const validatePassword = (value, error) => {
    if (value?.length < 10) {
      error.password = displayError.password;
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-/"'\d]/.test(value)) {
      error.password = "Must contain at least one special character.";
    } else if (!/[A-Z]/.test(value)) {
      error.password = "Must contain at least one uppercase letter.";
    }
  };

  const validateRepeatPassword = (value, error) => {
    if (value?.length < 10) {
      error.confirmPassword = displayError.password;
    } else if (inputData.password !== value) {
      error.confirmPassword = displayError.repeatPassword;
    }
  };

  const handleChange = (event) => {
    let newErrors = {};

    const { name, value } = event.target;
    if (name === "dob") {
      const getAge = calculateAge(value);
      setInputData((prevData) => ({
        ...prevData,
        age: getAge,
      }));
    }
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "name") {
      validateName(value, newErrors);
    }

    if (name === "dob") {
      validateDate(value, newErrors);
    }
    if (name === "phoneNumber") {
      validatePhone(value, newErrors);
    }
    if (name === "password") {
      validatePassword(value, newErrors);
    }
    if (name === "confirmPassword") {
      validateRepeatPassword(value, newErrors);
    }
    setErrors(newErrors);
  };

  const validateInput = (address) => {
    let newErrors = {};
    const { confirmPassword, password, name, dob, phoneNumber } = inputData;
    validateName(name || "", newErrors);
    validateDate(dob || "", newErrors);
    validatePhone(phoneNumber || "", newErrors);
    validatePassword(password || "", newErrors);

    if (confirmPassword === undefined || confirmPassword?.length < 10) {
      newErrors.confirmPassword = displayError.password;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = displayError.repeatPassword;
    }

    address.map((list, id) => {
      if (list.value?.length === 0) {
        const values = [...address];
        values[id].error = displayError.nameError;
        setDynamicAddress(values);
      }
    });

    setErrors(newErrors);
    const errorCount = address.filter(
      (item) => item.error !== undefined && item.error !== ""
    ).length;

    return Object.keys(newErrors)?.length === 0 && errorCount === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateInput(dynamicAddress)) {
      if (Object.keys(editUser).length !== 0) {
        dispatch(updateUser({ ...inputData, address: concatenatedValues }));
        setEditUser(emptyState);
      } else {
        dispatch(
          setAllUsers({
            ...inputData,
            id: Number(user?.length + 1),
            address: concatenatedValues,
          })
        );
      }

      setInputData(emptyState);
      setDynamicAddress([{ value: "" }]);
    }
  };

  return (
    <div className="max-w-md mx-auto py-4 px-10 bg-gray-100 rounded-2xl mt-8">
      <h1 className="text-2xl font-semibold mb-4">Users Registration</h1>
      <form>
        <InputField
          label="Name"
          type="text"
          name="name"
          placeholder="Enter name"
          value={inputData.name}
          onChange={handleChange}
          errorMessage={errors.name}
        />

        <InputField
          label="Date of Birth"
          type="date"
          name="dob"
          placeholder="Enter date of birth"
          value={inputData.dob}
          maxDate={new Date().toISOString().split("T")[0]}
          onChange={handleChange}
          errorMessage={errors.date}
        />

        <InputField
          label="Age"
          type="text"
          name="age"
          placeholder="Age"
          disabled={true}
          value={inputData.age}
          onChange={handleChange}
        />

        <InputField
          label="Phone Number"
          type="tel"
          name="phoneNumber"
          placeholder="Enter phone number"
          value={inputData.phoneNumber}
          onChange={handleChange}
          errorMessage={errors.phone}
        />

        <DynamicInputComponent
          inputFields={dynamicAddress}
          setInputFields={setDynamicAddress}
          validateInput={validateInput}
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          placeholder="Enter password"
          value={inputData.password}
          onChange={handleChange}
          errorMessage={errors.password}
        />

        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Repeat your password"
          value={inputData.confirmPassword}
          onChange={handleChange}
          errorMessage={errors.confirmPassword}
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 w-full"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Registration;
