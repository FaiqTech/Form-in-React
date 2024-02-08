import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ageRange: "",
    terms: false,
  });

  const [errors, setErrors] = useState({});

  const { name, email, ageRange, terms } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      console.log("Form submitted successfully:", formData);
    } else {
      setErrors(errors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.name.trim()) {
      errors.name = "Name is required";
    }
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }
    if (!data.ageRange) {
      errors.ageRange = "Please select an age range";
    }
    if (!data.terms) {
      errors.terms = "You must accept the terms and conditions";
    }
    return errors;
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="ageRange">Age Range:</label>
        <select name="ageRange" value={ageRange} onChange={handleChange}>
          <option value="">Select Age Range</option>
          <option value="0-18">0-18</option>
          <option value="19-30">19-30</option>
          <option value="31-50">31-50</option>
          <option value="51+">51+</option>
        </select>
        {errors.ageRange && <p className="error">{errors.ageRange}</p>}
      </div>
      <div className="form-group">
        <input
          type="checkbox"
          name="terms"
          checked={terms}
          onChange={handleChange}
        />
        I accept the terms and conditions
        {errors.terms && <p className="error">{errors.terms}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;
