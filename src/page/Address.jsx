
import React, { useEffect, useState } from "react";
import {
  Plus,
  X,
  MapPin,
  Pencil,
  Trash2,
  Check,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const STORAGE_KEY = "noonHerbAddresses";

const emptyForm = {
  name: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
  type: "Home",
};

const Address = ({ onLogout }) => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      );
      setAddresses(Array.isArray(saved) ? saved : []);
    } catch {
      setAddresses([]);
    }
  }, []);

  const saveAddresses = (updated) => {
    setAddresses(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openAddForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
    setShowForm(true);
  };

  const handleEdit = (address) => {
    setEditingId(address.id);
    setFormData({ ...emptyForm, ...address });
    setError("");
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!/^\d{10}$/.test(formData.phone.trim())) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode.trim())) {
      setError("Please enter a valid 6-digit PIN code.");
      return;
    }

    const existing = addresses.find(
      (address) => address.id === editingId
    );

    const newAddress = {
      ...formData,
      id: editingId || Date.now().toString(),
      isDefault: existing
        ? existing.isDefault
        : addresses.length === 0,
    };

    const updated = editingId
      ? addresses.map((address) =>
          address.id === editingId ? newAddress : address
        )
      : [...addresses, newAddress];

    saveAddresses(updated);
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) {
      return;
    }

    let updated = addresses.filter((address) => address.id !== id);

    if (
      updated.length > 0 &&
      !updated.some((address) => address.isDefault)
    ) {
      updated = updated.map((address, index) => ({
        ...address,
        isDefault: index === 0,
      }));
    }

    saveAddresses(updated);
  };

  const handleSetDefault = (id) => {
    saveAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  const inputClass =
    "address-field w-full rounded-lg border border-[#d7dfc1] bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#96b532]";

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar background — same as Cart page */}
      <div
        className="absolute left-0 top-0 z-0 h-[75px] w-full bg-cover bg-center bg-no-repeat lg:h-[90px]"
        style={{
          backgroundImage: "url('/images/navbg/navbg.png')",
        }}
      />

      <Navbar />

      {/* Page content */}
      <div className="pt-[75px] lg:pt-[90px]">
        <main className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_minmax(0,1fr)]">

              {/* Sidebar */}
              <aside>
                <Sidebar onLogout={onLogout} />
              </aside>

              {/* Address section */}
              <section className="min-w-0">
                {/* Heading and add button */}
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-semibold text-[#405900]">
                      My Addresses
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                      Manage your saved delivery addresses
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={openAddForm}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#486400] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#3d5500]"
                  >
                    <Plus size={18} />
                    Add New Address
                  </button>
                </div>

                {/* Add/Edit form */}
                {showForm && (
                  <div className="mb-7 rounded-xl border border-[#dfe7ca] bg-[#f8faF2] p-5 sm:p-6">
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="text-lg font-semibold text-[#405900]">
                        {editingId ? "Edit Address" : "Add New Address"}
                      </h2>

                      <button
                        type="button"
                        onClick={() => {
                          setShowForm(false);
                          setError("");
                        }}
                        className="rounded-full p-2 text-gray-500 transition hover:bg-[#e0e9c5]"
                        aria-label="Close form"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Full Name
                          </label>
                          <input
                            className={inputClass}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter full name"
                            required
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Phone Number
                          </label>
                          <input
                            className={inputClass}
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="10-digit phone number"
                            inputMode="numeric"
                            maxLength={10}
                            required
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Street Address
                          </label>
                          <textarea
                            className={inputClass}
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            placeholder="House number, street, area"
                            rows={3}
                            required
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            City
                          </label>
                          <input
                            className={inputClass}
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="Enter city"
                            required
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            State
                          </label>
                          <input
                            className={inputClass}
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            placeholder="Enter state"
                            required
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            PIN Code
                          </label>
                          <input
                            className={inputClass}
                            name="pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            placeholder="6-digit PIN code"
                            inputMode="numeric"
                            maxLength={6}
                            required
                          />
                        </div>

                        <div>
                          <label className="mb-2 block text-sm font-medium text-gray-700">
                            Address Type
                          </label>
                          <select
                            className={inputClass}
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                          >
                            <option value="Home">Home</option>
                            <option value="Work">Work</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      {error && (
                        <p className="mt-4 text-sm text-red-600">
                          {error}
                        </p>
                      )}

                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          type="submit"
                          className="rounded-lg bg-[#486400] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3d5500]"
                        >
                          {editingId ? "Save Changes" : "Save Address"}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setShowForm(false);
                            setError("");
                          }}
                          className="rounded-lg border border-[#cbd5b0] px-6 py-3 text-sm font-medium text-[#405900] transition hover:bg-[#e0e9c5]"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Saved addresses */}
                {addresses.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-[#cbd5b0] bg-[#f8faf2] px-5 py-12 text-center">
                    <MapPin
                      size={38}
                      className="mx-auto mb-3 text-[#96b532]"
                    />

                    <h2 className="text-lg font-semibold text-[#405900]">
                      No addresses saved
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      Add a new address for a convenient checkout experience.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                    {addresses.map((address) => (
                      <article
                        key={address.id}
                        className="rounded-xl border border-[#d9e2c2] bg-[#e0e9c5] p-5 transition-shadow hover:shadow-md sm:p-6"
                      >
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <MapPin
                              size={20}
                              className="text-[#405900]"
                            />

                            <h2 className="font-semibold text-[#405900]">
                              {address.type}
                            </h2>

                            {address.isDefault && (
                              <span className="rounded-full bg-[#486400] px-3 py-1 text-xs font-medium text-white">
                                Default
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDelete(address.id)}
                            className="rounded-md p-2 text-gray-600 transition hover:bg-white/60 hover:text-red-600"
                            aria-label="Delete address"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>

                        <p className="font-semibold text-gray-800">
                          {address.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-700">
                          {address.phone}
                        </p>

                        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-gray-700">
                          {address.street}, {address.city},{" "}
                          {address.state} - {address.pincode}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[#cbd7aa] pt-4">
                          <button
                            type="button"
                            onClick={() => handleEdit(address)}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff6b35] transition hover:text-[#d94e1e]"
                          >
                            <Pencil size={16} />
                            Edit
                          </button>

                          {!address.isDefault && (
                            <button
                              type="button"
                              onClick={() => handleSetDefault(address.id)}
                              className="inline-flex items-center gap-2 text-sm font-medium text-[#405900] transition hover:text-[#486400]"
                            >
                              <Check size={16} />
                              Set as default
                            </button>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
      </div>

      <Footer />

      <style>{`
        .address-field {
          box-sizing: border-box;
          min-width: 0;
        }

        .address-field:focus {
          box-shadow: 0 0 0 2px rgba(150, 181, 50, 0.18);
        }
      `}</style>
    </div>
  );
};

export default Address;
