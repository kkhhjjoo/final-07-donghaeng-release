'use client';

export default function ErrorPage({ error }: { error: Error }) {
  console.error(error);
  return <h1>error</h1>;
}
