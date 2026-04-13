import dynamic from 'next/dynamic';

const SignInPage = dynamic(
  () => import('@/components/ui/sign-in-flow-1').then((mod) => mod.SignInPage),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0 m-0">
      <div className="flex w-full min-h-screen justify-center items-center">
        <SignInPage />
      </div>
    </main>
  );
}
