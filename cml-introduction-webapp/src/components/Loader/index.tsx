import React from 'react'
import { useLoading, ThreeDots } from '@agney/react-loading'
const Loader: React.FC = () => {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <ThreeDots />
  })
  return (
    <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '4%' }}>
      <section {...containerProps} style={{ width: '60px', textAlign: 'center', marginTop: '20px' }}>
        {indicatorEl} {/* renders only while loading */}
      </section>
    </div>
  )
}

export default Loader
