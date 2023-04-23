import React, { useEffect, useState } from "react";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
const AddressFormFields = ({ formData, setAddressFormData, isEditing }) => {
  const [regionOptions, setRegionOptions] = useState();
  const [regionCode, setRegionCode] = useState();
  const [provinceOptions, setProviceOptions] = useState();
  const [provinceCode, setProvinceCode] = useState();
  const [cityOptions, setCityOptions] = useState();
  const [cityCode, setCityCode] = useState();
  const [barangayOptions, setBarangayOptions] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      ["region", "province", "city", "barangay"].includes(name) &&
      JSON.parse(value);
    if (name === "region") {
      setRegionCode(parsedValue.code);
    }
    if (name === "province") {
      setProvinceCode(parsedValue.code);
    }
    if (name === "city") {
      setCityCode(parsedValue.code);
    }
    setAddressFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue.name || value,
    }));
  };

  useEffect(() => {
    regions().then((r) => {
      setRegionOptions(r);
    });
    if (regionCode) {
      provinces(regionCode).then((p) => {
        setProviceOptions(p);
      });
    }
    if (provinceCode) {
      cities(provinceCode).then((c) => {
        setCityOptions(c);
      });
    }
    if (cityCode) {
      barangays(cityCode).then((b) => {
        setBarangayOptions(b);
      });
    }
  }, [regionCode, provinceCode, cityCode]);

  return (
    <>
      <div className="grid grid-cols-2 gap-5 w-full">
        <div className="flex flex-col">
          <label htmlFor="firstName">First name</label>
          <input
            disabled={!isEditing}
            value={formData.firstName}
            onChange={handleChange}
            type="text"
            name="firstName"
            required
          ></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="lastName">Last name</label>
          <input
            disabled={!isEditing}
            value={formData.lastName}
            onChange={handleChange}
            type="text"
            name="lastName"
            required
          ></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            disabled={!isEditing}
            value={formData.email}
            onChange={handleChange}
            type="email"
            name="email"
            required
          ></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="mobileNo">Mobile number</label>
          <input
            disabled={!isEditing}
            value={formData.mobileNo}
            onChange={handleChange}
            type="number"
            name="mobileNo"
            required
          ></input>
        </div>
        <div className="col-span-2">
          <label htmlFor="region">Region</label>
          <select
            className={!isEditing ? "bg-[rgba(239,_239,_239,_0.3)]" : ""}
            disabled={!isEditing}
            name="region"
            // value={formData.region}
            defaultValue={""}
            id="region"
            onChange={handleChange}
            required
          >
            {isEditing ? (
              <option value={""} hidden>
                {isEditing}
                Choose your region...
              </option>
            ) : (
              <option hidden>{formData.region}</option>
            )}
            {regionOptions &&
              regionOptions.map((r) => (
                <option
                  key={r.region_code}
                  value={JSON.stringify({
                    name: r.region_name,
                    code: r.region_code,
                  })}
                >
                  {r.region_name}
                </option>
              ))}
          </select>
        </div>
        <div className="">
          <label htmlFor="province">Province</label>
          <select
            className={!isEditing ? "bg-[rgba(239,_239,_239,_0.3)]" : ""}
            disabled={!isEditing}
            defaultValue={""}
            name="province"
            id="province"
            onChange={handleChange}
            required
          >
            {isEditing ? (
              <option className="w-10" value="" hidden>
                Choose your province...
              </option>
            ) : (
              <option hidden>{formData.province}</option>
            )}
            {provinceOptions &&
              provinceOptions.map((p) => (
                <option
                  key={p.province_code}
                  value={JSON.stringify({
                    name: p.province_name,
                    code: p.province_code,
                  })}
                >
                  {p.province_name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="city">City</label>
          <select
            className={!isEditing ? "bg-[rgba(239,_239,_239,_0.3)]" : ""}
            disabled={!isEditing}
            // value={formData.city}
            defaultValue={""}
            name="city"
            id="city"
            required
            onChange={handleChange}
          >
            {isEditing ? (
              <option value="" hidden disabled>
                Choose your city...
              </option>
            ) : (
              <option hidden>{formData.city}</option>
            )}
            {cityOptions &&
              cityOptions.map((c) => (
                <option
                  key={c.city_code}
                  value={JSON.stringify({
                    name: c.city_name,
                    code: c.city_code,
                  })}
                >
                  {c.city_name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="barangay">Barangay</label>
          <select
            className={!isEditing ? "bg-[rgba(239,_239,_239,_0.3)]" : ""}
            disabled={!isEditing}
            required
            defaultValue={""}
            name="barangay"
            id="barangay"
            onChange={handleChange}
          >
            {isEditing ? (
              <option value="" hidden disabled>
                Choose your barangay...
              </option>
            ) : (
              <option hidden>{formData.barangay}</option>
            )}
            {barangayOptions &&
              barangayOptions.map((b) => (
                <option
                  key={b.brgy_code}
                  value={JSON.stringify({
                    name: b.brgy_name,
                    code: b.brgy_code,
                  })}
                >
                  {b.brgy_name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="zip">Zip Code</label>
          <input
            disabled={!isEditing}
            required
            value={formData.zip}
            onChange={handleChange}
            type="number"
            name="zip"
          ></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="street">Street</label>
          <input
            disabled={!isEditing}
            required
            value={formData.street}
            onChange={handleChange}
            type="text"
            name="street"
          ></input>
        </div>
        <div className="flex flex-col">
          <label htmlFor="houseNo">Unit no./House no./Building name</label>
          <input
            disabled={!isEditing}
            value={formData.houseNo}
            onChange={handleChange}
            type="text"
            name="houseNo"
          ></input>
        </div>
      </div>
    </>
  );
};
export default AddressFormFields;
