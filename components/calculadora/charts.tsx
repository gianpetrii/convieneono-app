"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface ChartsProps {
  resultados: any;
  anos: string;
  formData: any;
}

export function Charts({ resultados, anos, formData }: ChartsProps) {
  const anosNum = parseInt(anos);
  
  const invertirDiferencial = formData.invertirDiferencial === "true";
  const alternativas = resultados.alternativas || [];
  
  // Colores para las alternativas
  const colores = ['#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];
  
  // Generar datos para el gráfico de línea (patrimonio a lo largo del tiempo)
  const generateTimelineData = () => {
    const data = [];
    const precio = parseFloat(formData.precioAuto) || 0;
    const disponible = parseFloat(formData.dineroDisponible) || 0;
    const tasaInv = parseFloat(formData.tasaInversion) / 100 || 0.08;
    const tasaDepr = parseFloat(formData.tasaDepreciacionAnual) / 100 || 0.15;
    const gastoAnual = resultados.auto.gastoAnual;
    const dineroRestante = Math.max(0, disponible - precio);

    for (let year = 0; year <= anosNum; year++) {
      // Comprar Auto
      let valorAuto = precio;
      for (let i = 0; i < year; i++) {
        valorAuto *= (1 - tasaDepr);
      }
      const inversionAuto = dineroRestante * Math.pow(1 + tasaInv, year);
      const patrimonioAuto = valorAuto + inversionAuto;

      const dataPoint: any = {
        año: year,
        'Comprar Auto': Math.round(patrimonioAuto),
      };
      
      // Calcular para cada alternativa
      alternativas.forEach((alt: any) => {
        const gastoMensual = alt.gastoMensualTotal;
        let inversion = disponible * Math.pow(1 + tasaInv, year);
        const gastosAcumulados = gastoMensual * 12 * year;
        
        // Si se invierte el diferencial, agregar inversión de aportes mensuales
        if (invertirDiferencial && year > 0) {
          const diferencialMensual = Math.max(0, gastoAnual / 12 - gastoMensual);
          if (diferencialMensual > 0) {
            const meses = year * 12;
            const tasaMensual = Math.pow(1 + tasaInv, 1/12) - 1;
            const inversionDiferencial = diferencialMensual * (Math.pow(1 + tasaMensual, meses) - 1) / tasaMensual;
            inversion += inversionDiferencial;
          }
        }
        
        const patrimonio = inversion - gastosAcumulados;
        dataPoint[alt.nombre] = Math.round(patrimonio);
      });

      data.push(dataPoint);
    }

    return data;
  };

  const timelineData = generateTimelineData();

  const formatCurrency = (value: number) => {
    return `$${(value / 1000).toFixed(0)}k`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold mb-2">Año {label}</p>
          {payload.map((entry: any, index: number) => (
            entry.value !== null && (
              <p key={index} style={{ color: entry.color }} className="text-sm">
                {entry.name}: ${entry.value.toLocaleString()}
              </p>
            )
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>📈 Evolución del Patrimonio en el Tiempo</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis 
                dataKey="año" 
                label={{ value: 'Años', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                tickFormatter={formatCurrency}
                label={{ value: 'Patrimonio', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="Comprar Auto" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              {alternativas.map((alt: any, index: number) => (
                <Line 
                  key={alt.id}
                  type="monotone" 
                  dataKey={alt.nombre} 
                  stroke={colores[index % colores.length]} 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-sm text-muted-foreground mt-4 text-center">
          💡 Este gráfico muestra cómo evoluciona tu patrimonio año tras año en cada escenario
        </p>
      </CardContent>
    </Card>
  );
}

