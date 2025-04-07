import { Button, FileInput, Label, TextInput } from "flowbite-react";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import useUpdateSettings from "./useUpdateSettings";

const SettingsPage = () => {
  const { settingsData, isLoading } = useSettings();
  const { updatingSettings } = useUpdateSettings();
  console.log(settingsData);
  const { addressInLatLng } = settingsData;
  const { lat, lng } = addressInLatLng || {};
  if (isLoading) return <Spinner />;

  const handleUpdateSettings = (e, field, fieldName) => {
    let { value } = e.target;
    e.preventDefault();
    if (!value) return;
    if (!field) return;
    if (field === "addressInLatLng") {
      const addressInLatLngData = {
        ...settingsData,
        addressInLatLng: { ...addressInLatLng, [fieldName]: value },
      };
      updatingSettings(addressInLatLngData);
      return;
    }

    if (field === "categories") {
      const categoriesData = {
        ...settingsData,
        categories: [...settingsData?.categories, value?.toLowerCase()?.trim()],
      };
      updatingSettings(categoriesData);
      return;
    }

    const updateSettinsData = { ...settingsData, [field]: value };
    updatingSettings(updateSettinsData);
    return;
  };
  return (
    <form className="grid grid-cols-2 flex-col gap-4">
      <div className="col-span-2">
        <div className="mb-2 block">
          <Label htmlFor="companyName">Comapny Name</Label>
        </div>
        <TextInput
          id="companyName"
          type="text"
          defaultValue={settingsData?.companyName}
          placeholder="Company Name"
          shadow
          onBlur={(e) => handleUpdateSettings(e, "companyName")}
        />
      </div>
      <div className="max-[400px]:col-span-2">
        <div className="mb-2 block">
          <Label htmlFor="companyPhoneNumber">Telphone Number</Label>
        </div>
        <TextInput
          id="companyPhoneNumber"
          type="text"
          defaultValue={settingsData?.phoneNumber}
          onBlur={(e) => handleUpdateSettings(e, "phoneNumber")}
          placeholder="Phone Number"
          shadow
        />
      </div>
      <div className="max-[400px]:col-span-2">
        <div className="mb-2 block">
          <Label htmlFor="companyEmail">Email Address</Label>
        </div>
        <TextInput
          id="companyEmail"
          type="email"
          placeholder="Email"
          onBlur={(e) => handleUpdateSettings(e, "Email")}
          defaultValue={settingsData?.Email}
          shadow
        />
      </div>
      <div className="col-span-2 mt-4 flex flex-col">
        <h3 className="sm:text-2xl">Address in Longitude & Latitude</h3>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="mb-2 block">
              <Label htmlFor="longitude" className="text-xs">
                Longitude
              </Label>
            </div>
            <TextInput
              id="longitude"
              placeholder="24.0549888"
              type="text"
              defaultValue={lng}
              onBlur={(e) => handleUpdateSettings(e, "addressInLatLng", "lng")}
              shadow
            />
          </div>
          <div className="flex-1">
            <div className="mb-2 block">
              <Label htmlFor="latutude" className="text-xs">
                Latutude
              </Label>
            </div>
            <TextInput
              id="latutude"
              type="text"
              defaultValue={lat}
              onBlur={(e) => handleUpdateSettings(e, "addressInLatLng", "lat")}
              shadow
              placeholder="53.444608"
            />
          </div>
        </div>
      </div>
      <div className="col-span-2 sm:col-span-1">
        <div className="mb-2 block">
          <Label htmlFor="Delivery">Delivery Charge</Label>
        </div>
        <TextInput
          id="Delivery"
          type="number"
          placeholder="Delivery Charge"
          defaultValue={settingsData?.delivery_charge}
          onBlur={(e) => handleUpdateSettings(e, "delivery_charge")}
          shadow
        />
      </div>{" "}
      <div className="col-span-2 sm:col-span-1">
        <div className="mb-2 block">
          <Label htmlFor="categories">Delivery Charge</Label>
        </div>
        <TextInput
          id="categories"
          type="text"
          placeholder="Main Categories"
          onBlur={(e) => handleUpdateSettings(e, "categories")}
          shadow
        />
      </div>{" "}
    </form>
  );
};

export default SettingsPage;
