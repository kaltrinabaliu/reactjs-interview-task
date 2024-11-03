import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllContacts,
  deleteContact,
} from "../redux/categories/categoriesSlice";
import AddEditContact from "./AddEditContact";
import ActionButton from "./ActionButton";

const ContactsList = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [isAddingOrEditing, setIsAddingOrEditing] = useState(false);

  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector(
    (state: { contact: any }) => state.contact
  );

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleAddContact = () => {
    setSelectedContact(null);
    setIsAddingOrEditing(true);
  };

  const handleEdit = (contact: any) => {
    setSelectedContact(contact);
    setIsAddingOrEditing(true);
  };

  const handleCancel = () => {
    setSelectedContact(null);
    setIsAddingOrEditing(false);
  };

  const handleSave = () => {
    setIsAddingOrEditing(false);
    dispatch(fetchAllContacts());
  };

  const handleDelete = (contactId: number) => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div className="container mx-auto">
      {isAddingOrEditing ? (
        <AddEditContact
          contact={selectedContact}
          onCancel={handleCancel}
          onSave={handleSave}
        />
      ) : (
        <>
          <div className="flex justify-between items-conter mb-16">
            <div className="text-[32px] font-bold">Contacts</div>
            <ActionButton
              label="Add Contact"
              click={() => handleAddContact()}
              bgColor="bg-blue-500"
              hoverBgColor="bg-blue-600"
            />
          </div>
          <table className="min-w-full bg-white border border-collapse border-gray-300">
            <thead>
              <tr>
                <th className="text-center py-2 px-4 border border-slate-300 ">
                  Name
                </th>
                <th className="text-center py-2 px-4 border border-slate-300 ">
                  Last Name
                </th>
                <th className="text-center py-2 px-4 border border-slate-300 ">
                  Address
                </th>
                <th className="text-center py-2 px-4 border border-slate-300 ">
                  City
                </th>
                <th className="text-center py-2 px-4 border border-slate-300 ">
                  Country
                </th>
                <th className="text-center py-2 px-4 border border-slate-300 ">
                  Emails
                </th>
                <th className="text-center py-2 px-4 border border-slate-300 ">
                  Phone Numbers
                </th>
                <th className="text-center py-2 px-4 border border-slate-300 ">
                  Edit
                </th>
                <th className="text-center py-2 px-4 border border-slate-300 ">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact: any) => (
                <tr
                  key={contact.id}
                  className={`border hover:bg-gray-100 ${
                    contact.id % 2 === 1 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="text-center py-2 px-4 border border-slate-300 ">
                    {contact.name}
                  </td>
                  <td className="text-center py-2 px-4 border border-slate-300 ">
                    {contact.lastName}
                  </td>
                  <td className="text-center py-2 px-4 border border-slate-300 ">
                    {contact.address}
                  </td>
                  <td className="text-center py-2 px-4 border border-slate-300 ">
                    {contact.city}
                  </td>
                  <td className="text-center py-2 px-4 border border-slate-300 ">
                    {contact.country}
                  </td>
                  <td className="text-center py-2 px-4 border border-slate-300 ">
                    {contact.emails && contact.emails.length > 0 ? (
                      contact.emails.map((email: string, index: number) => (
                        <div key={index}>{email}</div>
                      ))
                    ) : (
                      <div>No Email</div>
                    )}
                  </td>
                  <td className="text-center py-2 px-4 border border-slate-300 ">
                    {contact.phoneNumbers && contact.phoneNumbers.length > 0 ? (
                      contact.phoneNumbers.map(
                        (phone: string, index: number) => (
                          <div key={index}>{phone}</div>
                        )
                      )
                    ) : (
                      <div>No Phone Number</div>
                    )}
                  </td>
                  <td className="text-center py-2 px-4 border border-slate-300 ">
                    <ActionButton
                      label="Edit"
                      click={() => handleEdit(contact)}
                      bgColor="bg-green-500"
                      hoverBgColor="bg-green-600"
                    />
                  </td>
                  <td className="text-center py-2 px-4 border border-slate-300 ">
                    <ActionButton
                      label="Delete"
                      click={() => handleDelete(contact.id)}
                      bgColor="bg-red-500"
                      hoverBgColor="bg-red-600"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ContactsList;
