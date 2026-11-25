"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiPause,
  FiPlay,
  FiVolume2,
  FiVolumeX,
} from "react-icons/fi";
import { TESTIMONIALS } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

const VIDEO_DIR = "/new-images/review-video";

/** Short clips paired with the customer quotes, in order. */
const VIDEOS = [
  "dressing_corner_morning_247-video (1).mp4",
  "evening_kitchen_kettle_246-video (3).mp4",
  "climbing_gym_bench_255-video (4) (1).mp4",
  "cabin_porch_mist_245-video (3) (1).mp4",
  "beach_towel_midday_207-video (1) (1).mp4",
  "custom_boss-five-v3-real-settings-2026-11-07_outdoor-v3-trench-park-video (1).mp4",
].map((f) => encodeURI(`${VIDEO_DIR}/${f}`));

/** Still frames pulled from each clip, shown until the clip is played. */
const POSTERS = VIDEOS.map((_, i) => `${VIDEO_DIR}/posters/review-${i}.webp`);

/** Each card rests on a different frame so the row doesn't look uniform. */
// Picked by hand: each lands on a different scene (wall, doorway, gym mat,
// porch post, shoreline, tulips) rather than the product hold.
const STILL_AT = [6.1, 24.3, 8.6, 9.4, 8.1, 8.1];

/**
 * Social-proof rail: tall video cards with the quote and name beneath,
 * scrolled sideways with arrow controls. Clips rest on a still frame and
 * only play when tapped.
 */
export default function Loved() {
  const rail = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = rail.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="section-pad">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display-3 font-serif text-espresso">
            Why Customers{" "}
            <span className="serif-italic">Love Vora Labs</span>
          </h2>

          <div className="flex gap-2">
            <ArrowButton label="Previous reviews" onClick={() => scrollBy(-1)}>
              <FiArrowLeft size={16} />
            </ArrowButton>
            <ArrowButton label="Next reviews" onClick={() => scrollBy(1)} dark>
              <FiArrowRight size={16} />
            </ArrowButton>
          </div>
        </div>

        <div
          ref={rail}
          className="snap-rail no-scrollbar -mx-[max(20px,3.2vw)] mt-8 flex gap-5 overflow-x-auto px-[max(20px,3.2vw)] pb-2 lg:mx-0 lg:mt-10 lg:px-0"
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.07, ease: EASE }}
              className="flex w-[70vw] flex-none flex-col xs:w-[52vw] sm:w-[38vw] lg:w-[calc((100%-60px)/4)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[8px] bg-beige">
                <ReviewVideo
                  src={VIDEOS[i % VIDEOS.length]}
                  poster={POSTERS[i % POSTERS.length]}
                  stillAt={STILL_AT[i % STILL_AT.length]}
                  label={t.name}
                />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-cream/90 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.06em] text-espresso backdrop-blur-sm">
                  <FiCheck size={12} />
                  {t.sub}
                </span>
              </div>

              <blockquote className="mt-4 font-serif text-[17px] leading-[1.3] tracking-display text-espresso">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="label-xs mt-4 text-espresso">
                {t.name}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Rests on its own still frame; tap to play or pause, with a sound toggle. */
function ReviewVideo({
  src,
  poster,
  stillAt,
  label,
}: {
  src: string;
  poster: string;
  stillAt: number;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Seek to this card's still frame once the clip's duration is known.
  const showStill = () => {
    const video = ref.current;
    if (!video || !video.duration) return;
    video.currentTime = Math.min(stillAt, video.duration - 0.1);
  };

  // Pause if the card scrolls away while playing.
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => !entry.isIntersecting && video.pause(),
      { threshold: 0.2 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <>
      <video
        ref={ref}
        src={`${src}#t=${stillAt}`}
        poster={poster}
        muted={muted}
        loop
        playsInline
        // ~10MB per clip: show the poster frame and download nothing until
        // the shopper presses play.
        preload="none"
        onLoadedMetadata={showStill}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label={`Video review from ${label}`}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="group/play absolute inset-0 grid place-items-center"
      >
        <span
          className={`grid h-14 w-14 place-items-center rounded-full bg-cream/85 text-espresso shadow-lg backdrop-blur-sm transition-all duration-300 group-hover/play:scale-105 ${
            playing ? "opacity-0 group-hover/play:opacity-100" : "opacity-100"
          }`}
        >
          {playing ? <FiPause size={20} /> : <FiPlay size={20} className="ml-0.5" />}
        </span>
      </button>

      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-espresso/55 text-cream backdrop-blur-sm transition-colors hover:bg-espresso/75"
      >
        {muted ? <FiVolumeX size={15} /> : <FiVolume2 size={15} />}
      </button>
    </>
  );
}

function ArrowButton({
  label,
  onClick,
  dark = false,
  children,
}: {
  label: string;
  onClick: () => void;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${
        dark
          ? "border-espresso bg-espresso text-cream hover:bg-espresso-soft"
          : "border-sand bg-cream text-espresso hover:border-espresso"
      }`}
    >
      {children}
    </button>
  );
}
