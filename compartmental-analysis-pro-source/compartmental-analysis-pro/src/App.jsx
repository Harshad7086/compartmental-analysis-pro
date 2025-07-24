import { useState } from 'react'
import { Header } from './components/Header.jsx'
import { Sidebar } from './components/Sidebar.jsx'
import { MainContent } from './components/MainContent.jsx'
import './App.css'

function App() {
  const [analysisSettings, setAnalysisSettings] = useState({
    compartmentModel: 'auto',
    weightingScheme: 'none',
    monteCarlo: false,
    bayesian: false,
    outlierDetection: true,
    bootstrapSamples: 1000
  })

  const [analysisResults, setAnalysisResults] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const handleLoadData = () => {
    console.log('Loading data...')
    // Simulate data loading
  }

  const handleRunAnalysis = () => {
    setIsAnalyzing(true)
    console.log('Running analysis with settings:', analysisSettings)
    
    // Simulate analysis process
    setTimeout(() => {
      setAnalysisResults({
        model: analysisSettings.compartmentModel,
        parameters: { k10: 0.0462, k12: 0.0234, k21: 0.0156 },
        goodnessOfFit: { r2: 0.956, aic: -142.3, bic: -138.7 }
      })
      setIsAnalyzing(false)
    }, 3000)
  }

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          onLoadData={handleLoadData}
          onRunAnalysis={handleRunAnalysis}
          analysisSettings={analysisSettings}
          setAnalysisSettings={setAnalysisSettings}
          isAnalyzing={isAnalyzing}
        />
        <MainContent 
          analysisResults={analysisResults}
          isAnalyzing={isAnalyzing}
        />
      </div>
    </div>
  )
}

export default App
