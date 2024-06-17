'use client'

import { useEffect, useState } from 'react'

const DeploymentStatus: React.FC = () => {
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    const eventSource = new EventSource(`/api/sse/${1}`) //configure this based on your user case, for demo purpose I'm using static value

    eventSource.onmessage = event => {
      const data = event.data && JSON.parse(event?.data)

      if (data.success) {
        setStatus('success')
        eventSource.close()
      }
    }

    eventSource.onerror = () => {
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return (
    <div>
      {status === 'loading' ? (
        <div>Loading...</div>
      ) : (
        <div>Deployment Successful!</div>
      )}
    </div>
  )
}

export default DeploymentStatus
