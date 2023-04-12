import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [video, setVideo] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setVideo();
    setLoading(true);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });

    const videoUrl = await response.json();
    console.log(videoUrl)
    setVideo(videoUrl);
    setLoading(false);

  };


  return (
    <>
      <Head>
        <title>Text-to-Video AI</title>
        <meta name="description" content="Interactive Text-to-Video demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.topbanner}>
        <p>Built on <a href="https://replit.com/@zahid" target="_blank" rel="noreferrer">Replit</a>. Powered by <a href="https://replicate.com/" target="_blank" rel="noreferrer">Replicate</a>.</p>
      </div>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.apptitle}>Text-to-Video AI</h1>
          <p className={styles.appdescription}>Using <a href="https://huggingface.co/damo-vilab/modelscope-damo-text-to-video-synthesis" target="_blank" rel="noreferrer" className={styles.link}>ModelScope</a> text-to-video synthesis.</p>
        </div>
        <div className={styles.center}>
          <div className={styles.cloudform}>
            <form onSubmit={handleSubmit}>
              <textarea
                rows="1"
                type="text"
                id="prompt"
                name="prompt"
                placeholder="Enter a prompt to generate a video"
                required
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                className={styles.textarea}
              />

              <div className={styles.generatebuttonroot}>
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.generatebutton}>
                  {loading ? "Loading..." : "Generate"}
                </button>
              </div>
            </form>
          </div>


          <div className={styles.cloud}>
            <div className={styles.loadingwheel}>
              {loading ? <div className={styles.loadingview}><CircularProgress color="inherit" size={50} /> <p>Generating your video! This can take up to a minute.</p></div> : null}
            </div>

            {video && <video className={styles.videoplayer} src={video} autoPlay controls />}

          </div>
        </div>

      </main>
    </>
  )
}
