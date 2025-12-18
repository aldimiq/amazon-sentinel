import { Sidebar } from './components/layout/Sidebar'
import { TopBar } from './components/layout/TopBar'
import { MapLayer } from './components/map/MapLayer'
import { AssetDetails } from './components/ui/AssetDetails'

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black font-sans selection:bg-sentinel-500/30">
      
      {/* Map Layer (Background) */}
      <div className="absolute inset-0 z-0 bg-sentinel-900 flex items-center justify-center">
        <MapLayer />
        
        {/* Grid Overlay Effect */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
      </div>

      {/* Glass UI Layer (Foreground) */}
      <div className="relative z-10 w-full h-full flex p-4 gap-4 pointer-events-none">
        
        {/* Left Sidebar */}
        <div className="h-full pointer-events-auto shrink-0">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-4 h-full min-w-0">
          {/* Top Bar */}
          <div className="pointer-events-auto">
            <TopBar />
          </div>

          {/* Dynamic Content Overlay */}
          <div className="flex-1 flex justify-end pointer-events-none">
             <AssetDetails />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
