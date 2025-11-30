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
}

export function ResultsDisplay({ resultados, anos }: ResultsDisplayProps) {
  const formatMoney = (value: number) => {
    return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  const { auto, uber, transporte, mejorOpcion } = resultados;

  return (
    <div className="space-y-6">
      {/* Resumen Ejecutivo */}
      <Card className="border-2 border-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            Recomendación
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg p-6">
            <p className="text-2xl font-bold mb-2">
              {mejorOpcion.nombre}
            </p>
            <p className="text-muted-foreground mb-4">
              Esta opción te deja con {formatMoney(mejorOpcion.patrimonio)} en {anos} años
            </p>
            
            {mejorOpcion.nombre === 'Comprar Auto' ? (
              <div className="space-y-2 text-sm">
                <p>✅ El auto te conviene porque:</p>
                <ul className="ml-4 space-y-1">
                  <li>• Terminas con más patrimonio que las alternativas</li>
                  <li>• El valor residual del auto compensa los gastos</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-2 text-sm">
                <p>✅ No comprar el auto te conviene porque:</p>
                <ul className="ml-4 space-y-1">
                  <li>• Ahorras {formatMoney(Math.abs(resultados.diferencias.autoVsUber || resultados.diferencias.autoVsTransporte))} vs comprar</li>
                  <li>• Tu dinero genera rendimientos en inversiones</li>
                  <li>• Evitas depreciación y gastos de mantenimiento</li>
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Opción 1: Comprar Auto */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-blue-600" />
            Opción 1: Comprar el Auto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Inversión Inicial */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Inversión Inicial
            </h4>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Precio del auto:</span>
                <span className="font-semibold">{formatMoney(auto.precioCompra)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Dinero restante para invertir:</span>
                <span className="font-semibold text-emerald-600">{formatMoney(auto.dineroRestante)}</span>
              </div>
            </div>
          </div>

          {/* Gastos Mensuales */}
          <div>
            <h4 className="font-semibold mb-3">💳 Gastos Mensuales</h4>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Seguro:</span>
                <span>{formatMoney(auto.desglose.seguro)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Combustible:</span>
                <span>{formatMoney(auto.desglose.combustible)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Mantenimiento:</span>
                <span>{formatMoney(auto.desglose.mantenimiento)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Estacionamiento:</span>
                <span>{formatMoney(auto.desglose.estacionamiento)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Lavado:</span>
                <span>{formatMoney(auto.desglose.lavado)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total por mes:</span>
                  <span className="text-red-600">{formatMoney(auto.gastoMensual)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Gastos Totales */}
          <div>
            <h4 className="font-semibold mb-3">📊 Gastos en {anos} años</h4>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Gasto anual:</span>
                <span>{formatMoney(auto.gastoAnual)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Gasto total ({anos} años):</span>
                <span className="text-red-600">{formatMoney(auto.gastoTotal)}</span>
              </div>
            </div>
          </div>

          {/* Depreciación */}
          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              Depreciación del Auto
            </h4>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Valor al comprarlo:</span>
                <span className="font-semibold">{formatMoney(auto.valorInicial)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Valor en {anos} años:</span>
                <span className="font-semibold">{formatMoney(auto.valorFinal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Depreciación total:</span>
                <span className="font-semibold text-red-600">-{formatMoney(auto.depreciacionTotal)}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-start gap-1">
              <Info className="h-3 w-3 mt-0.5 shrink-0" />
              <span>El auto pierde valor cada año. Esto es lo que podrías venderlo después de {anos} años.</span>
            </p>
          </div>

          {/* Inversión del dinero restante */}
          {auto.dineroRestante > 0 && (
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-600" />
                Inversión del Dinero Restante
              </h4>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Dinero invertido:</span>
                  <span>{formatMoney(auto.inversionInicial)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Valor en {anos} años:</span>
                  <span className="font-semibold text-emerald-600">{formatMoney(auto.inversionFinal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Ganancia por invertir:</span>
                  <span className="font-semibold text-emerald-600">+{formatMoney(auto.gananciaInversion)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Resultado Final */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">🎯 Resultado Final</h4>
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-4 space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Valor del auto:</span>
                  <span>+{formatMoney(auto.valorFinal)}</span>
                </div>
                {auto.dineroRestante > 0 && (
                  <div className="flex justify-between">
                    <span>Dinero invertido:</span>
                    <span>+{formatMoney(auto.inversionFinal)}</span>
                  </div>
                )}
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Patrimonio Total:</span>
                  <span className={`font-bold text-2xl ${auto.patrimonioNeto >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {formatMoney(auto.patrimonioNeto)}
                  </span>
                </div>
              </div>
              <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
                <p className="font-semibold mb-1">💡 Costo real del auto:</p>
                <p>Compraste en {formatMoney(auto.precioCompra)}, gastaste {formatMoney(auto.gastoTotal)} en {anos} años, 
                y el auto vale {formatMoney(auto.valorFinal)}. El costo real fue: <strong>{formatMoney(auto.costoReal)}</strong></p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opción 2: Uber */}
      {uber.gastoMensual > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
              Opción 2: Usar Uber + Invertir Todo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Gasto mensual en Uber:</span>
                <span className="text-red-600">{formatMoney(uber.gastoMensual)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Gasto total ({anos} años):</span>
                <span className="text-red-600">{formatMoney(uber.gastoTotal)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-sm">
                  <span>Dinero invertido:</span>
                  <span>{formatMoney(uber.inversionInicial)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Valor en {anos} años:</span>
                  <span className="font-semibold text-emerald-600">{formatMoney(uber.inversionFinal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Ganancia por invertir:</span>
                  <span className="font-semibold text-emerald-600">+{formatMoney(uber.gananciaInversion)}</span>
                </div>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Patrimonio Total:</span>
                  <span className="font-bold text-xl text-emerald-600">
                    {formatMoney(uber.patrimonioNeto)}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              💡 Inviertes todo tu dinero y usas Uber cuando lo necesitas. Tu dinero crece con el tiempo.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Opción 3: Transporte Público */}
      {transporte.gastoMensual > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              Opción 3: Transporte Público + Invertir Todo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Gasto mensual en transporte:</span>
                <span className="text-red-600">{formatMoney(transporte.gastoMensual)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Gasto total ({anos} años):</span>
                <span className="text-red-600">{formatMoney(transporte.gastoTotal)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-sm">
                  <span>Dinero invertido:</span>
                  <span>{formatMoney(transporte.inversionInicial)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Valor en {anos} años:</span>
                  <span className="font-semibold text-emerald-600">{formatMoney(transporte.inversionFinal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Ganancia por invertir:</span>
                  <span className="font-semibold text-emerald-600">+{formatMoney(transporte.gananciaInversion)}</span>
                </div>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold">Patrimonio Total:</span>
                  <span className="font-bold text-xl text-emerald-600">
                    {formatMoney(transporte.patrimonioNeto)}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              💡 Inviertes todo tu dinero y usas transporte público. Es la opción más económica en transporte.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Comparación Final */}
      <Card className="border-2 border-emerald-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Comparación Final
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
              <span>Comprar Auto:</span>
              <span className="font-bold">{formatMoney(auto.patrimonioNeto)}</span>
            </div>
            {uber.gastoMensual > 0 && (
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span>Uber + Invertir:</span>
                <span className="font-bold">{formatMoney(uber.patrimonioNeto)}</span>
              </div>
            )}
            {transporte.gastoMensual > 0 && (
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span>Transporte + Invertir:</span>
                <span className="font-bold">{formatMoney(transporte.patrimonioNeto)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

