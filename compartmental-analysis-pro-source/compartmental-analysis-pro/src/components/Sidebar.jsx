import { useState } from 'react'
import { Upload, Database, Settings, Play, Download, BarChart3, Brain, Target, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Switch } from '@/components/ui/switch.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Input } from '@/components/ui/input.jsx'

export function Sidebar({ onLoadData, onRunAnalysis, analysisSettings, setAnalysisSettings, isAnalyzing }) {
  const [dataLoaded, setDataLoaded] = useState(false)

  const handleLoadData = () => {
    setDataLoaded(true)
    onLoadData()
  }

  const handleCompartmentChange = (value) => {
    setAnalysisSettings(prev => ({ ...prev, compartmentModel: value }))
  }

  const handleWeightingChange = (value) => {
    setAnalysisSettings(prev => ({ ...prev, weightingScheme: value }))
  }

  const handleAdvancedSettingChange = (setting, value) => {
    setAnalysisSettings(prev => ({ ...prev, [setting]: value }))
  }

  return (
    <div className="w-80 bg-slate-50 border-r border-slate-200 h-full flex flex-col">
      <div className="flex-1 p-4 space-y-4">
        
        {/* Data Management Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Database className="h-4 w-4 mr-2 text-blue-600" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-1 gap-2">
              <Button 
                onClick={handleLoadData}
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                <Upload className="h-3 w-3 mr-1" />
                Load Data
              </Button>
              <Button 
                variant="outline" 
                onClick={handleLoadData}
                className="w-full"
                size="sm"
              >
                <BarChart3 className="h-3 w-3 mr-1" />
                Demo Data
              </Button>
            </div>
            {dataLoaded && (
              <div className="text-xs text-green-600 bg-green-50 p-1 rounded">
                ✓ Data loaded: 250 points, 5 subjects
              </div>
            )}
          </CardContent>
        </Card>

        {/* Model Configuration Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Target className="h-4 w-4 mr-2 text-teal-600" />
              Model Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="compartment-model" className="text-xs">Compartment Model</Label>
              <Select value={analysisSettings.compartmentModel} onValueChange={handleCompartmentChange}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto Selection</SelectItem>
                  <SelectItem value="1comp">1 Compartment</SelectItem>
                  <SelectItem value="2comp">2 Compartment</SelectItem>
                  <SelectItem value="3comp">3 Compartment</SelectItem>
                  <SelectItem value="popPK">Population PK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="weighting-scheme" className="text-xs">Weighting Scheme</Label>
              <Select value={analysisSettings.weightingScheme} onValueChange={handleWeightingChange}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select weighting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="1/Y">1/Y</SelectItem>
                  <SelectItem value="1/Y²">1/Y²</SelectItem>
                  <SelectItem value="1/Var">1/Variance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Analysis Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Brain className="h-4 w-4 mr-2 text-purple-600" />
              Advanced Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-1">
                <Switch 
                  id="monte-carlo"
                  checked={analysisSettings.monteCarlo}
                  onCheckedChange={(checked) => handleAdvancedSettingChange('monteCarlo', checked)}
                />
                <Label htmlFor="monte-carlo" className="text-xs">Monte Carlo</Label>
              </div>

              <div className="flex items-center space-x-1">
                <Switch 
                  id="bayesian"
                  checked={analysisSettings.bayesian}
                  onCheckedChange={(checked) => handleAdvancedSettingChange('bayesian', checked)}
                />
                <Label htmlFor="bayesian" className="text-xs">Bayesian</Label>
              </div>

              <div className="flex items-center space-x-1">
                <Switch 
                  id="outlier-detection"
                  checked={analysisSettings.outlierDetection}
                  onCheckedChange={(checked) => handleAdvancedSettingChange('outlierDetection', checked)}
                />
                <Label htmlFor="outlier-detection" className="text-xs">Outliers</Label>
              </div>

              <div className="space-y-1">
                <Label htmlFor="bootstrap-samples" className="text-xs">Bootstrap</Label>
                <Input 
                  id="bootstrap-samples"
                  type="number"
                  value={analysisSettings.bootstrapSamples}
                  onChange={(e) => handleAdvancedSettingChange('bootstrapSamples', parseInt(e.target.value))}
                  min="100"
                  max="10000"
                  step="100"
                  className="h-6 text-xs"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            onClick={onRunAnalysis}
            disabled={!dataLoaded || isAnalyzing}
            className="w-full bg-green-600 hover:bg-green-700 text-white h-8"
          >
            <Play className="h-3 w-3 mr-1" />
            {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
          </Button>

          <Button 
            variant="outline" 
            className="w-full h-8"
            disabled={!dataLoaded}
          >
            <Download className="h-3 w-3 mr-1" />
            Export Results
          </Button>
        </div>

        {/* Status Section */}
        <div className="text-xs text-slate-600 bg-white p-2 rounded border">
          <div className="flex items-center justify-between">
            <span>Status:</span>
            <span className={`font-medium ${dataLoaded ? 'text-green-600' : 'text-slate-400'}`}>
              {dataLoaded ? 'Ready' : 'No Data'}
            </span>
          </div>
          {isAnalyzing && (
            <div className="flex items-center text-blue-600 mt-1">
              <div className="animate-spin rounded-full h-2 w-2 border-b border-blue-600 mr-1"></div>
              Analysis in progress...
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

