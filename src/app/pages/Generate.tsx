"use client";
import { useState } from "react";
import { UserIcon, ChatBubbleLeftEllipsisIcon, SparklesIcon, CheckIcon } from "@heroicons/react/24/outline";
import { generateScript } from "@/api/Generate";

export default function Generate() {
  const [persona, setPersona] = useState("");
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const isFormValid = persona && topic && tone;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!persona || !topic || !tone) return;
    
    setIsLoading(true);
    setResult("");
    
    try {
      console.log("Generating script...");
      const response = await generateScript({ persona, topic, tone });
      console.log("Response:", response);
      setResult(response);
    } catch (error) {
      console.error('Error generating content:', error);
      setResult('Error: Failed to generate content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };
  const personas = [
    "MrBeast",
    "Tech Reviewer",
    "Motivational Speaker",
    "Educational Content Creator",
    "Comedy Creator",
    "Lifestyle Influencer",
    "Business Expert",
    "Fitness Coach"
  ];

  const tones = [
    "Professional",
    "Casual",
    "Enthusiastic",
    "Educational",
    "Humorous",
    "Inspirational",
    "Conversational",
    "Authoritative"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Content Generator
              </h1>
            </div>
            <p className="text-gray-300 text-xl">
              Create engaging content with AI-powered personalization
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Card - Left Side */}
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
              <div className="text-center pb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Generate Your Content
                </h2>
                <p className="text-gray-300">
                  Choose your style, topic, and tone to create the perfect content
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Persona Selection */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-white flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-purple-400" />
                    Select Persona
                  </label>
                  <select 
                    value={persona} 
                    onChange={(e) => setPersona(e.target.value)}
                    disabled={isLoading}
                    className="w-full h-12 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 hover:border-purple-400/50 transition-all rounded-lg px-4 focus:outline-none focus:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Choose a content creator persona...</option>
                    {personas.map((p) => (
                      <option key={p} value={p} className="bg-slate-800">
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Topic Input */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-white flex items-center gap-2">
                    <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-purple-400" />
                    Topic
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    disabled={isLoading}
                    placeholder="Enter your content topic..."
                    className="w-full h-12 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 hover:border-purple-400/50 focus:border-purple-400 transition-all rounded-lg px-4 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Tone Selection */}
                <div className="space-y-3">
                  <label className="text-base font-semibold text-white flex items-center gap-2">
                    <SparklesIcon className="w-5 h-5 text-purple-400" />
                    Tone
                  </label>
                  <select 
                    value={tone} 
                    onChange={(e) => setTone(e.target.value)}
                    disabled={isLoading}
                    className="w-full h-12 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 hover:border-purple-400/50 transition-all rounded-lg px-4 focus:outline-none focus:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <option value="">Choose the tone for your content...</option>
                    {tones.map((t) => (
                      <option key={t} value={t} className="bg-slate-800">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Generate Button */}
                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    className="w-full h-14 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Generating...
                      </>
                    ) : (
                      <>
                        <SparklesIcon className="w-5 h-5" />
                        Generate Content
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Result Display - Right Side */}
            <div className="backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-white">Generated Content</h3>
                {result && (
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 border border-white/20 text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all"
                  >
                    {copied ? (
                      <CheckIcon className="w-4 h-4" />
                    ) : (
                      <SparklesIcon className="w-4 h-4" />
                    )}
                    {copied ? "Copied!" : "Copy"}
                  </button>
                )}
              </div>
              
              <div className="bg-black/20 rounded-lg p-6 min-h-[400px] max-h-[600px] border border-white/10 overflow-y-auto">
                {result ? (
                  <div className="text-gray-200 font-mono text-sm leading-relaxed whitespace-pre-wrap">
                    {result}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <SparklesIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Your generated content will appear here</p>
                      <p className="text-sm mt-2">Fill out the form and click generate to get started</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <UserIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm text-white">AI Personas</h3>
              <p className="text-xs text-gray-300 mt-1">Different creator styles</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm text-white">Custom Topics</h3>
              <p className="text-xs text-gray-300 mt-1">Any subject matter</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-sm text-white">Tone Control</h3>
              <p className="text-xs text-gray-300 mt-1">Perfect voice match</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
