function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
  
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
  
        const animName = el.dataset.anim || 'fadeInUp';
        const duration = el.dataset.duration || '1s';
        const delay = el.dataset.delay || '0s';
        const easing = el.dataset.easing || 'ease-out';
  
        // Use shorthand so browser starts the animation with correct order
        el.style.animation = `${animName} ${duration} ${easing} ${delay} forwards`;
  
        // Optional: mark for styling
        el.classList.add('is-animating');
  
        // Wait until animation finishes, then tidy up & unobserve
        function onEnd() {
          // ensure final state visible (in case keyframes don't animate opacity)
          el.style.opacity = '1';
          el.classList.remove('is-animating');
          obs.unobserve(el);
          el.removeEventListener('animationend', onEnd);
        }
        el.addEventListener('animationend', onEnd);
      });
    }, {
      threshold: 0.2
    });
  
    elements.forEach(el => observer.observe(el));
  }
  
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
  