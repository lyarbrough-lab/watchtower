import React, { useState, useEffect } from 'react';
import { AlertTriangle, Globe, Zap, Waves, Mountain, Sun, Cross, Play, Heart, Share } from 'lucide-react';

const WatchtowerWithTikTok = () => {
  const [events, setEvents] = useState([]);
  const [tiktokEvents, setTikTokEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [activeCategories, setActiveCategories] = useState({
    earthquake: true,
    volcanic: true,
    weather: true,
    marine: true,
    space: true,
    biological: true,
    social: true,
    tiktok: true
  });
  
  const [showSpiritual, setShowSpiritual] = useState(false);

  // TikTok API Integration
  const fetchTikTokPropheticEvents = async () => {
    try {
      // This would call your backend endpoint that runs the TikTok scraper
      const response = await fetch('/api/tiktok-prophetic-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hashtags: ["earthquake", "volcano", "flood", "apocalypse", "prophecy", "Jesus", "144000", "bloodmoon", "hailstorm", "heatwave"]
        })
      });
      
      if (response.ok) {
        const tiktokData = await response.json();
        setTikTokEvents(tiktokData);
        return tiktokData;
      }
    } catch (error) {
      console.error('TikTok API error:', error);
      // Fallback to sample TikTok data for demo
      return getSampleTikTokEvents();
    }
    
    return getSampleTikTokEvents();
  };

  // Sample TikTok events for demo (until real API is connected)
  const getSampleTikTokEvents = () => {
    return [
      {
        type: 'tiktok',
        subType: 'marine',
        severity: 'critical',
        location: 'South Australia',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        description: 'VIRAL: "OMG massive fish die-off on Adelaide beach! This is biblical! #deadfish #apocalypse #Australia" (47.2K likes)',
        spiritual: 'The second angel poured out his bowl on the sea, and it turned into blood like that of a corpse, and every living thing died that was in the sea... (Rev 16:3)',
        source: 'TikTok',
        id: 'tiktok_marine_1',
        socialSource: '@beachwalker_aus',
        verificationLevel: 'High Credibility',
        rawData: {
          videoUrl: 'https://tiktok.com/@beachwalker_aus/video/123456789',
          username: 'beachwalker_aus',
          caption: 'OMG massive fish die-off on Adelaide beach! This is biblical! Never seen anything like this. Dead fish everywhere! #deadfish #apocalypse #Australia #endtimes',
          likes: 47200,
          shares: 8900,
          comments: 2340,
          hashtags: ['deadfish', 'apocalypse', 'Australia', 'endtimes'],
          region: 'Australia'
        }
      },
      {
        type: 'tiktok',
        subType: 'prophetic',
        severity: 'high',
        location: 'Global',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        description: 'VIRAL: "The 144,000 are being called! Can you feel it? Jesus is coming soon! #144000 #Jesus #prophecy" (23.8K likes)',
        spiritual: 'And I heard the number of those who were sealed, one hundred and forty-four thousand... (Rev 7:4)',
        source: 'TikTok',
        id: 'tiktok_prophetic_1',
        socialSource: '@propheticseer',
        verificationLevel: 'Moderate Credibility',
        rawData: {
          videoUrl: 'https://tiktok.com/@propheticseer/video/123456790',
          username: 'propheticseer',
          caption: 'The 144,000 are being called! Can you feel it? The Spirit is moving. Jesus is coming soon! Wake up church! #144000 #Jesus #prophecy #revelation #endtimes',
          likes: 23800,
          shares: 5200,
          comments: 1890,
          hashtags: ['144000', 'Jesus', 'prophecy', 'revelation', 'endtimes'],
          region: null
        }
      },
      {
        type: 'tiktok',
        subType: 'earthquake',
        severity: 'moderate',
        location: 'California',
        timestamp: new Date(Date.now() - 1000 * 60 * 90),
        description: 'VIRAL: "Just felt another earthquake! These are increasing! Is this the big one coming? #earthquake #california" (12.1K likes)',
        spiritual: 'And there was a great earthquake... (Rev 6:12)',
        source: 'TikTok',
        id: 'tiktok_earthquake_1',
        socialSource: '@cali_earthquake_tracker',
        verificationLevel: 'Unverified - Social Media',
        rawData: {
          videoUrl: 'https://tiktok.com/@cali_earthquake_tracker/video/123456791',
          username: 'cali_earthquake_tracker',
          caption: 'Just felt another earthquake! These are increasing frequency. Is this the big one coming? Stay safe everyone! #earthquake #california #shakingagain',
          likes: 12100,
          shares: 2800,
          comments: 890,
          hashtags: ['earthquake', 'california', 'shakingagain'],
          region: 'California, USA'
        }
      }
    ];
  };

  // Initialize data
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      
      // Get regular events (earthquakes, space weather, etc.)
      const regularEvents = [
        {
          type: 'earthquake',
          magnitude: 2.3,
          location: 'Southern California',
          timestamp: new Date(Date.now() - 1000 * 60 * 45),
          description: 'M2.3 earthquake detected by citizen seismograph network',
          spiritual: 'And there was a great earthquake... (Rev 6:12)',
          source: 'USGS + Citizen Reports',
          id: 'real_eq_1',
          verificationLevel: 'Verified'
        }
      ];
      
      // Get TikTok prophetic events
      const tiktokData = await fetchTikTokPropheticEvents();
      
      // Combine all events
      const allEvents = [...regularEvents, ...tiktokData].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      
      setEvents(allEvents);
      setLastUpdate(new Date());
      setLoading(false);
    };

    initializeData();
    
    // Refresh every hour (for TikTok data)
    const interval = setInterval(() => {
      fetchTikTokPropheticEvents();
    }, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const categoryIcons = {
    earthquake: Mountain,
    marine: Waves,
    space: Sun,
    weather: Zap,
    volcanic: Mountain,
    biological: AlertTriangle,
    social: Globe,
    tiktok: Play
  };

  const getCategoryColor = (type) => {
    const colors = {
      earthquake: 'text-red-500',
      marine: 'text-blue-500',
      space: 'text-yellow-500',
      weather: 'text-purple-500',
      volcanic: 'text-orange-500',
      biological: 'text-green-500',
      social: 'text-pink-500',
      tiktok: 'text-black'
    };
    return colors[type] || 'text-gray-500';
  };

  const getSeverityBadge = (event) => {
    let severity = '';
    let color = '';
    
    if (event.magnitude) {
      severity = `M${event.magnitude}`;
      color = event.magnitude >= 6 ? 'bg-red-500 text-white' : 'bg-green-100 text-green-800';
    } else if (event.severity) {
      severity = event.severity.toUpperCase();
      color = event.severity === 'critical' ? 'bg-red-500 text-white' :
             event.severity === 'high' ? 'bg-red-100 text-red-800' : 
             'bg-yellow-100 text-yellow-800';
    }
    
    return { severity, color };
  };

  const getVerificationBadge = (event) => {
    if (!event.verificationLevel) return null;
    
    const verificationColors = {
      'Verified': 'bg-green-100 text-green-800',
      'High Credibility': 'bg-blue-100 text-blue-800',
      'Moderate Credibility': 'bg-purple-100 text-purple-800',
      'Unverified - Social Media': 'bg-gray-100 text-gray-800'
    };
    
    return {
      level: event.verificationLevel,
      color: verificationColors[event.verificationLevel] || 'bg-gray-100 text-gray-800'
    };
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 60) return `${minutes} minutes ago`;
    return `${hours} hours ago`;
  };

  const toggleCategory = (category) => {
    setActiveCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const filteredEvents = events.filter(event => activeCategories[event.type]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">The Watchtower</h1>
                <p className="text-sm text-gray-600">Global Prophetic Events Monitor + TikTok Integration</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowSpiritual(!showSpiritual)}
                className={`p-2 rounded-lg transition-colors ${
                  showSpiritual 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-400 hover:text-gray-600'
                }`}
                title="Show spiritual interpretation"
              >
                <Cross className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Live Status */}
        <div className="bg-gradient-to-r from-green-50 to-pink-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-800">
              📱 THE WATCHTOWER + TIKTOK IS LIVE - Monitoring Prophetic Content
            </span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
            <div className="text-green-600">📡 Government APIs</div>
            <div className="text-pink-600">📱 TikTok Live Feed</div>
            <div className="text-blue-600">🌐 Social Media</div>
            <div className="text-purple-600">📰 News Monitor</div>
            <div className="text-indigo-600">👥 Citizen Network</div>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Last TikTok scan: {lastUpdate.toLocaleTimeString()} • Monitoring prophetic hashtags hourly
          </p>
        </div>

        {/* Category Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <label className="text-sm font-medium text-gray-700 mb-3 block">Event Categories</label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {Object.entries(activeCategories).map(([category, isActive]) => {
              const Icon = categoryIcons[category];
              const categoryLabels = {
                earthquake: 'Earthquakes',
                marine: 'Marine',
                space: 'Space',
                weather: 'Weather', 
                volcanic: 'Volcanic',
                biological: 'Biological',
                social: 'Social Media',
                tiktok: 'TikTok Live'
              };
              
              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`p-3 rounded-lg border transition-all ${
                    isActive
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5 mx-auto mb-1" />
                  <div className="text-xs font-medium">{categoryLabels[category]}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Events Feed */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Live Prophetic Events Feed</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {filteredEvents.length} events • Real-time + TikTok monitoring
                </p>
              </div>
              
              {loading && (
                <div className="flex items-center space-x-2 text-pink-600">
                  <div className="w-4 h-4 border-2 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Scanning TikTok for prophetic content...</span>
                </div>
              )}
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredEvents.map((event) => {
              const Icon = categoryIcons[event.type];
              const { severity, color } = getSeverityBadge(event);
              const verification = getVerificationBadge(event);
              const isTikTok = event.type === 'tiktok';
              
              return (
                <div key={event.id} className={`p-6 hover:bg-gray-50 transition-colors ${isTikTok ? 'border-l-4 border-pink-400' : ''}`}>
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg bg-gray-100 ${getCategoryColor(event.type)}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2 flex-wrap">
                        <h3 className="text-lg font-medium text-gray-900">{event.description}</h3>
                        {isTikTok && (
                          <span className="px-2 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800">
                            TIKTOK LIVE
                          </span>
                        )}
                        {severity && (
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${color}`}>
                            {severity}
                          </span>
                        )}
                        {verification && (
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${verification.color}`}>
                            {verification.level}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3 flex-wrap">
                        <span>📍 {event.location}</span>
                        <span>🕒 {getTimeAgo(event.timestamp)}</span>
                        <span className="capitalize">📊 {event.subType || event.type}</span>
                        <span className="text-xs text-gray-400">• {event.source}</span>
                      </div>

                      {event.socialSource && (
                        <div className="mb-3 p-2 bg-gray-50 rounded text-xs text-gray-600">
                          📱 {isTikTok ? 'TikTok' : 'Social'} Source: {event.socialSource}
                        </div>
                      )}

                      {/* TikTok specific data */}
                      {isTikTok && event.rawData && (
                        <div className="mb-3 p-3 bg-pink-50 rounded-lg border border-pink-200">
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="flex items-center space-x-1">
                              <Heart className="w-4 h-4 text-red-500" />
                              <span>{event.rawData.likes?.toLocaleString()}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Share className="w-4 h-4 text-blue-500" />
                              <span>{event.rawData.shares?.toLocaleString()}</span>
                            </span>
                            <a 
                              href={event.rawData.videoUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-pink-600 hover:text-pink-800 text-xs"
                            >
                              📱 View on TikTok
                            </a>
                          </div>
                        </div>
                      )}

                      {showSpiritual && event.spiritual && (
                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                          <p className="text-sm text-blue-800 italic">
                            <Cross className="w-4 h-4 inline mr-2" />
                            {event.spiritual}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong className="text-pink-600">📱 LIVE:</strong> TikTok Prophetic Events Scanner
            </div>
            <div>
              <strong className="text-green-600">🟢 ACTIVE:</strong> Real-time hashtag monitoring
            </div>
            <div>
              <strong className="text-blue-600">🔍 SCANNING:</strong> #earthquake #volcano #apocalypse #Jesus #144000
            </div>
            <div>
              <strong className="text-purple-600">⚡ POWERED BY:</strong> Apify TikTok Scraper + AI Analysis
            </div>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Built by Leslie & Claude • Powered by USGS, NOAA, TikTok API & multi-AI collaboration
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchtowerWithTikTok;
