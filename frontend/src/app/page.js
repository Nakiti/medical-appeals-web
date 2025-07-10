"use client";
import Link from "next/link";
import React, { useState, useContext } from "react";
import { Menu, X, ShieldCheck, FileText, Sparkles, ChevronDown, HeartPulse } from 'lucide-react';

// Mock AuthContext for demonstration purposes
const AuthContext = React.createContext({ currentUser: null });

// Main Landing Page Component
export default function LandingPage() {
  const { currentUser } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "How It Works", href: "#how-it-works" },
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <HeartPulse className="w-7 h-7 text-indigo-600" />
              <span>AppealMed</span>
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-indigo-600 transition-colors duration-300">{link.name}</Link>
                </li>
              ))}
            </ul>

            {/* CTA and Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <Link
                href={currentUser ? "/user/dashboard/home" : "/login"}
                className="hidden sm:inline-block px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-sm"
              >
                {currentUser ? "Go to Dashboard" : "Get Started Free"}
              </Link>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-600 hover:text-indigo-600">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <ul className="px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} onClick={() => setIsMenuOpen(false)} className="block text-gray-600 hover:text-indigo-600">{link.name}</Link>
                </li>
              ))}
              <li>
                <Link
                  href={currentUser ? "/user/dashboard/home" : "/login"}
                  className="w-full text-center block px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-sm"
                >
                  {currentUser ? "Go to Dashboard" : "Get Started Free"}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-24 md:pt-28 md:pb-32 text-center bg-white">
            <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(to_bottom,white_5%,transparent_90%)]"></div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    Turn Medical Claim <span className="text-indigo-600">Denials</span> into <span className="text-blue-500">Approvals</span>
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
                    Navigating insurance appeals is complex and frustrating. Our AI-powered platform simplifies the entire process, helping you build a stronger case, faster. Stop fighting paperwork and start winning your appeals.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Link
                        href="/appeal/new/claim-number/"
                        className="inline-block px-8 py-3.5 rounded-full text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 shadow-lg transform hover:scale-105"
                    >
                        Start Your Free Appeal
                    </Link>
                </div>
            </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">A Smarter Way to Appeal in 3 Steps</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">From denied claim to submitted appeal in minutes, not weeks.</p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    {/* Step 1 */}
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full text-2xl font-bold">1</div>
                        <h3 className="mt-5 text-xl font-semibold text-gray-900">Upload Your Documents</h3>
                        <p className="mt-2 text-gray-600">Securely upload your denial letter and related medical documents. Our system accepts various formats and ensures your data is protected.</p>
                    </div>
                    {/* Step 2 */}
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full text-2xl font-bold">2</div>
                        <h3 className="mt-5 text-xl font-semibold text-gray-900">AI Drafts Your Appeal</h3>
                        <p className="mt-2 text-gray-600">Our AI analyzes your documents, identifies the reason for denial, and drafts a compelling, evidence-based appeal letter for you to review.</p>
                    </div>
                    {/* Step 3 */}
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full text-2xl font-bold">3</div>
                        <h3 className="mt-5 text-xl font-semibold text-gray-900">Review and Submit</h3>
                        <p className="mt-2 text-gray-600">Make any edits you see fit, then submit your appeal directly through our platform or download it to send yourself. It's that simple.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Advantages</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Everything You Need for a Successful Appeal
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        We leverage technology to give you an edge over the traditional, manual process.
                    </p>
                </div>
                <div className="mt-12">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        <div className="relative">
                            <dt>
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                    <Sparkles className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">AI-Powered Analysis</p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">Our AI is trained on thousands of successful appeals. It identifies weaknesses in the insurer's denial and highlights the strongest points for your case.</dd>
                        </div>
                        <div className="relative">
                            <dt>
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                    <FileText className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Automated Letter Generation</p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">Save hours of writing. Get a professionally structured, well-reasoned appeal letter drafted in seconds, complete with relevant policy citations.</dd>
                        </div>
                        <div className="relative">
                            <dt>
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                                    <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Bank-Level Security</p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">Your privacy is our priority. We use end-to-end encryption to protect your sensitive health information at all times.</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>
        
        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Trusted by Patients Across the Country</h2>
                    <p className="mt-4 text-lg text-gray-600">Don't just take our word for it. Here's what our users are saying.</p>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <p className="text-gray-600">"I was completely lost after my surgery claim was denied. AppealMed's AI wrote an appeal that was better than anything I could have managed. It was approved in two weeks!"</p>
                        <div className="mt-4 flex items-center">
                            <img className="w-12 h-12 rounded-full" src="https://placehold.co/100x100/E2E8F0/4A5568?text=JS" alt="User" />
                            <div className="ml-4">
                                <p className="font-semibold text-gray-900">Jessica S.</p>
                                <p className="text-sm text-gray-500">Patient, California</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm">
                        <p className="text-gray-600">"The process was so fast and intuitive. Uploading the documents was easy, and the generated letter was perfect. This service is a game-changer for anyone fighting an insurance company."</p>
                        <div className="mt-4 flex items-center">
                            <img className="w-12 h-12 rounded-full" src="https://placehold.co/100x100/E2E8F0/4A5568?text=DT" alt="User" />
                            <div className="ml-4">
                                <p className="font-semibold text-gray-900">David T.</p>
                                <p className="text-sm text-gray-500">Caregiver, Florida</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-2xl shadow-sm md:col-span-2 lg:col-span-1">
                        <p className="text-gray-600">"As a healthcare advocate, I recommend AppealMed to all my clients. It saves them time, money, and an incredible amount of stress. The accuracy is impressive."</p>
                        <div className="mt-4 flex items-center">
                            <img className="w-12 h-12 rounded-full" src="https://placehold.co/100x100/E2E8F0/4A5568?text=MK" alt="User" />
                            <div className="ml-4">
                                <p className="font-semibold text-gray-900">Maria K.</p>
                                <p className="text-sm text-gray-500">Healthcare Advocate, Texas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900">Frequently Asked Questions</h2>
                <div className="mt-8 space-y-4">
                    <FAQItem
                        question="Is my personal health information secure?"
                        answer="Absolutely. We use bank-level, end-to-end encryption for all data you upload and store. Your privacy and security are our top priorities. We never share your data without your explicit consent."
                    />
                    <FAQItem
                        question="What is the success rate of appeals using your platform?"
                        answer="While we cannot guarantee a specific outcome, our platform significantly increases your chances by ensuring your appeal is thorough, well-documented, and professionally written. Our AI identifies the most effective arguments based on data from thousands of successful cases."
                    />
                    <FAQItem
                        question="What if I need to include additional information?"
                        answer="Our platform makes it easy. The AI-generated draft is fully editable. You can add, remove, or modify any part of the appeal letter before you finalize and submit it."
                    />
                </div>
            </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="col-span-2 md:col-span-1">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold">
                        <HeartPulse className="w-7 h-7 text-indigo-500" />
                        <span>AppealMed</span>
                    </Link>
                    <p className="mt-4 text-sm text-gray-400">Simplifying medical appeals with AI.</p>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Solutions</h3>
                    <ul className="mt-4 space-y-2">
                        <li><a href="#" className="text-base text-gray-400 hover:text-white">For Patients</a></li>
                        <li><a href="#" className="text-base text-gray-400 hover:text-white">For Advocates</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Company</h3>
                    <ul className="mt-4 space-y-2">
                        <li><a href="#" className="text-base text-gray-400 hover:text-white">About Us</a></li>
                        <li><a href="#" className="text-base text-gray-400 hover:text-white">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-sm font-semibold text-gray-300 tracking-wider uppercase">Legal</h3>
                    <ul className="mt-4 space-y-2">
                        <li><a href="#" className="text-base text-gray-400 hover:text-white">Privacy Policy</a></li>
                        <li><a href="#" className="text-base text-gray-400 hover:text-white">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
                <p>&copy; {new Date().getFullYear()} AppealMed, Inc. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-800"
            >
                <span>{question}</span>
                <ChevronDown className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? '-rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="mt-4 text-gray-600">
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};
