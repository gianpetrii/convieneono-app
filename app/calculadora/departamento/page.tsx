"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ShareResults } from "@/components/calculadora/share-results";
import { ResultsDisplayInmueble } from "@/components/calculadora/results-display-inmueble";
import { ChartsInmueble } from "@/components/calculadora/charts-inmueble";
import { 
  Home, 
  Calculator, 
  TrendingUp, 
  DollarSign,
  Building2,
  FileText,
  Zap,
  Wrench,
  Shield,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  HelpCircle
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function CalculadoraInmueblePage() {
  const searchParams = useSearchParams();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [viewMode, setViewMode] = useState<'form' | 'results'>('form');
  
  const [formData, setFormData] = useState({
    // Datos básicos
    precioInmueble: "",
    dineroDisponible: "",
    anosProyeccion: "10",
    
    // Gastos mensuales del inmueble
    expensas: "",
    impuestosMunicipales: "",
    seguroHogar: "",
    luz: "",
    agua: "",
    gas: "",
    internet: "",
    mantenimientoMensual: "",
    
    // Gastos iniciales (una vez)
    escrituracion: "", // Se calculará como % si está vacío
    impuestoTransferencia: "", // Se calculará como % si está vacío
    comisionInmobiliaria: "", // Se calculará como % si está vacío
    
    // Alternativa: Alquilar
    alquilerMensual: "",
    invertirDiferencial: "true",
    
    // Opciones avanzadas
    tasaInversion: "8", // % anual
    tasaApreciacion: "3", // % anual (el inmueble GANA valor)
    tasaInflacion: "3.5", // % anual - Valor sugerido INDEC
    
    // Porcentajes para gastos iniciales (editables)
    porcentajeEscrituracion: "3",
    porcentajeImpuesto: "1.5",
    porcentajeComision: "4",
  });

  // Cargar datos desde URL params si existen
  useEffect(() => {
    const params: any = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    
    if (Object.keys(params).length > 0) {
      setFormData(prev => ({ ...prev, ...params }));
      setShowResults(true);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
    setViewMode('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditForm = () => {
    setViewMode('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calcular gastos iniciales automáticamente si están vacíos
  const calcularGastoInicial = (campo: string, porcentaje: string) => {
    const valor = formData[campo as keyof typeof formData];
    if (valor && valor !== "") return parseFloat(valor);
    
    const precio = parseFloat(formData.precioInmueble) || 0;
    const porc = parseFloat(porcentaje) / 100 || 0;
    return precio * porc;
  };

  // Cálculos
  const calcularResultados = () => {
    const precio = parseFloat(formData.precioInmueble) || 0;
    const disponible = parseFloat(formData.dineroDisponible) || 0;
    const anos = parseInt(formData.anosProyeccion) || 10;
    
    // === GASTOS INICIALES (UNA VEZ) ===
    const escrituracion = calcularGastoInicial('escrituracion', formData.porcentajeEscrituracion);
    const impuestoTransf = calcularGastoInicial('impuestoTransferencia', formData.porcentajeImpuesto);
    const comision = calcularGastoInicial('comisionInmobiliaria', formData.porcentajeComision);
    const gastosIniciales = escrituracion + impuestoTransf + comision;
    const inversionTotal = precio + gastosIniciales;
    
    // === GASTOS MENSUALES DEL INMUEBLE ===
    const expensas = parseFloat(formData.expensas) || 0;
    const impuestosMunicipales = parseFloat(formData.impuestosMunicipales) || 0;
    const seguro = parseFloat(formData.seguroHogar) || 0;
    const luz = parseFloat(formData.luz) || 0;
    const agua = parseFloat(formData.agua) || 0;
    const gas = parseFloat(formData.gas) || 0;
    const internet = parseFloat(formData.internet) || 0;
    const mantenimiento = parseFloat(formData.mantenimientoMensual) || 0;
    
    const gastosMensualesInmueble = expensas + impuestosMunicipales + seguro + luz + agua + gas + internet + mantenimiento;
    
    // === GASTOS ANUALES ===
    const gastosAnualesInmueble = gastosMensualesInmueble * 12;
    
    // === TOTAL GASTADO EN TODOS LOS AÑOS ===
    const totalGastadoInmueble = gastosAnualesInmueble * anos;
    
    // === APRECIACIÓN DEL INMUEBLE (cada año GANA valor) ===
    const tasaAprec = parseFloat(formData.tasaApreciacion) / 100 || 0.03;
    let valorInmueble = precio;
    for (let i = 0; i < anos; i++) {
      valorInmueble *= (1 + tasaAprec); // Cada año gana el % indicado
    }
    const apreciacionTotal = valorInmueble - precio;
    
    // === INVERSIÓN DEL DINERO RESTANTE ===
    const dineroRestante = disponible - inversionTotal;
    const tasaInv = parseFloat(formData.tasaInversion) / 100 || 0.08;
    const tasaInfla = parseFloat(formData.tasaInflacion) / 100 || 0.035;
    const tasaRealInversion = ((1 + tasaInv) / (1 + tasaInfla)) - 1;
    const inversionRestante = dineroRestante > 0 ? dineroRestante * Math.pow(1 + tasaInv, anos) : 0;
    const inversionRealRestante = dineroRestante > 0 ? dineroRestante * Math.pow(1 + tasaRealInversion, anos) : 0;
    const gananciaInversion = dineroRestante > 0 ? inversionRestante - dineroRestante : 0;
    
    // === PATRIMONIO NETO CON INMUEBLE ===
    const patrimonioInmueble = valorInmueble + inversionRestante;
    const costoRealInmueble = inversionTotal + totalGastadoInmueble - valorInmueble;
    
    // === ALTERNATIVA: ALQUILAR ===
    const alquilerMensual = parseFloat(formData.alquilerMensual) || 0;
    const totalGastadoAlquiler = alquilerMensual * 12 * anos;
    const invertirDiferencial = formData.invertirDiferencial === "true";
    
    // Calcular diferencial de gastos (lo que ahorras al alquilar vs comprar)
    const diferencialAlquiler = Math.max(0, gastosMensualesInmueble - alquilerMensual);
    
    let inversionAlquiler = disponible * Math.pow(1 + tasaInv, anos);
    let inversionDiferencialAlquiler = 0;
    
    // Si se invierte el diferencial, calcular inversión de aportes mensuales
    if (invertirDiferencial && diferencialAlquiler > 0) {
      const mesesTotales = anos * 12;
      const tasaMensual = Math.pow(1 + tasaInv, 1/12) - 1;
      inversionDiferencialAlquiler = diferencialAlquiler * (Math.pow(1 + tasaMensual, mesesTotales) - 1) / tasaMensual;
    }
    
    const inversionTotalAlquiler = inversionAlquiler + inversionDiferencialAlquiler;
    const inversionRealAlquiler = disponible * Math.pow(1 + tasaRealInversion, anos);
    const gananciaInversionAlquiler = inversionTotalAlquiler - disponible;
    const patrimonioAlquiler = inversionTotalAlquiler - totalGastadoAlquiler;
    
    // === MEJOR OPCIÓN ===
    const opciones = [
      { nombre: 'Comprar Inmueble', patrimonio: patrimonioInmueble },
      { nombre: 'Alquilar + Invertir', patrimonio: patrimonioAlquiler }
    ];
    const mejorOpcion = opciones.reduce((prev, current) => 
      current.patrimonio > prev.patrimonio ? current : prev
    );
    
    return {
      inmueble: {
        // Inversión inicial
        precioCompra: precio,
        gastosIniciales: {
          escrituracion,
          impuestoTransferencia: impuestoTransf,
          comisionInmobiliaria: comision,
          total: gastosIniciales
        },
        inversionTotal,
        dineroRestante: Math.max(0, dineroRestante),
        
        // Gastos
        gastoMensual: gastosMensualesInmueble,
        gastoAnual: gastosAnualesInmueble,
        gastoTotal: totalGastadoInmueble,
        
        // Desglose gastos mensuales
        desglose: {
          expensas,
          impuestosMunicipales,
          seguro,
          luz,
          agua,
          gas,
          internet,
          mantenimiento
        },
        
        // Apreciación
        valorInicial: precio,
        valorFinal: valorInmueble,
        apreciacionTotal,
        
        // Inversión
        inversionInicial: Math.max(0, dineroRestante),
        inversionFinal: inversionRestante,
        inversionRealFinal: inversionRealRestante,
        gananciaInversion,
        
        // Resultado final
        patrimonioNeto: patrimonioInmueble,
        costoReal: costoRealInmueble
      },
      alquiler: {
        gastoMensual: alquilerMensual,
        gastoTotal: totalGastadoAlquiler,
        inversionInicial: disponible,
        inversionFinal: inversionTotalAlquiler,
        inversionRealFinal: inversionRealAlquiler,
        gananciaInversion: gananciaInversionAlquiler,
        patrimonioNeto: patrimonioAlquiler,
        diferencialMensual: diferencialAlquiler,
        inversionDiferencial: inversionDiferencialAlquiler,
        invertirDiferencial: invertirDiferencial
      },
      inflacion: {
        tasa: tasaInfla * 100,
        tasaRealInversion: tasaRealInversion * 100
      },
      mejorOpcion,
      diferencias: {
        inmuebleVsAlquiler: patrimonioInmueble - patrimonioAlquiler
      }
    };
  };

  const resultados = showResults ? calcularResultados() : null;

  return (
    <div className="container py-12 md:py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
            <Home className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Calculadora de Inmuebles</h1>
        <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
          Descubre si te conviene comprar un inmueble (departamento, casa, terreno) o seguir alquilando e invertir la diferencia.
        </p>
      </div>

      {/* Vista de Formulario */}
      {viewMode === 'form' && (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
          {/* Datos Básicos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Información General
              </CardTitle>
              <CardDescription>
                Datos básicos sobre el inmueble y tu situación financiera
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="precioInmueble">Precio del Inmueble ($)</Label>
                  <NumberInput
                    id="precioInmueble"
                    name="precioInmueble"
                    placeholder="200000"
                    value={formData.precioInmueble}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dineroDisponible">Dinero Disponible ($)</Label>
                  <NumberInput
                    id="dineroDisponible"
                    name="dineroDisponible"
                    placeholder="250000"
                    value={formData.dineroDisponible}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="anosProyeccion">Años de Proyección</Label>
                <select
                  id="anosProyeccion"
                  name="anosProyeccion"
                  value={formData.anosProyeccion}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
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
                <DollarSign className="h-5 w-5 text-primary" />
                Gastos Mensuales del Inmueble
              </CardTitle>
              <CardDescription>
                Gastos recurrentes que tendrás cada mes al ser propietario
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="expensas" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Expensas Mensuales ($)
                  </Label>
                  <NumberInput
                    id="expensas"
                    name="expensas"
                    placeholder="150"
                    value={formData.expensas}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="impuestosMunicipales" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Impuestos Municipales Mensuales ($)
                  </Label>
                  <NumberInput
                    id="impuestosMunicipales"
                    name="impuestosMunicipales"
                    placeholder="80"
                    value={formData.impuestosMunicipales}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seguroHogar" className="flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Seguro del Hogar ($)
                  </Label>
                  <NumberInput
                    id="seguroHogar"
                    name="seguroHogar"
                    placeholder="50"
                    value={formData.seguroHogar}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="luz" className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    Luz ($)
                  </Label>
                  <NumberInput
                    id="luz"
                    name="luz"
                    placeholder="80"
                    value={formData.luz}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="agua">Agua ($)</Label>
                  <NumberInput
                    id="agua"
                    name="agua"
                    placeholder="40"
                    value={formData.agua}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gas">Gas ($)</Label>
                  <NumberInput
                    id="gas"
                    name="gas"
                    placeholder="50"
                    value={formData.gas}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="internet">Internet ($)</Label>
                  <NumberInput
                    id="internet"
                    name="internet"
                    placeholder="60"
                    value={formData.internet}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mantenimientoMensual" className="flex items-center gap-2">
                    <Wrench className="h-4 w-4" />
                    Mantenimiento/Reparaciones Mensuales ($)
                  </Label>
                  <NumberInput
                    id="mantenimientoMensual"
                    name="mantenimientoMensual"
                    placeholder="100"
                    value={formData.mantenimientoMensual}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Gastos Iniciales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Gastos Iniciales de Compra
              </CardTitle>
              <CardDescription>
                Gastos que pagas una sola vez al comprar (se calculan automáticamente como % del precio, pero puedes editarlos)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="escrituracion">Escrituración y Gastos Legales ($)</Label>
                  <NumberInput
                    id="escrituracion"
                    name="escrituracion"
                    placeholder={`~${calcularGastoInicial('escrituracion', formData.porcentajeEscrituracion).toFixed(0)} (${formData.porcentajeEscrituracion}%)`}
                    value={formData.escrituracion}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="impuestoTransferencia">Impuesto a la Transferencia ($)</Label>
                  <NumberInput
                    id="impuestoTransferencia"
                    name="impuestoTransferencia"
                    placeholder={`~${calcularGastoInicial('impuestoTransferencia', formData.porcentajeImpuesto).toFixed(0)} (${formData.porcentajeImpuesto}%)`}
                    value={formData.impuestoTransferencia}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comisionInmobiliaria">Comisión Inmobiliaria ($)</Label>
                  <NumberInput
                    id="comisionInmobiliaria"
                    name="comisionInmobiliaria"
                    placeholder={`~${calcularGastoInicial('comisionInmobiliaria', formData.porcentajeComision).toFixed(0)} (${formData.porcentajeComision}%)`}
                    value={formData.comisionInmobiliaria}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
                💡 Si dejas los campos vacíos, se calculan automáticamente: Escrituración {formData.porcentajeEscrituracion}%, Impuesto {formData.porcentajeImpuesto}%, Comisión {formData.porcentajeComision}%
              </div>
            </CardContent>
          </Card>

          {/* Alternativa: Alquilar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5 text-primary" />
                Alternativa: Seguir Alquilando
              </CardTitle>
              <CardDescription>
                ¿Cuánto pagarías de alquiler por un inmueble similar?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="alquilerMensual">Alquiler Mensual ($)</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="font-semibold mb-1">¿Cómo calcularlo?</p>
                        <ul className="text-xs space-y-1">
                          <li>• Busca inmuebles similares en tu zona</li>
                          <li>• Promedia 3-5 opciones</li>
                          <li>• Considera aumentos anuales por inflación</li>
                          <li>• Ejemplo: $500-$800/mes según zona</li>
                        </ul>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <NumberInput
                  id="alquilerMensual"
                  name="alquilerMensual"
                  placeholder="600"
                  value={formData.alquilerMensual}
                  onChange={handleChange}
                />
              </div>

              {/* Opción de invertir el diferencial */}
              <div className="flex items-start space-x-3 rounded-lg border p-4 bg-emerald-500/5">
                <Checkbox
                  id="invertirDiferencial"
                  checked={formData.invertirDiferencial === "true"}
                  onCheckedChange={(checked) => {
                    setFormData(prev => ({
                      ...prev,
                      invertirDiferencial: checked ? "true" : "false"
                    }));
                  }}
                />
                <div className="space-y-1 leading-none">
                  <Label
                    htmlFor="invertirDiferencial"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Invertir el ahorro mensual 💰
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Si gastas menos en alquiler que en mantener el inmueble, invierte esa diferencia mensualmente. 
                    Esto hace la comparación más realista.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Opciones Avanzadas */}
          <Card>
            <CardHeader>
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full flex items-center justify-between hover:opacity-70 transition-opacity"
              >
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Opciones Avanzadas
                </CardTitle>
                {showAdvanced ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {!showAdvanced && (
                <CardDescription>
                  Tasas de inversión, apreciación e inflación
                </CardDescription>
              )}
            </CardHeader>
            {showAdvanced && (
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tasaInversion">Tasa de Inversión Anual (%)</Label>
                    <NumberInput
                      id="tasaInversion"
                      name="tasaInversion"
                      placeholder="8"
                      value={formData.tasaInversion}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Rendimiento anual esperado si inviertes tu dinero
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tasaApreciacion">Tasa de Apreciación del Inmueble (%)</Label>
                    <NumberInput
                      id="tasaApreciacion"
                      name="tasaApreciacion"
                      placeholder="3"
                      value={formData.tasaApreciacion}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Cuánto aumenta de valor el inmueble cada año (histórico ~3%)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tasaInflacion">Tasa de Inflación Anual (%)</Label>
                    <NumberInput
                      id="tasaInflacion"
                      name="tasaInflacion"
                      placeholder="3.5"
                      value={formData.tasaInflacion}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      💡 INDEC: Inflación esperada ~3.5% anual (ajusta según tu país)
                    </p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
                  <AlertCircle className="h-4 w-4 inline mr-1" />
                  Los valores por defecto son promedios históricos. Ajústalos según tu situación.
                </div>
              </CardContent>
            )}
          </Card>

          {/* Botón Submit */}
          <Button type="submit" size="lg" className="w-full">
            <Calculator className="mr-2 h-5 w-5" />
            Calcular y Ver Resultados
          </Button>
        </form>
      )}

      {/* Vista de Resultados */}
      {viewMode === 'results' && showResults && resultados && (
        <div className="max-w-6xl mx-auto">
          {/* Botón para volver al formulario */}
          <div className="mb-6">
            <Button 
              onClick={handleEditForm}
              variant="outline"
              className="gap-2"
            >
              ← Editar Datos
            </Button>
          </div>

          <div className="space-y-6">
            {/* Gráfico y Recomendación en 2 columnas */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Gráficos */}
              <ChartsInmueble 
                resultados={resultados}
                anos={formData.anosProyeccion}
                formData={formData}
              />

              {/* Recomendación */}
              <ResultsDisplayInmueble 
                resultados={resultados}
                anos={formData.anosProyeccion}
                onlyRecommendation={true}
              />
            </div>

            {/* Resultados detallados */}
            <ResultsDisplayInmueble 
              resultados={resultados}
              anos={formData.anosProyeccion}
              onlyRecommendation={false}
            />

            {/* Componente de Compartir */}
            <ShareResults 
              formData={formData}
              resultados={resultados}
              tipo="departamento"
            />
          </div>
        </div>
      )}
    </div>
  );
}
