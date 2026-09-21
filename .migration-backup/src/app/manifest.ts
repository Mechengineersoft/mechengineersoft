import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest { return { name: 'Mech Engineer Soft', short_name: 'MES', description: 'Engineering business solutions through software.', start_url: '/', display: 'standalone', background_color: '#050816', theme_color: '#2563EB', icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }] }; }
