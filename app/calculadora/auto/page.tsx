"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Car, 
  Calculator, 
  TrendingUp, 
  DollarSign,
  Fuel,
  Shield,
  Wrench,
  ParkingCircle,
  Droplet,
  FileText,
  AlertCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";

export default function CalculadoraAutoPage() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const [formData, setFormData] = useState({
    // Datos básicos
    precioAuto: "",
    dineroDisponible: "",
    anosProyeccion: "5",
    
    // Gastos mensuales
    seguro: "",
    combustibleKmMes: "",
    combustibleConsumo: "10", // litros por 100km
    combustiblePrecio: "",
    mantenimientoMensual: "",
    estacionamiento: "",
    lavadoFrecuencia: "4", // veces por mes
    lavadoCosto: "",
    
    // Gastos anuales
    patente: "",
    reparacionesAnual: "",
    
    // Alternativas
    uberMensual: "",
    transportePublico: "",
    
    // Inversión
    tasaInversion: "8", // % anual
    
    // Depreciación
    tasaDepreciacion: "15", // % primer año
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
    // Scroll to results
    setTimeout(() => {
      document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Cálculos
  const calcularResultados = () => {
    const precio = parseFloat(formData.precioAuto) || 0;
    const disponible = parseFloat(formData.dineroDisponible) || 0;
    const anos = parseInt(formData.anosProyeccion) || 5;
    
    // Gastos mensuales del auto
    const seguroMensual = parseFloat(formData.seguro) || 0;
    const kmMes = parseFloat(formData.combustibleKmMes) || 0;
    const consumo = parseFloat(formData.combustibleConsumo) || 10;
    const precioCombustible = parseFloat(formData.combustiblePrecio) || 0;
    const combustibleMensual = (kmMes / 100) * consumo * precioCombustible;
    const mantenimiento = parseFloat(formData.mantenimientoMensual) || 0;
    const estacionamiento = parseFloat(formData.estacionamiento) || 0;
    const lavadoFrec = parseFloat(formData.lavadoFrecuencia) || 0;
    const lavadoCosto = parseFloat(formData.lavadoCosto) || 0;
    const lavadoMensual = lavadoFrec * lavadoCosto;
    
    const gastosMensualesAuto = seguroMensual + combustibleMensual + mantenimiento + estacionamiento + lavadoMensual;
    
    // Gastos anuales
    const patente = parseFloat(formData.patente) || 0;
    const reparaciones = parseFloat(formData.reparacionesAnual) || 0;
    const gastosAnualesAuto = patente + reparaciones;
    
    // Total gastado en el auto
    const totalGastadoAuto = (gastosMensualesAuto * 12 * anos) + (gastosAnualesAuto * anos);
    
    // Depreciación del auto
    const tasaDepr = parseFloat(formData.tasaDepreciacion) / 100 || 0.15;
    let valorAuto = precio;
    for (let i = 0; i < anos; i++) {
      valorAuto *= (1 - tasaDepr * (i === 0 ? 1 : 0.8)); // Primera año deprecia más
    }
    
    // Dinero restante invertido (si compra el auto)
    const dineroRestante = disponible - precio;
    const tasaInv = parseFloat(formData.tasaInversion) / 100 || 0.08;
    const inversionRestante = dineroRestante > 0 ? dineroRestante * Math.pow(1 + tasaInv, anos) : 0;
    
    // Patrimonio neto si compra el auto
    const patrimonioAuto = valorAuto + inversionRestante - totalGastadoAuto;
    
    // Alternativa: Uber/Taxi
    const uberMensual = parseFloat(formData.uberMensual) || 0;
    const totalGastadoUber = uberMensual * 12 * anos;
    const inversionUber = disponible * Math.pow(1 + tasaInv, anos);
    const patrimonioUber = inversionUber - totalGastadoUber;
    
    // Alternativa: Transporte público
    const transporteMensual = parseFloat(formData.transportePublico) || 0;
    const totalGastadoTransporte = transporteMensual * 12 * anos;
    const inversionTransporte = disponible * Math.pow(1 + tasaInv, anos);
    const patrimonioTransporte = inversionTransporte - totalGastadoTransporte;
    
    return {
      auto: {
        precio,
        valorFinal: valorAuto,
        gastosRecurrentes: totalGastadoAuto,
        inversion: inversionRestante,
        patrimonioNeto: patrimonioAuto,
        gastoMensual: gastosMensualesAuto
      },
      uber: {
        gastoTotal: totalGastadoUber,
        inversion: inversionUber,
        patrimonioNeto: patrimonioUber,
        gastoMensual: uberMensual
      },
      transporte: {
        gastoTotal: totalGastadoTransporte,
        inversion: inversionTransporte,
        patrimonioNeto: patrimonioTransporte,
        gastoMensual: transporteMensual
      },
      diferencias: {
        autoVsUber: patrimonioAuto - patrimonioUber,
        autoVsTransporte: patrimonioAuto - patrimonioTransporte,
        uberVsTransporte: patrimonioUber - patrimonioTransporte
      }
    };
  };

  const resultados = showResults ? calcularResultados() : null;

  return (
    <div className="container py-12 md:py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
            <Car className="h-8 w-8 text-emerald-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Calculadora de Auto</h1>
        <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
          Descubre si te conviene comprar un auto o usar alternativas de transporte. 
          Incluye todos los costos reales y el costo de oportunidad.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Formulario */}
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Datos Básicos */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Datos Básicos
                </CardTitle>
                <CardDescription>
                  Información general sobre el auto y tu situación
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="precioAuto">Precio del Auto ($)</Label>
                  <Input
                    id="precioAuto"
                    name="precioAuto"
                    type="number"
                    placeholder="20000"
                    value={formData.precioAuto}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dineroDisponible">Dinero Disponible ($)</Label>
                  <Input
                    id="dineroDisponible"
                    name="dineroDisponible"
                    type="number"
                    placeholder="25000"
                    value={formData.dineroDisponible}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Total de ahorros que tienes disponibles
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="anosProyeccion">Años de Proyección</Label>
                  <select
                    id="anosProyeccion"
                    name="anosProyeccion"
                    value={formData.anosProyeccion}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="1">1 año</option>
                    <option value="3">3 años</option>
                    <option value="5">5 años</option>
                    <option value="10">10 años</option>
                    <option value="15">15 años</option>
                    <option value="20">20 años</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Gastos Mensuales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Gastos Mensuales del Auto
                </CardTitle>
                <CardDescription>
                  Costos recurrentes que tendrás cada mes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seguro" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Seguro Mensual ($)
                  </Label>
                  <Input
                    id="seguro"
                    name="seguro"
                    type="number"
                    placeholder="100"
                    value={formData.seguro}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Fuel className="h-4 w-4" />
                    Combustible
                  </Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <Input
                        name="combustibleKmMes"
                        type="number"
                        placeholder="1000"
                        value={formData.combustibleKmMes}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted-foreground mt-1">km/mes</p>
                    </div>
                    <div>
                      <Input
                        name="combustibleConsumo"
                        type="number"
                        step="0.1"
                        placeholder="10"
                        value={formData.combustibleConsumo}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted-foreground mt-1">L/100km</p>
                    </div>
                    <div>
                      <Input
                        name="combustiblePrecio"
                        type="number"
                        step="0.01"
                        placeholder="1.5"
                        value={formData.combustiblePrecio}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted-foreground mt-1">$/litro</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mantenimientoMensual" className="flex items-center gap-2">
                    <Wrench className="h-4 w-4" />
                    Mantenimiento Mensual ($)
                  </Label>
                  <Input
                    id="mantenimientoMensual"
                    name="mantenimientoMensual"
                    type="number"
                    placeholder="50"
                    value={formData.mantenimientoMensual}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Cambios de aceite, filtros, revisiones, etc.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estacionamiento" className="flex items-center gap-2">
                    <ParkingCircle className="h-4 w-4" />
                    Estacionamiento Mensual ($)
                  </Label>
                  <Input
                    id="estacionamiento"
                    name="estacionamiento"
                    type="number"
                    placeholder="0"
                    value={formData.estacionamiento}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Garage, cochera o estacionamiento público
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Droplet className="h-4 w-4" />
                    Lavado
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Input
                        name="lavadoFrecuencia"
                        type="number"
                        placeholder="4"
                        value={formData.lavadoFrecuencia}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted-foreground mt-1">veces/mes</p>
                    </div>
                    <div>
                      <Input
                        name="lavadoCosto"
                        type="number"
                        placeholder="10"
                        value={formData.lavadoCosto}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted-foreground mt-1">$/lavado</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gastos Anuales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Gastos Anuales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="patente">Patente/Impuestos Anuales ($)</Label>
                  <Input
                    id="patente"
                    name="patente"
                    type="number"
                    placeholder="500"
                    value={formData.patente}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reparacionesAnual">Reparaciones Imprevistas Anuales ($)</Label>
                  <Input
                    id="reparacionesAnual"
                    name="reparacionesAnual"
                    type="number"
                    placeholder="300"
                    value={formData.reparacionesAnual}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Estimado de reparaciones no planificadas
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Alternativas de Transporte */}
            <Card>
              <CardHeader>
                <CardTitle>Alternativas de Transporte</CardTitle>
                <CardDescription>
                  ¿Cuánto gastarías si no compras el auto?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="uberMensual">Uber/Taxi Mensual ($)</Label>
                  <Input
                    id="uberMensual"
                    name="uberMensual"
                    type="number"
                    placeholder="150"
                    value={formData.uberMensual}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transportePublico">Transporte Público Mensual ($)</Label>
                  <Input
                    id="transportePublico"
                    name="transportePublico"
                    type="number"
                    placeholder="50"
                    value={formData.transportePublico}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Opciones Avanzadas */}
            <Card>
              <CardHeader>
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex w-full items-center justify-between"
                >
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Opciones Avanzadas
                  </CardTitle>
                  {showAdvanced ? <ChevronUp /> : <ChevronDown />}
                </button>
              </CardHeader>
              {showAdvanced && (
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tasaInversion">Tasa de Inversión Anual (%)</Label>
                    <Input
                      id="tasaInversion"
                      name="tasaInversion"
                      type="number"
                      step="0.1"
                      placeholder="8"
                      value={formData.tasaInversion}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Rendimiento esperado si inviertes el dinero
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tasaDepreciacion">Depreciación Primer Año (%)</Label>
                    <Input
                      id="tasaDepreciacion"
                      name="tasaDepreciacion"
                      type="number"
                      step="0.1"
                      placeholder="15"
                      value={formData.tasaDepreciacion}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Cuánto pierde valor el auto el primer año
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>

            <Button type="submit" size="lg" className="w-full gap-2">
              <Calculator className="h-5 w-5" />
              Calcular Resultados
            </Button>
          </form>
        </div>

        {/* Resultados */}
        <div id="resultados">
          {showResults && resultados ? (
            <div className="space-y-6 sticky top-20">
              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle className="text-2xl">Resultados</CardTitle>
                  <CardDescription>
                    Proyección a {formData.anosProyeccion} años
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Escenario 1: Comprar Auto */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Car className="h-5 w-5 text-blue-600" />
                      <h3 className="font-bold text-lg">Comprar el Auto</h3>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Valor del auto hoy:</span>
                        <span className="font-semibold">${resultados.auto.precio.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Valor en {formData.anosProyeccion} años:</span>
                        <span className="font-semibold">${resultados.auto.valorFinal.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Gastos recurrentes:</span>
                        <span className="font-semibold text-red-600">-${resultados.auto.gastosRecurrentes.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Dinero restante invertido:</span>
                        <span className="font-semibold text-emerald-600">+${resultados.auto.inversion.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between">
                          <span className="font-bold">Patrimonio Neto:</span>
                          <span className={`font-bold text-lg ${resultados.auto.patrimonioNeto >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            ${resultados.auto.patrimonioNeto.toLocaleString(undefined, {maximumFractionDigits: 0})}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Gasto mensual promedio: ${resultados.auto.gastoMensual.toLocaleString(undefined, {maximumFractionDigits: 0})}
                      </div>
                    </div>
                  </div>

                  {/* Escenario 2: Uber */}
                  {formData.uberMensual && parseFloat(formData.uberMensual) > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-emerald-600" />
                        <h3 className="font-bold text-lg">Invertir + Usar Uber</h3>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Inversión inicial:</span>
                          <span className="font-semibold">${formData.dineroDisponible}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Inversión en {formData.anosProyeccion} años:</span>
                          <span className="font-semibold text-emerald-600">+${resultados.uber.inversion.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Gastado en Uber:</span>
                          <span className="font-semibold text-red-600">-${resultados.uber.gastoTotal.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between">
                            <span className="font-bold">Patrimonio Neto:</span>
                            <span className={`font-bold text-lg ${resultados.uber.patrimonioNeto >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                              ${resultados.uber.patrimonioNeto.toLocaleString(undefined, {maximumFractionDigits: 0})}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Gasto mensual: ${resultados.uber.gastoMensual.toLocaleString(undefined, {maximumFractionDigits: 0})}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Escenario 3: Transporte Público */}
                  {formData.transportePublico && parseFloat(formData.transportePublico) > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-purple-600" />
                        <h3 className="font-bold text-lg">Invertir + Transporte Público</h3>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Inversión inicial:</span>
                          <span className="font-semibold">${formData.dineroDisponible}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Inversión en {formData.anosProyeccion} años:</span>
                          <span className="font-semibold text-emerald-600">+${resultados.transporte.inversion.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Gastado en transporte:</span>
                          <span className="font-semibold text-red-600">-${resultados.transporte.gastoTotal.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                        </div>
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between">
                            <span className="font-bold">Patrimonio Neto:</span>
                            <span className={`font-bold text-lg ${resultados.transporte.patrimonioNeto >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                              ${resultados.transporte.patrimonioNeto.toLocaleString(undefined, {maximumFractionDigits: 0})}
                            </span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Gasto mensual: ${resultados.transporte.gastoMensual.toLocaleString(undefined, {maximumFractionDigits: 0})}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Comparación Final */}
                  <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 rounded-lg p-4 border-2 border-emerald-500/20">
                    <h3 className="font-bold mb-3 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Conclusión
                    </h3>
                    {formData.uberMensual && parseFloat(formData.uberMensual) > 0 && (
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Comprar auto vs Uber:</span>
                          <span className={`font-bold ${resultados.diferencias.autoVsUber >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {resultados.diferencias.autoVsUber >= 0 ? '+' : ''}${resultados.diferencias.autoVsUber.toLocaleString(undefined, {maximumFractionDigits: 0})}
                          </span>
                        </div>
                        {resultados.diferencias.autoVsUber < 0 && (
                          <p className="text-xs text-muted-foreground bg-emerald-500/10 p-2 rounded">
                            💡 Usar Uber te dejaría <strong>${Math.abs(resultados.diferencias.autoVsUber).toLocaleString(undefined, {maximumFractionDigits: 0})} más</strong> en {formData.anosProyeccion} años
                          </p>
                        )}
                      </div>
                    )}
                    {formData.transportePublico && parseFloat(formData.transportePublico) > 0 && (
                      <div className="space-y-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Comprar auto vs Transporte:</span>
                          <span className={`font-bold ${resultados.diferencias.autoVsTransporte >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {resultados.diferencias.autoVsTransporte >= 0 ? '+' : ''}${resultados.diferencias.autoVsTransporte.toLocaleString(undefined, {maximumFractionDigits: 0})}
                          </span>
                        </div>
                        {resultados.diferencias.autoVsTransporte < 0 && (
                          <p className="text-xs text-muted-foreground bg-emerald-500/10 p-2 rounded">
                            💡 Usar transporte público te dejaría <strong>${Math.abs(resultados.diferencias.autoVsTransporte).toLocaleString(undefined, {maximumFractionDigits: 0})} más</strong> en {formData.anosProyeccion} años
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <Calculator className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">Completa el formulario</h3>
                <p className="text-sm text-muted-foreground">
                  Ingresa tus datos en el formulario de la izquierda para ver los resultados aquí
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

