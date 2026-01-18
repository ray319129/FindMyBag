
import React, { useState, useEffect } from 'react';
import { Mail, Phone, ShoppingBag, Settings, ArrowLeft, Heart, Camera, CheckCircle2 } from 'lucide-react';
import HandDrawnButton from './components/HandDrawnButton.tsx';
import HandDrawnCard from './components/HandDrawnCard.tsx';
import HandDrawnInput from './components/HandDrawnInput.tsx';
import { OwnerInfo, AppView } from './types.ts';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('public');
  const [owner, setOwner] = useState<OwnerInfo>(() => {
    const defaultInfo: OwnerInfo = {
      name: 'Jhang, Yong-Ruei',
      email: 'ray319129@gmail.com',
      phone: '+886 987 654 321',
      luggageDesc: 'Black Rimowa Suitcase with a yellow ribbon',
      rewardNote: 'A huge pizza and my eternal gratitude! 🍕',
      luggageId: 'LUG-2024-RY'
    };

    const saved = localStorage.getItem('luggage_owner_info');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          return { ...defaultInfo, ...parsed };
        }
      } catch (e) {
        console.error("Failed to parse saved owner info", e);
      }
    }
    return defaultInfo;
  });

  const [contactForm, setContactForm] = useState({
    finderName: '',
    location: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem('luggage_owner_info', JSON.stringify(owner));
  }, [owner]);

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Notifying owner:', owner.email, contactForm);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleUpdateOwner = (e: React.FormEvent) => {
    e.preventDefault();
    setView('public');
  };

  if (view === 'settings') {
    return (
      <div className="min-h-screen py-10 px-4 max-w-2xl mx-auto">
        <HandDrawnButton 
          variant="secondary" 
          onClick={() => setView('public')}
          className="mb-8 flex items-center gap-2"
        >
          <ArrowLeft size={20} /> Back
        </HandDrawnButton>
        
        <HandDrawnCard decoration="tape" className="space-y-6">
          <h2 className="text-4xl text-center mb-6">Owner Settings</h2>
          <form onSubmit={handleUpdateOwner} className="space-y-4">
            <HandDrawnInput 
              label="My Name" 
              value={owner.name || ''}
              onChange={e => setOwner({...owner, name: e.target.value})}
            />
            <HandDrawnInput 
              label="Email Address" 
              type="email"
              value={owner.email || ''}
              onChange={e => setOwner({...owner, email: e.target.value})}
            />
            <HandDrawnInput 
              label="Phone Number" 
              value={owner.phone || ''}
              onChange={e => setOwner({...owner, phone: e.target.value})}
            />
            <HandDrawnInput 
              label="Luggage Description" 
              value={owner.luggageDesc || ''}
              onChange={e => setOwner({...owner, luggageDesc: e.target.value})}
            />
            <HandDrawnInput 
              label="Reward Message" 
              isTextArea
              value={owner.rewardNote || ''}
              onChange={e => setOwner({...owner, rewardNote: e.target.value})}
            />
            <HandDrawnButton type="submit" variant="accent" className="w-full mt-4">
              Save My Info
            </HandDrawnButton>
          </form>
        </HandDrawnCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 max-w-5xl mx-auto relative">
      <div className="hidden md:block absolute top-10 right-10 rotate-12 bg-white p-2 border-2 border-[#2d2d2d] wobbly-border" style={{ borderRadius: '100%' }}>
        <ShoppingBag className="text-[#ff4d4d]" size={40} />
      </div>

      <header className="text-center mb-16 relative">
        <h1 className="text-5xl md:text-7xl mb-4 rotate-[-1deg]">
          Oh no! Did you find my bag? 🧳
        </h1>
        <p className="text-2xl md:text-3xl opacity-80 max-w-2xl mx-auto">
          Thank you so much for stopping! My name is <span className="text-[#2d5da1] underline decoration-wavy underline-offset-4">{owner.name}</span>, and I'd love to get my stuff back.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <HandDrawnCard decoration="tack" tilt={-1} className="bg-white">
            <h3 className="text-3xl mb-4 flex items-center gap-2">
              <CheckCircle2 className="text-[#2d5da1]" /> This is me!
            </h3>
            <div className="space-y-3 text-xl">
              <div className="flex items-center gap-3">
                <ShoppingBag className="shrink-0" size={24} />
                <span><strong>Bag Info:</strong> {owner.luggageDesc}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="shrink-0" size={24} />
                <span><strong>Email:</strong> {owner.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="shrink-0" size={24} />
                <span><strong>Call/Text:</strong> {owner.phone}</span>
              </div>
            </div>
          </HandDrawnCard>

          <HandDrawnCard variant="post-it" tilt={2} className="relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Heart size={80} fill="currentColor" />
            </div>
            <h3 className="text-3xl mb-2">The Reward! 🎁</h3>
            <p className="text-2xl leading-relaxed italic">
              "{owner.rewardNote}"
            </p>
          </HandDrawnCard>
          
          <div className="text-center pt-8">
            <HandDrawnButton 
              variant="secondary" 
              onClick={() => setView('settings')}
              className="text-base"
            >
              <Settings size={18} className="inline mr-2" /> 
              Are you the owner? (Edit Info)
            </HandDrawnButton>
          </div>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute -left-20 top-20 -rotate-45">
            <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 50C30 50 70 30 85 10M85 10L70 15M85 10L80 25" stroke="#2d2d2d" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </div>

          <HandDrawnCard decoration="tape" className="bg-white">
            {submitted ? (
              <div className="py-10 text-center space-y-4 animate-bounce">
                <h2 className="text-5xl text-[#2d5da1]">Sent! 📩</h2>
                <p className="text-2xl">You're a lifesaver! I'll check my messages right now.</p>
                <div className="flex justify-center mt-6">
                  <div className="w-24 h-24 bg-[#fff9c4] border-2 border-black wobbly-border flex items-center justify-center -rotate-6">
                    <span className="text-4xl">🙏</span>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-4xl text-center mb-6">Found it? Tell me!</h3>
                <form onSubmit={handleSubmitContact} className="space-y-4">
                  <HandDrawnInput 
                    label="Your Name (Optional)" 
                    placeholder="E.g. Friendly Neighbor"
                    value={contactForm.finderName}
                    onChange={e => setContactForm({...contactForm, finderName: e.target.value})}
                  />
                  <HandDrawnInput 
                    label="Where is it?" 
                    placeholder="E.g. Terminal 2, near gate C"
                    value={contactForm.location}
                    onChange={e => setContactForm({...contactForm, location: e.target.value})}
                  />
                  <HandDrawnInput 
                    label="Message / Phone #" 
                    isTextArea
                    placeholder="Leave a quick note on how I can get it back..."
                    rows={4}
                    value={contactForm.message}
                    onChange={e => setContactForm({...contactForm, message: e.target.value})}
                  />
                  <div className="pt-2">
                    <HandDrawnButton type="submit" variant="accent" className="w-full flex items-center justify-center gap-2">
                      <Mail /> Send Message Now
                    </HandDrawnButton>
                  </div>
                  <p className="text-center text-sm opacity-60 italic mt-4">
                    * This sends an instant notification to {owner.name}
                  </p>
                </form>
              </>
            )}
          </HandDrawnCard>

          <div className="mt-8 flex items-center justify-center gap-4 text-xl opacity-70">
            <Camera size={32} />
            <p>Scanning the ID: <span className="font-bold">{owner.luggageId}</span></p>
          </div>
        </div>
      </div>

      <footer className="mt-20 text-center pb-10">
        <div className="h-px bg-[#2d2d2d]/20 w-full mb-8 border-dashed border-t-2" />
        <p className="text-lg">
          Hand-drawn with love for lost & found heroes. 🎒✨
        </p>
      </footer>
    </div>
  );
};

export default App;
