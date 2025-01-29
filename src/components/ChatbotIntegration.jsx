/* eslint-disable no-unused-vars */
import { useState } from 'react';

function ChatbotIntegration() {
  const [testSuccess, setTestSuccess] = useState(false);
  const [integrationDetected, setIntegrationDetected] = useState(null);

  const handleTestChatbot = () => {
    // Simulate testing process (mock success/failure)
    const success = Math.random() > 0.5; // Randomize success for demo purposes
    setIntegrationDetected(success);
    setTestSuccess(success);
  };

  const handleIntegrationInstructions = () => {
    // Placeholder for instructions or email logic
    alert('Sending integration instructions...');
  };

  const renderSuccessUI = () => (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="text-green-600 text-2xl font-semibold">Success!</div>
      <div className="w-24 h-24 bg-green-200 rounded-full flex items-center justify-center">
        <span className="text-4xl">🎉</span>
      </div>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-full">Explore Admin Panel</button>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-full">Start talking to your chatbot</button>
      <div className="flex space-x-4 mt-4">
        <button className="bg-gray-300 px-4 py-2 rounded-full">Facebook</button>
        <button className="bg-gray-300 px-4 py-2 rounded-full">Twitter</button>
        <button className="bg-gray-300 px-4 py-2 rounded-full">LinkedIn</button>
      </div>
    </div>
  );

  const renderFailureUI = () => (
    <div className="text-center p-8">
      <div className="text-red-600 text-xl">Integration not detected yet.</div>
      <button
        className="mt-4 bg-yellow-500 text-white px-6 py-3 rounded-full"
        onClick={handleTestChatbot}
      >
        Retry Test
      </button>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="bg-blue-800 text-white p-4 text-center">
        Chatbot not working as intended? <a href="#" className="underline">Share feedback</a>
      </div>

      <div className="flex flex-col items-center justify-center p-8 space-y-6">
        <button
          className="bg-green-600 text-white px-6 py-3 rounded-full"
          onClick={() => window.open('https://dummy-chatbot-site.com', '_blank')}
        >
          Test Chatbot
        </button>

        <button
          className="bg-indigo-600 text-white px-6 py-3 rounded-full"
          onClick={handleIntegrationInstructions}
        >
          Integrate on your website
        </button>

        <div className="text-center">
          {integrationDetected === null ? (
            <button
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-full"
              onClick={handleTestChatbot}
            >
              Test Integration
            </button>
          ) : integrationDetected ? (
            renderSuccessUI()
          ) : (
            renderFailureUI()
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatbotIntegration;
