/**
 * Text Parser for parsing raw text files and displaying content
 */

class TextParser {
    constructor() {
        this.japaneseParagraph = null;
        this.englishParagraph = null;
    }

    /**
     * Initialize the parser and set target elements
     */
    init() {
        // Find target elements in the DOM where the parsed text will be displayed
        this.japaneseParagraph = document.querySelector('#japanese-content');
        this.englishParagraph = document.querySelector('#english-content');
        
        if (!this.japaneseParagraph || !this.englishParagraph) {
            console.warn('Target elements #japanese-content or #english-content not found');
            return false;
        }
        
        return true;
    }

    /**
     * Parse text content and separate Japanese and English sections
     * @param {string} textContent - Raw text content to parse
     * @returns {object} Object containing japanese and english text
     */
    parseContent(textContent) {
        const lines = textContent.split('\n');
        let currentSection = null;
        let japaneseText = '';
        let englishText = '';

        for (let line of lines) {
            line = line.trim();
            
            // Skip empty lines
            if (!line) continue;
            
            // Check for section headers
            if (line === '# Japanese') {
                currentSection = 'japanese';
                continue;
            } else if (line === '# English') {
                currentSection = 'english';
                continue;
            }
            
            // Add content to appropriate section
            if (currentSection === 'japanese') {
                japaneseText += line + ' ';
            } else if (currentSection === 'english') {
                englishText += line + ' ';
            }
        }

        return {
            japanese: japaneseText.trim(),
            english: englishText.trim()
        };
    }

    /**
     * Format text with automatic line breaks for better readability
     * @param {string} text - Text to format
     * @param {number} maxLineLength - Maximum characters per line (default: 80)
     * @returns {string} Formatted text with line breaks
     */
    formatTextWithLineBreaks(text, maxLineLength = 80) {
        const sentences = text.split(/[。．.]/);
        let formattedText = '';
        let currentLine = '';

        for (let sentence of sentences) {
            sentence = sentence.trim();
            if (!sentence) continue;
            
            // Add period back if it was removed
            if (!sentence.match(/[。．.]$/)) {
                sentence += sentence.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/) ? '。' : '.';
            }

            // Check if adding this sentence would exceed line length
            if (currentLine.length + sentence.length > maxLineLength && currentLine.length > 0) {
                formattedText += currentLine.trim() + '<br>\n';
                currentLine = sentence + ' ';
            } else {
                currentLine += sentence + ' ';
            }
        }

        // Add remaining text
        if (currentLine.trim()) {
            formattedText += currentLine.trim();
        }

        return formattedText;
    }

    /**
     * Display parsed content in the target elements
     * @param {object} content - Content object with japanese and english properties
     */
    displayContent(content) {
        if (!this.japaneseParagraph || !this.englishParagraph) {
            console.error('Target elements not initialized');
            return;
        }

        // Format and display Japanese content
        const formattedJapanese = this.formatTextWithLineBreaks(content.japanese, 60);
        this.japaneseParagraph.innerHTML = formattedJapanese;

        // Format and display English content
        const formattedEnglish = this.formatTextWithLineBreaks(content.english, 80);
        this.englishParagraph.innerHTML = formattedEnglish;
    }

    /**
     * Load and parse text file from the server
     * @param {string} filePath - Path to the text file
     */
    async loadAndParseFile(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const textContent = await response.text();
            const parsedContent = this.parseContent(textContent);
            this.displayContent(parsedContent);
            
            console.log('Text file loaded and parsed successfully');
        } catch (error) {
            console.error('Error loading text file:', error);
            
            // Display error message to user
            if (this.japaneseParagraph) {
                this.japaneseParagraph.innerHTML = 'ファイルの読み込みに失敗しました。';
            }
            if (this.englishParagraph) {
                this.englishParagraph.innerHTML = 'Failed to load the text file.';
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const parser = new TextParser();
    
    if (parser.init()) {
        // Load the raw-Section1 file
        parser.loadAndParseFile('/src/raw-Section1');
    }
});

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TextParser;
}