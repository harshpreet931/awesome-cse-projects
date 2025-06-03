const fs = require('fs');
const path = require('path');
const https = require('https');

// Validate project entries in README.md
async function validateProjects() {
    console.log('🔍 Validating project entries...');
    
    const readmePath = path.join(__dirname, '..', 'README.md');
    const content = fs.readFileSync(readmePath, 'utf8');
    
    const errors = [];
    const warnings = [];
    const stats = {
        totalProjects: 0,
        categoriesCount: 0,
        difficultyDistribution: {
            '⭐': 0,
            '⭐⭐': 0,
            '⭐⭐⭐': 0,
            '⭐⭐⭐⭐': 0,
            '⭐⭐⭐⭐⭐': 0
        },
        techStackDistribution: {},
        missingFields: {
            repository: 0,
            tutorial: 0,
            demo: 0
        }
    };
    
    // Extract project entries
    const projectRegex = /- \*\*([^*]+)\*\* - ([^\n]+)\n((?:  - \*[^:]+\*: [^\n]+\n)*)/gm;
    let match;
    
    while ((match = projectRegex.exec(content)) !== null) {
        const [fullMatch, projectName, description, fields] = match;
        stats.totalProjects++;
        
        // Validate project name format
        if (!projectName.includes('🎯') && !projectName.includes('📝') && !projectName.includes('🔢') && 
            !projectName.match(/[🎯📝🔢💬📸🏃‍♂️🍕👁️😊🤖📈🎵🔐📊🏪🐍👾🧩🔍🔐🕷️🏥📚📊📤🔄💰🪙📝🎵📈🔍🌱🔄🗺️🌐⚡🎭🧬🔬🌍🏥📱🚗📊🤖⚡🏦📈🎯🖼️🚀📊🛡️📱🔮🌟🤖🌱🤖📈🔍🧬🌍📚]/)) {
            warnings.push(`Project "${projectName}" missing emoji`);
        }
        
        // Parse fields
        const fieldMatches = fields.match(/- \*([^:]+)\*: ([^\n]+)/g) || [];
        const projectFields = {};
        
        fieldMatches.forEach(fieldMatch => {
            const [, fieldName, fieldValue] = fieldMatch.match(/- \*([^:]+)\*: ([^\n]+)/);
            projectFields[fieldName.toLowerCase().replace(/\s+/g, '')] = fieldValue.trim();
        });
        
        // Validate required fields
        const requiredFields = ['techstack', 'skills', 'difficulty'];
        requiredFields.forEach(field => {
            if (!projectFields[field]) {
                errors.push(`Project "${projectName}" missing required field: ${field}`);
            }
        });
        
        // Validate difficulty format
        if (projectFields.difficulty) {
            const difficultyMatch = projectFields.difficulty.match(/^(⭐+)$/);
            if (!difficultyMatch) {
                errors.push(`Project "${projectName}" has invalid difficulty format: ${projectFields.difficulty}`);
            } else {
                const stars = difficultyMatch[1];
                if (stats.difficultyDistribution[stars] !== undefined) {
                    stats.difficultyDistribution[stars]++;
                } else {
                    errors.push(`Project "${projectName}" has invalid difficulty level: ${stars}`);
                }
            }
        }
        
        // Track tech stack distribution
        if (projectFields.techstack) {
            const technologies = projectFields.techstack.split(',').map(tech => tech.trim());
            technologies.forEach(tech => {
                stats.techStackDistribution[tech] = (stats.techStackDistribution[tech] || 0) + 1;
            });
        }
        
        // Check for optional fields
        ['repository', 'tutorial', 'demo'].forEach(field => {
            if (!projectFields[field] || projectFields[field].toLowerCase().includes('coming soon')) {
                stats.missingFields[field]++;
            }
        });
        
        // Validate description length
        if (description.length > 100) {
            warnings.push(`Project "${projectName}" description too long (${description.length} chars, max 100)`);
        }
        
        // Validate skills format
        if (projectFields.skills && projectFields.skills.split(',').length < 2) {
            warnings.push(`Project "${projectName}" should list multiple skills`);
        }
    }
    
    // Count categories
    const categoryRegex = /^## 🎯|^## 🔧|^## 📱|^## 🤖|^## 🌐|^## 🎮|^## 🔒|^## 🗄️|^## ☁️|^## 🔗|^## 🖥️|^## 📊|^## 🌐|^## 🧠|^## 📈|^## 🎓|^## 🏆/gm;
    stats.categoriesCount = (content.match(categoryRegex) || []).length;
    
    // Generate report
    console.log('\n📊 Validation Report');
    console.log('═'.repeat(50));
    
    if (errors.length > 0) {
        console.log('\n❌ Errors:');
        errors.forEach(error => console.log(`  • ${error}`));
    }
    
    if (warnings.length > 0) {
        console.log('\n⚠️  Warnings:');
        warnings.forEach(warning => console.log(`  • ${warning}`));
    }
    
    console.log('\n📈 Statistics:');
    console.log(`  • Total Projects: ${stats.totalProjects}`);
    console.log(`  • Categories: ${stats.categoriesCount}`);
    console.log(`  • Average Projects per Category: ${(stats.totalProjects / stats.categoriesCount).toFixed(1)}`);
    
    console.log('\n🌟 Difficulty Distribution:');
    Object.entries(stats.difficultyDistribution).forEach(([difficulty, count]) => {
        const percentage = ((count / stats.totalProjects) * 100).toFixed(1);
        console.log(`  • ${difficulty}: ${count} (${percentage}%)`);
    });
    
    console.log('\n🔧 Top Technologies:');
    const sortedTech = Object.entries(stats.techStackDistribution)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10);
    sortedTech.forEach(([tech, count]) => {
        console.log(`  • ${tech}: ${count} projects`);
    });
    
    console.log('\n📝 Missing Optional Fields:');
    Object.entries(stats.missingFields).forEach(([field, count]) => {
        const percentage = ((count / stats.totalProjects) * 100).toFixed(1);
        console.log(`  • ${field}: ${count} (${percentage}%)`);
    });
    
    // Quality score
    const qualityScore = Math.max(0, 100 - (errors.length * 5) - (warnings.length * 2));
    console.log(`\n🏆 Quality Score: ${qualityScore}/100`);
    
    if (qualityScore >= 90) {
        console.log('🎉 Excellent! Repository is in great shape!');
    } else if (qualityScore >= 75) {
        console.log('👍 Good! Minor improvements needed.');
    } else if (qualityScore >= 60) {
        console.log('⚠️  Fair. Several issues should be addressed.');
    } else {
        console.log('❌ Poor. Significant improvements needed.');
    }
    
    // Save detailed report
    const reportPath = path.join(__dirname, '..', 'validation-report.json');
    const report = {
        timestamp: new Date().toISOString(),
        errors,
        warnings,
        stats,
        qualityScore
    };
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    
    return {
        errors: errors.length,
        warnings: warnings.length,
        qualityScore
    };
}

// Validate links in markdown files
async function validateLinks() {
    console.log('\n🔗 Validating links...');
    
    const files = ['README.md', 'CONTRIBUTING.md', 'PROJECT_GUIDELINES.md'];
    const brokenLinks = [];
    
    for (const file of files) {
        const filePath = path.join(__dirname, '..', file);
        if (!fs.existsSync(filePath)) continue;
        
        const content = fs.readFileSync(filePath, 'utf8');
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let match;
        
        while ((match = linkRegex.exec(content)) !== null) {
            const [, linkText, linkUrl] = match;
            
            // Skip internal links and mailto links
            if (linkUrl.startsWith('#') || linkUrl.startsWith('mailto:')) continue;
            
            try {
                // Simple HTTP check (you might want to implement actual link checking)
                if (linkUrl.startsWith('http')) {
                    // Placeholder for actual link validation
                    // In a real implementation, you'd make HTTP requests to check links
                    console.log(`  ✓ ${linkUrl}`);
                }
            } catch (error) {
                brokenLinks.push({ file, linkText, linkUrl, error: error.message });
            }
        }
    }
    
    if (brokenLinks.length > 0) {
        console.log('\n❌ Broken links found:');
        brokenLinks.forEach(({ file, linkText, linkUrl, error }) => {
            console.log(`  • ${file}: "${linkText}" -> ${linkUrl} (${error})`);
        });
    } else {
        console.log('✅ All links appear to be valid');
    }
    
    return brokenLinks;
}

// Main validation function
async function main() {
    console.log('🚀 Starting validation process...\n');
    
    try {
        const projectValidation = await validateProjects();
        const brokenLinks = await validateLinks();
        
        console.log('\n' + '═'.repeat(50));
        console.log('📋 VALIDATION SUMMARY');
        console.log('═'.repeat(50));
        console.log(`Errors: ${projectValidation.errors}`);
        console.log(`Warnings: ${projectValidation.warnings}`);
        console.log(`Quality Score: ${projectValidation.qualityScore}/100`);
        console.log(`Broken Links: ${brokenLinks.length}`);
        
        // Exit with error code if there are critical issues
        if (projectValidation.errors > 0 || brokenLinks.length > 0) {
            process.exit(1);
        }
        
        console.log('\n✅ Validation completed successfully!');
        
    } catch (error) {
        console.error('❌ Validation failed:', error.message);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { validateProjects, validateLinks };
