import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createContact,
  updateContact,
} from "../redux/categories/categoriesSlice";
import InputText from "./InputText";

const inputFields = [
  { name: "Name:", placeholder: "Enter the Name", field: "name" },
  { name: "Last Name:", placeholder: "Enter Last Name", field: "lastName" },
  { name: "Address:", placeholder: "Enter the Address", field: "address" },
  { name: "City:", placeholder: "Enter City", field: "city" },
  { name: "Country:", placeholder: "Enter Country", field: "country" },
];

const AddEditContact = ({
  contact,
  setSelectedContact,
  onSave,
  onCancel,
}: any) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    address: "",
    city: "",
    country: "",
    emails: [""],
    phoneNumbers: [""],
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || "",
        lastName: contact.lastName || "",
        address: contact.address || "",
        city: contact.city || "",
        country: contact.country || "",
        emails: Array.isArray(contact.emails)
          ? contact.emails
          : [contact.email || ""],
        phoneNumbers: Array.isArray(contact.phoneNumbers)
          ? contact.phoneNumbers
          : [contact.phoneNumbers || ""],
      });
    }
  }, [contact]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    index?: number
  ) => {
    if (index !== undefined) {
      const updatedArray = [...formData[field as keyof typeof formData]];
      updatedArray[index] = e.target.value;
      setFormData({ ...formData, [field]: updatedArray });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handleAddField = (field: string) => {
    setFormData({
      ...formData,
      [field]: [...formData[field as keyof typeof formData], ""],
    });
  };

  const handleSave = async () => {
    try {
      if (contact) {
        await dispatch(
          updateContact({ contactId: contact.id, updatedContact: formData })
        ).unwrap();
      } else {
        await dispatch(createContact(formData)).unwrap();
      }
      onSave();
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  return (
    <div>
      <div className="text-[32px] font-bold mb-16 whi">
        {contact ? "Edit Contact" : "Register new contact"}
      </div>
      {inputFields.map((input, index) => (
        <InputText
          key={index}
          label={input.name}
          placeholder={input.placeholder}
          value={formData[input.field as keyof typeof formData]}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(e, input.field)
          }
        />
      ))}

      <div className="mb-4 flex flex-col w-full ">
        <label>Email:</label>
        {formData.emails.map((email, index) => (
          <div key={index} className="flex items-center space-x-2">
            <InputText
              label=""
              placeholder="Enter the Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "emails", index)
              }
            />
            {index === formData.emails.length - 1 && (
              <button
                onClick={() => handleAddField("emails")}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add
              </button>
            )}
          </div>
        ))}
      </div>

      <div className=" flex flex-col w-full">
        <label>Number:</label>

        {formData.phoneNumbers.map((phone, index) => (
          <div key={index} className="flex items-center space-x-2">
            <InputText
              label=""
              placeholder="Enter the Phone Number"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, "phoneNumbers", index)
              }
            />
            {index === formData.phoneNumbers.length - 1 && (
              <button
                onClick={() => handleAddField("phoneNumbers")}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          onClick={() => onCancel()}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddEditContact;
