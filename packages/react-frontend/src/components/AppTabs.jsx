
import React, { useState } from 'react';
// import CheckIn from './CheckIn';
// import CheckOut from './Checkout';
import ScanQR from './ScanQR';
import PrintQRCodes from './PrintQRCodes';
import UpArrowButton from '../images/UpArrowButton.png'
import DownArrowButton from '../images/DownArrowButton.png'

export default function AppTabs({ onReload }) {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [scanning, setScanning] = useState(false);

  const tabs = [
    { label: 'Dashboard', key: 'Dashboard' },
    { label: 'Analytics', key: 'Analytics' },
    { label: 'Manage', key: 'Manage' },
  ];

  const handleScanResult = async (scannedId) => {
    setScanning(false); // stop scanning when a code is found
    const { data, error } = await supabase
      .from('equipment')
      .select('*')
      .eq('id', scannedId)
      .single();

    if (error || !data) {
      console.error('Equipment not found:', error);
      return;
    }

    console.log('Scanned equipment:', data);
  };

  return (
    <div>
      {/* Tab Navigation */}
      <div className="overflow-x-auto no-scrollbar p-1 mb-2 sm:mb-6 mt-0 sm:mt-4 border-b border-gray-300">
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
        <section className="bg-white p-1 sm:p-2 rounded-2xl shadow-lg max-w-6xl mx-auto sm:min-h-0 min-h-[100dvh] overflow-hidden flex sm:block items-center justify-center">
            <section className="py-1 sm:py-4">
              {/* Title & subtitle */}
              <div className="hidden sm:block text-center mb-6 sm:mb-10">
                <h1 className="text-4xl font-bold text-blue-700">
                  Equipment Tracking
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  Scan equipment to check in or check out
                </p>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-4 sm:gap-8 md:gap-24
                  place-items-center
                "
              >
                {/* Check In */}
                <div className="flex flex-col items-center">
                  <div
                    className="
                      relative
                      w-52 h-52
                      sm:w-60 sm:h-60
                      md:w-72 md:h-72
                      lg:w-80 lg:h-80
                      rounded-full
                      overflow-hidden
                      shadow-lg
                      hover:scale-105
                      transition-transform
                    "
                  >
                    {scanning && (
                      <div className="absolute inset-0 z-10 rounded-full overflow-hidden">
                        <ScanQR
                          onResult={handleScanResult}
                          qrBoxSize={Math.min(200, window.innerWidth * 0.5)}
                        />
                      </div>
                    )}

                    <button
                      onClick={() => setScanning(true)}
                      className="w-full h-full rounded-full"
                    >
                      <img
                        src={UpArrowButton}
                        alt="Check In"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </div>

                  <span className="mt-2 sm:mt-4 text-base sm:text-xl font-semibold text-gray-700">
                    Check In
                  </span>
                </div>

                {/* Check Out */}
                <div className="flex flex-col items-center">
                  <div
                    className="
                      w-40 h-40
                      sm:w-56 sm:h-56
                      md:w-72 md:h-72
                      lg:w-80 lg:h-80
                      rounded-full
                      overflow-hidden
                      shadow-lg
                      hover:scale-105
                      transition-transform
                    "
                  >
                    <button className="w-full h-full rounded-full">
                      <img
                        src={DownArrowButton}
                        alt="Check Out"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  </div>

                  <span className="mt-4 text-xl font-semibold text-gray-700">
                    Check Out
                  </span>
                </div>
              </div>
            </section>
        </section>
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
