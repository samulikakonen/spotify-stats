import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { authOptions } from './api/auth/[...nextauth]/route';

type TimeRange = 'medium_term' | 'long_term';

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

async function getTracks(token: string, time_range: TimeRange) {
  let url = 'https://api.spotify.com/v1/me/top/tracks';

  if (time_range === 'medium_term' || time_range === 'long_term') {
    url += `?time_range=${time_range}`;
  } else {
    url += '?time_range=short_term';
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) redirect('/api/auth/signin');

  return response.json();
}

export default async function Home({ searchParams }: { searchParams: { time_range: TimeRange } }) {
  const session = await getServerSession(authOptions);
  const sessionCopy: any = session;

  if (!session) redirect('/api/auth/signin');

  const user = await getUser(sessionCopy.accessToken);
  const trackData = await getTracks(sessionCopy.accessToken, searchParams.time_range);

  const { time_range } = searchParams;

  const activeTimeRange = time_range === 'medium_term' || time_range === 'long_term' ? time_range : 'short_term';

  return (
    <>
      <header className='my-4 border-b border-neutral-400 px-4 lg:mx-[8vw] lg:border-none lg:mt-8 lg:px-0 2xl:mx-[14vw]'>
        <div className='flex justify-between mb-8'>
          <h1 className='text-4xl'>Audiolytix</h1>
          <a href='/api/auth/signout'>Sign out</a>
        </div>
        <div className='flex flex-col gap-8 items-center lg:flex-row'>
          {user.images.length > 0 && (
            <Image
              className='rounded-full'
              src={user.images[user.images.length - 1].url}
              width={150}
              height={150}
              alt='Profile picture'
            />
          )}
          <h1 className='text-3xl pb-8 lg:pb-0'>{user.display_name}</h1>
        </div>
      </header>
      <main className='pt-4 pb-8 lg:mx-[8vw] 2xl:mx-[14vw]'>
        <h2 className='text-2xl mb-8 text-center lg:text-left'>Your top songs</h2>
        <div className='flex justify-center gap-2 mb-8 lg:items-start lg:justify-start'>
          <a
            href='/'
            className={`px-4 py-1 rounded-full text-white ${activeTimeRange === 'short_term' ? 'bg-cyan-500' : ''}`}
          >
            Last month
          </a>
          <a
            href='/?time_range=medium_term'
            className={`px-4 py-1 rounded-full text-white ${activeTimeRange === 'medium_term' ? 'bg-cyan-500' : ''}`}
          >
            Last 6 months
          </a>
          <a
            href='/?time_range=long_term'
            className={`px-4 py-1 rounded-full text-white ${activeTimeRange === 'long_term' ? 'bg-cyan-500' : ''}`}
          >
            All time
          </a>
        </div>
        <div className='flex flex-col-reverse justify-between align-start lg:flex-row'>
          <div className='mx-4 lg:mx-0'>
            <div className='bg-gradient-to-r from-zinc-900 to-transparent flex gap-4 px-4 py-2'>
              <span>Pos.</span>
              <span>Song</span>
            </div>
            <div className='h-px bg-gradient-to-l from-transparent to-gray-500' />
            {trackData.items.map((track: any, index: number) => (
              <>
                <div key={track.id} className='flex gap-4 items-center py-2 pl-6'>
                  <span>{index + 1}</span>
                  <span className='flex items-center gap-4 pl-4'>
                    <Image
                      src={track.album.images[2].url}
                      width={25}
                      height={25}
                      alt={track.album.name + ' cover image'}
                    />
                    {track.artists.map((artist: any) => artist.name).join(', ')} - {track.name}
                  </span>
                </div>
                <div className='h-px bg-gradient-to-l from-transparent to-gray-500' />
              </>
            ))}
          </div>
          <div className='flex justify-center mb-8 lg:mt-32 lg:-ml-10'>
            <div className='relative h-36 w-36 mt-2 -mr-12 sm:h-40 sm:w-40 sm:mt-6 lg:h-[14vw] lg:w-[14vw] lg:mt-8'>
              <Image
                className='rounded-full'
                src={trackData.items[1].album.images[0].url}
                fill
                alt={trackData.items[1].album.name + ' cover image'}
              />
            </div>
            <div className='relative h-40 w-40 z-10 sm:h-48 sm:w-48 lg:h-[18vw] lg:w-[18vw]'>
              <Image
                className='rounded-full'
                src={trackData.items[0].album.images[0].url}
                fill
                alt={trackData.items[0].album.name + ' cover image'}
              />
            </div>
            <div className='relative h-36 w-36 mt-2 -ml-12 sm:h-40 sm:w-40 sm:mt-6 lg:h-[14vw] lg:w-[14vw] lg:mt-8'>
              <Image
                className='rounded-full'
                src={trackData.items[2].album.images[0].url}
                fill
                alt={trackData.items[2].album.name + ' cover image'}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
