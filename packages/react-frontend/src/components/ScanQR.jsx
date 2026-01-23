
import React, { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL,
//   import.meta.env.VITE_SUPABASE_KEY
// );

function ScanQR({ onResult, qrBoxSize }){
    // const [scannedItem, setScannedItem] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const elementId = "qr-scanner-container";
        const container = document.getElementById(elementId);
        if (!container) return;

        (async () => {
            const { Html5Qrcode } = await import('html5-qrcode');

            const scanner = new Html5Qrcode(elementId);

            scanner
                .start(
                    { facingMode: 'environment' },
                    { fps: 10, qrbox: qrBoxSize, aspectRatio: 1 },
                    async (decodedText) => {
                        try {
                            const id = BigInt(decodedText);
                            onResult(id.toString());
                        } catch (e) {
                            console.error('Scanned QR code is not a valid bigint:', decodedText);
                            setErrorMsg('Invalid QR code scanned, not a valid equipment ID.');
                        }

                        // const { data, error } = await supabase
                        //     .from('equipment')
                        //     .select('*')
                        //     .eq('id', id.toString())
                        //     .single();
                    },
                    (scanError) => {
                    // Optionally log scan errors (like decode failures)
                    }
                )
                .catch((err) => {
                    console.error('QR scanner failed to start:', err);
                    setErrorMsg('Failed to start camera for scanning.');
                });
        })();

        return () => {
            if(scanner){
                scanner.stop().then(() => scanner.clear()).catch(() => {});
            }
        };
    }, [qrBoxSize, onResult]);

    return (
        <div id="qr-scanner-container" className="absolute inset-0 w-full h-full relative">
            {/* Optional: overlay for scan box */}
            <div
                className="absolute border-4 border-white rounded-xl pointer-events-none"
                style={{ width: qrBoxSize, height: qrBoxSize, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />
            {errorMsg && (
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-2 rounded z-50">
                    {errorMsg}
                </div>
            )}
        </div> 
    );
}

export default ScanQR;
