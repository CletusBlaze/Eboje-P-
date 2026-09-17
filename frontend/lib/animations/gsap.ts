import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register once — all hooks import from here, never register individually
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
