import { useEffect, useState } from 'react';

export type SiteSettings = {
  companyName: string;
  tagline: string;
  businessEmail: string;
  phone: string;
  address: string;
  primaryColor: string;
  maintenanceMode: boolean;
};

export const defaultSiteSettings: SiteSettings = {
  companyName: 'Mech Engineer Soft',
  tagline: 'Engineering Business Solutions Through Software',
  businessEmail: '',
  phone: '',
  address: '',
  primaryColor: '#2563EB',
  maintenanceMode: false,
};

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);

  useEffect(() => {
    fetch('/api/site/settings', { cache: 'no-store' })
      .then(async (response) => {
        if (!response.ok) return;
        const data = await response.json();
        setSettings({ ...defaultSiteSettings, ...data });
      })
      .catch(() => undefined);
  }, []);

  return settings;
}