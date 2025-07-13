import { gsap } from "gsap";

import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollSmoother);
gsap.registerPlugin(ScrollTrigger);

// create the scrollSmoother before your scrollTriggers
export let smoother = ScrollSmoother.create({
  smooth: 2, // how long (in seconds) it takes to "catch up" to the native scroll position
  effects: true, // looks for data-speed and data-lag attributes on elements
  //smoothTouch: 0.1, // much shorter smoothing time on touch devices (default is NO smoothing on touch devices)
  normalizeScroll: true
});