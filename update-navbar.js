const fs = require('fs');
const path = require('path');

// Directory containing HTML files
const directoryPath = path.join(__dirname);

// Read the new navbar content
const navbarPath = path.join(__dirname, 'components', 'navbar.html');
const newNavbar = fs.readFileSync(navbarPath, 'utf8');

// Function to update navbar in a file
function updateNavbarInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Skip if it's the navbar component itself
        if (filePath.endsWith('navbar.html')) {
            console.log(`Skipping navbar component: ${filePath}`);
            return;
        }
        
        // Skip if it's not an HTML file
        if (!filePath.endsWith('.html')) {
            return;
        }
        
        console.log(`Updating navbar in: ${filePath}`);
        
        // Find the nav section (from <nav to </nav>)
        const navRegex = /<nav[\s\S]*?<\/nav>/i;
        
        // Check if the file already has a nav element
        if (navRegex.test(content)) {
            // Replace existing nav with new navbar
            content = content.replace(navRegex, newNavbar);
            console.log(`  → Replaced existing navbar`);
        } else {
            // Insert after opening body tag if no nav exists
            const bodyRegex = /<body[^>]*>/i;
            if (bodyRegex.test(content)) {
                content = content.replace(bodyRegex, (match) => {
                    return `${match}\n${newNavbar}`;
                });
                console.log(`  → Added new navbar after body`);
            } else {
                console.log(`  → Could not find body tag, skipping`);
                return;
            }
        }
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  ✓ Successfully updated ${filePath}`);
        
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
    }
}

// Process all HTML files in the directory
function processFiles(directory) {
    const files = fs.readdirSync(directory);
    
    files.forEach(file => {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            // Skip node_modules and other directories if needed
            if (file !== 'node_modules' && !file.startsWith('.')) {
                processFiles(fullPath);
            }
        } else if (file.endsWith('.html')) {
            updateNavbarInFile(fullPath);
        }
    });
}

console.log('Starting navbar update process...');
processFiles(directoryPath);
console.log('Navbar update completed!');
