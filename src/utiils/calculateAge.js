export const calculateAge = (birthDate) => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);

  const yearsDiff = today.getFullYear() - birthDateObj.getFullYear();
  const isBirthdayPassed =
    today.getMonth() > birthDateObj.getMonth() ||
    (today.getMonth() === birthDateObj.getMonth() &&
      today.getDate() >= birthDateObj.getDate());

  const finalAge = isBirthdayPassed ? yearsDiff : yearsDiff - 1;
  return finalAge;
};
