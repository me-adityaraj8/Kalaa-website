import { CONTACT } from '../data/site';

export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const callLink = `tel:${CONTACT.phoneE164}`;
export const instagramLink = `https://instagram.com/${CONTACT.instagram}`;
