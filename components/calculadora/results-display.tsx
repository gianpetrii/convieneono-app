"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Car, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Info
} from "lucide-react";

interface ResultsDisplayProps {
  resultados: any;
  anos: string;
  onlyRecommendation?: boolean;
}

export function ResultsDisplay({ resultados, anos, onlyRecommendation }: ResultsDisplayProps) {
  const formatMoney = (value: number) => {
    return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  const { auto, alternativas = [], mejorOpcion } = resultados;

  // Si solo queremos la recomendación
  if (onlyRecommendation) {
    // Determinar cuál es la mejor y peor opción para colorear
    const opciones = [
      { nombre: 'Comprar Auto', patrimonio: auto.patrimonioNeto, key: 'auto' },
      ...alternativas.map((alt: any) => ({ 
        nombre: alt.nombre, 
        patrimonio: alt.patrimonioNeto, 
        key: alt.id 
      }))
    ];
    
    const mejorPatrimonio = Math.max(...opciones.map(o => o.patrimonio));
    const peorPatrimonio = Math.min(...opciones.map(o => o.patrimonio));

    const getColorClass = (patrimonio: number) => {
      if (patrimonio === mejorPatrimonio) return 'bg-emerald-500/20 border-2 border-emerald-500 text-emerald-700';
      if (patrimonio === peorPatrimonio && opciones.length > 2) return 'bg-red-500/10 border border-red-300 text-red-700';
      return 'bg-muted/50 border border-muted-foreground/20';
    };

    return (
      <Card className="border-2 border-primary h-full flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            Recomendación
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          {/* Recomendación principal */}
          <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg p-3 mb-4">
            <p className="text-lg font-bold mb-1">
              {mejorOpcion.nombre}
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              Te deja con {formatMoney(mejorOpcion.patrimonio)} en {anos} años
            </p>
            
            {mejorOpcion.nombre === 'Comprar Auto' ? (
              <div className="text-xs">
                <p className="font-medium mb-1">✅ El auto te conviene porque:</p>
                <ul className="ml-3 space-y-0.5 text-muted-foreground">
                  <li>• Terminas con más patrimonio</li>
                  <li>• El valor residual compensa gastos</li>
                </ul>
              </div>
            ) : (
              <div className="text-xs">
                <p className="font-medium mb-1">✅ No comprar te conviene porque:</p>
                <ul className="ml-3 space-y-0.5 text-muted-foreground">
                  <li>• Ahorras vs comprar el auto</li>
                  <li>• Tu dinero genera rendimientos</li>
                </ul>
              </div>
            )}
          </div>

          {/* Comparación Final con colores */}
          <div className="mt-auto">
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              Comparación Final
            </h4>
            <div className="space-y-2">
              {opciones.map((opcion) => (
                <div 
                  key={opcion.key}
                  className={`flex justify-between items-center p-3 rounded-lg ${getColorClass(opcion.patrimonio)}`}
                >
                  <span className="text-sm font-medium">{opcion.nombre}</span>
                  <span className="font-bold text-base">{formatMoney(opcion.patrimonio)}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              🟢 Mejor opción · 🔴 Peor opción
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Vista completa con detalles
  return (
    <div className="space-y-6">
      {/* Grid dinámico según cantidad de alternativas */}
      <div className={`grid gap-6 ${
        alternativas.length === 0 ? 'md:grid-cols-1' :
        alternativas.length === 1 ? 'md:grid-cols-2' :
        'md:grid-cols-3'
      }`}>
        {/* Opción 1: Comprar Auto */}
        <Card className="flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Car className="h-5 w-5 text-blue-600" />
            Comprar el Auto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 flex-1">
          {/* Inversión Inicial */}
          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5" />
              Inversión Inicial
            </h4>
            <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span>Precio del auto:</span>
                <span className="font-semibold">{formatMoney(auto.precioCompra)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Dinero restante invertido:</span>
                <span className="font-semibold text-emerald-600">{formatMoney(auto.dineroRestante)}</span>
              </div>
            </div>
          </div>

          {/* Gastos Mensuales */}
          <div>
            <h4 className="font-semibold text-sm mb-2">💳 Gastos Mensuales</h4>
            <div className="bg-muted/50 rounded-lg p-3 space-y-1">
              <div className="flex justify-between text-xs">
                <span>Seguro:</span>
                <span>{formatMoney(auto.desglose.seguro)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Combustible:</span>
                <span>{formatMoney(auto.desglose.combustible)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Mantenimiento:</span>
                <span>{formatMoney(auto.desglose.mantenimiento)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Estacionamiento:</span>
                <span>{formatMoney(auto.desglose.estacionamiento)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Lavado:</span>
                <span>{formatMoney(auto.desglose.lavado)}</span>
              </div>
              <div className="border-t pt-1.5 mt-1.5">
                <div className="flex justify-between font-semibold text-xs">
                  <span>Total/mes:</span>
                  <span className="text-red-600">{formatMoney(auto.gastoMensual)}</span>
                </div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1.5">
              Total en {anos} años: <strong className="text-red-600">{formatMoney(auto.gastoTotal)}</strong>
            </div>
          </div>

          {/* Depreciación */}
          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
              <TrendingDown className="h-3.5 w-3.5 text-red-600" />
              Depreciación
            </h4>
            <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span>Valor inicial:</span>
                <span className="font-semibold">{formatMoney(auto.valorInicial)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Valor en {anos} años:</span>
                <span className="font-semibold">{formatMoney(auto.valorFinal)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Pérdida:</span>
                <span className="font-semibold text-red-600">-{formatMoney(auto.depreciacionTotal)}</span>
              </div>
            </div>
          </div>

          {/* Inversión del dinero restante */}
          {auto.dineroRestante > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                Inversión Restante
              </h4>
              <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span>Invertido:</span>
                  <span>{formatMoney(auto.inversionInicial)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Valor en {anos} años:</span>
                  <span className="font-semibold text-emerald-600">{formatMoney(auto.inversionFinal)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Ganancia:</span>
                  <span className="font-semibold text-emerald-600">+{formatMoney(auto.gananciaInversion)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Resultado Final */}
          <div className="border-t pt-3 mt-auto">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm">Patrimonio Total:</span>
                <span className={`font-bold text-xl ${auto.patrimonioNeto >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {formatMoney(auto.patrimonioNeto)}
                </span>
              </div>
              <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                <p><strong>Costo real:</strong> {formatMoney(auto.costoReal)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

        {/* Alternativas de Transporte */}
        {alternativas.map((alt: any, index: number) => {
          const colores = [
            { icon: 'text-emerald-600', bg: 'from-emerald-500/10' },
            { icon: 'text-purple-600', bg: 'from-purple-500/10' },
            { icon: 'text-orange-600', bg: 'from-orange-500/10' },
            { icon: 'text-pink-600', bg: 'from-pink-500/10' },
            { icon: 'text-cyan-600', bg: 'from-cyan-500/10' }
          ];
          const color = colores[index % colores.length];
          
          return (
            <Card key={alt.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className={`h-5 w-5 ${color.icon}`} />
                  {alt.nombre}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                {/* Comparación vs Auto */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">📊 Comparación vs Auto</h4>
                  <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span>Ahorro mensual vs auto:</span>
                      <span className={`font-semibold ${auto.gastoMensual - alt.gastoMensualTotal > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {auto.gastoMensual - alt.gastoMensualTotal > 0 ? '+' : ''}{formatMoney(auto.gastoMensual - alt.gastoMensualTotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Diferencia patrimonio:</span>
                      <span className={`font-semibold ${auto.patrimonioNeto - alt.patrimonioNeto < 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {auto.patrimonioNeto - alt.patrimonioNeto < 0 ? '+' : ''}{formatMoney(Math.abs(auto.patrimonioNeto - alt.patrimonioNeto))}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Desglose de gastos */}
                <div>
                  <h4 className="font-semibold text-sm mb-2">🚗 Gasto en Transporte</h4>
                  <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
                    {alt.gastoMensualTransporte > 0 && (
                      <div className="flex justify-between text-xs">
                        <span>Transporte público:</span>
                        <span>{formatMoney(alt.gastoMensualTransporte)}</span>
                      </div>
                    )}
                    {alt.gastoMensualUber > 0 && (
                      <div className="flex justify-between text-xs">
                        <span>Uber/Taxi:</span>
                        <span>{formatMoney(alt.gastoMensualUber)}</span>
                      </div>
                    )}
                    <div className="border-t pt-1.5 mt-1.5">
                      <div className="flex justify-between font-semibold text-xs">
                        <span>Total mensual:</span>
                        <span className="text-red-600">{formatMoney(alt.gastoMensualTotal)}</span>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Total en {anos} años:</span>
                      <span className="text-red-600 font-semibold">{formatMoney(alt.gastoTotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Inversión */}
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                    Inversión Total
                  </h4>
                  <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span>Invertido:</span>
                      <span>{formatMoney(alt.inversionInicial)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Valor en {anos} años:</span>
                      <span className="font-semibold text-emerald-600">{formatMoney(alt.inversionFinal)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Ganancia:</span>
                      <span className="font-semibold text-emerald-600">+{formatMoney(alt.gananciaInversion)}</span>
                    </div>
                  </div>
                </div>

                {/* Resultado Final */}
                <div className="border-t pt-3 mt-auto">
                  <div className={`bg-gradient-to-br ${color.bg} to-blue-500/10 rounded-lg p-3`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm">Patrimonio Total:</span>
                      <span className="font-bold text-xl text-emerald-600">
                        {formatMoney(alt.patrimonioNeto)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                      <p>💡 Todo tu dinero invertido generando rendimientos</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
