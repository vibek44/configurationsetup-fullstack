import { useState } from "react";
export const useField = (type, label, size, variant) => {
  const [value, setValue] = useState("");

  const onChange = ({ target }) => {
    setValue(target.value.trim());
  };

  return { type, value, label, size, variant, onChange };
};
