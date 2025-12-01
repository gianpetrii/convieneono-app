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
          <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg p-4">
            <p className="text-xl font-bold mb-1">
              {mejorOpcion.nombre}
            </p>
            <p className="text-sm text-muted-foreground mb-3">
              Esta opción te deja con {formatMoney(mejorOpcion.patrimonio)} en {anos} años
            </p>
            
            {mejorOpcion.nombre === 'Comprar Auto' ? (
              <div className="text-sm">
                <p className="font-medium mb-1">✅ El auto te conviene porque:</p>
                <ul className="ml-4 space-y-0.5 text-xs">
                  <li>• Terminas con más patrimonio que las alternativas</li>
                  <li>• El valor residual del auto compensa los gastos</li>
                </ul>
              </div>
            ) : (
              <div className="text-sm">
                <p className="font-medium mb-1">✅ No comprar el auto te conviene porque:</p>
                <ul className="ml-4 space-y-0.5 text-xs">
                  <li>• Ahorras {formatMoney(Math.abs(resultados.diferencias.autoVsUber || resultados.diferencias.autoVsTransporte))} vs comprar</li>
                  <li>• Tu dinero genera rendimientos en inversiones</li>
                  <li>• Evitas depreciación y gastos de mantenimiento</li>
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Grid de 2 columnas para las opciones */}
      <div className="grid md:grid-cols-2 gap-6">
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

        {/* Opción 2: Uber */}
        {uber.gastoMensual > 0 && (
          <Card className="flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                Uber + Invertir
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              <div>
                <h4 className="font-semibold text-sm mb-2">🚗 Gasto en Uber</h4>
                <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span>Gasto mensual:</span>
                    <span className="text-red-600">{formatMoney(uber.gastoMensual)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Total en {anos} años:</span>
                    <span className="text-red-600 font-semibold">{formatMoney(uber.gastoTotal)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                  Inversión Total
                </h4>
                <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span>Invertido:</span>
                    <span>{formatMoney(uber.inversionInicial)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Valor en {anos} años:</span>
                    <span className="font-semibold text-emerald-600">{formatMoney(uber.inversionFinal)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Ganancia:</span>
                    <span className="font-semibold text-emerald-600">+{formatMoney(uber.gananciaInversion)}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-3 mt-auto">
                <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">Patrimonio Total:</span>
                    <span className="font-bold text-xl text-emerald-600">
                      {formatMoney(uber.patrimonioNeto)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    💡 Todo tu dinero invertido generando rendimientos
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Opción 3: Transporte Público */}
        {transporte.gastoMensual > 0 && (
          <Card className="flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                Transporte + Invertir
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              <div>
                <h4 className="font-semibold text-sm mb-2">🚌 Gasto en Transporte</h4>
                <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span>Gasto mensual:</span>
                    <span className="text-red-600">{formatMoney(transporte.gastoMensual)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Total en {anos} años:</span>
                    <span className="text-red-600 font-semibold">{formatMoney(transporte.gastoTotal)}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                  Inversión Total
                </h4>
                <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span>Invertido:</span>
                    <span>{formatMoney(transporte.inversionInicial)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Valor en {anos} años:</span>
                    <span className="font-semibold text-emerald-600">{formatMoney(transporte.inversionFinal)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Ganancia:</span>
                    <span className="font-semibold text-emerald-600">+{formatMoney(transporte.gananciaInversion)}</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-3 mt-auto">
                <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm">Patrimonio Total:</span>
                    <span className="font-bold text-xl text-emerald-600">
                      {formatMoney(transporte.patrimonioNeto)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    💡 Opción más económica en transporte
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Comparación Final */}
      <Card className="border-2 border-emerald-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <AlertCircle className="h-5 w-5" />
            Comparación Final
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3">
            <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
              <span className="text-xs text-muted-foreground mb-1">Comprar Auto</span>
              <span className="font-bold text-lg">{formatMoney(auto.patrimonioNeto)}</span>
            </div>
            {uber.gastoMensual > 0 && (
              <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
                <span className="text-xs text-muted-foreground mb-1">Uber + Invertir</span>
                <span className="font-bold text-lg">{formatMoney(uber.patrimonioNeto)}</span>
              </div>
            )}
            {transporte.gastoMensual > 0 && (
              <div className="flex flex-col items-center justify-center p-3 bg-muted/50 rounded-lg">
                <span className="text-xs text-muted-foreground mb-1">Transporte + Invertir</span>
                <span className="font-bold text-lg">{formatMoney(transporte.patrimonioNeto)}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

