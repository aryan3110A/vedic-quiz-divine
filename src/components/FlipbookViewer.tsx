
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

import { X } from "lucide-react";

interface FlipbookViewerProps {
    pdfUrl: string;
    onClose: () => void;
}

import swaminarayanBg from "@/assets/swaminarayan-bg.jpg";

export default function FlipbookViewer({ pdfUrl, onClose }: FlipbookViewerProps) {
    const [scriptsLoaded, setScriptsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const bookInstanceRef = useRef<any>(null);

    useEffect(() => {
        // Load Styles
        const cssFiles = [
            "/dflip/css/dflip.min.css",
            "/dflip/css/themify-icons.min.css"
        ];

        cssFiles.forEach(file => {
            if (!document.querySelector(`link[href="${file}"]`)) {
                const link = document.createElement("link");
                link.href = file;
                link.rel = "stylesheet";
                link.type = "text/css";
                document.head.appendChild(link);
            }
        });

        // Load Scripts Sequentially (if not already handled by parent)
        const loadScripts = async () => {
            let $ = (window as any).jQuery;
            if (!$) {
                await new Promise((resolve) => {
                    const script = document.createElement("script");
                    script.src = "/dflip/js/libs/jquery.min.js";
                    script.onload = resolve;
                    document.body.appendChild(script);
                });
                $ = (window as any).jQuery;
            }

            if (!(window as any).DFLIP) {
                await new Promise((resolve) => {
                    const script = document.createElement("script");
                    script.src = "/dflip/js/dflip.min.js";
                    script.onload = resolve;
                    document.body.appendChild(script);
                });
            }

            // Set Global Defaults as requested
            if ((window as any).DFLIP) {
                (window as any).DFLIP.defaults.stiffness = 0;
            }

            setScriptsLoaded(true);
        };

        loadScripts();

        return () => {
            // Cleanup logic if needed
        };
    }, []);

    useEffect(() => {
        if (scriptsLoaded && (window as any).jQuery && containerRef.current) {
            console.log("Initializing Flipbook for:", pdfUrl);
            const $ = (window as any).jQuery;

            // Ensure defaults are set before initialization
            if ((window as any).DFLIP) {
                // Remove stiffness override to allow natural bending as requested ("inner pages bend softly")
                // (window as any).DFLIP.defaults.stiffness = 3; 
            }

            // Detect TV or low-power devices
            const userAgent = navigator.userAgent.toLowerCase();
            const isTV = /tv|smarttv|googletv|appletv|hbbtv|pov_tv|netcast|webos|smart-tv/i.test(userAgent) ||
                /tizen|opera tv|sonydtv|philips|panasonic/i.test(userAgent);

            console.log("Device detection - isTV:", isTV);

            const options = {
                source: pdfUrl,
                height: '100%',
                width: '100%', // Explicitly set width to 100% as per new request snippet

                // Core 3D settings - DISABLED ON TV for performance
                webgl: !isTV,
                flipbook3D: !isTV,
                realistic3D: !isTV,

                // Real book feel
                pageMode: "double",
                singlePageMode: false,
                hard: isTV ? "none" : "cover", // Disable hard cover on TV

                // Shadows & depth - minimal on TV
                shadowOpacity: isTV ? 0 : 0.1,

                // Hard cover detail (disabled on TV)
                cover: !isTV,
                coverThickness: isTV ? 0 : 12,
                pageThickness: isTV ? 0 : 2,

                // Texture & realism
                // texture: "paper", // Can be enabled if assets exist, but staying safe with CSS defaults

                // End-book feel
                endPageFlip: true,

                backgroundColor: "transparent",
                duration: isTV ? 400 : 800, // Faster transitions on TV
                direction: 1, // LTR
                forceFit: true,
                disablePartialLoad: isTV ? false : true, // CRITICAL: Enable partial load on TV to prevent hanging
                pdfRenderQuality: isTV ? 0.5 : 1.5, // HIGH QUALITY for local APK (150%)
                maxTextureSize: isTV ? 1024 : 4096, // Maximum texture size for best quality

                // Hide sidebar/thumbnail panel
                controls: "hide", // Hide all controls including thumbnails
                sideMenuOverlay: true, // Make side menu overlay instead of taking space
            };

            console.log("dflip options:", options);

            // If instance already exists, maybe destroy it? dflip is tricky with react re-renders
            // $(containerRef.current).html(''); // Clear container

            bookInstanceRef.current = $(containerRef.current).flipBook(pdfUrl, options);
        }
    }, [scriptsLoaded, pdfUrl]);

    // Handle ESC key to close
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in zoom-in duration-300"
            style={{ padding: '40px', touchAction: 'none' }}
        >
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center -z-10"
                style={{
                    backgroundImage: `url(${swaminarayanBg})`,
                    filter: 'brightness(0.3) blur(2px)'
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95 -z-10" />

            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-[60] p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
                <X className="w-8 h-8" />
            </button>
            <div
                ref={containerRef}
                id="df_book_viewer"
                className="relative z-10"
                style={{ height: '100%', width: '100%' }}
            />
        </div>
    );
}
