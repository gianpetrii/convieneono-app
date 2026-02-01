"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Home, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Info,
  Building2
} from "lucide-react";

interface ResultsDisplayInmuebleProps {
  resultados: any;
  anos: string;
  onlyRecommendation?: boolean;
}

export function ResultsDisplayInmueble({ resultados, anos, onlyRecommendation }: ResultsDisplayInmuebleProps) {
  
  const formatMoney = (value: number) => {
    return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  };

  const { inmueble, alquiler, mejorOpcion } = resultados;

  // Si solo queremos la recomendación
  if (onlyRecommendation) {
    // Determinar cuál es la mejor y peor opción para colorear
    const opciones = [
      { nombre: 'Comprar Inmueble', patrimonio: inmueble.patrimonioNeto, key: 'inmueble' },
      ...(alquiler.gastoMensual > 0 ? [{ nombre: 'Alquilar + Invertir', patrimonio: alquiler.patrimonioNeto, key: 'alquiler' }] : []),
    ];
    
    const mejorPatrimonio = Math.max(...opciones.map(o => o.patrimonio));
    const peorPatrimonio = Math.min(...opciones.map(o => o.patrimonio));

    const getColorClass = (patrimonio: number) => {
      if (patrimonio === mejorPatrimonio) return 'bg-emerald-500/20 border-2 border-emerald-500 text-emerald-700';
      if (patrimonio === peorPatrimonio && opciones.length > 1) return 'bg-red-500/10 border border-red-300 text-red-700';
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
            
            {mejorOpcion.nombre === 'Comprar Inmueble' ? (
              <div className="text-xs">
                <p className="font-medium mb-1">✅ Comprar te conviene porque:</p>
                <ul className="ml-3 space-y-0.5 text-muted-foreground">
                  <li>• Terminas con más patrimonio</li>
                  <li>• El inmueble se aprecia con el tiempo</li>
                  <li>• Construyes equidad propia</li>
                </ul>
              </div>
            ) : (
              <div className="text-xs">
                <p className="font-medium mb-1">✅ Alquilar te conviene porque:</p>
                <ul className="ml-3 space-y-0.5 text-muted-foreground">
                  <li>• Ahorras {formatMoney(Math.abs(resultados.diferencias.inmuebleVsAlquiler))} vs comprar</li>
                  <li>• Tu dinero genera rendimientos</li>
                  <li>• Mayor flexibilidad financiera</li>
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
      {/* Grid de 2 columnas para las opciones */}
      <div className={`grid gap-6 ${
        alquiler.gastoMensual > 0 ? 'md:grid-cols-2' : 'md:grid-cols-1'
      }`}>
        {/* Opción 1: Comprar Inmueble */}
        <Card className="flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Home className="h-5 w-5 text-blue-600" />
            Comprar el Inmueble
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
                <span>Precio del inmueble:</span>
                <span className="font-semibold">{formatMoney(inmueble.precioCompra)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Gastos iniciales:</span>
                <span className="font-semibold text-orange-600">{formatMoney(inmueble.gastosIniciales.total)}</span>
              </div>
              <div className="flex justify-between text-xs border-t pt-1.5">
                <span className="font-semibold">Total invertido:</span>
                <span className="font-semibold">{formatMoney(inmueble.inversionTotal)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Dinero restante invertido:</span>
                <span className="font-semibold text-emerald-600">{formatMoney(inmueble.dineroRestante)}</span>
              </div>
            </div>
          </div>

          {/* Gastos del Propietario */}
          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5 text-orange-600" />
              Gastos del Propietario
            </h4>
            <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span>Expensas:</span>
                <span>{formatMoney(inmueble.desglosePropietario.expensas)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Impuestos:</span>
                <span>{formatMoney(inmueble.desglosePropietario.impuestosMunicipales)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Seguro:</span>
                <span>{formatMoney(inmueble.desglosePropietario.seguro)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Mantenimiento:</span>
                <span>{formatMoney(inmueble.desglosePropietario.mantenimiento)}</span>
              </div>
              <div className="flex justify-between text-xs border-t pt-1.5">
                <span className="font-semibold">Subtotal propietario:</span>
                <span className="font-semibold text-orange-600">{formatMoney(inmueble.desglosePropietario.total)}</span>
              </div>
            </div>
          </div>

          {/* Servicios Básicos */}
          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
              <DollarSign className="h-3.5 w-3.5 text-blue-600" />
              Servicios Básicos
            </h4>
            <div className="bg-blue-500/5 rounded-lg p-3 space-y-1.5 border border-blue-500/20">
              <div className="flex justify-between text-xs">
                <span>Luz:</span>
                <span>{formatMoney(inmueble.desgloseServicios.luz)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Agua:</span>
                <span>{formatMoney(inmueble.desgloseServicios.agua)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Gas:</span>
                <span>{formatMoney(inmueble.desgloseServicios.gas)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Internet:</span>
                <span>{formatMoney(inmueble.desgloseServicios.internet)}</span>
              </div>
              <div className="flex justify-between text-xs border-t pt-1.5">
                <span className="font-semibold">Subtotal servicios:</span>
                <span className="font-semibold text-blue-600">{formatMoney(inmueble.desgloseServicios.total)}</span>
              </div>
              <p className="text-xs text-muted-foreground pt-1">
                ℹ️ Estos servicios se pagan igual al comprar o alquilar
              </p>
            </div>
          </div>

          {/* Total Mensual */}
          <div>
            <h4 className="font-semibold text-sm mb-2">Resumen Gastos Mensuales</h4>
            <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
              <div className="flex justify-between text-xs border-t pt-1.5">
                <span className="font-semibold">Total mensual:</span>
                <span className="font-semibold text-orange-600">{formatMoney(inmueble.gastoMensual)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Total en {anos} años:</span>
                <span className="font-semibold text-red-600">-{formatMoney(inmueble.gastoTotal)}</span>
              </div>
            </div>
          </div>

          {/* Apreciación del Inmueble */}
          <div>
            <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
              Apreciación del Inmueble
            </h4>
            <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
              <div className="flex justify-between text-xs">
                <span>Valor inicial:</span>
                <span>{formatMoney(inmueble.valorInicial)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Valor en {anos} años:</span>
                <span className="font-semibold text-emerald-600">{formatMoney(inmueble.valorFinal)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Apreciación total:</span>
                <span className="font-semibold text-emerald-600">+{formatMoney(inmueble.apreciacionTotal)}</span>
              </div>
            </div>
          </div>

          {/* Inversión del dinero restante */}
          {inmueble.dineroRestante > 0 && (
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                Inversión Restante
              </h4>
              <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span>Invertido:</span>
                  <span>{formatMoney(inmueble.inversionInicial)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Valor en {anos} años:</span>
                  <span className="font-semibold text-emerald-600">{formatMoney(inmueble.inversionFinal)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Ganancia:</span>
                  <span className="font-semibold text-emerald-600">+{formatMoney(inmueble.gananciaInversion)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Resultado Final */}
          <div className="border-t pt-3 mt-auto">
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-sm">Patrimonio Total:</span>
                <span className={`font-bold text-xl ${inmueble.patrimonioNeto >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {formatMoney(inmueble.patrimonioNeto)}
                </span>
              </div>
              <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                <p><strong>Costo real:</strong> {formatMoney(inmueble.costoReal)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

        {/* Opción 2: Alquilar */}
        {alquiler.gastoMensual > 0 && (
          <Card className="flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Home className="h-5 w-5 text-emerald-600" />
                Alquilar + Invertir
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 flex-1">
              {/* Inversión Total */}
              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-600" />
                  Inversión
                </h4>
                <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span>Dinero inicial invertido:</span>
                    <span className="font-semibold">{formatMoney(alquiler.inversionInicial)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Valor en {anos} años:</span>
                    <span className="font-semibold text-emerald-600">{formatMoney(alquiler.inversionFinal)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Ganancia:</span>
                    <span className="font-semibold text-emerald-600">+{formatMoney(alquiler.gananciaInversion)}</span>
                  </div>
                </div>
              </div>

              {/* Inversión del Diferencial */}
              {alquiler.invertirDiferencial && alquiler.diferencialMensual > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                    <DollarSign className="h-3.5 w-3.5 text-emerald-600" />
                    Inversión del Ahorro Mensual
                  </h4>
                  <div className="bg-emerald-500/10 rounded-lg p-3 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span>Ahorro mensual:</span>
                      <span className="font-semibold">{formatMoney(alquiler.diferencialMensual)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Invertido en {anos} años:</span>
                      <span className="font-semibold text-emerald-600">+{formatMoney(alquiler.inversionDiferencial)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      💡 Al gastar menos en alquiler que en mantener el inmueble, inviertes la diferencia mensualmente
                    </p>
                  </div>
                </div>
              )}

              {/* Gastos de Alquiler */}
              <div>
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-1">
                  <TrendingDown className="h-3.5 w-3.5 text-red-600" />
                  Gastos Mensuales
                </h4>
                <div className="bg-muted/50 rounded-lg p-3 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span>Alquiler mensual:</span>
                    <span className="font-semibold">{formatMoney(alquiler.alquilerMensual)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Servicios básicos:</span>
                    <span className="font-semibold">{formatMoney(alquiler.serviciosBasicos)}</span>
                  </div>
                  <div className="flex justify-between text-xs border-t pt-1.5">
                    <span className="font-semibold">Total mensual:</span>
                    <span className="font-semibold text-orange-600">{formatMoney(alquiler.gastoMensualTotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Total en {anos} años:</span>
                    <span className="font-semibold text-red-600">-{formatMoney(alquiler.gastoTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Resultado Final */}
              <div className="border-t pt-3 mt-auto">
                <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg p-3">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-sm">Patrimonio Total:</span>
                    <span className={`font-bold text-xl ${alquiler.patrimonioNeto >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {formatMoney(alquiler.patrimonioNeto)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                    <p>Inversión total - Gastos de alquiler</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Nota sobre inflación */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5" />
            <div className="space-y-1 text-sm">
              <p className="font-semibold">Nota sobre la inflación</p>
              <p className="text-muted-foreground">
                Los cálculos consideran una inflación del {resultados.inflacion.tasa.toFixed(1)}% anual. 
                La tasa real de inversión (descontando inflación) es de {resultados.inflacion.tasaRealInversion.toFixed(1)}% anual.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

