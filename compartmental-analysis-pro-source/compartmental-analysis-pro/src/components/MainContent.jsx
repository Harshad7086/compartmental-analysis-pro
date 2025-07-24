import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, BarChart, Bar } from 'recharts'
import { TrendingUp, BarChart3, Target, AlertCircle, FileText } from 'lucide-react'

export function MainContent({ analysisResults, isAnalyzing }) {
  const [activeTab, setActiveTab] = useState('model-fit')

  // Sample data for demonstration
  const sampleData = [
    { time: 0, concentration: 100, predicted: 100 },
    { time: 2, concentration: 85, predicted: 87 },
    { time: 4, concentration: 72, predicted: 75 },
    { time: 6, concentration: 61, predicted: 65 },
    { time: 8, concentration: 52, predicted: 56 },
    { time: 12, concentration: 38, predicted: 42 },
    { time: 16, concentration: 28, predicted: 32 },
    { time: 24, concentration: 18, predicted: 20 },
    { time: 36, concentration: 8, predicted: 10 },
    { time: 48, concentration: 3, predicted: 4 }
  ]

  const residualsData = sampleData.map(point => ({
    time: point.time,
    residual: point.concentration - point.predicted
  }))

  const parameterData = [
    { parameter: 'k10', value: 0.0462, ci_lower: 0.0398, ci_upper: 0.0526 },
    { parameter: 'k12', value: 0.0234, ci_lower: 0.0198, ci_upper: 0.0270 },
    { parameter: 'k21', value: 0.0156, ci_lower: 0.0132, ci_upper: 0.0180 }
  ]

  return (
    <div className="flex-1 p-4 bg-white">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        <TabsList className="grid w-full grid-cols-5 mb-4 h-8">
          <TabsTrigger value="model-fit" className="flex items-center text-xs px-2">
            <TrendingUp className="h-3 w-3 mr-1" />
            Model Fit
          </TabsTrigger>
          <TabsTrigger value="residuals" className="flex items-center text-xs px-2">
            <BarChart3 className="h-3 w-3 mr-1" />
            Residuals
          </TabsTrigger>
          <TabsTrigger value="parameters" className="flex items-center text-xs px-2">
            <Target className="h-3 w-3 mr-1" />
            Parameters
          </TabsTrigger>
          <TabsTrigger value="uncertainty" className="flex items-center text-xs px-2">
            <AlertCircle className="h-3 w-3 mr-1" />
            Uncertainty
          </TabsTrigger>
          <TabsTrigger value="report" className="flex items-center text-xs px-2">
            <FileText className="h-3 w-3 mr-1" />
            Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="model-fit" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base">
                <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                Concentration vs Time Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sampleData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="time" 
                      label={{ value: 'Time (hours)', position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis 
                      label={{ value: 'Concentration (mg/L)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="concentration" 
                      stroke="#2563eb" 
                      strokeWidth={2}
                      dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                      name="Observed Data"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#dc2626" 
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      dot={false}
                      name="Model Prediction"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-4">
                <div className="text-xl font-bold text-green-600">0.956</div>
                <p className="text-xs text-slate-600">R² (Goodness of Fit)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-xl font-bold text-blue-600">-142.3</div>
                <p className="text-xs text-slate-600">AIC (Model Selection)</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-xl font-bold text-purple-600">2-Comp</div>
                <p className="text-xs text-slate-600">Best Model</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="residuals" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base">
                <BarChart3 className="h-4 w-4 mr-2 text-orange-600" />
                Residuals Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={residualsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="time" 
                      label={{ value: 'Time (hours)', position: 'insideBottom', offset: -10 }}
                    />
                    <YAxis 
                      label={{ value: 'Residuals', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip />
                    <Scatter dataKey="residual" fill="#ea580c" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parameters" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base">
                <Target className="h-4 w-4 mr-2 text-teal-600" />
                Parameter Estimates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={parameterData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="parameter" />
                    <YAxis label={{ value: 'Rate Constant (1/h)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0891b2" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4">
                <table className="w-full border-collapse border border-slate-300 text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="border border-slate-300 p-2 text-left">Parameter</th>
                      <th className="border border-slate-300 p-2 text-left">Estimate</th>
                      <th className="border border-slate-300 p-2 text-left">95% CI Lower</th>
                      <th className="border border-slate-300 p-2 text-left">95% CI Upper</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parameterData.map((param, index) => (
                      <tr key={index}>
                        <td className="border border-slate-300 p-2 font-mono">{param.parameter}</td>
                        <td className="border border-slate-300 p-2">{param.value.toFixed(4)}</td>
                        <td className="border border-slate-300 p-2">{param.ci_lower.toFixed(4)}</td>
                        <td className="border border-slate-300 p-2">{param.ci_upper.toFixed(4)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uncertainty" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base">
                <AlertCircle className="h-4 w-4 mr-2 text-purple-600" />
                Parameter Uncertainty Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-slate-500">
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                <p>Monte Carlo simulation results will appear here</p>
                <p className="text-sm">Enable Monte Carlo analysis in the sidebar to view uncertainty distributions</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="report" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-base">
                <FileText className="h-4 w-4 mr-2 text-green-600" />
                Analysis Report
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 font-mono text-xs">
                <div className="bg-slate-50 p-3 rounded">
                  <h3 className="font-bold mb-2">COMPARTMENTAL ANALYSIS RESULTS</h3>
                  <div className="space-y-1">
                    <p>Analysis Date: {new Date().toLocaleDateString()}</p>
                    <p>Model Type: 2-Compartment</p>
                    <p>Data Points: 250</p>
                    <p>Subjects: 5</p>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-3 rounded">
                  <h3 className="font-bold mb-2">MODEL PERFORMANCE</h3>
                  <div className="space-y-1">
                    <p>R²: 0.956</p>
                    <p>AIC: -142.3</p>
                    <p>BIC: -138.7</p>
                    <p>RMSE: 2.34 mg/L</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded">
                  <h3 className="font-bold mb-2">PARAMETER ESTIMATES</h3>
                  <div className="space-y-1">
                    <p>k10: 0.0462 h⁻¹ [0.0398 - 0.0526]</p>
                    <p>k12: 0.0234 h⁻¹ [0.0198 - 0.0270]</p>
                    <p>k21: 0.0156 h⁻¹ [0.0132 - 0.0180]</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded">
                  <h3 className="font-bold mb-2">DERIVED PARAMETERS</h3>
                  <div className="space-y-1">
                    <p>Half-life (α): 4.2 hours</p>
                    <p>Half-life (β): 15.0 hours</p>
                    <p>Clearance: 2.31 L/h</p>
                    <p>Volume of Distribution: 50.1 L</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

