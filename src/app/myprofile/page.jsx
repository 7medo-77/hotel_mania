/* My profile Page */

import { auth } from '../../../auth';
import UserProfile from '@/components/userProfile/userProfile';
import { redirect } from 'next/navigation';

export default async function MyProfile() {
  const session = await auth();
  if (!session) {
	redirect('/login');
  }
  return (<UserProfile session={session}>
  </UserProfile>)
}
