
import React, { useState } from 'react';
// import CheckIn from './CheckIn';
// import CheckOut from './Checkout';
import ScanQR from './ScanQR';
import PrintQRCodes from './PrintQRCodes';
import UpArrowButton from '../images/UpArrowButton.png'
import DownArrowButton from '../images/DownArrowButton.png'

export default function AppTabs({ onReload }) {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const tabs = [
    { label: 'Dashboard', key: 'Dashboard' },
    { label: 'Scan QR', key: 'Scan' },
    { label: 'Print QR Codes', key: 'Print' },
    { label: 'Manage', key: 'Manage' },
  ];

  return (
    <div>
      {/* Tab Navigation */}
      <div className="overflow-x-auto no-scrollbar p-1 mb-6 border-b border-gray-300">
        <div className="flex gap-4">
            {tabs.map((tab) => (
            <button
                key={tab.key}
                className={`py-2 px-4 font-semibold rounded-md transition whitespace-nowrap ${
                activeTab === tab.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-300 text-black hover:bg-blue-600 hover:text-white'
                }`}
                style={{ backgroundColor: activeTab === tab.key ? '#308bd5' : '#2370c7', color: activeTab === tab.key ? 'white' : 'black' }}
                onClick={() => setActiveTab(tab.key)}
            >
                {tab.label}
            </button>
            ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'Dashboard' && (
        <section className="bg-white p-2 rounded-2xl shadow-lg">
            <section className="py-4">
                <div className="grid grid-cols-2 gap-y-12 max-w-6xl mx-auto place-items-center">
                  <button className="w-80 h-80 rounded-full overflow-hidden bg-center shadow-lg hover:scale-105 transition-transform">
                    <img
                      src={UpArrowButton}
                      alt="Button"
                      className="w-full h-full object-cover"
                    />
                  </button>
                  <button className="w-80 h-80 rounded-full overflow-hidden bg-center shadow-lg hover:scale-105 transition-transform">
                    <img
                      src={DownArrowButton}
                      alt="Button"
                      className="w-full h-full object-cover"
                    />
                  </button>
                </div>
            </section>
        </section>
      )}

      {activeTab === 'Scan' && (
        <ScanQR
          onResult={async (scannedId) => {
            const { data, error } = await supabase
              .from('equipment')
              .select('*')
              .eq('id', scannedId)
              .single();

            if (error || !data) {
              console.error('Equipment not found:', error);
              // Show message to user
              return;
            }

            // You now have the equipment data, show it
            console.log('Scanned equipment:', data);
            // Optionally navigate or update state
          }}
        />
      )}

      {activeTab === 'Print' && (
        <section className="bg-white p-6 rounded-2x1 shadow-lg">
          <PrintQRCodes equipmentList={equipment} />
        </section>
      )}

      {activeTab === 'Manage' && (
        <section className="bg-white p-6 rounded-2xl shadow-lg">
          
        </section>
      )}

    </div>
  );
}
