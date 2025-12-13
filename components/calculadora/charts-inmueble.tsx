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

interface ChartsInmuebleProps {
  resultados: any;
  anos: string;
  formData: any;
}

export function ChartsInmueble({ resultados, anos, formData }: ChartsInmuebleProps) {
  const anosNum = parseInt(anos);
  
  // Obtener valores de gastos mensuales
  const alquilerMensual = parseFloat(formData.alquilerMensual) || 0;
  const invertirDiferencial = formData.invertirDiferencial === "true";
  
  // Generar datos para el gráfico de línea (patrimonio a lo largo del tiempo)
  const generateTimelineData = () => {
    const data = [];
    const precio = parseFloat(formData.precioInmueble) || 0;
    const disponible = parseFloat(formData.dineroDisponible) || 0;
    const tasaInv = parseFloat(formData.tasaInversion) / 100 || 0.08;
    const tasaAprec = parseFloat(formData.tasaApreciacion) / 100 || 0.03;
    const gastoAnual = resultados.inmueble.gastoAnual;
    const gastosIniciales = resultados.inmueble.gastosIniciales.total;
    const inversionTotal = precio + gastosIniciales;
    const dineroRestante = Math.max(0, disponible - inversionTotal);

    for (let year = 0; year <= anosNum; year++) {
      // Comprar Inmueble
      let valorInmueble = precio;
      for (let i = 0; i < year; i++) {
        valorInmueble *= (1 + tasaAprec); // El inmueble GANA valor
      }
      const inversionInmueble = dineroRestante * Math.pow(1 + tasaInv, year);
      const patrimonioInmueble = valorInmueble + inversionInmueble;

      // Alquilar + Invertir - restar gastos acumulados + invertir diferencial
      let inversionAlquiler = disponible * Math.pow(1 + tasaInv, year);
      const gastosAlquilerAcumulados = alquilerMensual * 12 * year;
      
      // Si se invierte el diferencial, agregar inversión de aportes mensuales
      if (invertirDiferencial && year > 0) {
        const diferencialAlquiler = Math.max(0, gastoAnual / 12 - alquilerMensual);
        if (diferencialAlquiler > 0) {
          const meses = year * 12;
          const tasaMensual = Math.pow(1 + tasaInv, 1/12) - 1;
          const inversionDiferencial = diferencialAlquiler * (Math.pow(1 + tasaMensual, meses) - 1) / tasaMensual;
          inversionAlquiler += inversionDiferencial;
        }
      }
      
      const patrimonioAlquiler = inversionAlquiler - gastosAlquilerAcumulados;

      const dataPoint: any = {
        año: year,
        'Comprar Inmueble': Math.round(patrimonioInmueble),
      };
      
      if (alquilerMensual > 0) {
        dataPoint['Alquilar + Invertir'] = Math.round(patrimonioAlquiler);
      }

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
                dataKey="Comprar Inmueble" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              {alquilerMensual > 0 && (
                <Line 
                  type="monotone" 
                  dataKey="Alquilar + Invertir" 
                  stroke="#10b981" 
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

