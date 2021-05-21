import { ChangeEvent, useEffect, useState } from "react";
import { createWorker } from "tesseract.js"

const worker = createWorker({
  logger: m => console.log(m),
});

const getOcrText = async (imageUrl: string, options = { lang: "spa" }) => {
  await worker.load();
  await worker.loadLanguage(options.lang);
  await worker.initialize(options.lang);
  const { data: { text } } = await worker.recognize(imageUrl);
  return text;
}

export default function Home() {
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [ocrText, setOcrText] = useState("");

  async function extractText(imgUrl: string) {
    try {
      setLoading(true);
      const ocrText = await getOcrText(imgUrl);
      setOcrText(ocrText);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0];
      setImgUrl(URL.createObjectURL(img));
    }
  }

  useEffect(() => {
    if (!imgUrl) return;
    extractText(imgUrl);
  }, [imgUrl])

  return (
    <div>
      <h1>OCR Demo</h1>
      <input type="file" name="image" onChange={handleImageUpload} />
      {loading ? <p>Loading...</p> : <p>{ocrText}</p>}
    </div>
  )
}
