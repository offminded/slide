import React, { useState, useMemo } from 'react';
import {
  Heart,
  Briefcase,
  Wallet,
  Activity,
  Home,
  Globe,
  Brain,
  Info,
  ChevronRight,
  Target
} from 'lucide-react';

const App = () => {
  // 7 Yaşam Alanı ve detaylı soruları
  const lifeAreas = [
    {
      id: 'social',
      title: 'Aile ve Sosyal İlişkiler',
      icon: <Heart className="w-5 h-5" />,
      color: 'bg-rose-500',
      border: 'border-rose-100',
      text: 'text-rose-600',
      questions: [
        'Aile ilişkilerinizden ne kadar memnunsunuz?',
        'Ebeveynlerinize ve çocuklarınıza ne kadar yakınsınız?',
        'Sosyal ağınızın ve arkadaşlıklarınızın kalitesi nasıl?',
        'Romantik ilişkinizden ne kadar memnunsunuz?'
      ]
    },
    {
      id: 'career',
      title: 'Kariyer ve Eğitim',
      icon: <Briefcase className="w-5 h-5" />,
      color: 'bg-blue-500',
      border: 'border-blue-100',
      text: 'text-blue-600',
      questions: [
        'Kariyer başarılarınız sizi tatmin ediyor mu?',
        'Çalışma ortamınız sizi geliştiriyor mu?',
        'Her gün işe gitmeyi ne kadar dört gözle bekliyorsunuz?',
        'İlerleme ve ödüllendirme fırsatlarınız var mı?'
      ]
    },
    {
      id: 'finance',
      title: 'Para ve Kişisel Finans',
      icon: <Wallet className="w-5 h-5" />,
      color: 'bg-emerald-500',
      border: 'border-emerald-100',
      text: 'text-emerald-600',
      questions: [
        'Mevcut geliriniz ihtiyaç ve isteklerinizi karşılıyor mu?',
        'Giderleriniz ve banka hesaplarınız üzerinde kontrolünüz var mı?',
        'Başkalarına karşı ne kadar cömert olabiliyorsunuz?',
        'Finansal durumunuz sizi ne kadar endişelendiriyor? (Ters ölçek)'
      ]
    },
    {
      id: 'health',
      title: 'Sağlık, Eğlence ve Boş Zaman',
      icon: <Activity className="w-5 h-5" />,
      color: 'bg-orange-500',
      border: 'border-orange-100',
      text: 'text-orange-600',
      questions: [
        'Fiziksel sağlığınızdan ve formunuzdan memnun musunuz?',
        'Stres ve kaygı ile ne kadar iyi başa çıkabiliyorsunuz?',
        'Hobileriniz ve boş zamanınız için yeterli vaktiniz var mı?',
        'İş dışındaki hayattan ne kadar keyif alıyorsunuz?'
      ]
    },
    {
      id: 'routine',
      title: 'Hayatın Rutin Sorumlulukları',
      icon: <Home className="w-5 h-5" />,
      color: 'bg-indigo-500',
      border: 'border-indigo-100',
      text: 'text-indigo-600',
      questions: [
        'Ev düzenini ve rutin işleri ne kadar iyi yönetiyorsunuz?',
        'Faturalar ve sorumluluklar konusunda disiplinli misiniz?',
        'Ev ortamınız sizi ne kadar rahatlatıyor?',
        'Sorumluluklarınızı etkili şekilde önceliklendiriyor musunuz?'
      ]
    },
    {
      id: 'community',
      title: 'Toplum ve Geri Verme',
      icon: <Globe className="w-5 h-5" />,
      color: 'bg-cyan-500',
      border: 'border-cyan-100',
      text: 'text-cyan-600',
      questions: [
        'Topluma ne kadar katkıda bulunuyorsunuz?',
        'Diğer insanların hayatında olumlu bir iz bırakıyor musunuz?',
        'Arkanızda bırakacağınız mirastan (etkiden) ne kadar memnunsunuz?',
        'İnandığınız sosyal girişimlere ne kadar destek oluyorsunuz?'
      ]
    },
    {
      id: 'mental',
      title: 'Zihinsel ve Manevi Sağlık',
      icon: <Brain className="w-5 h-5" />,
      color: 'bg-purple-500',
      border: 'border-purple-100',
      text: 'text-purple-600',
      questions: [
        'Kendinizi zihinsel ve duygusal olarak ne kadar güçlü hissediyorsunuz?',
        'Kim olduğunuz konusunda kendinize güveniyor musunuz?',
        'Manevi gelişiminize ne kadar zaman ayırıyorsunuz?',
        'Özdenetiminiz ve duygularınızı yönetme beceriniz nasıl?'
      ]
    }
  ];

  const [scores, setScores] = useState({
    social: 5,
    career: 5,
    finance: 5,
    health: 5,
    routine: 5,
    community: 5,
    mental: 5
  });

  const handleScoreChange = (id, val) => {
    setScores(prev => ({ ...prev, [id]: parseInt(val) }));
  };

  const totalAverage = useMemo(() => {
    const vals = Object.values(scores);
    return (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1);
  }, [scores]);

  // Radar chart koordinatları (7 köşeli)
  const radarPoints = useMemo(() => {
    const centerX = 150;
    const centerY = 150;
    const radius = 100;
    const keys = lifeAreas.map(a => a.id);

    return keys.map((key, i) => {
      const angle = (Math.PI * 2 * i) / keys.length - Math.PI / 2;
      const score = scores[key];
      const x = centerX + (radius * (score / 10)) * Math.cos(angle);
      const y = centerY + (radius * (score / 10)) * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  }, [scores]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto p-4 md:p-8">

        {/* Başlık Bölümü */}
        <header className="mb-10 text-center">
          <div className="inline-block px-4 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-full mb-4 tracking-widest uppercase">
            Bütünsel Yaşam Dengesi
          </div>
          <h1 className="text-4xl font-black text-slate-800 mb-2">Yaşam Çarkı Analizi</h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Her alanı aşağıdaki soruları göz önünde bulundurarak 1-10 arası puanlayın. Hedefimiz mükemmel bir 10 değil, dengeli bir yaşam geometrisi oluşturmaktır.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Sol: Giriş Alanları */}
          <div className="lg:col-span-7 space-y-6">
            {lifeAreas.map((area) => (
              <div key={area.id} className={`bg-white rounded-2xl p-6 shadow-sm border ${area.border} transition-all duration-300 hover:shadow-md`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`${area.color} p-2.5 rounded-xl text-white shadow-sm`}>
                    {area.icon}
                  </div>
                  <div>
                    <h2 className="font-bold text-lg text-slate-800">{area.title}</h2>
                    <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">Alan Puanı: {scores[area.id]}/10</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 mb-5 border border-slate-100">
                  <div className="flex items-start gap-2 text-xs text-slate-600 mb-2">
                    <Info className="w-3.5 h-3.5 mt-0.5 text-slate-400" />
                    <span className="font-semibold uppercase text-[10px] tracking-tight text-slate-500">Bu Puanı Verirken Düşünün:</span>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5">
                    {area.questions.map((q, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13px] leading-tight text-slate-600">
                        <div className="w-1 h-1 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-2">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={scores[area.id]}
                    onChange={(e) => handleScoreChange(area.id, e.target.value)}
                    className={`w-full h-2 rounded-lg appearance-none cursor-pointer accent-slate-800 bg-slate-200`}
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">
                    <span>Hiç</span>
                    <span>Orta</span>
                    <span>Son Derece</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sağ: Görselleştirme ve Özet */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 sticky top-8">
              <div className="text-center mb-6">
                <h3 className="font-black text-xl text-slate-800 uppercase tracking-tight">Yaşam Geometriniz</h3>
                <p className="text-xs text-slate-400">7 Farklı Boyutun Dengesi</p>
              </div>

              {/* Radar Chart SVG */}
              <div className="relative flex justify-center items-center h-80 mb-6">
                <svg viewBox="0 0 300 300" className="w-full h-full drop-shadow-lg">
                  {/* Grid Rings */}
                  {[20, 40, 60, 80, 100].map(r => (
                    <circle key={r} cx="150" cy="150" r={r} fill="none" stroke="#f1f5f9" strokeWidth="1" />
                  ))}

                  {/* Axis Lines */}
                  {lifeAreas.map((_, i) => {
                    const angle = (Math.PI * 2 * i) / 7 - Math.PI / 2;
                    return (
                      <line
                        key={i}
                        x1="150" y1="150"
                        x2={150 + 100 * Math.cos(angle)}
                        y2={150 + 100 * Math.sin(angle)}
                        stroke="#f1f5f9" strokeWidth="1"
                      />
                    );
                  })}

                  {/* Polygon Data Area */}
                  <polygon
                    points={radarPoints}
                    fill="rgba(30, 41, 59, 0.1)"
                    stroke="#1e293b"
                    strokeWidth="3"
                    strokeLinejoin="round"
                    className="transition-all duration-500 ease-in-out"
                  />

                  {/* Labels around the chart */}
                  {lifeAreas.map((area, i) => {
                    const angle = (Math.PI * 2 * i) / 7 - Math.PI / 2;
                    const x = 150 + 125 * Math.cos(angle);
                    const y = 150 + 125 * Math.sin(angle);
                    return (
                      <g key={area.id}>
                        <text
                          x={x} y={y}
                          textAnchor="middle"
                          className="text-[10px] font-bold fill-slate-400"
                          style={{ fontSize: '9px', fontWeight: 'bold' }}
                        >
                          {area.title.split(' ')[0].toUpperCase()}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Score Dashboard */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-800 text-white p-4 rounded-2xl text-center shadow-lg shadow-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Genel Denge</p>
                  <div className="text-4xl font-black">{totalAverage}</div>
                </div>
                <div className="bg-white border border-slate-100 p-4 rounded-2xl text-center flex flex-col justify-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">En Güçlü Alan</p>
                  <div className="text-sm font-bold truncate">
                    {Object.entries(scores).sort((a,b) => b[1]-a[1])[0][0].toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Insights */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Target className="w-4 h-4 text-slate-800" />
                  <h4 className="font-bold text-sm text-slate-800 uppercase tracking-tighter">Stratejik Analiz</h4>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed italic">
                  {totalAverage > 7.5 ?
                    "Hayatınızın genelinde yüksek bir uyum ve tatmin görünüyor. Mevcut momentumu korumaya ve diğerlerini ilham vermeye odaklanın." :
                    totalAverage > 5 ?
                    "Bazı alanlar oldukça iyi giderken, diğerleri dengenizi bozuyor olabilir. Zayıf halkayı güçlendirmek, çarkın daha rahat dönmesini sağlar." :
                    "Şu an hayatınızda ciddi bir enerji kaçağı hissediyor olabilirsiniz. Küçük ama istikrarlı adımlarla rutinlerinizi düzenleyerek başlayın."
                  }
                </p>

                <div className="mt-6">
                  <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                    Eylem Planı Oluştur <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;
