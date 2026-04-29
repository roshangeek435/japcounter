import MeditationTimer from '@/views/MeditationTimer';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Meditation Timer — Free Online Bell Timer with Breathing Guide',
  description:
    'Free meditation timer with preset durations, ambient music, breathing guide animation and full-screen mode.',
  canonical: '/meditation-timer',
});

export default function MeditationTimerPage() {
  return <MeditationTimer />;
}
