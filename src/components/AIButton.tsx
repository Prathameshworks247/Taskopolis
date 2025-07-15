import React, { useState, useRef, useEffect } from 'react';

// Types
interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

interface GeminiRequestBody {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
}

interface Suggestion {
  id: string;
  title: string;
  description: string;
  prompt: string;
}
interface TaskAIButtonProps {
    query: string;
  }

const TaskAIButton: React.FC<TaskAIButtonProps> = ({ query }) => {
const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generatedTips, setGeneratedTips] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get API key from environment
  const apiKey = import.meta.env.GEMINI_API_KEY || " "

  // Default tips
  const defaultTips: string[] = [
    "Break down complex tasks into smaller, manageable steps",
    "Use specific keywords and clear instructions for better results",
    "Provide context and examples when describing your task",
    "Review and refine your prompts for optimal AI assistance",
    "Take advantage of iterative improvements and feedback",
    "Be clear about your desired output format and style"
  ];

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target;
      if (
        target &&
        target instanceof Node &&
        tooltipRef.current && 
        !tooltipRef.current.contains(target) &&
        buttonRef.current && 
        !buttonRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setShowTooltip(false);
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleTooltip = (): void => {
    setShowTooltip(!showTooltip);
    setShowSuggestions(false);
  };

  const generateTipsWithGemini = async (): Promise<void> => {
    if (!apiKey) {
      setError('API key not found. Please add REACT_APP_GEMINI_API_KEY to your .env file.');
      return;
    }

    setIsGenerating(true);
    setError('');
    setShowSuggestions(false);

    try {
      const requestBody: GeminiRequestBody = {
        contents: [{
          parts: [{
            text: `Given this task: "${query}", generate 6 concise, actionable tips for working efficiently with AI tools. Each tip should be practical and under 15 words. Focus on prompt engineering, task breakdown, and productivity. Return only the tips as a numbered list.`
          }]
        }]
      };

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Parse the numbered list into array
      const tips: string[] = generatedText
        .split('\n')
        .filter((line: string) => line.trim())
        .map((line: string) => line.replace(/^\d+\.\s*/, '').trim())
        .filter((tip: string) => tip.length > 0);

      setGeneratedTips(tips.slice(0, 6));
      
      // Generate suggestions after tips are created
      await generateSuggestions();
      
    } catch (err) {
      setError('Failed to generate tips. Please check your API key and try again.');
      console.error('Gemini API Error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateSuggestions = async (): Promise<void> => {
    if (!apiKey) return;

    try {
      const requestBody: GeminiRequestBody = {
        contents: [{
          parts: [{
            text: "Generate 5 follow-up suggestions for AI productivity tasks. Each suggestion should have a title (max 8 words) and description (max 20 words). Format as JSON array with objects containing 'title', 'description', and 'prompt' fields. The prompt should be a sample user query."
          }]
        }]
      };

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-latest:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      
      // Try to parse JSON from response
      try {
        const jsonMatch = generatedText.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
          const parsedSuggestions = JSON.parse(jsonMatch[0]);
          const formattedSuggestions: Suggestion[] = parsedSuggestions.map((item: any, index: number) => ({
            id: `suggestion-${index}`,
            title: item.title || `Suggestion ${index + 1}`,
            description: item.description || 'AI productivity suggestion',
            prompt: item.prompt || 'Help me with AI task automation'
          }));
          setSuggestions(formattedSuggestions.slice(0, 5));
          setShowSuggestions(true);
        }
      } catch (parseErr) {
        // Fallback suggestions if JSON parsing fails
        const fallbackSuggestions: Suggestion[] = [
          {
            id: 'suggestion-1',
            title: 'Optimize My Workflow',
            description: 'Get AI suggestions for streamlining daily tasks',
            prompt: 'Help me optimize my daily workflow with AI automation'
          },
          {
            id: 'suggestion-2',
            title: 'Better Prompt Writing',
            description: 'Learn advanced techniques for effective AI prompts',
            prompt: 'Teach me advanced prompt engineering techniques'
          },
          {
            id: 'suggestion-3',
            title: 'Task Automation Ideas',
            description: 'Discover AI tools for automating repetitive work',
            prompt: 'Suggest AI tools for automating my repetitive tasks'
          },
          {
            id: 'suggestion-4',
            title: 'AI Integration Strategy',
            description: 'Plan how to integrate AI into existing processes',
            prompt: 'Help me create an AI integration strategy for my team'
          },
          {
            id: 'suggestion-5',
            title: 'Productivity Metrics',
            description: 'Track and measure AI-enhanced productivity gains',
            prompt: 'How can I measure productivity improvements from AI tools?'
          }
        ];
        setSuggestions(fallbackSuggestions);
        setShowSuggestions(true);
      }
    } catch (err) {
      console.error('Failed to generate suggestions:', err);
      // Show fallback suggestions on error
      setShowSuggestions(true);
    }
  };

  const handleSuggestionSelect = (suggestion: Suggestion): void => {
    setSelectedSuggestion(suggestion.prompt);
    setShowSuggestions(false);
    // Here you could emit an event or call a callback to handle the selected suggestion
    console.log('Selected suggestion:', suggestion);
  };

  const currentTips: string[] = generatedTips.length > 0 ? generatedTips : defaultTips;

  return (
    <div className="relative inline-block">
      <button
        ref={buttonRef}
        onClick={toggleTooltip}
        className="bg-gradient-to-r p-2 py-0 from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] text-white font-bold shadow-lg hover:brightness-110 transition-all rounded"
      >
        ✨Task AI
      </button>
      
      {showTooltip && (
        <div
          ref={tooltipRef}
          className=" absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 animate-in fade-in-0 zoom-in-95 duration-200"
          style={{zIndex: 1000}}
        >
          {/* Arrow pointing up */}
          <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
          
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm">✨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Task AI Tips</h3>
            </div>
            <button
              onClick={generateTipsWithGemini}
              disabled={isGenerating}
              className="px-3 py-1 text-xs bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] text-white rounded-full hover:brightness-110 disabled:opacity-50 transition-all"
            >
              {isGenerating ? '🔄' : '🤖 Generate'}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {isGenerating && (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-sm text-gray-600">Generating tips...</span>
            </div>
          )}
          
          {/* Tips */}
          {!isGenerating && (
            <div className="space-y-2 mb-3">
              {currentTips.map((tip: string, index: number) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-600 leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          )}

          {/* Suggestions Button */}
          {generatedTips.length > 0 && !isGenerating && (
            <div className="mb-3">
              <button
                onClick={() => setShowSuggestions(!showSuggestions)}
                className="w-full px-3 py-2 bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] text-white rounded-lg hover:brightness-110 transition-all flex items-center justify-center space-x-2"
              >
                <span>💡 Get Suggestions</span>
                <span className={`transform transition-transform ${showSuggestions ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
            </div>
          )}
          
          {/* Footer */}
          <div className="pt-3 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              {generatedTips.length > 0 ? 'AI-generated tips • ' : 'Default tips • '}
              Click outside to close
            </p>
          </div>
        </div>
      )}

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 p-2 z-50 animate-in fade-in-0 zoom-in-95 duration-200"
          style={{ marginTop: '1rem' }}
        >
          {/* Arrow pointing up */}
          <div className="absolute -top-2 left-6 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45"></div>
          
          {/* Header */}
          <div className="px-2 py-2 border-b border-gray-100">
            <h4 className="text-sm font-semibold text-gray-700 flex items-center">
              <span className="mr-2">💡</span>
              AI Suggestions
            </h4>
          </div>
          
          {/* Suggestions List */}
          <div className="max-h-64 overflow-y-auto">
            {suggestions.map((suggestion: Suggestion) => (
              <div
                key={suggestion.id}
                onClick={() => handleSuggestionSelect(suggestion)}
                className="p-3 hover:bg-gray-50 cursor-pointer rounded-lg transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#6EE7B7] to-[#3B82F6] rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-gray-800 mb-1">
                      {suggestion.title}
                    </h5>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {suggestion.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer */}
          <div className="px-2 py-2 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Click a suggestion to use it
            </p>
          </div>
        </div>
      )}

      {/* Selected Suggestion Display */}
      {selectedSuggestion && (
        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Selected:</strong> {selectedSuggestion}
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskAIButton;