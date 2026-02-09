import { getMeetings } from '@/lib/meetings';
import Map from './Map';

export default async function MapPage() {
  const res = await getMeetings();
  const meetings = res.ok === 1 ? res.item : [];

  return <Map meetings={meetings} />;
}
