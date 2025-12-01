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
  
  // Generar datos para el gráfico de línea (patrimonio a lo largo del tiempo)
  const generateTimelineData = () => {
    const data = [];
    const precio = parseFloat(formData.precioAuto) || 0;
    const disponible = parseFloat(formData.dineroDisponible) || 0;
    const tasaInv = parseFloat(formData.tasaInversion) / 100 || 0.08;
    const tasaDepr = parseFloat(formData.tasaDepreciacionAnual) / 100 || 0.15;
    const gastoAnual = resultados.auto.gastoAnual;
    const dineroRestante = Math.max(0, disponible - precio);
    const uberMensual = parseFloat(formData.uberMensual) || 0;
    const transporteMensual = parseFloat(formData.transportePublico) || 0;

    for (let year = 0; year <= anosNum; year++) {
      // Comprar Auto
      let valorAuto = precio;
      for (let i = 0; i < year; i++) {
        valorAuto *= (1 - tasaDepr);
      }
      const inversionAuto = dineroRestante * Math.pow(1 + tasaInv, year);
      const gastosAcumuladosAuto = gastoAnual * year;
      const patrimonioAuto = valorAuto + inversionAuto;

      // Uber + Invertir
      const inversionUber = disponible * Math.pow(1 + tasaInv, year);
      const gastosUber = uberMensual * 12 * year;
      const patrimonioUber = inversionUber;

      // Transporte + Invertir
      const inversionTransporte = disponible * Math.pow(1 + tasaInv, year);
      const gastosTransporte = transporteMensual * 12 * year;
      const patrimonioTransporte = inversionTransporte;

      data.push({
        año: year,
        'Comprar Auto': Math.round(patrimonioAuto),
        'Uber + Invertir': uberMensual > 0 ? Math.round(patrimonioUber) : null,
        'Transporte + Invertir': transporteMensual > 0 ? Math.round(patrimonioTransporte) : null,
      });
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
    <Card>
      <CardHeader>
        <CardTitle>📈 Evolución del Patrimonio en el Tiempo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
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
              {resultados.uber.gastoMensual > 0 && (
                <Line 
                  type="monotone" 
                  dataKey="Uber + Invertir" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
              {resultados.transporte.gastoMensual > 0 && (
                <Line 
                  type="monotone" 
                  dataKey="Transporte + Invertir" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
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

