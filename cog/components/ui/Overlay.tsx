import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Code, ChevronDown, CheckCircle, Database, PenTool, Sparkles, ArrowRight, Target, Globe, Trash2 } from 'lucide-react';
import { generateProjectIdea } from '../../services/gemini';

interface SectionProps {
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center';
  className?: string;
  id?: string;
}

const SectionWrapper: React.FC<SectionProps> = ({ children, align = 'center', className = '', id }) => {
  const alignClass = 
    align === 'left' ? 'items-start text-left' : 
    align === 'right' ? 'items-end text-right' : 
    'items-center text-center';

  return (
    <div id={id} className={`h-screen w-full flex flex-col justify-center px-6 md:px-24 pointer-events-none ${alignClass} ${className}`}>
      <div className="pointer-events-auto w-full max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  );
};

// Title Card Animation Component
const TypingTitle = () => {
  const text = "CognoTree";
  const characters = text.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.5,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20, rotateX: 90 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { type: "spring", damping: 12, stiffness: 100 } 
    },
  };

  return (
    <motion.div 
      className="flex overflow-hidden mb-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {characters.map((char, index) => (
        <motion.span 
          key={index} 
          variants={childVariants}
          className={`text-6xl md:text-9xl font-bold font-display tracking-tighter leading-tight ${index >= 5 ? 'text-cyan-600' : 'text-slate-900'}`}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
};

const ProjectGenerator = () => {
    const [topic, setTopic] = useState('');
    const [idea, setIdea] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!topic.trim()) return;
        setLoading(true);
        const result = await generateProjectIdea(topic);
        setIdea(result);
        setLoading(false);
    };

    const handleClear = () => {
        setTopic('');
        setIdea(null);
    };

    return (
        <div className="glass-panel p-8 rounded-3xl w-full max-w-xl mx-auto text-left relative overflow-hidden bg-white/60 border border-white/50 shadow-xl backdrop-blur-xl">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles size={64} className="text-cyan-600" />
             </div>
             <h3 className="text-2xl font-bold font-display mb-4 flex items-center gap-2 text-slate-900">
                 <BotIcon /> AI Project Idea Generator
             </h3>
             <p className="text-slate-600 mb-6 text-sm">
                 Stuck on what to build? Enter a topic you're passionate about and get a tailored, industry-ready concept.
             </p>
             
             <div className="flex gap-2 mb-6">
                 <input 
                    type="text" 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter interest (e.g. FinTech, AI, Healthcare)"
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:border-cyan-500 transition-colors placeholder:text-slate-400 shadow-sm"
                 />
                 <button 
                    onClick={handleGenerate}
                    disabled={loading}
                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-6 py-3 rounded-xl transition-all disabled:opacity-50 shadow-md shadow-cyan-200"
                 >
                    {loading ? "Generating..." : "Generate"}
                 </button>
                 <button 
                    onClick={handleClear}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-3 rounded-xl transition-all flex items-center justify-center"
                    title="Clear"
                 >
                    <Trash2 size={20} />
                 </button>
             </div>

             {idea && (
                 <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-white/80 p-6 rounded-xl border border-slate-200 text-sm whitespace-pre-line text-slate-700 shadow-inner"
                 >
                    {idea}
                 </motion.div>
             )}
        </div>
    )
}

const BotIcon = () => (
    <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center border border-cyan-200">
        <Sparkles size={16} className="text-cyan-600" />
    </div>
);

const Overlay: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full text-slate-900">
      
      {/* SECTION 1: HERO */}
      <SectionWrapper align="left" id="home">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center h-full w-full">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-start z-10"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full bg-slate-100 border border-slate-200"
              >
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                  <span className="text-slate-600 font-bold tracking-wide text-xs uppercase">Interactive Learning Platform</span>
              </motion.div>
              
              {/* Single Line Animated Title */}
              <TypingTitle />
              
              <p className="text-xl text-slate-600 mb-10 font-light max-w-lg leading-relaxed">
                <span className="font-medium text-slate-900">Build. Visualize. Deploy.</span><br/>
                The first platform bridging the gap between academic theory and real-world SaaS engineering.
              </p>

              <div className="flex gap-4">
                <button 
                    onClick={() => scrollToSection('projects')}
                    className="bg-slate-900 text-white font-bold py-4 px-8 rounded-2xl transition-all flex items-center gap-2 transform hover:translate-y-[-2px] hover:shadow-2xl shadow-lg shadow-slate-900/20 group"
                >
                  Start Building <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                </button>
                <button 
                    onClick={() => scrollToSection('mentorship')}
                    className="bg-white text-slate-900 border border-slate-200 font-bold py-4 px-8 rounded-2xl transition-all flex items-center gap-2 hover:bg-slate-50 hover:border-slate-300"
                >
                  How it Works
                </button>
              </div>
            </motion.div>
            
            {/* Right side reserved for 3D element */}
            <div className="hidden lg:block"></div>
        </div>
        
        <motion.div 
            className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            onClick={() => scrollToSection('projects')}
        >
            <ChevronDown size={32} className="text-slate-400" />
        </motion.div>
      </SectionWrapper>

      {/* SECTION 2: FEATURES GRID */}
      <SectionWrapper align="center" id="projects">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {[
                  {
                      icon: <Database className="text-blue-500" size={32} />,
                      title: "Project Repository",
                      desc: "Access a curated library of industry-standard projects tailored for college submissions. Complete with documentation and code."
                  },
                  {
                      icon: <Code className="text-green-500" size={32} />,
                      title: "Code Walkthroughs",
                      desc: "Don't just copy-paste. Our interactive modules explain every line of code, ensuring you understand the 'Why' behind the 'How'."
                  },
                  {
                      icon: <PenTool className="text-purple-500" size={32} />,
                      title: "Architecture Design",
                      desc: "Master the art of system design. Learn to use whiteboarding tools (Miro, FigJam) to visualize complex systems before coding."
                  },
                  {
                      icon: <Rocket className="text-orange-500" size={32} />,
                      title: "SaaS Incubator",
                      desc: "From idea to deployment. Follow our guided path to build, market, and launch your very own SaaS product."
                  }
              ].map((item, i) => (
                  <div key={i} className="glass-panel p-8 rounded-3xl text-left hover:border-cyan-300 transition-all group border border-white/60 bg-white/40 backdrop-blur-md shadow-sm hover:shadow-xl hover:-translate-y-1">
                      <div className="mb-4 p-4 bg-white rounded-2xl inline-block group-hover:scale-110 transition-transform shadow-md border border-slate-100">
                          {item.icon}
                      </div>
                      <h3 className="text-2xl font-bold mb-3 font-display text-slate-800">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
              ))}
          </div>
        </motion.div>
      </SectionWrapper>

      {/* SECTION 3: MISSION & VISION */}
      <SectionWrapper align="left" id="about">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <div className="inline-flex items-center gap-2 text-cyan-600 mb-4 bg-cyan-50 px-3 py-1 rounded-full border border-cyan-100">
                    <Target size={16} />
                    <span className="uppercase tracking-widest font-bold text-xs">Our Mission</span>
                </div>
                <h2 className="text-5xl font-display font-bold mb-6 text-slate-900 tracking-tight">Empowering the Next Generation</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                    We exist to dismantle the barrier between academic requirements and professional expectations. By providing high-quality resources and mentorship, we turn students into industry-ready developers.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="glass-panel p-10 rounded-3xl border-l-4 border-l-cyan-500 bg-white/70 shadow-2xl backdrop-blur-xl"
            >
                <div className="inline-flex items-center gap-2 text-purple-600 mb-6">
                    <Globe size={24} />
                    <span className="uppercase tracking-widest font-bold text-sm">Vision Statement</span>
                </div>
                <ul className="space-y-6">
                    {[
                        "Democratize access to high-quality technical projects.",
                        "Foster a community of builders and innovators.",
                        "Standardize practical software engineering education.",
                        "Bridge the gap between campus and corporate."
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-4 group">
                            <div className="mt-1 bg-green-100 p-1 rounded-full group-hover:bg-green-200 transition-colors">
                                <CheckCircle size={16} className="text-green-600" />
                            </div>
                            <span className="text-slate-700 font-medium text-lg">{item}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </div>
      </SectionWrapper>

      {/* SECTION 4: AI GENERATOR */}
      <SectionWrapper align="center" id="generator">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full text-center"
          >
              <span className="text-cyan-600 font-bold tracking-widest text-sm uppercase mb-4 block">AI-Powered Tools</span>
              <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 text-slate-900">Project Idea Generator</h2>
              <p className="text-slate-500 mb-10 max-w-2xl mx-auto">Leverage the power of Gemini AI to brainstorm unique project concepts tailored to your interests and skill level.</p>
              
              <ProjectGenerator />
          </motion.div>
      </SectionWrapper>

      {/* SECTION 5: CTA */}
      <SectionWrapper align="center" id="mentorship">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full"
        >
          <div className="relative inline-block">
               <div className="absolute inset-0 bg-cyan-200 blur-3xl opacity-30 rounded-full"></div>
               <h2 className="relative text-6xl md:text-8xl font-display font-bold mb-8 text-slate-900 leading-none">
                Build Your <br /> <span className="text-cyan-600">Future.</span>
              </h2>
          </div>
          
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-16">
             <button 
                onClick={() => scrollToSection('projects')}
                className="bg-slate-900 text-white font-bold py-5 px-12 rounded-full text-xl hover:bg-slate-800 transition-all flex items-center gap-3 shadow-2xl hover:shadow-slate-900/40 hover:-translate-y-1"
             >
                 Get Started <ArrowRight size={24} />
             </button>
             <a 
                href="mailto:mentor@cognotree.com"
                className="bg-white border border-slate-200 text-slate-900 font-bold py-5 px-12 rounded-full text-xl hover:bg-slate-50 transition-all shadow-lg hover:shadow-xl"
             >
                 Contact Mentors
             </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto border-t border-slate-200 pt-12">
             {[
                 { title: 'Expert Guidance', desc: 'Direct access to industry veterans.' },
                 { title: 'Modern Stack', desc: 'Learn React, Node, AI, and Cloud.' },
                 { title: 'Career Focus', desc: 'Resume reviews and mock interviews.' }
             ].map((feature, i) => (
                 <div key={i} className="p-4">
                     <h3 className="text-lg font-bold mb-2 text-slate-900">{feature.title}</h3>
                     <p className="text-slate-500">{feature.desc}</p>
                 </div>
             ))}
          </div>

          <div className="mt-24 text-slate-400 text-sm font-medium">
            © 2024 CognoTree. Redefining Engineering Education.
          </div>
        </motion.div>
      </SectionWrapper>
    </div>
  );
};

export default Overlay;