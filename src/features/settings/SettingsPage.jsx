import { Button, FileInput, Label, Textarea, TextInput } from "flowbite-react";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import useUpdateSettings from "./useUpdateSettings";

const SettingsPage = () => {
  const { settingsData, isLoading } = useSettings();
  const { updatingSettings } = useUpdateSettings();
  const { addressInLatLng, socialMediaLinks } = settingsData;
  const { lat, lng } = addressInLatLng || {};
  if (isLoading) return <Spinner />;
  console.log(settingsData);
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
    if (field === "socialMediaLinks") {
      const socialMediaLinksData = {
        ...settingsData,
        socialMediaLinks: { ...socialMediaLinks, [fieldName]: value },
      };
      updatingSettings(socialMediaLinksData);
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
    <form className="grid grid-cols-2 gap-4">
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
      <div className="col-span-2">
        <div className="mb-2 block">
          <Label htmlFor="companyDescription">Comapny Description</Label>
        </div>
        <Textarea
          id="companyDescription"
          rows={4}
          defaultValue={settingsData?.companyDescription}
          placeholder="Company Description..."
          shadow
          onBlur={(e) => handleUpdateSettings(e, "companyDescription")}
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
      <div className="col-span-2 mt-4 grid grid-cols-2 flex-col gap-4">
        <h3 className="col-span-2 sm:text-2xl">Social Media links</h3>
        <div className="max-[350px]:col-span-2 sm:col-span-1">
          <div className="mb-2 block">
            <Label htmlFor="whatSappLink">WhatSapp Link</Label>
          </div>
          <TextInput
            id="whatSappLink"
            type="text"
            defaultValue={settingsData?.socialMediaLinks?.whatsappLink}
            onBlur={(e) =>
              handleUpdateSettings(e, "socialMediaLinks", "whatsappLink")
            }
            placeholder="Main Categories"
            shadow
          />
        </div>{" "}
        <div className="max-[350px]:col-span-2 sm:col-span-1">
          <div className="mb-2 block">
            <Label htmlFor="instagramLink">Instagram Link</Label>
          </div>
          <TextInput
            id="instagramLink"
            type="text"
            placeholder="Main Categories"
            defaultValue={settingsData?.socialMediaLinks?.instagramLink}
            onBlur={(e) =>
              handleUpdateSettings(e, "socialMediaLinks", "instagramLink")
            }
            shadow
          />
        </div>{" "}
        <div className="max-[350px]:col-span-2 sm:col-span-1">
          <div className="mb-2 block">
            <Label htmlFor="snapChatLink">SnapChat Link</Label>
          </div>
          <TextInput
            id="snapChatLink"
            type="text"
            placeholder="Main Categories"
            defaultValue={settingsData?.socialMediaLinks?.snapChatLink}
            onBlur={(e) =>
              handleUpdateSettings(e, "socialMediaLinks", "snapChatLink")
            }
            shadow
          />
        </div>{" "}
        <div className="max-[350px]:col-span-2 sm:col-span-1">
          <div className="mb-2 block">
            <Label htmlFor="tiktokLink">TikTok Link</Label>
          </div>
          <TextInput
            id="tiktokLink"
            type="text"
            placeholder="Main Categories"
            defaultValue={settingsData?.socialMediaLinks?.tiktokLink}
            onBlur={(e) =>
              handleUpdateSettings(e, "socialMediaLinks", "tiktokLink")
            }
            shadow
          />
        </div>{" "}
        <div className="max-[350px]:col-span-2 sm:col-span-1">
          <div className="mb-2 block">
            <Label htmlFor="linkedInLink">LinkedIn Link</Label>
          </div>
          <TextInput
            id="linkedInLink"
            type="text"
            placeholder="Main Categories"
            defaultValue={settingsData?.socialMediaLinks?.linkedInLink}
            onBlur={(e) =>
              handleUpdateSettings(e, "socialMediaLinks", "linkedInLink")
            }
            shadow
          />
        </div>{" "}
        <div className="max-[350px]:col-span-2 sm:col-span-1">
          <div className="mb-2 block">
            <Label htmlFor="facebookLink">FaceBook Link</Label>
          </div>
          <TextInput
            id="facebookLink"
            type="text"
            placeholder="Main Categories"
            defaultValue={settingsData?.socialMediaLinks?.facebookLink}
            onBlur={(e) =>
              handleUpdateSettings(e, "socialMediaLinks", "facebookLink")
            }
            shadow
          />
        </div>{" "}
      </div>
    </form>
  );
};

export default SettingsPage;
