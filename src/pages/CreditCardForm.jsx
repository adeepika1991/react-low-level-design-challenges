import { useRef, useState } from "react";
import styles from "./CreditCardForm.module.css";
import FormField from "./FormField";

const creditCardSchema = [
    { 
      name: "cardNumber", 
      label: "Card Number", 
      type: "text", 
      required: true, 
      minLength: 16, 
      maxLength: 16, 
      pattern: "^[0-9]{16}$", 
      inputMode: "numeric", 
      placeholder: "1234 5678 9012 3456", 
      errorMessage: "Card Number must be exactly 16 digits" 
    },
    { 
      name: "cardHolder", 
      label: "Card Holder's Name", 
      type: "text", 
      required: true, 
      minLength: 3, 
      maxLength: 50, 
      placeholder: "John Doe", 
      errorMessage: "Cardholder name must be at least 3 characters" 
    },
    { 
      name: "expiryMonth", 
      label: "Expiry Month", 
      type: "text", 
      required: true, 
      minLength: 2, 
      maxLength: 2, 
      pattern: "^(0[1-9]|1[0-2])$", 
      inputMode: "numeric", 
      placeholder: "MM", 
      errorMessage: "Enter a valid month (01-12)" 
    },
    { 
      name: "expiryYear", 
      label: "Expiry Year", 
      type: "text", 
      required: true, 
      minLength: 4, 
      maxLength: 4, 
      pattern: "^(202[4-9]|20[3-9][0-9])$", 
      inputMode: "numeric", 
      placeholder: "YYYY", 
      errorMessage: "Enter a valid future year" 
    },
    { 
      name: "cvv", 
      label: "CVV", 
      type: "text", 
      required: true, 
      minLength: 3, 
      maxLength: 4, 
      pattern: "^[0-9]{3,4}$", 
      inputMode: "numeric", 
      placeholder: "123", 
      errorMessage: "CVV must be 3 or 4 digits" 
    }
  ];
  

// eslint-disable-next-line react/prop-types
const CreditCardForm = ({ defaultValues = {} }) => {
    const formRef = useRef(null);
    const inputRefs = useRef({}); // Store refs for each FormField
    const [formValues, setFormValues] = useState(defaultValues);
    const [isFormValid, setIsFormValid] = useState(false);
  
    const handleFieldChange = (name, value) => {
      setFormValues((prev) => ({ ...prev, [name]: value }));
      validateForm();
    };
  
    const validateForm = () => {
      let allValid = true;
  
      Object.values(inputRefs.current).forEach((field) => {
        if (field && !field.validateField()) {
          allValid = false;
        }
      });
  
      setIsFormValid(allValid);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      let hasError = false;
      Object.values(inputRefs.current).forEach((field) => {
        if (field) {
          if (!field.validateField()) hasError = true;
        }
      });
  
      if (!hasError) {
        console.log("✅ Form Submitted Successfully", formValues);
      }
    };
  
    return (
      <div className={styles.layout}>
        <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
          {creditCardSchema.map((field) => (
            <FormField
              key={field.name}
              ref={(el) => (inputRefs.current[field.name] = el)}
              {...field}
              defaultValue={formValues[field.name]}
              onChange={handleFieldChange}
            />
          ))}
  
          <button type="submit" className={styles.submitButton} disabled={!isFormValid}>
            Submit
          </button>
        </form>
      </div>
    );
  };
export default CreditCardForm;  