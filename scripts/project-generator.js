#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🎯 Project Template Generator');
console.log('================================\n');

const templates = {
  'web-fullstack': {
    name: 'Full-Stack Web Application',
    tech: ['React', 'Node.js', 'MongoDB'],
    difficulty: '⭐⭐⭐'
  },
  'mobile-app': {
    name: 'Mobile Application',
    tech: ['React Native', 'Firebase'],
    difficulty: '⭐⭐⭐⭐'
  },
  'ai-ml': {
    name: 'AI/ML Project',
    tech: ['Python', 'TensorFlow', 'Flask'],
    difficulty: '⭐⭐⭐⭐⭐'
  },
  'data-science': {
    name: 'Data Science Project',
    tech: ['Python', 'Pandas', 'Matplotlib'],
    difficulty: '⭐⭐⭐'
  },
  'game-dev': {
    name: 'Game Development',
    tech: ['Unity', 'C#'],
    difficulty: '⭐⭐⭐⭐'
  }
};

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function generateProject() {
  try {
    console.log('Available templates:');
    Object.entries(templates).forEach(([key, template]) => {
      console.log(`  ${key}: ${template.name} (${template.difficulty})`);
    });
    
    const templateChoice = await askQuestion('\nChoose a template: ');
    const template = templates[templateChoice];
    
    if (!template) {
      console.log('❌ Invalid template choice');
      process.exit(1);
    }
    
    const projectName = await askQuestion('Project name: ');
    const description = await askQuestion('Project description: ');
    const author = await askQuestion('Your name: ');
    
    const projectDir = path.join(process.cwd(), projectName);
    
    if (fs.existsSync(projectDir)) {
      console.log('❌ Directory already exists!');
      process.exit(1);
    }
    
    // Create project directory
    fs.mkdirSync(projectDir);
    
    // Generate README
    const readmeContent = `# ${projectName}

${description}

## 🚀 Tech Stack
${template.tech.map(tech => `- ${tech}`).join('\n')}

## 📊 Difficulty Level
${template.difficulty}

## 🎯 Features
- [ ] Feature 1
- [ ] Feature 2  
- [ ] Feature 3

## 🛠️ Installation

\`\`\`bash
git clone <repository-url>
cd ${projectName}
npm install
\`\`\`

## 🏃‍♂️ Running the Project

\`\`\`bash
npm start
\`\`\`

## 📝 Contributing
Contributions are welcome! Please read the contributing guidelines first.

## 📄 License
MIT License

## 👨‍💻 Author
${author}
`;

    fs.writeFileSync(path.join(projectDir, 'README.md'), readmeContent);
    
    // Generate package.json for JavaScript projects
    if (template.tech.includes('React') || template.tech.includes('Node.js')) {
      const packageJson = {
        name: projectName.toLowerCase().replace(/\s+/g, '-'),
        version: "1.0.0",
        description: description,
        main: "index.js",
        scripts: {
          start: "node index.js",
          test: "echo \"Error: no test specified\" && exit 1"
        },
        author: author,
        license: "MIT"
      };
      
      fs.writeFileSync(
        path.join(projectDir, 'package.json'), 
        JSON.stringify(packageJson, null, 2)
      );
    }
    
    // Generate basic project structure
    const srcDir = path.join(projectDir, 'src');
    fs.mkdirSync(srcDir);
    
    if (template.tech.includes('Python')) {
      fs.writeFileSync(path.join(srcDir, 'main.py'), '# Main Python file\nprint("Hello, World!")');
      fs.writeFileSync(path.join(projectDir, 'requirements.txt'), '# Python dependencies\n');
    } else {
      fs.writeFileSync(path.join(srcDir, 'index.js'), '// Main JavaScript file\nconsole.log("Hello, World!");');
    }
    
    // Generate .gitignore
    const gitignoreContent = `node_modules/
.env
dist/
*.log
.DS_Store
__pycache__/
*.pyc
`;
    fs.writeFileSync(path.join(projectDir, '.gitignore'), gitignoreContent);
    
    console.log(`\n✅ Project "${projectName}" created successfully!`);
    console.log(`📁 Location: ${projectDir}`);
    console.log('\n🚀 Next steps:');
    console.log(`  cd ${projectName}`);
    console.log('  git init');
    console.log('  git add .');
    console.log('  git commit -m "Initial commit"');
    
  } catch (error) {
    console.error('❌ Error creating project:', error.message);
  } finally {
    rl.close();
  }
}

if (require.main === module) {
  generateProject();
}

module.exports = { generateProject, templates };
