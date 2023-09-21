import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  console.log(req);
  const res = await fetch('https://api.spotify.com/v1/me/top/tracks', {
    method: 'GET',
    headers: {
      Authorization: `Bearer `,
    },
  });
  return NextResponse.json(res.json());
}
