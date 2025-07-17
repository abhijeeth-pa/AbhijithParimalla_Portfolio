// Import Lenis and GSAP
import Lenis from "@studio-freight/lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Cursor Glow Effect
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".cursor-glow")
  if (cursor) {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
  }
})

// Initialize Lenis Smooth Scroll with enhanced settings
const lenis = new Lenis({
  duration: 1.8,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 2,
  smoothTouch: true,
  touchMultiplier: 3,
  infinite: false,
  normalizeWheel: true,
})

// GSAP ScrollTrigger integration with Lenis
gsap.registerPlugin(ScrollTrigger)

lenis.on("scroll", ScrollTrigger.update)

gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// Scroll Progress Bar
lenis.on("scroll", ({ scroll, limit }) => {
  const progress = scroll / limit
  document.querySelector(".scroll-progress-bar").style.width = `${progress * 100}%`
})

// Custom scroll to function for navigation
function scrollToSection(target) {
  const element = document.querySelector(target)
  if (element) {
    lenis.scrollTo(element, {
      offset: -80,
      duration: 2,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })
  }
}

// Navigation click handlers
document.querySelectorAll("[data-scroll-to]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const target = `#${link.getAttribute("data-scroll-to")}`
    scrollToSection(target)
  })
})

// GSAP Scroll Animations
gsap.set(".reveal-text", { y: 100, opacity: 0 })
gsap.set(".card-reveal", { y: 120, rotationX: -15, opacity: 0 })

// Reveal text animations
ScrollTrigger.batch(".reveal-text", {
  onEnter: (elements) => {
    gsap.to(elements, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
    })
  },
  start: "top 80%",
})

// Card reveal animations
ScrollTrigger.batch(".card-reveal", {
  onEnter: (elements) => {
    gsap.to(elements, {
      y: 0,
      rotationX: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.15,
      ease: "power2.out",
    })
  },
  start: "top 85%",
})

// Parallax effects for hero elements
gsap.to(".layer-1", {
  yPercent: -50,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
})

gsap.to(".layer-2", {
  yPercent: -30,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
})

gsap.to(".layer-3", {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
})

// 3D Cube rotation based on scroll
gsap.to(".cube", {
  rotationX: 360,
  rotationY: 360,
  rotationZ: 180,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  },
})

// Floating geometry movement
gsap.to(".floating-geometry", {
  y: -100,
  x: 50,
  ease: "none",
  scrollTrigger: {
    trigger: ".hero-section",
    start: "top bottom",
    end: "bottom top",
    scrub: 2,
  },
})

// Enhanced 3D Scrolling Effects
ScrollTrigger.create({
  trigger: ".hero-section",
  start: "top top",
  end: "bottom top",
  scrub: 1,
  onUpdate: (self) => {
    const progress = self.progress

    // 3D transform for hero content
    gsap.set(".hero-content", {
      rotationX: progress * 30,
      z: progress * -200,
      opacity: 1 - progress * 0.5,
    })

    // Enhanced cube rotation
    gsap.set(".cube", {
      rotationX: progress * 720,
      rotationY: progress * 540,
      rotationZ: progress * 360,
      scale: 1 - progress * 0.3,
      z: progress * 300,
    })
  },
})

// Section entrance animations with 3D effects
ScrollTrigger.batch(".section", {
  onEnter: (elements) => {
    elements.forEach((section, index) => {
      gsap.fromTo(
        section,
        {
          rotationX: -15,
          y: 100,
          opacity: 0,
          scale: 0.9,
        },
        {
          rotationX: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          delay: index * 0.1,
          ease: "power3.out",
        },
      )
    })
  },
  start: "top 80%",
})

// Enhanced card animations with magnetic effect
document.querySelectorAll(".project-card, .cert-card, .about-card").forEach((card) => {
  let isHovering = false

  card.addEventListener("mouseenter", () => {
    isHovering = true
    gsap.to(card, {
      y: -30,
      rotationX: 15,
      rotationY: 10,
      scale: 1.05,
      duration: 0.6,
      ease: "power2.out",
      transformOrigin: "center center",
      boxShadow: "0 30px 60px rgba(0, 255, 255, 0.3)",
    })
  })

  card.addEventListener("mouseleave", () => {
    isHovering = false
    gsap.to(card, {
      y: 0,
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
      boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
    })
  })

  card.addEventListener("mousemove", (e) => {
    if (!isHovering) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 5
    const rotateY = (centerX - x) / 5

    gsap.to(card, {
      rotationX: 15 + rotateX,
      rotationY: 10 + rotateY,
      duration: 0.2,
      ease: "power1.out",
    })
  })
})

// Scroll velocity effects
let scrollVelocity = 0
let lastScrollY = 0

lenis.on("scroll", ({ scroll }) => {
  scrollVelocity = scroll - lastScrollY
  lastScrollY = scroll

  // Apply velocity-based effects
  gsap.to(".particle", {
    x: scrollVelocity * 0.5,
    duration: 0.5,
    ease: "power2.out",
  })

  // Velocity-based blur effect
  const blurAmount = Math.min(Math.abs(scrollVelocity) * 0.1, 5)
  gsap.to("body", {
    filter: `blur(${blurAmount}px)`,
    duration: 0.1,
    ease: "none",
  })

  setTimeout(() => {
    gsap.to("body", {
      filter: "blur(0px)",
      duration: 0.3,
      ease: "power2.out",
    })
  }, 100)
})

// Enhanced Navbar on Scroll
ScrollTrigger.create({
  start: "top -80",
  end: 99999,
  toggleClass: { className: "scrolled", targets: "header" },
})

// Add scrolled class styles
const style = document.createElement("style")
style.textContent = `
  header.scrolled {
    background: rgba(0, 0, 0, 0.95) !important;
    box-shadow: 0 4px 30px rgba(0, 255, 255, 0.3) !important;
    backdrop-filter: blur(30px) !important;
  }
`
document.head.appendChild(style)

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const nameElement = document.querySelector(".name")
  if (nameElement) {
    const originalText = nameElement.textContent
    setTimeout(() => {
      typeWriter(nameElement, originalText, 200)
    }, 2500)
  }
})

// Enhanced 3D Name Interaction
const nameElement = document.querySelector(".name")
if (nameElement) {
  nameElement.addEventListener("mouseenter", () => {
    gsap.to(nameElement, {
      rotationX: 25,
      rotationY: 15,
      scale: 1.1,
      z: 50,
      duration: 0.6,
      ease: "power2.out",
    })
  })

  nameElement.addEventListener("mouseleave", () => {
    gsap.to(nameElement, {
      rotationX: 15,
      rotationY: -5,
      scale: 1,
      z: 0,
      duration: 0.6,
      ease: "power2.out",
    })
  })

  nameElement.addEventListener("mousemove", (e) => {
    const rect = nameElement.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    gsap.to(nameElement, {
      rotationX: 25 + rotateX,
      rotationY: 15 + rotateY,
      duration: 0.2,
      ease: "power1.out",
    })
  })
}

// Enhanced ripple effect for buttons
document.querySelectorAll("button, .btn-primary, .btn-secondary, .project-link, .cert-link").forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  })
})

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    navMenu.classList.toggle("active")
  })

  // Close mobile menu when clicking on a link
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active")
      navMenu.classList.remove("active")
    })
  })
}

// Newsletter form submission
const newsletterForm = document.getElementById("newsletterForm")
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = document.getElementById("email").value
    const subscribeBtn = document.querySelector(".subscribe-btn")
    const btnText = document.querySelector(".btn-text")

    // Show loading state
    btnText.textContent = "Subscribing..."
    subscribeBtn.disabled = true

    // Simulate API call
    setTimeout(() => {
      // Create mailto link to send subscription email
      const subject = encodeURIComponent("Newsletter Subscription")
      const body = encodeURIComponent(
        `New newsletter subscription from: ${email}\n\nPlease add this email to the newsletter list.`,
      )
      const mailtoLink = `mailto:abhijeethparimalla@gmail.com?subject=${subject}&body=${body}`

      // Open email client
      window.location.href = mailtoLink

      // Reset form
      document.getElementById("email").value = ""
      btnText.textContent = "Subscribed!"

      // Reset button after 3 seconds
      setTimeout(() => {
        btnText.textContent = "Subscribe"
        subscribeBtn.disabled = false
      }, 3000)

      // Show success message
      showNotification("Thank you for subscribing! Check your email client.", "success")
    }, 1000)
  })
}

// Enhanced Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  // Add futuristic styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === "success" ? "rgba(0, 255, 0, 0.1)" : "rgba(0, 255, 255, 0.1)"};
        color: ${type === "success" ? "#00ff00" : "#00ffff"};
        border: 1px solid ${type === "success" ? "#00ff00" : "#00ffff"};
        border-radius: 15px;
        box-shadow: 0 0 20px ${type === "success" ? "rgba(0, 255, 0, 0.3)" : "rgba(0, 255, 255, 0.3)"};
        backdrop-filter: blur(20px);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        font-family: 'Inter', sans-serif;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
    `

  document.body.appendChild(notification)

  // Animate in with GSAP
  gsap.fromTo(notification, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" })

  // Remove after 5 seconds
  setTimeout(() => {
    gsap.to(notification, {
      x: 100,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      },
    })
  }, 5000)
}

// Add glitch effect to random elements
setInterval(() => {
  const elements = document.querySelectorAll(".project-card h3, .cert-card h4")
  const randomElement = elements[Math.floor(Math.random() * elements.length)]

  if (randomElement) {
    gsap.to(randomElement, {
      x: 2,
      duration: 0.1,
      yoyo: true,
      repeat: 5,
      ease: "power2.inOut",
    })
  }
}, 10000)

// Skill tags animation on scroll
ScrollTrigger.batch(".skill-tag", {
  onEnter: (elements) => {
    gsap.fromTo(
      elements,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
    )
  },
  start: "top 90%",
})

// Tech stack animation
ScrollTrigger.batch(".tech-stack span", {
  onEnter: (elements) => {
    gsap.fromTo(
      elements,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
      },
    )
  },
  start: "top 85%",
})

// Loading screen with enhanced animations
window.addEventListener("load", () => {
  // Create enhanced loading screen
  const loadingScreen = document.createElement("div")
  loadingScreen.innerHTML = `
    <div style="
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      flex-direction: column;
    ">
      <div class="loader-cube" style="
        width: 60px;
        height: 60px;
        position: relative;
        transform-style: preserve-3d;
        margin-bottom: 30px;
      ">
        <div style="position: absolute; width: 60px; height: 60px; border: 2px solid #00ffff; background: rgba(0,255,255,0.1); transform: rotateY(0deg) translateZ(30px);"></div>
        <div style="position: absolute; width: 60px; height: 60px; border: 2px solid #ff00ff; background: rgba(255,0,255,0.1); transform: rotateY(90deg) translateZ(30px);"></div>
        <div style="position: absolute; width: 60px; height: 60px; border: 2px solid #00ff00; background: rgba(0,255,0,0.1); transform: rotateY(180deg) translateZ(30px);"></div>
        <div style="position: absolute; width: 60px; height: 60px; border: 2px solid #8a2be2; background: rgba(138,43,226,0.1); transform: rotateY(-90deg) translateZ(30px);"></div>
      </div>
      <div style="
        color: #00ffff;
        font-family: 'Inter', sans-serif;
        font-size: 1.2rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        text-shadow: 0 0 10px #00ffff;
      ">Loading Portfolio...</div>
    </div>
  `

  document.body.appendChild(loadingScreen)

  // Animate loading cube
  gsap.to(".loader-cube", {
    rotationX: 360,
    rotationY: 360,
    duration: 2,
    repeat: -1,
    ease: "none",
  })

  // Remove loading screen after 2.5 seconds
  setTimeout(() => {
    gsap.to(loadingScreen, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        document.body.removeChild(loadingScreen)

        // Initialize main animations
        gsap.fromTo("body", { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" })
      },
    })
  }, 2500)
})

// Smooth scroll to top function
function scrollToTop() {
  lenis.scrollTo(0, {
    duration: 2,
    easing: (t) => 1 - Math.pow(1 - t, 3),
  })
}

// Add scroll to top button (optional)
const scrollTopBtn = document.createElement("button")
scrollTopBtn.innerHTML = "↑"
scrollTopBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  background: var(--gradient-primary);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1000;
  opacity: 0;
  transform: translateY(100px);
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
`

document.body.appendChild(scrollTopBtn)

scrollTopBtn.addEventListener("click", scrollToTop)

// Show/hide scroll to top button
ScrollTrigger.create({
  start: "top -300",
  end: 99999,
  onUpdate: (self) => {
    if (self.direction === 1) {
      gsap.to(scrollTopBtn, { opacity: 1, y: 0, duration: 0.3 })
    } else {
      gsap.to(scrollTopBtn, { opacity: 0, y: 100, duration: 0.3 })
    }
  },
})
