import React, { useState, useEffect } from 'react';

import { Eye, Brain, Shield, Zap, ChevronRight, Menu, X, Check } from 'lucide-react';

const NivaraWebsite = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [tongueImage, setTongueImage] = useState(null);
  const [eyeImage, setEyeImage] = useState(null);
  const [analysisStatus, setAnalysisStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState("");
  const [patientName, setPatientName] = useState("");
  const [dob, setDob] = useState("");




  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = () => {
    if (email && email.includes('@')) {
      alert(`Thank you for your interest! We'll contact ${email} soon.`);
      setEmail('');
    }
  };
  const analyzeWithVitalGaze = async () => {
  if (!tongueImage || !eyeImage) {
    setError("Please upload both images.");
    return;
  }

  setLoading(true);
  setError("");
  setAnalysisResult(null);
  setAnalysisStatus("");

  try {
    const form = new FormData();
    if (!patientName || !dob) {
  setError("Please enter your name and date of birth.");
  setLoading(false);
  return;
}

form.append("name", patientName);
form.append("dob", dob);

    form.append("tongue", tongueImage);
    form.append("eye", eyeImage);

    const res = await fetch(
  "https://vitalgaze-server-1.onrender.com/analyze",
  {
    method: "POST",
    body: form
  }
);


    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Analysis failed");
    }

    setAnalysisResult(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-gray-950 text-white min-h-screen font-sans overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-gray-950/95 backdrop-blur-lg border-b border-gray-800' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
  <img src="logo.png" alt="Nivara Logo" className="w-full h-full object-cover" />
</div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
              NIVARA AI
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-300 hover:text-orange-400 transition-colors">How It Works</a>
            <a href="#features" className="text-gray-300 hover:text-orange-400 transition-colors">Features</a>
            <a href="#why-nivara" className="text-gray-300 hover:text-orange-400 transition-colors">Why Us</a>
            <a href="#vision" className="text-gray-300 hover:text-orange-400 transition-colors">Vision</a>
            <button className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full text-gray-950 font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all">
              Get Started
            </button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-900 border-t border-gray-800">
            <div className="px-6 py-4 space-y-4">
              <a href="#how-it-works" className="block text-gray-300 hover:text-orange-400">How It Works</a>
              <a href="#features" className="block text-gray-300 hover:text-orange-400">Features</a>
              <a href="#why-nivara" className="block text-gray-300 hover:text-orange-400">Why Us</a>
              <a href="#vision" className="block text-gray-300 hover:text-orange-400">Vision</a>
              <button className="w-full px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full text-gray-950 font-semibold">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-900"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-orange-400/30">
            <span className="text-orange-400 text-sm font-medium">Next-Gen Preventive Healthcare</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            HEALING THROUGH 
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-orange-400 bg-clip-text text-transparent">
               INTELLIGENT INSIGHT
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Driven by cutting-edge AI, Nivara decodes visual biomarkers from the eyes, tongue, and skin to detect early disease risks — transforming preventive care through intelligent, non-invasive analysis.
          </p>
          <p>Nivara combines AI with healthcare insight to interpret the silent signals in the eyes, tongue, and skin, helping uncover early health risks so care can begin sooner, not later.</>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#vitalgaze" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full text-gray-950 font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all transform hover:scale-105">Try VitalGaze Now <ChevronRight className="ml-2" />
            </a>

            <button className="px-8 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full text-white font-bold text-lg hover:border-orange-400 transition-all">
              How It Works
            </button>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">95%+</div>
              <div className="text-gray-400 text-sm mt-2">Detection Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">&lt;2s</div>
              <div className="text-gray-400 text-sm mt-2">Analysis Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">100%</div>
              <div className="text-gray-400 text-sm mt-2">Privacy Secure</div>
            </div>
          </div>
        </div>
      </section>

      {/* What Nivara Does */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">Nivara</span> Does
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Advanced AI analysis of visual health markers for early disease detection and preventive care guidance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Eye,
                title: "Visual Health Analysis",
                desc: "AI scans eyes, tongue, and skin to identify subtle health indicators invisible to the naked eye"
              },
              {
                icon: Brain,
                title: "Early Risk Detection",
                desc: "Machine learning models detect potential health risks before symptoms become critical"
              },
              {
                icon: Shield,
                title: "Preventive Focus",
                desc: "Empower individuals with accessible, non-invasive early awareness for timely intervention"
              }
            ].map((item, i) => (
              <div key={i} className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-orange-400/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-7 h-7 text-gray-950" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-gradient-to-b from-gray-950 to-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How the <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">AI Works</span>
            </h2>
            <p className="text-gray-400 text-lg">Simple, fast, and intelligent health analysis in four steps</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Upload Image", desc: "Securely upload photos of eyes, tongue, or skin" },
              { step: "02", title: "AI Analysis", desc: "Advanced neural networks process visual markers" },
              { step: "03", title: "Risk Insights", desc: "Receive detailed health risk assessment" },
              { step: "04", title: "Guidance", desc: "Get personalized care recommendations" }
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-orange-400/50 transition-all">
                  <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent mb-4 opacity-30">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ChevronRight className="text-orange-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Core <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">Features</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "AI Image Analysis",
                desc: "Deep learning models trained on millions of medical images for precision detection",
                features: ["Multi-modal analysis", "Real-time processing", "Continuous learning"]
              },
              {
                title: "Smart Health Reports",
                desc: "Comprehensive, easy-to-understand reports with actionable health insights",
                features: ["Visual dashboards", "Trend tracking", "Export & share"]
              },
              {
                title: "Risk Indicators",
                desc: "Early warning signals for cardiovascular, metabolic, and dermatological conditions",
                features: ["Severity scoring", "Confidence metrics", "Historical comparison"]
              },
              {
                title: "Privacy & Security",
                desc: "Enterprise-grade encryption and HIPAA-compliant data handling protocols",
                features: ["End-to-end encryption", "Zero data retention option", "Audit logs"]
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 hover:border-orange-400/50 transition-all group">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-orange-400 transition-colors">{item.title}</h3>
                <p className="text-gray-400 mb-6">{item.desc}</p>
                <div className="space-y-2">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-500">
                      <Check className="w-4 h-4 text-orange-400 mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Nivara */}
      <section id="why-nivara" className="py-24 px-6 bg-gradient-to-b from-gray-950 to-gray-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">Nivara</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Early Detection Saves Lives",
                desc: "Where AI Meets Preventive Healthcare"
              },
              {
                icon: Eye,
                title: "Non-Invasive & Accessible",
                desc: "Because Early Detection Changes Everything"
              },
              {
                icon: Brain,
                title: "Built for Scale & Impact",
                desc: "Redefining Preventive Healthcare"
              }
            ].map((item, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-orange-400/50 transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-gray-950" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-10 rounded-2xl bg-gradient-to-br from-orange-950/30 to-gray-900 border border-orange-500/30">
              <div className="text-sm font-bold text-orange-400 mb-3 tracking-wider">MISSION</div>
              <h3 className="text-3xl font-bold mb-4">Making Early Healthcare Awareness Accessible</h3>
              <p className="text-gray-400">
                We leverage artificial intelligence to democratize preventive healthcare, empowering individuals worldwide with early disease detection capabilities through simple, non-invasive visual analysis.
              </p>
            </div>

            <div className="p-10 rounded-2xl bg-gradient-to-br from-gray-950/30 to-gray-900 border border-gray-800/30">
              <div className="text-sm font-bold text-orange-400 mb-3 tracking-wider">VISION</div>
              <h3 className="text-3xl font-bold mb-4">Detection Before Damage</h3>
              <p className="text-gray-400">
                A future where disease is identified at its earliest stages—before irreversible damage occurs—transforming healthcare from reactive treatment to proactive prevention.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-orange-400/10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Join the Future of
            <br />
            <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
              Preventive Healthcare
            </span>
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Be among the first to experience AI-powered early disease detection. Sign up for our pilot program.
          </p>

          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-orange-400 transition-all"
            />
            <button
              onClick={handleSubmit}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full text-gray-950 font-bold hover:shadow-xl hover:shadow-orange-500/50 transition-all whitespace-nowrap"
            >
              Get Early Access
            </button>
          </div>
        </div>
      </section>
<section id="vitalgaze"
  className="py-32 px-6 bg-gradient-to-b from-gray-950 to-gray-900"
>
  <div className="max-w-4xl mx-auto text-center">
    <div className="inline-block mb-6 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-orange-400/30">
      <span className="text-orange-400 text-sm font-medium">
        Live Product
      </span>
    </div>

    <h2 className="text-4xl md:text-5xl font-bold mb-6">
      Try{" "}
      <span className="bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
        VitalGaze
      </span>
    </h2>

    <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
      Upload images of your tongue and eyes to receive AI-powered
      visual health screening insights. This is a non-invasive,
      early-awareness tool — not a diagnosis.
    </p>

    {/* Patient Info - MOVED TO TOP */}
    <div className="grid md:grid-cols-2 gap-8 mb-10">
      <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
        <h3 className="text-lg font-bold mb-4">Full Name</h3>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Enter your full name"
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-400"
        />
      </div>

      <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
        <h3 className="text-lg font-bold mb-4">Date of Birth</h3>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-orange-400"
        />
      </div>
    </div>

    {/* Upload Cards */}
    <div className="grid md:grid-cols-2 gap-8 mb-10">
      {/* Tongue Upload */}
      <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
        <h3 className="text-lg font-bold mb-4">Tongue Image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setTongueImage(e.target.files[0])}
          className="w-full text-gray-300"
        />
        {tongueImage && (
          <p className="text-sm text-green-400 mt-2">
            ✓ {tongueImage.name}
          </p>
        )}
      </div>

      {/* Eye Upload */}
      <div className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800">
        <h3 className="text-lg font-bold mb-4">Eye Image</h3>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setEyeImage(e.target.files[0])}
          className="w-full text-gray-300"
        />
        {eyeImage && (
          <p className="text-sm text-green-400 mt-2">
            ✓ {eyeImage.name}
          </p>
        )}
      </div>
    </div>

    {/* Analyze Button */}
    <button
      onClick={analyzeWithVitalGaze}
      disabled={loading}
      className={`px-10 py-4 rounded-full font-bold text-lg transition-all
        ${loading
          ? "bg-gray-700 text-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-orange-500 to-orange-400 text-gray-950 hover:shadow-xl hover:shadow-orange-500/40"}
      `}
    >
      {loading ? "Analyzing…" : "Analyze with AI"}
    </button>

    {/* Error */}
    {error && (
      <p className="mt-6 text-sm text-red-400">
        {error}
      </p>
    )}

    {/* Status */}
    {analysisStatus && (
      <p className="mt-6 text-sm text-gray-400">
        {analysisStatus}
      </p>
    )}

    {/* Results - UPDATED FOR NEW BACKEND RESPONSE */}
    {analysisResult && (
      <div className="mt-12 text-left bg-gray-900/60 border border-gray-800 rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-6">
          VitalGaze Results
        </h3>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Tongue Features - NEW FORMAT */}
          <div>
            <h4 className="font-semibold text-orange-400 mb-3">
              Tongue Features
            </h4>

            {analysisResult.tongue_features && Object.entries(analysisResult.tongue_features).map(
              ([key, val]) => (
                <p key={key} className="text-gray-300 text-sm mb-1">
                  <span className="capitalize">{key}</span>:{" "}
                  <span className="font-medium">{val.value || "unknown"}</span>{" "}
                  {val.confidence > 0 && (
                    <span className="text-gray-500">
                      ({(val.confidence * 100).toFixed(1)}%)
                    </span>
                  )}
                </p>
              )
            )}
          </div>

          {/* Eye Observation - NEW FORMAT */}
          <div>
            <h4 className="font-semibold text-orange-400 mb-3">
              Eye Observation
            </h4>
            <p className="text-gray-300">
              {analysisResult.eye || "No observation available"}
            </p>
          </div>
        </div>

        {/* AI Health Summary - UNCHANGED */}
        <div>
          <h4 className="font-semibold text-orange-400 mb-2">
            AI Health Summary
          </h4>
          <p className="text-gray-300 whitespace-pre-line">
            {analysisResult.report}
          </p>
        </div>
      </div>
    )}
  </div>
</section>



      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
  <img src="logo.png" alt="Nivara Logo" className="w-full h-full object-cover" />
</div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent">
                NIVARA AI
              </span>
            </div>

            <div className="text-gray-500 text-sm">
              © 2026 Nivara AI. Preventive healthcare powered by intelligence.
            </div>

            <div className="flex gap-6">
              <a href="https://www.instagram.com/nivarahealth/" className="text-gray-500 hover:text-orange-400 transition-colors">Instagram</a>
              <a href="mailto:sashreeksatapathydpsnt15@gmail.com" className="text-gray-500 hover:text-orange-400 transition-colors">Gmail</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default NivaraWebsite;