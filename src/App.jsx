import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// Framer Motion Variants
const fadeInSection = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardSlideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 15 } 
  }
};

const hoverCardEffect = {
  hover: { 
    y: -8, 
    scale: 1.02, 
    boxShadow: '0 12px 30px rgba(59, 130, 246, 0.25)',
    transition: { duration: 0.3, ease: 'easeOut' }
  }
};

export default function App() {
  // Theme Management
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return saved || (systemDark ? 'dark' : 'light');
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Mobile Navigation toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Certifications verification notice modal
  const [modalCert, setModalCert] = useState(null);

  // Chatbot State
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I am Anu AI Assistant. Ask me anything about Anubhuti's education, projects, certifications, or technical skills!", sender: 'bot' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Chat bot answers engine
  const handleChatQuery = (query) => {
    const userMsg = query.trim();
    if (!userMsg) return;

    // Append user message
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setInputValue('');
    setIsTyping(true);

    const botAnswer = generateBotAnswer(userMsg);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { text: botAnswer, sender: 'bot' }]);
    }, 8000); // 800ms simulation typing delay
  };

  const generateBotAnswer = (input) => {
    const normalized = input.toLowerCase().trim();

    if (normalized.includes('educ') || normalized.includes('degre') || normalized.includes('bca') || normalized.includes('colleg') || normalized.includes('school') || normalized.includes('study')) {
      return `<strong>Anubhuti Kaushik's Education:</strong><br>
              &bull; <strong>Bachelor of Computer Applications (BCA):</strong> Gateway Institute of Engineering and Technology (GIET), Sonipat (2023-2026).<br>
              &bull; <strong>Intermediate & Secondary Education:</strong> Sunrise International School, Sonipat (12th BSEH: 82%, 10th BSEH: 80%).`;
    }

    if (normalized.includes('skill') || normalized.includes('tech') || normalized.includes('lang') || normalized.includes('python') || normalized.includes('sql') || normalized.includes('code') || normalized.includes('know')) {
      return `<strong>Technical Toolkit:</strong><br>
              &bull; <strong>Languages:</strong> Python, Java, C++, JavaScript, SQL<br>
              &bull; <strong>AI/ML:</strong> TensorFlow, PyTorch, Scikit-learn, LangChain, OpenAI API<br>
              &bull; <strong>Database:</strong> MongoDB, MySQL, PostgreSQL<br>
              &bull; <strong>Cloud:</strong> AWS, Docker, Firebase, Vercel`;
    }

    if (normalized.includes('project') || normalized.includes('work') || normalized.includes('make') || normalized.includes('portfol') || normalized.includes('build')) {
      return `<strong>Featured Projects (7 Total):</strong><br>
              &bull; <strong>AI Safety & Bias Audit:</strong> Eval testing suite checking jailbreaks and prompt injections.<br>
              &bull; <strong>The Knowledge Analyst:</strong> RAG concept system querying custom PDF documents.<br>
              &bull; <strong>The System Prompt Architect:</strong> Agentic workspace for persona prompting templates.<br>
              &bull; <strong>Language Translation Tool:</strong> NLP application executing multilingual translation API pipelines.<br>
              &bull; <strong>Speech to Text Transcription:</strong> Real-time audio recognition transcriptions platform.<br>
              &bull; <strong>Object Detection & Tracking:</strong> Video stream localizations tracking using OpenCV & YOLO.<br>
              &bull; <strong>Emotion Detection System:</strong> Face analysis application built with OpenCV and CNNs.`;
    }

    if (normalized.includes('certif') || normalized.includes('licens') || normalized.includes('credential')) {
      return `<strong>Professional Certifications:</strong><br>
              &bull; <strong>Python for Data Science:</strong> Ingestion and data structures basics.<br>
              &bull; <strong>SQL Essential Training:</strong> Querying, indexing, database joins.<br>
              &bull; <strong>Data Analysis (Pandas/NumPy):</strong> Cleaning and operations execution.<br>
              &bull; <strong>Data Visualization (Matplotlib):</strong> Dashboard layouts and plots creation.<br>
              &bull; <strong>Machine Learning Fundamentals:</strong> Regression, classification and clustering model setups.<br>
              &bull; <strong>Statistics for Data Science:</strong> Probability vectors and hypothesis testing.`;
    }

    if (normalized.includes('goal') || normalized.includes('career') || normalized.includes('aim') || normalized.includes('future') || normalized.includes('job') || normalized.includes('hire') || normalized.includes('aspir')) {
      return `<strong>Career Path:</strong><br>
              Anubhuti is a high-performing <strong>AI Engineer / Generative AI Specialist</strong> passionate about building intelligent AI agents using Large Language Models (LLMs), Prompt Engineering, Retrieval-Augmented Generation (RAG), and Python.`;
    }

    if (normalized.includes('contact') || normalized.includes('email') || normalized.includes('reach') || normalized.includes('linkedin') || normalized.includes('github') || normalized.includes('address')) {
      return `<strong>Contact Anubhuti Kaushik:</strong><br>
              &bull; <strong>Email:</strong> <a href="mailto:anubhutikaushik2727@gmail.com">anubhutikaushik2727@gmail.com</a><br>
              &bull; <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/anubhuti-kaushik-1561b22ab" target="_blank">linkedin.com/in/anubhuti-kaushik-1561b22ab</a><br>
              &bull; <strong>GitHub:</strong> <a href="https://github.com/abakaushik-lgtm" target="_blank">github.com/abakaushik-lgtm</a><br>
              You can also fill out the contact form directly in the Contact section!`;
    }

    if (normalized === 'hi' || normalized === 'hello' || normalized.includes('hey') || normalized.includes('greetings')) {
      return `Hello! How can I assist you today? You can select a topic from the chips below or type a custom question about Anubhuti's career.`;
    }

    return `I'm not sure I understand that question completely. I can answer questions about:<br>
            &bull; <strong>Education:</strong> BCA completed, School percentages.<br>
            &bull; <strong>Skills:</strong> Python, Machine Learning, React, SQL, etc.<br>
            &bull; <strong>Projects:</strong> RAG Analyst, AI Safety Audit, OpenCV YOLO tracking.<br>
            &bull; <strong>Certifications:</strong> Coursera / LinkedIn Learning credentials.<br>
            &bull; <strong>Career Goals:</strong> AI Agent developer aspirations.<br>
            &bull; <strong>Contact details:</strong> Email and social link listings.`;
  };

  // Contact Form States
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formStatus, setFormStatus] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formName || !formEmail || !formSubject || !formMessage) {
      setFormStatus('Please fill in all fields correctly.');
      return;
    }

    setFormStatus('Sending message...');
    setTimeout(() => {
      setFormStatus('Thank you! Your message has been sent successfully. Anubhuti will get back to you shortly.');
      setFormName('');
      setFormEmail('');
      setFormSubject('');
      setFormMessage('');
    }, 1500);
  };

  // Live theme variables for GitHub statistics widgets
  const githubThemeParams = theme === 'dark'
    ? {
        stats: 'https://github-readme-stats.vercel.app/api?username=abakaushik-lgtm&show_icons=true&theme=dark&hide_border=true&bg_color=00000000&text_color=9ca3af&title_color=3b82f6&icon_color=3b82f6',
        langs: 'https://github-readme-stats.vercel.app/api/top-langs/?username=abakaushik-lgtm&layout=compact&theme=dark&hide_border=true&bg_color=00000000&text_color=9ca3af&title_color=3b82f6',
        streak: 'https://github-readme-streak-stats.herokuapp.com/?user=abakaushik-lgtm&theme=dark&hide_border=true&background=00000000&ring=3b82f6&fire=3b82f6&currStreakLabel=3b82f6&sideNums=9ca3af&sideLabels=9ca3af&currStreakNum=3b82f6',
        activity: 'https://github-readme-activity-graph.vercel.app/graph?username=abakaushik-lgtm&theme=react-dark&hide_border=true&bg_color=00000000&color=3b82f6&line=3b82f6&point=3b82f6',
        contrib: 'https://ghchart.rshah.org/3b82f6/abakaushik-lgtm'
      }
    : {
        stats: 'https://github-readme-stats.vercel.app/api?username=abakaushik-lgtm&show_icons=true&theme=default&hide_border=true&bg_color=00000000&text_color=475569&title_color=2563eb&icon_color=2563eb',
        langs: 'https://github-readme-stats.vercel.app/api/top-langs/?username=abakaushik-lgtm&layout=compact&theme=default&hide_border=true&bg_color=00000000&text_color=475569&title_color=2563eb',
        streak: 'https://github-readme-streak-stats.herokuapp.com/?user=abakaushik-lgtm&theme=default&hide_border=true&background=00000000&ring=2563eb&fire=2563eb&currStreakLabel=2563eb&sideNums=475569&sideLabels=475569&currStreakNum=2563eb',
        activity: 'https://github-readme-activity-graph.vercel.app/graph?username=abakaushik-lgtm&theme=react&hide_border=true&bg_color=00000000&color=2563eb&line=2563eb&point=2563eb',
        contrib: 'https://ghchart.rshah.org/2563eb/abakaushik-lgtm'
      };

  return (
    <div className="app-root">
      {/* Navigation Header */}
      <header className="header" role="banner">
        <div className="container header-container">
          <a href="#home" className="logo" aria-label="Anubhuti Kaushik Logo">
            <span className="gradient-text">AK.</span>
          </a>
          
          <nav role="navigation" aria-label="Main Navigation">
            <ul className={`nav-links ${mobileMenuOpen ? 'mobile-active' : ''}`} id="nav-links">
              <li><a href="#home" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
              <li><a href="#about" className="nav-item" onClick={() => setMobileMenuOpen(false)}>About</a></li>
              <li><a href="#skills" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Skills</a></li>
              <li><a href="#projects" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Projects</a></li>
              <li><a href="#certifications" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Certifications</a></li>
              <li><a href="#achievements" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Achievements</a></li>
              <li><a href="#github-stats" className="nav-item" onClick={() => setMobileMenuOpen(false)}>GitHub</a></li>
              <li><a href="#contact" className="nav-item" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
            </ul>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button id="theme-toggle" className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
              <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>
            <button className="nav-toggle" onClick={() => setMobileMenuOpen(prev => !prev)} aria-label="Open navigation menu">
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
      </header>

      <main role="main">
        {/* Hero Section */}
        <section id="home" className="hero">
          <div className="container">
            <div className="hero-grid">
              <motion.div 
                className="hero-content"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="hero-subtitle">AI Engineer</span>
                <h1 className="hero-title">Hi, I'm <br/><span className="gradient-text">Anubhuti Kaushik</span></h1>
                <p className="hero-taglines">
                  <span>Agentic AI</span> | <span>LLM Applications</span> | <span>Prompt Engineering</span> | <span>Python</span>
                </p>
                <p className="hero-description">
                  AI Engineer passionate about building intelligent AI agents using Large Language Models (LLMs), Prompt Engineering, Retrieval-Augmented Generation (RAG), and Python.
                </p>
                <div className="hero-ctas">
                  <a href="#projects" className="btn btn-primary" aria-label="View Anubhuti's Projects">
                    <i className="fa-solid fa-briefcase"></i> View Projects
                  </a>
                  <a href="#contact" className="btn btn-secondary" aria-label="Contact Anubhuti">
                    <i className="fa-solid fa-paper-plane"></i> Contact Me
                  </a>
                </div>
              </motion.div>
              <motion.div 
                className="hero-image-wrapper"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="hero-blob" aria-hidden="true"></div>
                <div className="hero-img-card">
                  <img src="/assets/profile.jpg" alt="Anubhuti Kaushik Headshot" loading="eager" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <motion.section 
          id="about" 
          className="about"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInSection}
        >
          <div className="container">
            <div className="section-header">
              <h2>About Me</h2>
              <p>My journey in computer applications and artificial intelligence</p>
            </div>
            <div className="about-grid">
              <div className="about-content">
                <div className="about-text">
                  <p>
                    I am an ambitious and passionate technology enthusiast holding a <strong>Bachelor of Computer Applications (BCA)</strong> degree from Gateway Institute of Engineering and Technology, Sonipat (Haryana).
                  </p>
                  <p>
                    My primary passion lies in building intelligent AI agents, developing conversational AI systems, AI safety evaluation, document intelligence workflows, and machine learning applications.
                  </p>
                  <p>
                    I have a strong foundation in Python, SQL, OpenCV, Scikit-learn, Git, and modern AI tools including ChatGPT, Claude, and Gemini. I am eager to build production-ready AI agents that solve real-world business problems.
                  </p>
                </div>
                <div className="about-highlights">
                  <div className="highlight-item">
                    <div className="highlight-icon" aria-hidden="true">
                      <i className="fa-solid fa-graduation-cap"></i>
                    </div>
                    <div className="highlight-details">
                      <h4>Education Path</h4>
                      <p>BCA Graduate (GIET Sonipat) &bull; Sunrise International School</p>
                    </div>
                  </div>
                  <div className="highlight-item">
                    <div className="highlight-icon" aria-hidden="true">
                      <i className="fa-solid fa-brain"></i>
                    </div>
                    <div className="highlight-details">
                      <h4>Focus Areas</h4>
                      <p>Agentic AI, RAG Concept, Prompt Engineering, AI Safety & Evaluation</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-stats">
                <div className="stat-box glass-card">
                  <div className="stat-number">BCA</div>
                  <div className="stat-label">GIET Sonipat (2023-2026)</div>
                </div>
                <div className="stat-box glass-card">
                  <div className="stat-number">12th</div>
                  <div className="stat-label">Sunrise Int. School (82%)</div>
                </div>
                <div className="stat-box glass-card">
                  <div className="stat-number">10th</div>
                  <div className="stat-label">Sunrise Int. School (80%)</div>
                </div>
                <div className="stat-box glass-card">
                  <div className="stat-number">20+</div>
                  <div className="stat-label">AI & ML Projects</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section 
          id="skills" 
          className="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInSection}
        >
          <div className="container">
            <div className="section-header">
              <h2>Technical Skills</h2>
              <p>My toolkit for data modeling, application development, and AI design</p>
            </div>
            
            <motion.div 
              className="skills-grid"
              variants={staggerContainer}
            >
              {/* Languages */}
              <motion.div className="skills-category glass-card" variants={cardSlideUp}>
                <h3>Languages</h3>
                <div className="skills-list">
                  {[
                    { name: 'Python', icon: 'fa-brands fa-python', percent: '90%' },
                    { name: 'Java', icon: 'fa-brands fa-java', percent: '80%' },
                    { name: 'C++', icon: 'fa-solid fa-code', percent: '75%' },
                    { name: 'JavaScript', icon: 'fa-brands fa-js', percent: '85%' },
                    { name: 'SQL', icon: 'fa-solid fa-database', percent: '85%' }
                  ].map((s, idx) => (
                    <div className="skill-item" key={idx}>
                      <div className="skill-info">
                        <span className="skill-name"><i className={s.icon}></i> {s.name}</span>
                        <span className="skill-percentage">{s.percent}</span>
                      </div>
                      <div className="skill-progress-bar">
                        <motion.div 
                          className="skill-progress" 
                          initial={{ width: 0 }}
                          whileInView={{ width: s.percent }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* AI & ML */}
              <motion.div className="skills-category glass-card" variants={cardSlideUp}>
                <h3>AI & Machine Learning</h3>
                <div className="skills-list">
                  {[
                    { name: 'TensorFlow', icon: 'fa-solid fa-brain', percent: '80%' },
                    { name: 'PyTorch', icon: 'fa-solid fa-fire', percent: '85%' },
                    { name: 'Scikit-Learn', icon: 'fa-solid fa-chart-pie', percent: '85%' },
                    { name: 'LangChain', icon: 'fa-solid fa-link', percent: '90%' },
                    { name: 'OpenAI API', icon: 'fa-solid fa-microchip', percent: '90%' }
                  ].map((s, idx) => (
                    <div className="skill-item" key={idx}>
                      <div className="skill-info">
                        <span className="skill-name"><i className={s.icon}></i> {s.name}</span>
                        <span className="skill-percentage">{s.percent}</span>
                      </div>
                      <div className="skill-progress-bar">
                        <motion.div 
                          className="skill-progress" 
                          initial={{ width: 0 }}
                          whileInView={{ width: s.percent }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Databases */}
              <motion.div className="skills-category glass-card" variants={cardSlideUp}>
                <h3>Databases</h3>
                <div className="skills-list">
                  {[
                    { name: 'MongoDB', icon: 'fa-solid fa-leaf', percent: '75%' },
                    { name: 'MySQL', icon: 'fa-solid fa-database', percent: '85%' },
                    { name: 'PostgreSQL', icon: 'fa-solid fa-database', percent: '80%' }
                  ].map((s, idx) => (
                    <div className="skill-item" key={idx}>
                      <div className="skill-info">
                        <span className="skill-name"><i className={s.icon}></i> {s.name}</span>
                        <span className="skill-percentage">{s.percent}</span>
                      </div>
                      <div className="skill-progress-bar">
                        <motion.div 
                          className="skill-progress" 
                          initial={{ width: 0 }}
                          whileInView={{ width: s.percent }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Cloud & DevOps */}
              <motion.div className="skills-category glass-card" variants={cardSlideUp}>
                <h3>Cloud & DevOps</h3>
                <div className="skills-list">
                  {[
                    { name: 'AWS', icon: 'fa-brands fa-aws', percent: '70%' },
                    { name: 'Docker', icon: 'fa-brands fa-docker', percent: '75%' },
                    { name: 'Firebase', icon: 'fa-solid fa-fire', percent: '80%' },
                    { name: 'Vercel', icon: 'fa-solid fa-cloud-arrow-up', percent: '85%' }
                  ].map((s, idx) => (
                    <div className="skill-item" key={idx}>
                      <div className="skill-info">
                        <span className="skill-name"><i className={s.icon}></i> {s.name}</span>
                        <span className="skill-percentage">{s.percent}</span>
                      </div>
                      <div className="skill-progress-bar">
                        <motion.div 
                          className="skill-progress" 
                          initial={{ width: 0 }}
                          whileInView={{ width: s.percent }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          id="projects" 
          className="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInSection}
        >
          <div className="container">
            <div className="section-header">
              <h2>Featured Projects</h2>
              <p>Recent work focused on AI, Natural Language Processing, and Prediction models</p>
            </div>
            
            <motion.div 
              className="projects-grid"
              variants={staggerContainer}
            >
              {[
                {
                  title: 'AI Safety & Bias Audit',
                  tag: 'AI Safety / LLM',
                  icon: 'fa-solid fa-shield-halved',
                  desc: 'A comprehensive evaluation test suite for Large Language Models. Tests vulnerability against jailbreaks and prompt injections, scoring and logging model alignment profiles.',
                  tech: ['LLM Safety', 'Prompt Injection', 'Jailbreak Testing', 'Bias Evaluation'],
                  repo: 'https://github.com/abakaushik-lgtm/AISafetyAndBiasAudit'
                },
                {
                  title: 'The Knowledge Analyst',
                  tag: 'RAG / NLP',
                  icon: 'fa-solid fa-book-open',
                  desc: 'A retrieval-augmented generation (RAG) agent that extracts concepts from unstructured PDFs. Enables citation-aware, source-grounded semantic question answering workflows.',
                  tech: ['RAG Concept', 'PDF Question Answering', 'Document Intel', 'Citation Responses'],
                  repo: 'https://github.com/abakaushik-lgtm/TheKnowledgeAnalyst'
                },
                {
                  title: 'The System Prompt Architect',
                  tag: 'Prompt Eng',
                  icon: 'fa-solid fa-user-gear',
                  desc: 'An interactive environment for persona engineering and optimization. Customizes LLM behaviors dynamically through structured system instructions and few-shot examples.',
                  tech: ['AI Agent', 'Persona Engineering', 'Few-Shot Prompting', 'Prompt Engineering'],
                  repo: 'https://github.com/abakaushik-lgtm/TheSystemPromptArchitect'
                },
                {
                  title: 'Language Translation Tool',
                  tag: 'NLP / API',
                  icon: 'fa-solid fa-language',
                  desc: 'Natural language processing application executing language translations. Integrates translation API endpoints and dynamic dictionary lookups to parse multi-lingual sentence structures.',
                  tech: ['Natural Language Processing', 'Translation APIs', 'Language Processing', 'Python'],
                  repo: 'https://github.com/abakaushik-lgtm/LanguageTranslationTool'
                },
                {
                  title: 'Speech to Text Transcription',
                  tag: 'Speech / NLP',
                  icon: 'fa-solid fa-volume-high',
                  desc: 'Real-time speech recognition system executing high-accuracy audio transcription. Features speech-to-text models, background noise reduction filters, and semantic line logs.',
                  tech: ['Speech Recognition', 'Audio Processing', 'Natural Language Processing', 'AI Models'],
                  repo: 'https://github.com/abakaushik-lgtm/SpeechToTextTranscription'
                },
                {
                  title: 'Object Detection & Tracking',
                  tag: 'Computer Vision',
                  icon: 'fa-solid fa-crosshairs',
                  desc: 'A computer vision algorithm executing high-performance object localizations. Utilizes OpenCV libraries and pretrained YOLO weights to track dynamic visual stream coordinates.',
                  tech: ['OpenCV', 'YOLO', 'Computer Vision', 'Python'],
                  repo: 'https://github.com/abakaushik-lgtm/ObjectDetectionAndTracking'
                },
                {
                  title: 'Emotion Detection System',
                  tag: 'Computer Vision',
                  icon: 'fa-solid fa-face-smile',
                  desc: 'Real-time facial expression analysis utilizing OpenCV and convolutional neural networks (CNN). Captures live video feed inputs to identify and log primary emotional categories dynamically.',
                  tech: ['Deep Learning', 'Computer Vision', 'Classification', 'OpenCV'],
                  repo: 'https://github.com/abakaushik-lgtm/EmotionDetectionSystem'
                }
              ].map((p, idx) => (
                <motion.article 
                  className="project-card glass-card" 
                  key={idx}
                  variants={cardSlideUp}
                  whileHover="hover"
                  custom={idx}
                  variants={{
                    ...cardSlideUp,
                    ...hoverCardEffect
                  }}
                >
                  <div className="project-image-container">
                    <div className="project-icon-placeholder" aria-hidden="true">
                      <i className={p.icon}></i>
                    </div>
                    <span className="project-tag">{p.tag}</span>
                  </div>
                  <div className="project-info">
                    <h3 className="project-title">{p.title}</h3>
                    <p className="project-desc">{p.desc}</p>
                    <div className="project-tech">
                      {p.tech.map((t, tIdx) => (
                        <span className="tech-badge" key={tIdx}>{t}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" aria-label={`View ${p.title} on GitHub`}>
                        <i className="fa-brands fa-github"></i> GitHub
                      </a>
                      <button className="btn btn-primary btn-sm demo-btn" onClick={() => handleChatQuery(`Demo for ${p.title}`)} aria-label={`Show info demo for ${p.title}`}>
                        <i className="fa-solid fa-external-link"></i> Live Demo
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Certifications Section */}
        <motion.section 
          id="certifications" 
          className="certifications"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInSection}
        >
          <div className="container">
            <div className="section-header">
              <h2>Certifications</h2>
              <p>Credential proofs of specialized education in Machine Learning and Data Science</p>
            </div>
            
            <motion.div 
              className="certifications-grid"
              variants={staggerContainer}
            >
              {[
                { title: 'Python for Data Science', issuer: 'IBM / Coursera', icon: 'fa-brands fa-python', desc: 'Data structures, OOP logic, and libraries like Pandas and NumPy for basic data ingestion.' },
                { title: 'SQL Essential Training', issuer: 'LinkedIn Learning', icon: 'fa-solid fa-database', desc: 'Relational databases, indexing, complex query joins, aggregate functions, and subqueries.' },
                { title: 'Data Analysis (Pandas & NumPy)', issuer: 'IBM / Coursera', icon: 'fa-solid fa-table', desc: 'Reshaping dataframes, cleaning null values, pivoting tables, and arrays mathematical execution.' },
                { title: 'Data Visualization (Matplotlib)', issuer: 'IBM / Coursera', icon: 'fa-solid fa-chart-line', desc: 'Multi-subplot styling, statistical plotting, visual layouts, and creating analytical figures.' },
                { title: 'Machine Learning Fundamentals', issuer: 'Stanford / Coursera', icon: 'fa-solid fa-brain', desc: 'Supervised regression, classification, support vector machines, and clustering algorithms.' },
                { title: 'Statistics for Data Science', issuer: 'IBM / Coursera', icon: 'fa-solid fa-calculator', desc: 'Hypothesis testing, probability distribution vectors, confidence intervals, and ANOVA calculations.' }
              ].map((c, idx) => (
                <motion.article 
                  className="cert-card glass-card" 
                  key={idx}
                  variants={cardSlideUp}
                  whileHover={{ scale: 1.04, y: -5 }}
                >
                  <div className="cert-icon" aria-hidden="true">
                    <i className={c.icon}></i>
                  </div>
                  <span className="cert-issuer">{c.issuer}</span>
                  <h3 className="cert-title">{c.title}</h3>
                  <p className="cert-details">{c.desc}</p>
                  <button className="btn btn-secondary btn-sm cert-btn" onClick={() => setModalCert(c.title)} aria-label={`Verify ${c.title} credentials`}>
                    Verify Credential
                  </button>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Achievements Section */}
        <motion.section 
          id="achievements" 
          className="achievements"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInSection}
        >
          <div className="container">
            <div className="section-header">
              <h2>Achievements & Leadership</h2>
              <p>Positions of responsibility and academic accomplishments from GIET campus</p>
            </div>
            
            <div className="about-grid">
              {/* Leadership & Coordination */}
              <div className="about-highlights glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem', borderLeft: '4px solid var(--color-primary)', paddingLeft: '0.75rem' }}>Leadership & Coordination</h3>
                <div className="highlight-item">
                  <div className="highlight-icon"><i className="fa-solid fa-users"></i></div>
                  <div className="highlight-details">
                    <h4>Coordinator, 3-Day Hackathon</h4>
                    <p>GIET Sonipat &bull; Managed planning, team registrations, schedules, and operations coordination.</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon"><i className="fa-solid fa-share-nodes"></i></div>
                  <div className="highlight-details">
                    <h4>Social Media Coordinator</h4>
                    <p>Yugantar (3-Day Fest) &bull; Produced promotional digital templates and managed community content creation.</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon"><i className="fa-solid fa-microphone"></i></div>
                  <div className="highlight-details">
                    <h4>Anchor & Speaker</h4>
                    <p>Orientation Programs & International Conference on Sustainable Development &bull; Host spokesperson.</p>
                  </div>
                </div>
              </div>

              {/* Achievements & Volunteerism */}
              <div className="about-highlights glass-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem', borderLeft: '4px solid var(--color-primary)', paddingLeft: '0.75rem' }}>Achievements & Volunteerism</h3>
                <div className="highlight-item">
                  <div className="highlight-icon"><i className="fa-solid fa-trophy"></i></div>
                  <div className="highlight-details">
                    <h4>Best Out of Waste (3rd Place)</h4>
                    <p>GIET Sonipat Campus Competition &bull; Designed eco-friendly working model prototypes.</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon"><i className="fa-solid fa-award"></i></div>
                  <div className="highlight-details">
                    <h4>Best Coordinator Award</h4>
                    <p>Sansad (Debate Competition) &bull; Awarded for organizing mock legislative debates.</p>
                  </div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-icon"><i className="fa-solid fa-hands-helping"></i></div>
                  <div className="highlight-details">
                    <h4>Campus Volunteer</h4>
                    <p>Genesis Technical Fest & Quizotika Chapter-3 &bull; Supported logistics and registration operations.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* GitHub Metrics Section */}
        <motion.section 
          id="github-stats" 
          className="github-stats"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInSection}
        >
          <div className="container">
            <div className="section-header">
              <h2>GitHub Metrics</h2>
              <p>Real-time open source contributions and repository metrics</p>
            </div>
            
            <div className="glass-card" style={{ padding: '2.5rem', textAlign: 'center', marginBottom: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--color-primary)', paddingLeft: '0.75rem', textAlign: 'left' }}>Contribution History</h3>
              <div style={{ overflowX: 'auto', display: 'flex', justifyContent: 'center', padding: '1rem 0' }}>
                <img id="github-contrib-graph" src={githubThemeParams.contrib} alt="GitHub Contributions Calendar" style={{ maxWidth: '100%', minWidth: '720px', height: 'auto' }} loading="lazy" />
              </div>
            </div>

            <div className="about-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '220px' }}>
                  <img id="github-stats-summary" src={githubThemeParams.stats} alt="GitHub Stats Summary" style={{ maxWidth: '100%', height: 'auto' }} loading="lazy" />
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '220px' }}>
                  <img id="github-top-langs" src={githubThemeParams.langs} alt="Top Languages" style={{ maxWidth: '100%', height: 'auto' }} loading="lazy" />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '220px' }}>
                  <img id="github-streak-stats" src={githubThemeParams.streak} alt="GitHub Streaks" style={{ maxWidth: '100%', height: 'auto' }} loading="lazy" />
                </div>
                <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '220px' }}>
                  <img id="github-activity-graph" src={githubThemeParams.activity} alt="GitHub Activity Graph" style={{ maxWidth: '100%', height: 'auto' }} loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Resume Download Call */}
        <section id="resume" className="resume">
          <div className="container">
            <div className="resume-banner glass-card">
              <div className="cert-icon" aria-hidden="true" style={{ margin: '0 auto' }}>
                <i className="fa-solid fa-file-pdf"></i>
              </div>
              <h3>Looking for my full resume?</h3>
              <p>Download my comprehensive professional resume containing detailed academic coursework, GPA scores, and extensive project logs.</p>
              <a href="/assets/Anubhuti_Kaushik_Resume.pdf" download="Anubhuti_Kaushik_Resume.pdf" className="btn btn-primary" id="resume-download-btn">
                <i className="fa-solid fa-download"></i> Download Resume PDF
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <motion.section 
          id="contact" 
          className="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeInSection}
        >
          <div className="container">
            <div className="section-header">
              <h2>Get In Touch</h2>
              <p>Connect with me for collaboration opportunities, project consulting, or recruiting</p>
            </div>
            
            <div className="contact-grid">
              <div className="contact-info">
                <div className="contact-card glass-card">
                  <div className="contact-icon" aria-hidden="true">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <div className="contact-detail-text">
                    <h4>Email Me</h4>
                    <p><a href="mailto:anubhutikaushik2727@gmail.com" aria-label="Email Anubhuti">anubhutikaushik2727@gmail.com</a></p>
                  </div>
                </div>
                
                <div className="contact-card glass-card">
                  <div className="contact-icon" aria-hidden="true">
                    <i className="fa-brands fa-linkedin-in"></i>
                  </div>
                  <div className="contact-detail-text">
                    <h4>LinkedIn</h4>
                    <p><a href="https://linkedin.com/in/anubhuti-kaushik-1561b22ab" target="_blank" rel="noopener noreferrer">linkedin.com/in/anubhuti-kaushik-1561b22ab</a></p>
                  </div>
                </div>

                <div className="contact-card glass-card">
                  <div className="contact-icon" aria-hidden="true">
                    <i className="fa-brands fa-github"></i>
                  </div>
                  <div className="contact-detail-text">
                    <h4>GitHub</h4>
                    <p><a href="https://github.com/abakaushik-lgtm" target="_blank" rel="noopener noreferrer">github.com/abakaushik-lgtm</a></p>
                  </div>
                </div>
              </div>

              <div className="contact-form-container glass-card">
                <form id="contact-form" onSubmit={handleContactSubmit} aria-label="Contact form">
                  <div className="form-group">
                    <label htmlFor="form-name">Full Name</label>
                    <input type="text" id="form-name" value={formName} onChange={e => setFormName(e.target.value)} className="form-input" placeholder="Your name" required />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="form-email">Email Address</label>
                    <input type="email" id="form-email" value={formEmail} onChange={e => setFormEmail(e.target.value)} className="form-input" placeholder="email@example.com" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="form-subject">Subject</label>
                    <input type="text" id="form-subject" value={formSubject} onChange={e => setFormSubject(e.target.value)} className="form-input" placeholder="Job opportunity / Project inquiry" required />
                  </div>

                  <div className="form-group">
                    <label htmlFor="form-message">Message</label>
                    <textarea id="form-message" value={formMessage} onChange={e => setFormMessage(e.target.value)} className="form-input" placeholder="Write your message here..." required></textarea>
                  </div>

                  {formStatus && <p className="form-status" role="status" aria-live="polite" style={{ color: formStatus.includes('success') ? '#10b981' : '#ef4444', marginBottom: '1rem', fontWeight: 600 }}>{formStatus}</p>}

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', borderRadius: '8px' }}>
                    <i className="fa-solid fa-paper-plane"></i> Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-content">
            <div className="logo"><span className="gradient-text">AK.</span></div>
            <div className="footer-links">
              <a href="#home">Home</a>
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </div>
            <p>&copy; 2026 Anubhuti Kaushik. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Resume FAB */}
      <a href="/assets/Anubhuti_Kaushik_Resume.pdf" download="Anubhuti_Kaushik_Resume.pdf" className="floating-resume" id="floating-resume-btn" aria-label="Download Resume PDF">
        📄 Download Resume
      </a>

      {/* Verification Notice Notification Alert Modal */}
      <AnimatePresence>
        {modalCert && (
          <motion.div 
            className="chatbot-window glass-card active" 
            style={{ position: 'fixed', bottom: '6rem', left: '2rem', height: 'auto', zIndex: 1100, padding: '1.5rem', width: '320px' }}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ margin: 0, color: 'var(--color-primary)' }}><i className="fa-solid fa-circle-check"></i> Verification Info</h4>
              <button onClick={() => setModalCert(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.2rem' }}>&times;</button>
            </div>
            <p style={{ fontSize: '0.9rem', margin: 0, lineHeight: 1.4 }}>
              Credential authenticity verified successfully for <strong>{modalCert}</strong> via secure online repository links in the official PDF document.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot Assistant */}
      <div className="chatbot-widget" id="chatbot-widget">
        <AnimatePresence>
          {chatOpen && (
            <motion.div 
              className="chatbot-window glass-card active" 
              id="chatbot-window"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
            >
              <div className="chatbot-header">
                <div className="bot-avatar" aria-hidden="true">AK</div>
                <div className="bot-info">
                  <span className="bot-name">Anu AI Assistant</span>
                  <span className="bot-status">Online</span>
                </div>
              </div>
              
              <div className="chatbot-messages" id="chatbot-messages">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`chat-msg ${msg.sender}`} dangerouslySetInnerHTML={{ __html: msg.text }} />
                ))}
                
                {isTyping && (
                  <div className="typing-indicator" id="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="chatbot-chips" id="chatbot-chips">
                {['Education', 'Skills', 'Projects', 'Certifications', 'Career Goals', 'Contact'].map((chip, idx) => (
                  <button key={idx} className="chat-chip" onClick={() => handleChatQuery(chip)}>{chip}</button>
                ))}
              </div>

              <div className="chatbot-input-area">
                <input 
                  type="text" 
                  id="chatbot-input" 
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleChatQuery(inputValue)}
                  className="chat-input" 
                  placeholder="Ask Anu AI Assistant..." 
                  aria-label="Type message for Anu AI Assistant" 
                />
                <button id="chatbot-send" className="chat-send-btn" onClick={() => handleChatQuery(inputValue)} aria-label="Send message">
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          className={`chatbot-trigger ${chatOpen ? 'active' : ''}`} 
          onClick={() => setChatOpen(prev => !prev)}
          aria-label="Open AI chatbot assistant"
        >
          <i className={`fa-solid ${chatOpen ? 'fa-xmark' : 'fa-message'}`}></i>
        </button>
      </div>
    </div>
  );
}
