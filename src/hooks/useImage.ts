import { useCallback, useEffect, useState } from "react"
import { catchError, finalize } from "rxjs";
import { getRandomCatImage } from "../services/api-client-service"

export const useImage = () => {
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false);
  const [words, setWords] = useState(1);
  const [error, setError] = useState(null);

  const newCat = useCallback(() => {
    setLoading(true);
    getRandomCatImage(words).pipe(
      finalize(() => setLoading(false))
    ).subscribe({
      next: imageUrl => setImage(imageUrl),
      error: error => setError(error.message),
    })
  }, [words])

  useEffect(() => {
    newCat();
  }, [])

  return {image, loading, newCat, setWords, error};
}