import { AirVent, Laptop, Smartphone, SunMedium, type LucideProps } from 'lucide-react';
import type { CourseSlug } from '../data/courses';

const ICONS: Record<CourseSlug, typeof Smartphone> = {
  'smartphone-repair': Smartphone,
  'laptop-repair': Laptop,
  'ac-service': AirVent,
  'solar-installation': SunMedium,
};

export default function TradeIcon({ slug, ...props }: { slug: CourseSlug } & LucideProps) {
  const Icon = ICONS[slug];
  return <Icon aria-hidden {...props} />;
}
