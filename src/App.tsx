import { ChangeEvent, createRef } from 'react'
import './App.css'
import { LoadingSpinnerComponent } from './components/LoadingSpinner.component'
import { useImage } from './hooks/useImage'

function App() {
  const {image, loading, newCat, setWords} = useImage()
  const inputRef: React.RefObject<HTMLInputElement> = createRef();

  const handleClick = () => newCat()
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setWords(Number(inputRef.current!.value))

  return (
    <section>
      <header>
        <input ref={inputRef} onChange={handleChange} type="number"/>
        <button disabled={loading} onClick={handleClick}>new cat!</button>
      </header>
      <main>
        {image && !loading && <img src={image}></img>}
        {loading && <LoadingSpinnerComponent/>}
      </main>
    </section>
  )
}

export default App
