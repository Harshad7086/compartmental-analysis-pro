import { Activity, FileText, Settings, User, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

export function Header() {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-700">
      <div className="flex items-center justify-between px-6 py-2">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Compartmental Analysis Pro</h1>
            <p className="text-xs text-slate-300">Advanced Pharmacokinetic Modeling</p>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800 h-8 px-2">
            <FileText className="h-3 w-3 mr-1" />
            <span className="text-xs">Docs</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800 h-8 px-2">
            <HelpCircle className="h-3 w-3 mr-1" />
            <span className="text-xs">Help</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800 h-8 px-2">
            <Settings className="h-3 w-3 mr-1" />
            <span className="text-xs">Settings</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800 h-8 px-2">
            <User className="h-3 w-3 mr-1" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

