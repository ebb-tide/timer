import Head from 'next/head'
import dynamic from 'next/dynamic'

const TimerDisplayComponent = dynamic(() => import('../components/TimerDisplayComponent'), { ssr: false });

export default function Home() {
  return (
    <div className="container">
      <main>
        <TimerDisplayComponent />
      </main>
    </div>
  )
}