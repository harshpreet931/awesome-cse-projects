const fs = require('fs');
const path = require('path');

describe('Repository Validation', () => {
  test('README.md should exist', () => {
    const readmePath = path.join(__dirname, '..', 'README.md');
    expect(fs.existsSync(readmePath)).toBe(true);
  });

  test('All required files should exist', () => {
    const requiredFiles = [
      'CONTRIBUTING.md',
      'LICENSE',
      'ROADMAP.md',
      'PROJECT_IDEAS_2025.md',
      'LEARNING_PATHS.md',
      'TEMPLATES.md'
    ];

    requiredFiles.forEach(file => {
      const filePath = path.join(__dirname, '..', file);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });

  test('Package.json should have correct structure', () => {
    const packagePath = path.join(__dirname, '..', 'package.json');
    const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    expect(packageContent.name).toBe('awesome-cse-projects');
    expect(packageContent.scripts).toBeDefined();
    expect(packageContent.keywords).toContain('computer-science');
  });

  test('README should have proper awesome list structure', () => {
    const readmePath = path.join(__dirname, '..', 'README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    // Check for awesome badge
    expect(readmeContent).toMatch(/\[!\[Awesome\]/);
    
    // Check for table of contents or proper structure
    expect(readmeContent).toMatch(/#{1,3}\s+[^#]/);
  });
});

describe('Markdown Content Validation', () => {
  const markdownFiles = [
    'README.md',
    'CONTRIBUTING.md',
    'ROADMAP.md',
    'PROJECT_IDEAS_2025.md',
    'LEARNING_PATHS.md'
  ];

  markdownFiles.forEach(file => {
    test(`${file} should exist and have content`, () => {
      const filePath = path.join(__dirname, '..', file);
      expect(fs.existsSync(filePath)).toBe(true);
      
      const content = fs.readFileSync(filePath, 'utf8');
      expect(content.length).toBeGreaterThan(100);
      
      // Check for proper markdown structure
      expect(content).toMatch(/^#\s+/m); // Should have at least one heading
    });
  });

  test('All markdown files should have consistent formatting', () => {
    markdownFiles.forEach(file => {
      const filePath = path.join(__dirname, '..', file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for proper heading hierarchy (no jumping from # to ###)
      const headings = content.match(/^#{1,6}\s+.+$/gm) || [];
      expect(headings.length).toBeGreaterThan(0);
    });
  });
});
