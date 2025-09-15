import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// Navigation Component
function Navigation({ currentPage, setCurrentPage }) {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#fff',
    borderBottom: '2px solid #87CEEB',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    flexWrap: 'wrap',
    gap: '1rem'
  };

  const logoStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#4682B4',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const navLinksStyle = {
    display: 'flex',
    gap: window.innerWidth < 768 ? '1rem' : '2rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    flexWrap: 'wrap'
  };

  const linkStyle = {
    color: '#333',
    textDecoration: 'none',
    fontWeight: '500',
    padding: '0.5rem 1rem',
    borderRadius: '5px',
    transition: 'all 0.3s ease'
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: '#87CEEB',
    color: '#fff'
  };

  return (
    <nav style={navStyle} className="nav-container">
      <a 
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage('home');
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#87CEEB';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#4682B4';
          e.target.style.transform = 'scale(1)';
        }}
        style={logoStyle} 
        className="logo"
      >
        Instructions.se
      </a>
      <ul style={navLinksStyle} className="nav-links">
        {['Home', 'Explore', 'Contact Us', 'About'].map(item => (
          <li key={item}>
            <a
              href="#"
              style={currentPage === item.toLowerCase().replace(' ', '') ? activeLinkStyle : linkStyle}
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(item.toLowerCase().replace(' ', ''));
              }}
              onMouseEnter={(e) => {
                if (currentPage !== item.toLowerCase().replace(' ', '')) {
                  e.target.style.backgroundColor = '#f0f0f0';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== item.toLowerCase().replace(' ', '')) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Decision Tree Component
function DecisionTree() {
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 'level',
      question: 'What is your experience level with AI & Machine Learning?',
      options: ['Complete Beginner', 'Some Experience', 'Intermediate', 'Advanced']
    },
    {
      id: 'time_commitment',
      question: 'How much time can you dedicate per week?',
      options: ['2-5 hours', '5-10 hours', '10-20 hours', '20+ hours']
    },
    {
      id: 'ai_focus',
      question: 'Which area of AI interests you most?',
      options: ['Machine Learning Basics', 'Deep Learning', 'Natural Language Processing', 'Computer Vision', 'Reinforcement Learning']
    },
    {
      id: 'ai_tools',
      question: 'Which tools would you like to learn?',
      options: ['Python & Scikit-learn', 'TensorFlow', 'PyTorch', 'Jupyter Notebooks', 'All of the above']
    },
    {
      id: 'learning_style',
      question: 'What is your preferred learning style?',
      options: ['Hands-on Projects', 'Theory First', 'Video Tutorials', 'Reading Documentation', 'Interactive Courses']
    },
    {
      id: 'goal',
      question: 'What is your main goal?',
      options: ['Career Change to AI', 'Enhance Current Role', 'Academic Research', 'Personal Interest', 'Start a Business']
    }
  ];

  // Get available questions based on current answers
  const getAvailableQuestions = () => {
    return questions.filter(q => {
      if (!q.dependsOn) return true;
      
      const dependency = Object.keys(q.dependsOn)[0];
      const requiredValue = q.dependsOn[dependency];
      return answers[dependency] === requiredValue;
    });
  };

  // Get current question to display
  const getCurrentQuestion = () => {
    const availableQuestions = getAvailableQuestions();
    const unansweredQuestions = availableQuestions.filter(q => !answers[q.id]);
    return unansweredQuestions[0] || null;
  };

  const currentQ = getCurrentQuestion();

  // Check if we should show results when no more questions are available
  useEffect(() => {
    if (!currentQ && Object.keys(answers).length > 0 && !showResults) {
      setShowResults(true);
    }
  }, [currentQ, answers, showResults]);

  const handleAnswer = (answer) => {
    console.log('Answering:', currentQ.id, 'with:', answer); // Debug log
    const newAnswers = { ...answers, [currentQ.id]: answer };
    setAnswers(newAnswers);
    console.log('Updated answers:', newAnswers); // Debug log
  };

  const containerStyle = {
    display: 'flex',
    minHeight: 'calc(100vh - 80px)',
    backgroundColor: '#f8f9fa',
    flexDirection: window.innerWidth < 768 ? 'column' : 'row'
  };

  const leftPanelStyle = {
    flex: '1',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRight: window.innerWidth < 768 ? 'none' : '1px solid #ddd',
    borderBottom: window.innerWidth < 768 ? '1px solid #ddd' : 'none',
    minHeight: window.innerWidth < 768 ? 'auto' : 'calc(100vh - 80px)'
  };

  const rightPanelStyle = {
    flex: '1',
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    minHeight: window.innerWidth < 768 ? 'auto' : 'calc(100vh - 80px)',
    overflowY: 'auto'
  };

  const questionStyle = {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: '#333',
    fontWeight: '600'
  };

  const optionStyle = {
    display: 'block',
    width: '100%',
    padding: '1.25rem',
    margin: '0.75rem 0',
    backgroundColor: '#fff',
    border: '2px solid #ddd',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    textAlign: 'left',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const getRecommendations = () => {
    const level = answers.level;
    const timeCommitment = answers.time_commitment;
    const focus = answers.ai_focus;
    const tools = answers.ai_tools;
    const learningStyle = answers.learning_style;
    const goal = answers.goal;
    
    const recommendations = {
      'Complete Beginner': {
        '2-5 hours': [
          { title: 'Machine Learning Crash Course by Google', url: 'https://developers.google.com/machine-learning/crash-course', type: 'Free Course', description: 'A self-study guide for aspiring ML practitioners with TensorFlow APIs' },
          { title: 'Kaggle Learn: Intro to Machine Learning', url: 'https://www.kaggle.com/learn/intro-to-machine-learning', type: 'Interactive Course', description: 'Learn the core ideas in machine learning, and build your first models' },
          { title: 'Python for Data Science Handbook', url: 'https://jakevdp.github.io/PythonDataScienceHandbook/', type: 'Free Book', description: 'Essential tools for working with data in Python - NumPy, Pandas, Matplotlib' },
          { title: 'Andrew Ng\'s Machine Learning Course', url: 'https://www.coursera.org/learn/machine-learning', type: 'MOOC', description: 'The most popular introduction to machine learning' }
        ],
        '5-10 hours': [
          { title: 'CS229 Machine Learning Course by Andrew Ng', url: 'https://cs229.stanford.edu/', type: 'University Course', description: 'Stanford\'s comprehensive machine learning course materials' },
          { title: 'Fast.ai Practical Deep Learning for Coders', url: 'https://www.fast.ai/', type: 'Practical Course', description: 'A top-down approach to deep learning - build models first, theory later' },
          { title: 'Python Machine Learning by Sebastian Raschka', url: '#', type: 'Book', description: 'Machine Learning and Deep Learning with Python, scikit-learn, and TensorFlow' },
          { title: 'Hands-On Machine Learning with Scikit-Learn and TensorFlow', url: '#', type: 'Book', description: 'Practical guide through a series of working examples' }
        ],
        '10-20 hours': [
          { title: 'Deep Learning Specialization (Coursera)', url: 'https://www.coursera.org/specializations/deep-learning', type: 'Specialization', description: '5-course series covering neural networks, CNNs, RNNs, and more' },
          { title: 'CS231n: Convolutional Neural Networks for Visual Recognition', url: 'http://cs231n.stanford.edu/', type: 'Stanford Course', description: 'Deep dive into computer vision and CNNs' },
          { title: 'MLOps Specialization', url: 'https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops', type: 'Specialization', description: 'Production-ready machine learning systems' }
        ],
        '20+ hours': [
          { title: 'Full Stack Deep Learning', url: 'https://fullstackdeeplearning.com/', type: 'Bootcamp', description: 'End-to-end ML project development' },
          { title: 'MIT 6.034 Artificial Intelligence', url: 'https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-034-artificial-intelligence-fall-2010/', type: 'MIT Course', description: 'Comprehensive AI fundamentals from MIT' },
          { title: 'AI Residency Programs', url: '#', type: 'Program', description: 'Google AI, Microsoft Research, Facebook AI residency programs' }
        ]
      },
      'Some Experience': {
        '2-5 hours': [
          { title: 'Papers With Code', url: 'https://paperswithcode.com/', type: 'Research Platform', description: 'Latest ML papers with code implementations' },
          { title: 'Distill.pub', url: 'https://distill.pub/', type: 'Visual Explanations', description: 'Clear, visual explanations of machine learning concepts' },
          { title: 'The Batch by Andrew Ng', url: 'https://www.deeplearning.ai/the-batch/', type: 'Newsletter', description: 'Weekly AI news and insights' }
        ],
        '5-10 hours': [
          { title: 'Deep Learning Book by Ian Goodfellow', url: 'https://www.deeplearningbook.org/', type: 'Free Book', description: 'The definitive textbook on deep learning' },
          { title: 'CS224n: Natural Language Processing with Deep Learning', url: 'http://web.stanford.edu/class/cs224n/', type: 'Stanford Course', description: 'Advanced NLP with neural networks' },
          { title: 'MLOps Community', url: 'https://mlops.community/', type: 'Community', description: 'Learn about ML operations and deployment' }
        ]
      },
      'Intermediate': [
        { title: 'Transformers Course by Hugging Face', url: 'https://huggingface.co/course/chapter1/1', type: 'Advanced Course', description: 'Master state-of-the-art NLP models' },
        { title: 'PyTorch Lightning', url: 'https://www.pytorchlightning.ai/', type: 'Framework', description: 'Professional deep learning framework' },
        { title: 'Weights & Biases', url: 'https://wandb.ai/', type: 'MLOps Tool', description: 'Experiment tracking and model management' },
        { title: 'Papers We Love', url: 'https://paperswelove.org/', type: 'Community', description: 'Academic paper reading groups' }
      ],
      'Advanced': [
        { title: 'OpenAI Research', url: 'https://openai.com/research/', type: 'Research', description: 'Cutting-edge AI research papers and models' },
        { title: 'DeepMind Publications', url: 'https://deepmind.com/research/publications', type: 'Research', description: 'Advanced AI research from DeepMind' },
        { title: 'NeurIPS Conference Papers', url: 'https://neurips.cc/', type: 'Conference', description: 'Premier machine learning conference' },
        { title: 'AI Alignment Forum', url: 'https://www.alignmentforum.org/', type: 'Research Community', description: 'AI safety and alignment research' }
      ]
    };

    // Add focus-specific recommendations
    const focusRecommendations = {
      'Machine Learning Basics': [
        { title: 'Scikit-learn User Guide', url: 'https://scikit-learn.org/stable/user_guide.html', type: 'Documentation', description: 'Comprehensive guide to traditional ML algorithms' }
      ],
      'Deep Learning': [
        { title: 'Deep Learning with PyTorch', url: 'https://pytorch.org/tutorials/', type: 'Tutorial Series', description: 'Official PyTorch deep learning tutorials' }
      ],
      'Natural Language Processing': [
        { title: 'Hugging Face Transformers', url: 'https://huggingface.co/transformers/', type: 'Library', description: 'State-of-the-art NLP models' }
      ],
      'Computer Vision': [
        { title: 'OpenCV Tutorials', url: 'https://docs.opencv.org/master/d9/df8/tutorial_root.html', type: 'Tutorial Series', description: 'Computer vision and image processing' }
      ],
      'Reinforcement Learning': [
        { title: 'OpenAI Gym', url: 'https://gym.openai.com/', type: 'Environment', description: 'Toolkit for developing RL algorithms' }
      ]
    };

    // Get base recommendations based on level and time
    let baseRecs = [];
    if (recommendations[level]) {
      if (typeof recommendations[level] === 'object' && timeCommitment && recommendations[level][timeCommitment]) {
        baseRecs = recommendations[level][timeCommitment];
      } else if (Array.isArray(recommendations[level])) {
        baseRecs = recommendations[level];
      } else {
        baseRecs = recommendations[level]['2-5 hours'] || [];
      }
    }

    // Add focus-specific recommendations
    if (focus && focusRecommendations[focus]) {
      baseRecs = [...baseRecs, ...focusRecommendations[focus]];
    }

    // Add some general AI resources
    const generalRecs = [
      { title: 'ArXiv.org', url: 'https://arxiv.org/', type: 'Research Archive', description: 'Latest AI research papers' },
      { title: 'Towards Data Science', url: 'https://towardsdatascience.com/', type: 'Publication', description: 'Medium publication for data science and ML' },
      { title: 'AI/ML Twitter Community', url: '#', type: 'Community', description: 'Follow @AndrewYNg, @ylecun, @karpathy, @hardmaru' }
    ];

    return baseRecs.length > 0 ? [...baseRecs, ...generalRecs.slice(0, 2)] : generalRecs;
  };

  if (showResults) {
    return (
      <div style={containerStyle}>
        <div style={leftPanelStyle}>
          <h2 style={questionStyle}>Your AI & ML Learning Path</h2>
          <div style={{ marginBottom: '2rem' }}>
            {Object.entries(answers).map(([key, value]) => (
              <div key={key} style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                <strong>{questions.find(q => q.id === key)?.question}:</strong> {value}
              </div>
            ))}
          </div>
          <button 
            style={{...optionStyle, backgroundColor: '#87CEEB', color: '#fff', border: '2px solid #87CEEB'}}
            onClick={() => {
              setAnswers({});
              setShowResults(false);
            }}
          >
            Start Over
          </button>
        </div>
        <div style={rightPanelStyle} className="panel-padding">
          <h2 style={questionStyle}>Recommended Resources</h2>
          <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#E0F6FF', borderRadius: '8px', border: '1px solid #B0E0E6' }}>
            <strong>🎯 Personalized for your AI & ML learning path:</strong>
            <div style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
              {answers.level} {answers.time_commitment && `• ${answers.time_commitment}`} {answers.ai_focus && `• ${answers.ai_focus}`}
            </div>
          </div>
          {getRecommendations().map((resource, index) => (
            <div key={index} style={{
              padding: '1.5rem',
              marginBottom: '1rem',
              backgroundColor: '#fff',
              borderRadius: '12px',
              border: '1px solid #ddd',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <h4 style={{ margin: '0', color: '#4682B4', fontSize: '1.1rem' }}>{resource.title}</h4>
                <span style={{ 
                  backgroundColor: '#E0F6FF', 
                  color: '#4682B4', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '12px', 
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  whiteSpace: 'nowrap'
                }}>
                  {resource.type}
                </span>
              </div>
              {resource.description && (
                <p style={{ margin: '0', color: '#666', fontSize: '0.9rem', lineHeight: '1.4' }}>
                  {resource.description}
                </p>
              )}
              {resource.url !== '#' && (
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    marginTop: '0.5rem',
                    color: '#4682B4',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Visit Resource →
                </a>
              )}
            </div>
          ))}
          <div style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#E0F6FF',
            borderRadius: '8px',
            border: '1px solid #B0E0E6'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#4682B4' }}>💡 Pro Tip</h4>
            <p style={{ margin: '0', fontSize: '0.9rem', color: '#333' }}>
              Start with one resource and complete it before moving to the next. Consistency beats intensity!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQ) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading next question...</div>;

  return (
    <div style={containerStyle} className="decision-container">
      <div style={leftPanelStyle} className="panel-padding">
        {Object.keys(answers).length === 0 && (
          <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#E0F6FF', borderRadius: '12px', border: '1px solid #B0E0E6' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#4682B4', display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🤖</span>
              Welcome to Your AI & Machine Learning Journey!
            </h3>
            <p style={{ margin: '0', color: '#333', lineHeight: '1.5' }}>
              Answer a few quick questions and we'll create a personalized AI/ML learning path with the best resources, courses, and tools for your goals and experience level.
            </p>
          </div>
        )}
        <h2 style={questionStyle} className="question-title">{currentQ.question}</h2>
        {currentQ.options.map((option, index) => (
          <button
            key={index}
            className="option-button"
            style={{...optionStyle, animationDelay: `${index * 0.1}s`}}
            onClick={() => handleAnswer(option)}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#87CEEB';
              e.target.style.backgroundColor = '#F0F8FF';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(135, 206, 235, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = '#ddd';
              e.target.style.backgroundColor = '#fff';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{
                backgroundColor: '#87CEEB',
                color: 'white',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                marginRight: '0.75rem',
                fontWeight: 'bold'
              }}>
                {String.fromCharCode(65 + index)}
              </span>
              {option}
            </div>
          </button>
        ))}
        
        {Object.keys(answers).length > 0 && (
          <button 
            style={{
              ...optionStyle, 
              backgroundColor: '#F0F8FF', 
              color: '#4682B4', 
              border: '2px solid #B0E0E6',
              marginTop: '1rem'
            }}
            onClick={() => {
              setAnswers({});
              setShowResults(false);
            }}
          >
            🔄 Start Over
          </button>
        )}
      </div>
      <div style={rightPanelStyle} className="panel-padding">
        <h3 style={{ color: '#666', marginBottom: '1rem' }}>Your AI & ML Journey</h3>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            width: '100%',
            backgroundColor: '#e0e0e0',
            borderRadius: '10px',
            height: '8px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${(Object.keys(answers).length / Math.min(questions.length, 5)) * 100}%`,
              backgroundColor: '#4caf50',
              height: '100%',
              borderRadius: '10px',
              transition: 'width 0.5s ease'
            }}></div>
          </div>
          <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
            Progress: {Object.keys(answers).length} of {Math.min(questions.length, 5)} questions
          </div>
        </div>
        
        <div style={{ position: 'relative' }}>
          {Object.entries(answers).map(([key, value], index) => (
            <div key={key} style={{
              padding: '1rem',
              marginBottom: '1rem',
              backgroundColor: '#e8f5e8',
              borderRadius: '12px',
              borderLeft: '4px solid #4caf50',
              position: 'relative',
              animation: `slideIn 0.5s ease ${index * 0.1}s both`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{
                  backgroundColor: '#4caf50',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  marginRight: '0.5rem'
                }}>
                  ✓
                </span>
                <strong style={{ fontSize: '0.9rem' }}>{questions.find(q => q.id === key)?.question}</strong>
              </div>
              <div style={{ marginLeft: '1.5rem', color: '#2e7d32', fontWeight: '500' }}>
                {value}
              </div>
            </div>
          ))}
          
          {Object.keys(answers).length > 0 && (
            <div style={{
              padding: '1rem',
              backgroundColor: '#fff3cd',
              borderRadius: '12px',
              borderLeft: '4px solid #ffc107',
              color: '#856404',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{
                backgroundColor: '#ffc107',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                marginRight: '0.5rem'
              }}>
                ?
              </span>
              <div>
                <strong>Currently answering:</strong><br/>
                <em>{currentQ.question}</em>
              </div>
            </div>
          )}
          
          {Object.keys(answers).length === 0 && (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              color: '#666',
              backgroundColor: '#f9f9f9',
              borderRadius: '12px',
              border: '2px dashed #ddd'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎯</div>
              <div>Start answering questions to see your personalized AI & ML learning path unfold!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <DecisionTree />;
      case 'explore':
        return (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1 style={{ color: '#4682B4' }}>Explore AI & ML Learning Paths</h1>
            <p>Discover various AI and Machine Learning opportunities, from beginner-friendly courses to advanced research papers.</p>
          </div>
        );
      case 'contactus':
        return (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1 style={{ color: '#4682B4' }}>Contact Us</h1>
            <p>Get in touch with our team for support with your AI & ML learning journey.</p>
          </div>
        );
      case 'about':
        return (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h1 style={{ color: '#4682B4' }}>About Instructions.se</h1>
            <p>We help aspiring AI and Machine Learning practitioners find the right path to achieve their goals through personalized recommendations tailored to their experience level, time commitment, and learning style.</p>
          </div>
        );
      default:
        return <DecisionTree />;
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          body {
            margin: 0;
            padding: 0;
            font-family: system-ui, sans-serif;
          }
          
          * {
            box-sizing: border-box;
          }
          
          .option-button {
            animation: fadeIn 0.3s ease;
          }
          
          .option-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(135, 206, 235, 0.3);
          }
          
          @media (max-width: 768px) {
            .decision-container {
              flex-direction: column !important;
            }
            
            .left-panel, .right-panel {
              border-right: none !important;
              border-bottom: 1px solid #ddd;
              min-height: auto !important;
            }
            
            .nav-links {
              gap: 1rem !important;
            }
            
            .logo {
              font-size: 1.4rem !important;
            }
            
            .question-title {
              font-size: 1.2rem !important;
            }
          }
          
          @media (max-width: 480px) {
            .nav-container {
              padding: 0.5rem 1rem !important;
            }
            
            .panel-padding {
              padding: 1rem !important;
            }
            
            .option-button {
              padding: 1rem !important;
              font-size: 0.9rem !important;
            }
          }
        `}
      </style>
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </>
  );
}

const rootEl = document.getElementById('root');
createRoot(rootEl).render(<App />);
