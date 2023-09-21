import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { signIn } from 'next-auth/react';

async function getData(token: string) {
  const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const trackData = await getData(session.accessToken);

  if (!session) {
    return (
      <>
        <h1>You are no logged in!</h1>
        <button onClick={() => signIn('spotify')}>Login</button>
      </>
    );
  }

  return (
    <>
      <h1>Top tracks</h1>
      <ul>
        {trackData.items.map((track) => (
          <li>
            {track.artists.map((artist) => artist.name + ', ')} - {track.name}
          </li>
        ))}
      </ul>
    </>
  );
}
