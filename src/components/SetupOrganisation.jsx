import { useState, useEffect } from 'react';
import axios from 'axios';

const SetupOrganization = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyUrl, setCompanyUrl] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaImage, setMetaImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [webpages, setWebpages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);

  const fetchMetaDescription = async (url) => {
    const encodedUrl = encodeURIComponent(url);
    const apiUrl = `https://opengraph.io/api/1.1/site/${encodedUrl}?accept_lang=auto&app_id=0ae4152f-d02b-4dd1-bd44-e08811f02368`;

    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(apiUrl);
      const { data } = response;

      if (data.hybridGraph) {
        setMetaDescription(data.hybridGraph.description || 'No description available');
        setMetaTitle(data.hybridGraph.title || 'No title available');
        setMetaImage(data.hybridGraph.image || '');
      } else {
        setMetaDescription('Meta description not found');
      }
    } catch (error) {
      console.error('Error fetching meta description:', error);
      setError('Error fetching meta description (Subscription Needed)');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companyUrl) {
      fetchMetaDescription(companyUrl);
    }
  }, [companyUrl]);

  // Dummy webpages data
  useEffect(() => {
    setWebpages([
      { id: 1, url: 'http://example1.com', status: 'scraped', chunks: ['Title: Page 1', 'Content: This is a description.'] },
      { id: 2, url: 'http://example2.com', status: 'pending', chunks: [] },
      { id: 3, url: 'http://example3.com', status: 'scraped', chunks: ['Title: Page 3', 'Content: Scraped data here.'] },
    ]);
  }, []);

  const handlePageClick = (page) => {
    setSelectedPage(page);
  };

  const isValidUrl = (url) => {
    const pattern = new RegExp('https?://.*');
    return pattern.test(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Set Up Your Organization</h2>
      
      <label className="block text-gray-700 font-medium mb-2">Company Name:</label>
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter company name"
      />

      <label className="block text-gray-700 font-medium mb-2">Website URL:</label>
      <input
        type="url"
        value={companyUrl}
        onChange={(e) => setCompanyUrl(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter website URL"
      />

      {companyUrl && !isValidUrl(companyUrl) && (
        <p className="text-red-500 text-sm mt-2">Please enter a valid URL.</p>
      )}

      <label className="block text-gray-700 font-medium mb-2">Company Description:</label>
      <textarea
        value={companyDescription}
        onChange={(e) => setCompanyDescription(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
        placeholder="Describe your company"
      />

      {loading && <p className="text-gray-600">Loading meta information...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {metaDescription && !loading && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-700">Meta Information:</h3>
          <p><strong>Title:</strong> {metaTitle}</p>
          <p><strong>Description:</strong> {metaDescription}</p>
          {metaImage && <img src={metaImage} alt="Website preview" className="w-32 mt-2 rounded" />}
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Detected Webpages</h3>
        <ul className="space-y-2">
          {webpages.map((page) => (
            <li key={page.id}>
              <button
                onClick={() => handlePageClick(page)}
                className={`w-full text-left p-3 border rounded-lg ${page.status === 'pending' ? 'bg-yellow-200' : 'bg-green-200'} hover:bg-indigo-100 transition-all`}
              >
                {page.url} - <strong>{page.status}</strong>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedPage && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-700">Data Chunks for {selectedPage.url}</h3>
          <ul className="list-disc pl-6 text-gray-600">
            {selectedPage.chunks.length > 0 ? (
              selectedPage.chunks.map((chunk, idx) => (
                <li key={idx}>{chunk}</li>
              ))
            ) : (
              <li>No data scraped yet.</li>
            )}
          </ul>
        </div>
      )}

      <div className="mt-6 flex justify-between gap-4">
        <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Move to Next Setup</button>
        <button className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400">Wait for Chatbot Training</button>
      </div>
    </div>
  );
};

export default SetupOrganization;
