// Cursor Glow Effect
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".cursor-glow")
  if (cursor) {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"
  }
})

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0) rotateX(0)"
    }
  })
}, observerOptions)

// Observe all elements for animations
document.querySelectorAll(".project-card, .cert-card, .about-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(50px) rotateX(-10deg)"
  el.style.transition = "opacity 0.8s ease, transform 0.8s ease"
  observer.observe(el)
})

// Enhanced Navbar on Scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector("header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(0, 0, 0, 0.95)"
    header.style.boxShadow = "0 4px 30px rgba(0, 255, 255, 0.3)"
  } else {
    header.style.background = "rgba(10, 10, 10, 0.9)"
    header.style.boxShadow = "0 4px 20px rgba(0, 255, 255, 0.2)"
  }
})

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroSection = document.querySelector(".hero-section")
  const cube = document.querySelector(".cube")
  const rate = scrolled * -0.3

  if (heroSection) {
    heroSection.style.transform = `translateY(${rate}px)`
  }

  if (cube) {
    cube.style.transform = `rotateX(${scrolled * 0.1}deg) rotateY(${scrolled * 0.2}deg) rotateZ(${scrolled * 0.05}deg)`
  }
})

// Add Loading Animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 1s ease"

  // Create loading screen
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
      <div style="
        width: 60px;
        height: 60px;
        border: 3px solid transparent;
        border-top: 3px solid #00ffff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
        box-shadow: 0 0 20px #00ffff;
      "></div>
      <div style="
        color: #00ffff;
        font-family: 'Inter', sans-serif;
        font-size: 1.2rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        text-shadow: 0 0 10px #00ffff;
      ">Loading...</div>
    </div>
  `

  const style = document.createElement("style")
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `
  document.head.appendChild(style)
  document.body.appendChild(loadingScreen)

  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    loadingScreen.style.transition = "opacity 0.5s ease"
    document.body.style.opacity = "1"

    setTimeout(() => {
      document.body.removeChild(loadingScreen)
    }, 500)
  }, 2000)
})

// Enhanced Card Hover Effects with 3D
document.querySelectorAll(".project-card, .cert-card, .about-card").forEach((card) => {
  card.addEventListener("mouseenter", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    card.style.setProperty("--mouse-x", x + "px")
    card.style.setProperty("--mouse-y", y + "px")
  })

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`
  })

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) rotateX(0) rotateY(0) scale(1)"
  })
})

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

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 400)
  }, 5000)
}

// Add matrix rain effect (optional)
function createMatrixRain() {
  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.style.position = "fixed"
  canvas.style.top = "0"
  canvas.style.left = "0"
  canvas.style.width = "100%"
  canvas.style.height = "100%"
  canvas.style.pointerEvents = "none"
  canvas.style.zIndex = "1"
  canvas.style.opacity = "0.1"

  document.body.appendChild(canvas)

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split("")
  const fontSize = 10
  const columns = canvas.width / fontSize
  const drops = []

  for (let x = 0; x < columns; x++) {
    drops[x] = 1
  }

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = "#00ffff"
    ctx.font = fontSize + "px monospace"

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)]
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }

  setInterval(draw, 35)

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })
}

// Uncomment to enable matrix rain effect
// createMatrixRain()

// Add glitch effect to random elements
setInterval(() => {
  const elements = document.querySelectorAll(".project-card h3, .cert-card h4")
  const randomElement = elements[Math.floor(Math.random() * elements.length)]

  if (randomElement) {
    randomElement.style.animation = "glitch 0.3s ease-in-out"
    setTimeout(() => {
      randomElement.style.animation = ""
    }, 300)
  }
}, 10000)
