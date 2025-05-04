// Preloader
document.addEventListener("DOMContentLoaded", function() {
    // Hide preloader after page load
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        preloader.classList.add('fade-out');
        
        // Enable scrolling after preloader is gone
        setTimeout(() => {
            document.body.style.overflow = "auto";
            preloader.style.display = "none";
        }, 500);
    }, 1000);
    
    // Text rotation animation
    const textElement = document.getElementById('rotating-text');
    const specializations = [
        "Agentic AI",
        "Generative AI",
        "Multi-Agent Systems",
        "RAG & LLMs"
    ];
    let currentIndex = 0;
    
    function animateText() {
        // Clear the text
        textElement.textContent = '';
        
        // Get current text to display
        const currentText = specializations[currentIndex];
        
        // Update index for next iteration
        currentIndex = (currentIndex + 1) % specializations.length;
        
        // Type the text with animation
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < currentText.length) {
                textElement.textContent += currentText.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeInterval);
                
                // Wait before erasing
                setTimeout(() => {
                    // Erase text with animation
                    const eraseInterval = setInterval(() => {
                        if (textElement.textContent.length > 0) {
                            textElement.textContent = textElement.textContent.slice(0, -1);
                        } else {
                            clearInterval(eraseInterval);
                            
                            // Wait before typing next text
                            setTimeout(animateText, 500);
                        }
                    }, 50);
                }, 2000); // Wait 2 seconds before erasing
            }
        }, 100); // Type each character with 100ms delay
    }
    
    // Start the animation
    animateText();
    
    // Initialize AOS animations
    AOS.refresh();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.p_card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Dark mode toggle
    const toggleSwitchDesktop = document.querySelector('#checkbox');
    const toggleSwitchMobile = document.querySelector('#checkbox-mobile');
    
    // Make sure both toggle switches exist before adding listeners
    if (toggleSwitchDesktop && toggleSwitchMobile) {
        function switchTheme(e) {
            const isDark = e.target.checked;
            
            if (isDark) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
            
            // Sync toggles without triggering events
            if (e.target === toggleSwitchDesktop) {
                toggleSwitchMobile.checked = isDark;
            } else {
                toggleSwitchDesktop.checked = isDark;
            }
            
            // Refresh AOS animations to ensure they work with the new theme
            setTimeout(() => {
                AOS.refresh();
            }, 300);
        }
        
        // Add event listeners to both toggles
        toggleSwitchDesktop.addEventListener('change', switchTheme);
        toggleSwitchMobile.addEventListener('change', switchTheme);
        
        // Check for saved user preference
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            
            const isDarkMode = currentTheme === 'dark';
            toggleSwitchDesktop.checked = isDarkMode;
            toggleSwitchMobile.checked = isDarkMode;
        }
    }
    
    // Add hover effect to platform cards
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.platform-arrow').style.transform = 'scale(1.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.platform-arrow').style.transform = '';
        });
    });
    
    // Make sure links in the mobile menu close the menu when clicked
    const mobileMenuLinks = document.querySelectorAll('.menu-links a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            const menu = document.querySelector('.menu-links');
            const icon = document.querySelector('.hamburger-icon');
            
            if (menu.classList.contains('open')) {
                menu.classList.remove('open');
                icon.classList.remove('open');
            }
        });
    });
});

function toggleMenu() {
    const menu = document.querySelector(".menu-links"); 
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

function sendMail() {
    // Disable submit button and show loading state
    const submitButton = document.querySelector('.submit-button');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    var params = {
        name : document.getElementById("name").value,
        email : document.getElementById("email").value,
        message : document.getElementById("message").value
    }

    emailjs
    .send("service_gwtxt9k", "template_pf0h3xp", params)
    .then((res) => {
       document.getElementById("name").value = "";
       document.getElementById("email").value = "";
       document.getElementById("message").value = "";
       console.log(res);
       
       // Show success message with animation
       submitButton.textContent = "Message Sent!";
       submitButton.classList.add('success');
       
       // Reset button after delay
       setTimeout(() => {
           submitButton.disabled = false;
           submitButton.textContent = originalText;
           submitButton.classList.remove('success');
       }, 3000);
    })
    .catch((err) => {
        console.log(err);
        
        // Show error message
        submitButton.textContent = "Failed to send";
        submitButton.classList.add('error');
        
        // Reset button after delay
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
            submitButton.classList.remove('error');
        }, 3000);
    });
    
    // Prevent form submission
    return false;
}

// Typing effect for hero section
document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.querySelector('.section_text_p2');
    if (textElement) {
        const text = textElement.textContent;
        textElement.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                textElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1500);
    }
});

// Add parallax effect to profile section
window.addEventListener('scroll', function() {
    const profileSection = document.querySelector('#profile');
    const scrollPosition = window.pageYOffset;
    
    if (profileSection) {
        profileSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});
