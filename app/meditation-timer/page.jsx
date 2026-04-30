import MeditationTimer from '@/views/MeditationTimer';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Free Online Meditation Timer for Mantra Japa',
  description: 'Use our free meditation timer alongside the japa counter for time-based mantra practice. Set duration, gentle bells, no signup needed. Begin now.',
  canonical: '/meditation-timer',
});

export default function MeditationTimerPage() {
  return <MeditationTimer />;
}
