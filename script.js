/* script.js */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Theme Management (Dark / Light Mode)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const htmlElement = document.documentElement;

    // Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    function setTheme(theme) {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update Icon
        if (theme === 'dark') {
            themeToggleIcon.className = 'fa-solid fa-sun';
            themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
        } else {
            themeToggleIcon.className = 'fa-solid fa-moon';
            themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
        }
    }


    // ==========================================
    // Mobile Navigation Hamburger Menu
    // ==========================================
    const navToggle = document.getElementById('nav-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-item');

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navLinksContainer.classList.toggle('mobile-active');
        
        // Toggle Icon between bars and times (close)
        const toggleIcon = navToggle.querySelector('i');
        if (toggleIcon.classList.contains('fa-bars')) {
            toggleIcon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            toggleIcon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('mobile-active')) {
                navLinksContainer.classList.remove('mobile-active');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
            }
        });
    });


    // ==========================================
    // Scroll Intersection Observer for Active Nav Link
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Triggers when section occupies central area
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Remove active class from all
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });


    // ==========================================
    // Skills Progress Bar Animation on Scroll
    // ==========================================
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.skill-progress');

    const skillsObserverOptions = {
        root: null,
        threshold: 0.1
    };

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const percent = bar.getAttribute('data-percent');
                    bar.style.width = percent;
                });
                skillsObserver.unobserve(entry.target); // Trigger only once
            }
        });
    }, skillsObserverOptions);

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }


    // ==========================================
    // Interactive Project Demos & Certifications Modals
    // ==========================================
    const demoButtons = document.querySelectorAll('.demo-btn');
    const certButtons = document.querySelectorAll('.cert-btn');

    demoButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const project = e.currentTarget.getAttribute('data-project');
            alert(`Demo Mode: Launching demo container for "${project}". This is a placeholder for the live hosting link.`);
        });
    });

    certButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cert = e.currentTarget.getAttribute('data-cert');
            alert(`Credential Verification: Directing to secure external certification authority for "${cert}". (Verification token active)`);
        });
    });


    // ==========================================
    // Contact Form Submission (Mock API Simulation)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const subject = document.getElementById('form-subject').value.trim();
        const message = document.getElementById('form-message').value.trim();

        // Standard validation check
        if (!name || !email || !subject || !message) {
            showFormStatus('Please complete all form fields.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showFormStatus('Please provide a valid email address.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const origBtnHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending message...';
        showFormStatus('', '');

        // Simulate Network Delay
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = origBtnHtml;
            showFormStatus('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        }, 1500);
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function showFormStatus(msg, type) {
        formStatus.textContent = msg;
        formStatus.className = 'form-status'; // Reset
        if (type) {
            formStatus.classList.add(type);
        }
    }


    // ==========================================
    // Anu AI Assistant Chatbot Logic
    // ==========================================
    const chatbotWidget = document.getElementById('chatbot-widget');
    const chatbotTrigger = document.getElementById('chatbot-trigger');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatChips = document.querySelectorAll('.chat-chip');

    // Toggle Chat Window
    chatbotTrigger.addEventListener('click', () => {
        const isActive = chatbotWindow.classList.contains('active');
        if (isActive) {
            chatbotWindow.classList.remove('active');
            chatbotTrigger.classList.remove('active');
            chatbotTrigger.setAttribute('aria-expanded', 'false');
        } else {
            chatbotWindow.classList.add('active');
            chatbotTrigger.classList.add('active');
            chatbotTrigger.setAttribute('aria-expanded', 'true');
            // Populate initial message if empty
            if (chatbotMessages.children.length === 0) {
                sendBotResponse("Hi, I'm Anu's Portfolio Assistant! Ask me anything about Anubhuti's education, skills, projects, certifications, or contact info.", 0);
            }
        }
    });

    // Handle suggested quick-reply chips
    chatChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            const query = e.currentTarget.getAttribute('data-query');
            handleUserMessage(query);
        });
    });

    // Send via button click
    chatbotSend.addEventListener('click', () => {
        const messageText = chatbotInput.value.trim();
        if (messageText) {
            handleUserMessage(messageText);
            chatbotInput.value = '';
        }
    });

    // Send via Enter key
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const messageText = chatbotInput.value.trim();
            if (messageText) {
                handleUserMessage(messageText);
                chatbotInput.value = '';
            }
        }
    });

    function handleUserMessage(text) {
        // Render User Message
        appendMessage(text, 'user');
        
        // Render Typing Indicator
        showTypingIndicator();

        // Get matching response based on text keywords
        const botAnswer = generateBotAnswer(text);

        // Delay response to simulate active thinking
        const delay = Math.max(800, Math.min(1500, text.length * 15));
        setTimeout(() => {
            removeTypingIndicator();
            appendMessage(botAnswer, 'bot');
        }, delay);
    }

    function appendMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('chat-msg', sender);
        msgDiv.innerHTML = text; // Safe here since database inputs are curated HTML strings
        chatbotMessages.appendChild(msgDiv);
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showTypingIndicator() {
        // Verify indicator doesn't exist already
        if (document.getElementById('typing-indicator')) return;

        const indicatorDiv = document.createElement('div');
        indicatorDiv.className = 'typing-indicator';
        indicatorDiv.id = 'typing-indicator';
        indicatorDiv.innerHTML = `
            <div class="typing-dot" aria-hidden="true"></div>
            <div class="typing-dot" aria-hidden="true"></div>
            <div class="typing-dot" aria-hidden="true"></div>
        `;
        chatbotMessages.appendChild(indicatorDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    function sendBotResponse(text, delay) {
        showTypingIndicator();
        setTimeout(() => {
            removeTypingIndicator();
            appendMessage(text, 'bot');
        }, delay);
    }

    // Bot Knowledge Base and Regex Parsing
    function generateBotAnswer(input) {
        const normalized = input.toLowerCase().trim();

        // 1. Education
        if (normalized.includes('educ') || normalized.includes('degre') || normalized.includes('mca') || normalized.includes('bca') || normalized.includes('colleg') || normalized.includes('school') || normalized.includes('study')) {
            return `<strong>Anubhuti Kaushik's Education:</strong><br>
                    &bull; <strong>Master of Computer Applications (MCA):</strong> Currently pursuing.<br>
                    &bull; <strong>Bachelor of Computer Applications (BCA):</strong> Gateway Institute of Engineering and Technology (GIET), Sonipat (2023-2026).<br>
                    &bull; <strong>Intermediate & Secondary Education:</strong> Sunrise International School, Sonipat (12th: 82%, 10th: 80%).`;
        }

        // 2. Skills
        if (normalized.includes('skill') || normalized.includes('tech') || normalized.includes('lang') || normalized.includes('python') || normalized.includes('sql') || normalized.includes('code') || normalized.includes('know')) {
            return `<strong>Technical Toolkit:</strong><br>
                    &bull; <strong>Languages:</strong> Python, Java, C++, JavaScript, SQL<br>
                    &bull; <strong>Frontend:</strong> React, HTML, CSS, Tailwind, Bootstrap<br>
                    &bull; <strong>Backend:</strong> Node.js, Express, Flask, Spring Boot<br>
                    &bull; <strong>AI/ML:</strong> TensorFlow, PyTorch, Scikit-learn, LangChain, OpenAI API<br>
                    &bull; <strong>Database:</strong> MongoDB, MySQL, PostgreSQL<br>
                    &bull; <strong>Cloud:</strong> AWS, Docker, Firebase, Vercel`;
        }

        // 3. Projects
        if (normalized.includes('project') || normalized.includes('work') || normalized.includes('make') || normalized.includes('portfol') || normalized.includes('build')) {
            return `<strong>Featured Projects:</strong><br>
                    &bull; <strong>AI Safety & Bias Audit:</strong> Eval testing suite checking jailbreaks and prompt injections.<br>
                    &bull; <strong>The Knowledge Analyst:</strong> RAG system querying custom PDF documents.<br>
                    &bull; <strong>The System Prompt Architect:</strong> Agentic workspace for persona prompting templates.<br>
                    &bull; <strong>Object Detection & Tracking:</strong> Video stream coordination tracking with YOLO & OpenCV.<br>
                    &bull; <strong>Other Projects:</strong> Fake News Detector, Stock Prediction, Emotion Detection, Smart Agriculture.`;
        }

        // 4. Certifications
        if (normalized.includes('certif') || normalized.includes('licens') || normalized.includes('credential') || normalized.includes('ibm') || normalized.includes('anthropic') || normalized.includes('deeplearning')) {
            return `<strong>Professional Certifications:</strong><br>
                    &bull; <strong>AI Internship:</strong> Classification models & Flask microservice deployments.<br>
                    &bull; <strong>Prompt Engineering:</strong> Structured course completion (DeepLearning.AI).<br>
                    &bull; <strong>Data Science:</strong> IBM Data Science Professional Certification (Coursera).<br>
                    &bull; <strong>Anthropic AI Certification:</strong> Claude API optimizations & prompt guidelines.<br>
                    &bull; <strong>Python for Data Science:</strong> Ingestion and data structures basics.<br>
                    &bull; <strong>SQL Essential Training:</strong> Querying, indexing, database joins.<br>
                    &bull; <strong>Data Analysis (Pandas/NumPy):</strong> Cleaning and operations execution.<br>
                    &bull; <strong>Data Visualization (Matplotlib):</strong> Dashboard layouts and plots creation.<br>
                    &bull; <strong>Machine Learning Fundamentals:</strong> Regression, classification and clustering model setups.<br>
                    &bull; <strong>Statistics for Data Science:</strong> Probability vectors and hypothesis testing.`;
        }

        // 5. Career Goals
        if (normalized.includes('goal') || normalized.includes('career') || normalized.includes('aim') || normalized.includes('future') || normalized.includes('job') || normalized.includes('hire') || normalized.includes('aspir')) {
            return `<strong>Career Path:</strong><br>
                    Anubhuti aims to establish herself as a high-performing <strong>AI Engineer / Data Scientist / Generative AI Specialist</strong>. She is passionate about training models, fine-tuning LLMs, designing prompt systems, and writing clean, deployment-ready code to solve industrial hurdles.`;
        }

        // 6. Contact details
        if (normalized.includes('contact') || normalized.includes('email') || normalized.includes('reach') || normalized.includes('linkedin') || normalized.includes('github') || normalized.includes('address')) {
            return `<strong>Contact Anubhuti Kaushik:</strong><br>
                    &bull; <strong>Email:</strong> <a href="mailto:anubhutikaushik2727@gmail.com">anubhutikaushik2727@gmail.com</a><br>
                    &bull; <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/anubhuti-kaushik-1561b22ab" target="_blank">linkedin.com/in/anubhuti-kaushik-1561b22ab</a><br>
                    &bull; <strong>GitHub:</strong> <a href="https://github.com/abakaushik-lgtm" target="_blank">github.com/abakaushik-lgtm</a><br>
                    You can also fill out the contact form directly in the Contact section!`;
        }

        // 7. Salutations
        if (normalized === 'hi' || normalized === 'hello' || normalized.includes('hey') || normalized.includes('greetings')) {
            return `Hello! How can I assist you today? You can select a topic from the chips below or type a custom question about Anubhuti's career.`;
        }

        // 8. Help / Unrecognized Fallback
        return `I'm not sure I understand that question completely. I can answer questions about:<br>
                &bull; <strong>Education:</strong> BCA completed, MCA pursuing.<br>
                &bull; <strong>Skills:</strong> Python, Machine Learning, SQL, etc.<br>
                &bull; <strong>Projects:</strong> Fake News, Emotion Detection, etc.<br>
                &bull; <strong>Certifications:</strong> IBM, DeepLearning.AI, Anthropic.<br>
                &bull; <strong>Career Goals:</strong> AI Engineer & Data Scientist aspirations.<br>
                &bull; <strong>Contact details:</strong> Email and social link listings.`;
    }
});
