/* eslint-disable react/prop-types */
import { forwardRef, useEffect, useRef, useState, useImperativeHandle } from "react";
import styles from "./CreditCardForm.module.css";

// eslint-disable-next-line react/display-name
const FormField = forwardRef(({ name, label, type, required, minLength, maxLength, pattern, inputMode, errorMessage, defaultValue = "", placeholder, onChange }, ref) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState("");

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  // Function to validate field
  const validateField = () => {
    if (!inputRef.current) return false;

    if (!inputRef.current.checkValidity()) {
      setError(errorMessage);
      return false;
    } else {
      setError("");
      return true;
    }
  };

  // Expose validateField through useImperativeHandle
  useImperativeHandle(ref, () => ({
    validateField,
  }));

  const handleChange = (event) => {
    setValue(event.target.value);
    validateField(); // Validate on change
    onChange(name, event.target.value, inputRef.current.validity.valid);
  };

  const handleBlur = () => {
    validateField(); // Validate on blur
  };

  return (
    <div className={styles.formField}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        ref={inputRef}
        type={type}
        name={name}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
});

export default FormField;
