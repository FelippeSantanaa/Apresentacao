import React, { useState, useCallback, useEffect } from 'react'
import { render } from 'react-dom'
import { useTransition, animated, config } from 'react-spring'
import './styles.css'

const bla = (e, triggerClick) => {
  if (e.key === 'ArrowRight' || 'ArrowLeft') {
    triggerClick()
  }
  console.log(e.key)
}

const pages = [
  ({ style }) => <animated.div style={{ ...style, background: 'lightgrey' }}>1</animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: 'lightgrey' }}>2</animated.div>,
  ({ style }) => <animated.div style={{ ...style, background: 'lightgrey' }}>3</animated.div>,
]

export default function App() {
  const [index, set] = useState(0)
  const onClick = useCallback(() => set(state => (state + 1) % 3), [])
  const transitions = useTransition(index, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  useEffect(() => {
    document.addEventListener('keydown', e => bla(e, onClick))
  }, [])

  return (
    <div className="simple-trans-main" onClick={onClick}>
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item]
        return <Page key={key} style={props} />
      })}
    </div>
  )
}

render(<App />, document.getElementById('root'))
