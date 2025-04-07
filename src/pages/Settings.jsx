import MoveBackBtn from "../components/MoveBackBtn";
import SettingsPage from "../features/settings/SettingsPage";

const Settings = () => {
  return (
    <div>
      <div>
        <div className="flex items-center justify-between gap-2 py-3 sm:py-6">
          <MoveBackBtn />
          <div>
            <h1 className="text-2xl font-bold text-gray-600 dark:text-gray-100">
              Settings
            </h1>
          </div>
        </div>
        <SettingsPage />
      </div>
    </div>
  );
};

export default Settings;
