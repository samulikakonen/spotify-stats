import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { authOptions } from './api/auth/[...nextauth]/route';

async function getUser(token: string) {
  const response = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) redirect('/api/auth/signin');

  return response.json();
}

async function getData(token: string) {
  const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) redirect('/api/auth/signin');

  return response.json();
}

export default async function Home() {
  const session = await getServerSession(authOptions);
  const sessionCopy: any = session;

  if (!session) redirect('/api/auth/signin');

  const trackData = await getData(sessionCopy.accessToken);
  const user = await getUser(sessionCopy.accessToken);

  return (
    <>
      <header className='my-8'>
        <div className='flex justify-between mb-8'>
          <h1 className='text-4xl'>Audiolytix</h1>
          <a href='/api/auth/signout'>Sign out</a>
        </div>
        <div className='flex gap-8 items-center'>
          {user.images.length > 0 && (
            <Image className='rounded-full' src={user.images[1].url} width={150} height={150} alt='Profile picture' />
          )}
          <h1 className='text-3xl'>{user.display_name}</h1>
        </div>
      </header>
      <main>
        <h2 className='text-2xl mb-8'>You top songs</h2>
        <div className='flex gap-2 mb-8'>
          <button className='px-4 py-1 rounded-full text-white bg-cyan-500'>Last month</button>
          <button className='px-4 py-1 rounded-full text-white bg-cyan-500'>Last 6 months</button>
          <button className='px-4 py-1 rounded-full text-white bg-cyan-500'>All time</button>
        </div>
        <div className='flex justify-between align-start'>
          <table className='border-separate border-spacing-y-px bg-gradient-to-l from-transparent to-gray-500'>
            <thead>
              <tr className='bg-gradient-to-l from-zinc-900 to-neutral-800'>
                <th className='px-6 py-2'>Pos.</th>
                <th className='text-left'>Song</th>
              </tr>
            </thead>
            <tbody>
              {trackData.items.map((track: any, index: number) => (
                <tr key={track.id} className='bg-zinc-900'>
                  <td className='px-6 py-2'>{index + 1}</td>
                  <td className='flex items-center gap-4 py-2 pr-16'>
                    <Image
                      src={track.album.images[2].url}
                      width={25}
                      height={25}
                      alt={track.album.name + ' cover image'}
                    />
                    {track.artists.map((artist: any) => artist.name).join(', ')} - {track.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex items-start pt-24 -ml-16'>
            <Image
              className='-mr-16 rounded-full mt-16'
              src={trackData.items[1].album.images[0].url}
              width={250}
              height={250}
              alt={trackData.items[1].album.name + ' cover image'}
            />
            <Image
              className='z-10 rounded-full'
              src={trackData.items[0].album.images[0].url}
              width={350}
              height={350}
              alt={trackData.items[0].album.name + ' cover image'}
            />
            <Image
              className='rounded-full -ml-16 mt-16'
              src={trackData.items[2].album.images[0].url}
              width={250}
              height={250}
              alt={trackData.items[2].album.name + ' cover image'}
            />
          </div>
        </div>
      </main>
    </>
  );
}
