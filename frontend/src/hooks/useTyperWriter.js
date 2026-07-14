import { useEffect, useState } from "react";

export default function useTypeWriter({ words, stop = true }) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timer = setTimeout(
      () => {
        if (stop) return;
        if (!isDeleting) {
          const nextText = currentWord.slice(0, text.length + 1);
          setText(nextText);

          if (nextText === currentWord) {
            setTimeout(() => setIsDeleting(true), 1000); // 1s ruk kar delete
          }
        } else {
          const nextText = currentWord.slice(0, text.length - 1);
          setText(nextText);

          if (nextText === "") {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? 70 : 150,
    );

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, stop, words]);

  return text;
}
