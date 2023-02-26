import Head from 'next/head'
import dynamic from 'next/dynamic'

const TimerUpdaterComponent = dynamic(() => import('../components/TimerUpdaterComponent'), { ssr: false });

export default function Home() {
  return (
    <div className="container">
      <main>
        <TimerUpdaterComponent />
      </main>
    </div>
  )
}