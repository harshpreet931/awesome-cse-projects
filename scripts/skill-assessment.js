#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class SkillAssessment {
  constructor() {
    this.questions = {
      'web-development': [
        {
          question: "What does HTML stand for?",
          options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language"],
          correct: 0,
          difficulty: "beginner"
        },
        {
          question: "Which of these is NOT a JavaScript framework?",
          options: ["React", "Vue", "Django", "Angular"],
          correct: 2,
          difficulty: "beginner"
        },
        {
          question: "What is the purpose of CSS Grid?",
          options: ["Database management", "2D layout system", "Server-side rendering"],
          correct: 1,
          difficulty: "intermediate"
        },
        {
          question: "What is the Virtual DOM in React?",
          options: ["A database", "An in-memory representation of real DOM", "A CSS framework"],
          correct: 1,
          difficulty: "intermediate"
        },
        {
          question: "What is the difference between server-side and client-side rendering?",
          options: ["No difference", "Where the HTML is generated", "Only applies to mobile apps"],
          correct: 1,
          difficulty: "advanced"
        }
      ],
      'data-science': [
        {
          question: "What is pandas primarily used for?",
          options: ["Web development", "Data manipulation and analysis", "Game development"],
          correct: 1,
          difficulty: "beginner"
        },
        {
          question: "Which algorithm is commonly used for classification?",
          options: ["Linear Regression", "Random Forest", "Bubble Sort"],
          correct: 1,
          difficulty: "intermediate"
        },
        {
          question: "What is overfitting in machine learning?",
          options: ["Model performs too well on training data", "Model is too simple", "Data is corrupted"],
          correct: 0,
          difficulty: "advanced"
        }
      ],
      'mobile-development': [
        {
          question: "What is React Native?",
          options: ["A web framework", "A cross-platform mobile framework", "A database"],
          correct: 1,
          difficulty: "beginner"
        },
        {
          question: "What is the difference between native and hybrid apps?",
          options: ["No difference", "Native uses platform-specific code, hybrid uses web technologies", "Only cost"],
          correct: 1,
          difficulty: "intermediate"
        }
      ]
    };
    
    this.learningPaths = {
      'web-development': {
        beginner: ['Personal Portfolio', 'Todo App', 'Weather App'],
        intermediate: ['E-commerce Site', 'Social Media Dashboard', 'Blog Platform'],
        advanced: ['Real-time Chat App', 'Video Streaming Platform', 'Microservices Architecture']
      },
      'data-science': {
        beginner: ['Data Visualization Dashboard', 'Simple Prediction Model', 'Data Cleaning Project'],
        intermediate: ['Recommendation System', 'Time Series Analysis', 'NLP Sentiment Analysis'],
        advanced: ['Deep Learning Image Classifier', 'Real-time Analytics Pipeline', 'MLOps Project']
      },
      'mobile-development': {
        beginner: ['Calculator App', 'Note Taking App', 'Weather App'],
        intermediate: ['Social Media App', 'E-commerce App', 'Fitness Tracker'],
        advanced: ['Real-time Messaging App', 'AR/VR App', 'IoT Control App']
      }
    };
  }

  async runAssessment(domain) {
    const questions = this.questions[domain];
    if (!questions) {
      console.log('❌ Invalid domain');
      return;
    }

    console.log(`\n🎯 ${domain.toUpperCase()} Skill Assessment`);
    console.log('='.repeat(50));
    
    let score = 0;
    let difficultyScore = { beginner: 0, intermediate: 0, advanced: 0 };

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      console.log(`\n${i + 1}. ${q.question}`);
      q.options.forEach((option, index) => {
        console.log(`   ${index + 1}. ${option}`);
      });

      // Simulate user input (in real implementation, you'd use readline)
      const userAnswer = Math.floor(Math.random() * q.options.length); // Random for demo
      
      if (userAnswer === q.correct) {
        score++;
        difficultyScore[q.difficulty]++;
        console.log('   ✅ Correct!');
      } else {
        console.log(`   ❌ Incorrect. The answer was: ${q.options[q.correct]}`);
      }
    }

    // Determine skill level
    let skillLevel = 'beginner';
    if (difficultyScore.advanced >= 2) {
      skillLevel = 'advanced';
    } else if (difficultyScore.intermediate >= 2) {
      skillLevel = 'intermediate';
    }

    console.log(`\n📊 Assessment Results:`);
    console.log(`   Score: ${score}/${questions.length}`);
    console.log(`   Skill Level: ${skillLevel.toUpperCase()}`);
    
    // Recommend projects
    const recommendedProjects = this.learningPaths[domain][skillLevel];
    console.log(`\n🎯 Recommended Projects for you:`);
    recommendedProjects.forEach((project, index) => {
      console.log(`   ${index + 1}. ${project}`);
    });

    // Generate learning path
    this.generateLearningPath(domain, skillLevel);
  }

  generateLearningPath(domain, skillLevel) {
    const pathFile = `learning-path-${domain}-${skillLevel}.md`;
    const pathContent = `# ${domain.toUpperCase()} Learning Path - ${skillLevel.toUpperCase()}

Generated on: ${new Date().toLocaleDateString()}

## 🎯 Your Skill Level: ${skillLevel.toUpperCase()}

## 📚 Recommended Learning Sequence:

${this.learningPaths[domain][skillLevel].map((project, index) => 
  `### ${index + 1}. ${project}
- **Duration**: 1-2 weeks
- **Skills**: [To be filled based on project]
- **Resources**: [Links to tutorials and docs]

`).join('')}

## 📈 Next Steps:
1. Start with the first project
2. Document your progress
3. Share your work on GitHub
4. Join our community discussions

## 🎓 Skill Advancement:
${skillLevel === 'beginner' ? '- Master these projects to reach intermediate level' : 
  skillLevel === 'intermediate' ? '- Complete these to reach advanced level' : 
  '- These projects will prepare you for senior roles'}
`;

    fs.writeFileSync(pathFile, pathContent);
    console.log(`\n📄 Learning path saved to: ${pathFile}`);
  }
}

// CLI Interface
if (require.main === module) {
  const assessment = new SkillAssessment();
  
  console.log('🎯 Welcome to the CSE Skill Assessment Tool!');
  console.log('\nAvailable domains:');
  console.log('1. web-development');
  console.log('2. data-science');
  console.log('3. mobile-development');
  
  // For demo purposes, run web development assessment
  assessment.runAssessment('web-development');
}

module.exports = SkillAssessment;
