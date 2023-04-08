import { useCallback, useEffect, useState } from "react"
import { getRandomCatImage } from "../services/api-client-service"

export const useImage = () => {
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState(1);

  const newCat = useCallback(() => {
    setLoading(true);
    getRandomCatImage(words).subscribe(imageUrl => {
      setLoading(false);
      setImage(imageUrl)
    })
  }, [words])

  useEffect(() => {
    newCat();
  }, [])

  return {image, loading, newCat, setWords};
}