import UserRegistration from "./components/UserRegistration";
import SetupOrganisation from "./components/SetupOrganisation";
import ChatbotIntegration from "./components/ChatbotIntegration";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <UserRegistration />
      <SetupOrganisation />
      <ChatbotIntegration />
    </div>
  );
}