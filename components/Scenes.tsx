"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { wedding as w, mapsUrl } from "@/config/wedding";
import Countdown from "./Countdown";
import Rsvp from "./Rsvp";
export default function Scenes() {
  const root = useRef<HTMLDivElement>(null); const audio = useRef<HTMLAudioElement>(null); const [on, setOn] = useState(false);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches; if (reduce) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".scene > *").forEach(el => gsap.fromTo(el, { opacity: 0, y: 40, filter: "blur(6px)" }, { opacity: 1, y: 0, filter: "blur(0)", ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%", end: "top 50%", scrub: true } }));
    }, root); return () => ctx.revert();
  }, []);
  const share = `https://wa.me/?text=${encodeURIComponent(`${w.signature} invite you to their wedding, 18–19 December 2026, Lagos.\n${process.env.NEXT_PUBLIC_SITE_URL || ""}`)}`;
  return (<div ref={root}>
    <section className="scene" style={{ minHeight: "140vh" }}><h2>An invitation, wrapped in love.</h2><p>Something beautiful awaits.</p><span className="small">SCROLL TO BEGIN</span></section>
    <section className="scene"><p>To our beloved family and friends, with grateful hearts and immense joy, we invite you to witness and celebrate the beginning of our forever.</p></section>
    <section className="scene"><div className="script gold">{w.bride.split(" ")[0]}</div><h2>&amp;</h2><div className="script gold">{w.groom.split(" ")[0]}</div><span className="small">18–19 DECEMBER 2026 · LAGOS, NIGERIA</span><p>{w.motto}</p></section>
    {w.story.map(s => <section className="scene" key={s}><p>{s}</p></section>)}
    <section className="scene" style={{ minHeight: "120vh" }}><p>A promise made with love. A lifetime built together.</p></section>
    <section className="scene"><p>With our families beside us, we begin a new chapter.</p></section>
    <section className="scene"><span className="small">TOGETHER WITH THEIR FAMILIES</span><h2>{w.brideParents}</h2><p>and</p><h2>{w.groomParents}</h2><div className="script gold">{w.bride}</div><p>and</p><div className="script gold">{w.groom}</div><p>Request the pleasure of your company as they celebrate their wedding.</p></section>
    {w.events.map(e => <section className="scene" key={e.key}><span className="small">{e.date}</span><h2>{e.title}</h2><p>{e.tagline}</p><p>{e.time} · {e.venue}<br />{e.address}</p><p>Dress code: {e.dress}.{e.extra && <><br />{e.extra}</>}</p><a className="btn" href={mapsUrl(`${e.venue}, ${e.address}`)} target="_blank" rel="noopener noreferrer">GET DIRECTIONS</a></section>)}
    <section className="scene"><h2>THE COUNTDOWN TO FOREVER</h2><Countdown /></section>
    <section className="scene"><h2>A NOTE ON ATTIRE</h2><p>Traditional Engagement: elegant traditional attire. Aso Ebi colours: Emerald green and antique gold.</p><p>White Wedding and Reception: elegant formal attire. Suggested palette: Champagne, muted gold, burgundy and deep emerald. Please reserve white and ivory for the bride.</p></section>
    <section className="scene">{w.letter.map(l => <p key={l}>{l}</p>)}</section>
    <section className="scene" id="rsvp"><h2>WE WOULD LOVE TO HAVE YOU WITH US.</h2><p>Kindly confirm your attendance by {w.rsvpDeadline}.</p><Rsvp /></section>
    <section className="scene" style={{ minHeight: "130vh" }}><div className="script gold">{w.signature}</div><span className="small">18–19 DECEMBER 2026</span><span className="small">{w.motto.toUpperCase()}</span><p>We cannot wait to celebrate with you.</p><a className="btn" href={share} target="_blank" rel="noopener noreferrer">SHARE ON WHATSAPP</a></section>
    <button className="btn snd" aria-pressed={on} onClick={() => { const a = audio.current!; if (on) a.pause(); else a.play().catch(() => {}); setOn(!on); }}>{on ? "SOUND OFF" : "SOUND ON"}</button>
    <audio ref={audio} loop src="/music.mp3" preload="none" />
  </div>);
}
