import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-mesh bg-[length:200%_200%] animate-gradient overflow-hidden relative">
      {/* Decorative bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-y2k-pink/40 blur-xl animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-y2k-lavender/50 blur-xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-32 left-1/4 w-20 h-20 rounded-full bg-y2k-mint/50 blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 rounded-full bg-sky-200/50 blur-xl animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Y2K Logo */}
        <div className="text-center mb-8 animate-float">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight drop-shadow-lg">
            <span className="holographic-text">Y2K</span>
          </h1>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-y2k-pink mt-2 drop-shadow-md" style={{ textShadow: '2px 2px 0 #e6e6fa, 4px 4px 0 rgba(0,0,0,0.1)' }}>
            Closet
          </h2>
          <p className="mt-4 text-y2k-lavender font-medium text-lg sm:text-xl max-w-md mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>
            Your virtual wardrobe from the 2000s ✨
          </p>
        </div>

        {/* CTA Button */}
        <Link
          to="/closet"
          className="btn-y2k text-y2k-pink hover:text-pink-600 mt-6 inline-block"
        >
          Open My Closet →
        </Link>

        {/* Sparkle decorations */}
        <div className="mt-16 flex gap-6 text-4xl opacity-80">
          <span>🪩</span>
          <span>✨</span>
          <span>👗</span>
          <span>💖</span>
          <span>🦋</span>
        </div>
      </div>
    </div>
  )
}
