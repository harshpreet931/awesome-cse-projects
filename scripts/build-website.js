const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Build static website from markdown files
async function buildWebsite() {
    console.log('🚀 Building awesome-cse-projects website...');

    // Create dist directory
    const distDir = path.join(__dirname, '..', 'dist');
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }

    // Read and process main README
    const readmePath = path.join(__dirname, '..', 'README.md');
    const readmeContent = fs.readFileSync(readmePath, 'utf8');
    
    // Convert markdown to HTML
    const htmlContent = marked.parse(readmeContent);
    
    // Create complete HTML page
    const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🚀 Awesome CSE Projects</title>
    <meta name="description" content="A curated list of awesome Computer Science & Engineering projects for students, developers, and enthusiasts.">
    <meta name="keywords" content="computer science, engineering, projects, programming, coding, students, portfolio, awesome">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://harshpreet931.github.io/awesome-cse-projects/">
    <meta property="og:title" content="🚀 Awesome CSE Projects">
    <meta property="og:description" content="A curated list of awesome Computer Science & Engineering projects for students">
    <meta property="og:image" content="https://harshpreet931.github.io/awesome-cse-projects/assets/banner.png">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://harshpreet931.github.io/awesome-cse-projects/">
    <meta property="twitter:title" content="🚀 Awesome CSE Projects">
    <meta property="twitter:description" content="A curated list of awesome Computer Science & Engineering projects for students">
    <meta property="twitter:image" content="https://harshpreet931.github.io/awesome-cse-projects/assets/banner.png">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>">
    
    <!-- GitHub Markdown CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/github-markdown-css@5/github-markdown-dark.min.css">
    
    <!-- Custom Styles -->
    <style>
        :root {
            --bg-color: #0d1117;
            --text-color: #c9d1d9;
            --accent-color: #58a6ff;
            --border-color: #21262d;
            --hover-bg: #161b22;
        }
        
        * {
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background: var(--bg-color);
            color: var(--text-color);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .markdown-body {
            background: transparent;
            color: var(--text-color);
            border: none;
            max-width: none;
        }
        
        .markdown-body h1,
        .markdown-body h2,
        .markdown-body h3,
        .markdown-body h4 {
            color: var(--accent-color);
            border-bottom-color: var(--border-color);
        }
        
        .markdown-body a {
            color: var(--accent-color);
            text-decoration: none;
        }
        
        .markdown-body a:hover {
            text-decoration: underline;
        }
        
        .markdown-body code {
            background: var(--border-color);
            color: #f85149;
            padding: 2px 6px;
            border-radius: 6px;
        }
        
        .markdown-body pre {
            background: var(--border-color);
            border-radius: 6px;
        }
        
        .markdown-body blockquote {
            border-left-color: var(--accent-color);
            color: #8b949e;
        }
        
        .markdown-body table {
            border-collapse: collapse;
        }
        
        .markdown-body table th,
        .markdown-body table td {
            border-color: var(--border-color);
            padding: 12px;
        }
        
        .markdown-body table th {
            background: var(--hover-bg);
        }
        
        .markdown-body table tr:nth-child(even) {
            background: rgba(255, 255, 255, 0.02);
        }
        
        .markdown-body img {
            max-width: 100%;
            height: auto;
            border-radius: 6px;
        }
        
        /* Smooth scrolling */
        html {
            scroll-behavior: smooth;
        }
        
        /* Back to top button */
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: var(--accent-color);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.3s ease;
            font-size: 20px;
            z-index: 1000;
        }
        
        .back-to-top.visible {
            opacity: 1;
        }
        
        .back-to-top:hover {
            background: #1f6feb;
            transform: translateY(-2px);
        }
        
        /* Loading animation */
        .loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid rgba(255,255,255,.3);
            border-radius: 50%;
            border-top-color: var(--accent-color);
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
            .container {
                padding: 10px;
            }
            
            .markdown-body {
                font-size: 14px;
            }
            
            .back-to-top {
                bottom: 20px;
                right: 20px;
                width: 40px;
                height: 40px;
                font-size: 16px;
            }
        }
        
        /* Print styles */
        @media print {
            body {
                background: white;
                color: black;
            }
            
            .back-to-top {
                display: none;
            }
            
            .markdown-body a {
                color: black;
                text-decoration: underline;
            }
        }
    </style>
    
    <!-- Analytics -->
    <!-- Add your analytics code here -->
    
    <!-- JSON-LD Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Awesome CSE Projects",
        "description": "A curated list of awesome Computer Science & Engineering projects for students",
        "url": "https://harshpreet931.github.io/awesome-cse-projects/",
        "author": {
            "@type": "Person",
            "name": "Your Name"
        },
        "programmingLanguage": [
            "JavaScript",
            "Python",
            "Java",
            "C++",
            "Go",
            "Rust"
        ],
        "audience": {
            "@type": "Audience",
            "audienceType": "Computer Science Students"
        }
    }
    </script>
</head>
<body>
    <div class="container">
        <article class="markdown-body">
            ${htmlContent}
        </article>
    </div>
    
    <!-- Back to top button -->
    <button class="back-to-top" onclick="scrollToTop()" title="Back to top">↑</button>
    
    <script>
        // Back to top functionality
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        
        // Show/hide back to top button
        window.addEventListener('scroll', function() {
            const backToTop = document.querySelector('.back-to-top');
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });
        
        // Smooth scroll for anchor links
        document.addEventListener('DOMContentLoaded', function() {
            const links = document.querySelectorAll('a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        });
        
        // Add external link indicators
        document.addEventListener('DOMContentLoaded', function() {
            const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
            externalLinks.forEach(link => {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
                link.innerHTML += ' ↗';
            });
        });
        
        // Loading states for dynamic content
        function showLoading(element) {
            element.innerHTML = '<span class="loading"></span> Loading...';
        }
        
        // Copy code block functionality
        document.addEventListener('DOMContentLoaded', function() {
            const codeBlocks = document.querySelectorAll('pre code');
            codeBlocks.forEach(block => {
                const button = document.createElement('button');
                button.textContent = 'Copy';
                button.style.cssText = 'position: absolute; top: 5px; right: 5px; background: var(--accent-color); color: white; border: none; padding: 4px 8px; border-radius: 4px; font-size: 12px; cursor: pointer;';
                
                const wrapper = block.parentElement;
                wrapper.style.position = 'relative';
                wrapper.appendChild(button);
                
                button.addEventListener('click', () => {
                    navigator.clipboard.writeText(block.textContent).then(() => {
                        button.textContent = 'Copied!';
                        setTimeout(() => {
                            button.textContent = 'Copy';
                        }, 2000);
                    });
                });
            });
        });
        
        // Search functionality (basic)
        function addSearchFunctionality() {
            const searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.placeholder = 'Search projects...';
            searchInput.style.cssText = 'width: 100%; max-width: 400px; padding: 10px; margin: 20px 0; background: var(--hover-bg); border: 1px solid var(--border-color); border-radius: 6px; color: var(--text-color); font-size: 16px;';
            
            const container = document.querySelector('.container');
            container.insertBefore(searchInput, container.firstChild);
            
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                const sections = document.querySelectorAll('h3, h4');
                
                sections.forEach(section => {
                    const text = section.textContent.toLowerCase();
                    const nextElement = section.nextElementSibling;
                    
                    if (searchTerm === '' || text.includes(searchTerm)) {
                        section.style.display = 'block';
                        if (nextElement && nextElement.tagName === 'UL') {
                            nextElement.style.display = 'block';
                        }
                    } else {
                        section.style.display = 'none';
                        if (nextElement && nextElement.tagName === 'UL') {
                            nextElement.style.display = 'none';
                        }
                    }
                });
            });
        }
        
        // Initialize search
        // addSearchFunctionality();
        
        // Performance monitoring
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        });
    </script>
</body>
</html>`;

    // Write HTML file
    const htmlPath = path.join(distDir, 'index.html');
    fs.writeFileSync(htmlPath, fullHtml);
    
    // Copy additional files
    const additionalFiles = [
        'CONTRIBUTING.md',
        'PROJECT_GUIDELINES.md',
        'LEARNING_PATHS.md',
        'PROJECT_IDEAS_2025.md',
        'ROADMAP.md'
    ];
    
    additionalFiles.forEach(file => {
        const sourcePath = path.join(__dirname, '..', file);
        const destPath = path.join(distDir, file);
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, destPath);
        }
    });
    
    console.log('✅ Website built successfully!');
    console.log('📁 Output directory:', distDir);
    console.log('🌐 Open index.html in your browser to preview');
}

// Run if called directly
if (require.main === module) {
    buildWebsite().catch(console.error);
}

module.exports = { buildWebsite };
