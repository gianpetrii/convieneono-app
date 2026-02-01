"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ShareResults } from "@/components/calculadora/share-results";
import { ResultsDisplay } from "@/components/calculadora/results-display";
import { Charts } from "@/components/calculadora/charts";
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
  ChevronUp,
  HelpCircle,
  ExternalLink
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AlternativaTransporte {
  id: string;
  nombre: string;
  transportePublico: string;
  uber: string;
}

function CalculadoraAutoContent() {
  const searchParams = useSearchParams();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [viewMode, setViewMode] = useState<'form' | 'results'>('form'); // 'form' o 'results'
  
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
    
    // Inversión
    tasaInversion: "8", // % anual
    invertirDiferencial: "true", // Invertir el ahorro mensual de no tener auto
    
    // Depreciación
    tasaDepreciacionAnual: "15", // % anual promedio
    
    // Inflación
    tasaInflacion: "3", // % anual
  });

  // Estado separado para alternativas de transporte
  const [alternativas, setAlternativas] = useState<AlternativaTransporte[]>([
    {
      id: "1",
      nombre: "Solo Uber",
      transportePublico: "0",
      uber: ""
    },
    {
      id: "2",
      nombre: "Solo Transporte Público",
      transportePublico: "",
      uber: "0"
    }
  ]);

  // Cargar datos desde URL params si existen
  useEffect(() => {
    const params: any = {};
    let alternativasFromUrl: AlternativaTransporte[] = [];
    
    searchParams.forEach((value, key) => {
      if (key === 'alternativas') {
        try {
          const parsed = JSON.parse(value);
          if (Array.isArray(parsed)) {
            alternativasFromUrl = parsed as AlternativaTransporte[];
          }
        } catch (e) {
          console.error('Error parsing alternativas from URL:', e);
        }
      } else {
        params[key] = value;
      }
    });
    
    if (Object.keys(params).length > 0) {
      setFormData(prev => ({ ...prev, ...params }));
      if (alternativasFromUrl.length > 0) {
        setAlternativas(alternativasFromUrl);
      }
      setShowResults(true);
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Funciones para manejar alternativas
  const handleAlternativaChange = (id: string, field: keyof AlternativaTransporte, value: string) => {
    setAlternativas(prev => prev.map(alt => 
      alt.id === id ? { ...alt, [field]: value } : alt
    ));
  };

  const agregarAlternativa = () => {
    if (alternativas.length >= 5) return;
    
    const newId = (Math.max(...alternativas.map(a => parseInt(a.id)), 0) + 1).toString();
    setAlternativas(prev => [...prev, {
      id: newId,
      nombre: `Alternativa ${newId}`,
      transportePublico: "",
      uber: ""
    }]);
  };

  const eliminarAlternativa = (id: string) => {
    if (alternativas.length <= 1) return; // Mantener al menos una
    setAlternativas(prev => prev.filter(alt => alt.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
    setViewMode('results'); // Cambiar a vista de resultados
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditForm = () => {
    setViewMode('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cálculos mejorados con explicaciones claras
  const calcularResultados = () => {
    const precio = parseFloat(formData.precioAuto) || 0;
    const disponible = parseFloat(formData.dineroDisponible) || 0;
    const anos = parseInt(formData.anosProyeccion) || 5;
    
    // === GASTOS MENSUALES DEL AUTO ===
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
    
    // === GASTOS ANUALES ===
    const patente = parseFloat(formData.patente) || 0;
    const reparaciones = parseFloat(formData.reparacionesAnual) || 0;
    const gastosAnualesAuto = (gastosMensualesAuto * 12) + patente + reparaciones;
    
    // === TOTAL GASTADO EN TODOS LOS AÑOS ===
    const totalGastadoAuto = gastosAnualesAuto * anos;
    
    // === DEPRECIACIÓN DEL AUTO (cada año pierde valor) ===
    const tasaDepr = parseFloat(formData.tasaDepreciacionAnual) / 100 || 0.15;
    let valorAuto = precio;
    for (let i = 0; i < anos; i++) {
      valorAuto *= (1 - tasaDepr); // Cada año pierde el % indicado
    }
    const depreciacionTotal = precio - valorAuto;
    
    // === INVERSIÓN DEL DINERO RESTANTE ===
    const dineroRestante = disponible - precio;
    const tasaInv = parseFloat(formData.tasaInversion) / 100 || 0.08;
    const tasaInfla = parseFloat(formData.tasaInflacion) / 100 || 0.03;
    const tasaRealInversion = ((1 + tasaInv) / (1 + tasaInfla)) - 1; // Tasa real descontando inflación
    const inversionRestante = dineroRestante > 0 ? dineroRestante * Math.pow(1 + tasaInv, anos) : 0;
    const inversionRealRestante = dineroRestante > 0 ? dineroRestante * Math.pow(1 + tasaRealInversion, anos) : 0;
    const gananciaInversion = dineroRestante > 0 ? inversionRestante - dineroRestante : 0;
    
    // === PATRIMONIO NETO CON AUTO ===
    // Lo que tienes = Valor del auto + Dinero invertido - Gastos totales
    const patrimonioAuto = valorAuto + inversionRestante;
    const costoRealAuto = precio + totalGastadoAuto - valorAuto; // Lo que realmente te costó el auto
    
    // === ALTERNATIVAS DE TRANSPORTE ===
    const invertirDiferencial = formData.invertirDiferencial === "true";
    
    // Filtrar solo alternativas con valores > 0
    const alternativasValidas = alternativas.filter(alt => {
      const tp = parseFloat(alt.transportePublico) || 0;
      const ub = parseFloat(alt.uber) || 0;
      return tp > 0 || ub > 0;
    });

    // Calcular resultados para cada alternativa
    const resultadosAlternativas = alternativasValidas.map(alt => {
      const transporteMensual = parseFloat(alt.transportePublico) || 0;
      const uberMensual = parseFloat(alt.uber) || 0;
      const gastoMensualTotal = transporteMensual + uberMensual;
      const totalGastado = gastoMensualTotal * 12 * anos;
      
      // Calcular diferencial de gastos (lo que ahorras al no tener auto)
      const diferencialMensual = Math.max(0, gastosMensualesAuto - gastoMensualTotal);
      
      let inversionBase = disponible * Math.pow(1 + tasaInv, anos);
      let inversionDiferencial = 0;
      
      // Si se invierte el diferencial, calcular inversión de aportes mensuales
      if (invertirDiferencial && diferencialMensual > 0) {
        // Fórmula de valor futuro de anualidad: FV = PMT × [((1 + r)^n - 1) / r]
        const mesesTotales = anos * 12;
        const tasaMensual = Math.pow(1 + tasaInv, 1/12) - 1;
        inversionDiferencial = diferencialMensual * (Math.pow(1 + tasaMensual, mesesTotales) - 1) / tasaMensual;
      }
      
      const inversionTotal = inversionBase + inversionDiferencial;
      const inversionReal = disponible * Math.pow(1 + tasaRealInversion, anos);
      const gananciaInversion = inversionTotal - disponible;
      const patrimonioNeto = inversionTotal - totalGastado;
      
      return {
        id: alt.id,
        nombre: alt.nombre,
        gastoMensualTransporte: transporteMensual,
        gastoMensualUber: uberMensual,
        gastoMensualTotal,
        gastoTotal: totalGastado,
        inversionInicial: disponible,
        inversionFinal: inversionTotal,
        inversionRealFinal: inversionReal,
        gananciaInversion,
        patrimonioNeto,
        diferencialMensual,
        inversionDiferencial,
        invertirDiferencial
      };
    });
    
    // === MEJOR OPCIÓN ===
    const opciones = [
      { nombre: 'Comprar Auto', patrimonio: patrimonioAuto },
      ...resultadosAlternativas.map(alt => ({ nombre: alt.nombre, patrimonio: alt.patrimonioNeto }))
    ];
    const mejorOpcion = opciones.reduce((prev, current) => 
      current.patrimonio > prev.patrimonio ? current : prev
    );
    
    return {
      auto: {
        // Inversión inicial
        precioCompra: precio,
        dineroRestante: Math.max(0, dineroRestante),
        
        // Gastos
        gastoMensual: gastosMensualesAuto,
        gastoAnual: gastosAnualesAuto,
        gastoTotal: totalGastadoAuto,
        
        // Desglose gastos mensuales
        desglose: {
          seguro: seguroMensual,
          combustible: combustibleMensual,
          mantenimiento,
          estacionamiento,
          lavado: lavadoMensual
        },
        
        // Depreciación
        valorInicial: precio,
        valorFinal: valorAuto,
        depreciacionTotal,
        
        // Inversión
        inversionInicial: Math.max(0, dineroRestante),
        inversionFinal: inversionRestante,
        inversionRealFinal: inversionRealRestante,
        gananciaInversion,
        
        // Resultado final
        patrimonioNeto: patrimonioAuto,
        costoReal: costoRealAuto
      },
      alternativas: resultadosAlternativas,
      inflacion: {
        tasa: tasaInfla * 100,
        tasaRealInversion: tasaRealInversion * 100
      },
      mejorOpcion
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

      {/* Vista de Formulario */}
      {viewMode === 'form' && (
        <div className="max-w-3xl mx-auto">
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
                  <NumberInput
                    id="precioAuto"
                    name="precioAuto"
                    placeholder="20,000"
                    value={formData.precioAuto}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dineroDisponible">Dinero Disponible ($)</Label>
                  <NumberInput
                    id="dineroDisponible"
                    name="dineroDisponible"
                    placeholder="25,000"
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
                  <NumberInput
                    id="seguro"
                    name="seguro"
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
                      <NumberInput
                        name="combustibleKmMes"
                        placeholder="1,000"
                        value={formData.combustibleKmMes}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted-foreground mt-1">km/mes</p>
                    </div>
                    <div>
                      <NumberInput
                        name="combustibleConsumo"
                        placeholder="10"
                        value={formData.combustibleConsumo}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted-foreground mt-1">L/100km</p>
                    </div>
                    <div>
                      <NumberInput
                        name="combustiblePrecio"
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
                  <NumberInput
                    id="mantenimientoMensual"
                    name="mantenimientoMensual"
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
                  <NumberInput
                    id="estacionamiento"
                    name="estacionamiento"
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
                      <NumberInput
                        name="lavadoFrecuencia"
                        placeholder="4 o 0.5"
                        value={formData.lavadoFrecuencia}
                        onChange={handleChange}
                      />
                      <p className="text-xs text-muted-foreground mt-1">veces/mes (ej: 0.5 = cada 2 meses)</p>
                    </div>
                    <div>
                      <NumberInput
                        name="lavadoCosto"
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
                  <div className="flex items-center justify-between">
                    <Label htmlFor="patente">Patente/Impuestos Anuales ($)</Label>
                    <a
                      href="https://www.dnrpa.gov.ar/valuacion/cons_valuacion.php?historial=no"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      Consultar en DNRPA
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <NumberInput
                    id="patente"
                    name="patente"
                    placeholder="500"
                    value={formData.patente}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Usa el link para obtener la valuación oficial de tu auto
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reparacionesAnual">Reparaciones Imprevistas Anuales ($)</Label>
                  <NumberInput
                    id="reparacionesAnual"
                    name="reparacionesAnual"
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
                  Compara diferentes opciones de movilidad sin comprar el auto
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Lista de alternativas */}
                {alternativas.map((alt, index) => (
                  <div key={alt.id} className="space-y-3 p-4 rounded-lg border bg-muted/30">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-semibold">
                        Alternativa {index + 1}
                      </Label>
                      {alternativas.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => eliminarAlternativa(alt.id)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        >
                          ✕
                        </Button>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`nombre-${alt.id}`}>Nombre</Label>
                      <Input
                        id={`nombre-${alt.id}`}
                        value={alt.nombre}
                        onChange={(e) => handleAlternativaChange(alt.id, 'nombre', e.target.value)}
                        placeholder="Ej: Solo Uber, Combinado, etc."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor={`transporte-${alt.id}`}>Transporte Público ($)</Label>
                        <NumberInput
                          id={`transporte-${alt.id}`}
                          value={alt.transportePublico}
                          onChange={(e) => handleAlternativaChange(alt.id, 'transportePublico', e.target.value)}
                          placeholder="0"
                        />
                        <p className="text-xs text-muted-foreground">$/mes</p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`uber-${alt.id}`}>Uber/Taxi ($)</Label>
                        <NumberInput
                          id={`uber-${alt.id}`}
                          value={alt.uber}
                          onChange={(e) => handleAlternativaChange(alt.id, 'uber', e.target.value)}
                          placeholder="0"
                        />
                        <p className="text-xs text-muted-foreground">$/mes</p>
                      </div>
                    </div>

                    {/* Mostrar total */}
                    {(parseFloat(alt.transportePublico) > 0 || parseFloat(alt.uber) > 0) && (
                      <div className="pt-2 border-t">
                        <p className="text-sm font-medium">
                          Total mensual: ${((parseFloat(alt.transportePublico) || 0) + (parseFloat(alt.uber) || 0)).toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                    )}
                  </div>
                ))}

                {/* Botón para agregar alternativa */}
                {alternativas.length < 5 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={agregarAlternativa}
                    className="w-full"
                  >
                    + Agregar alternativa
                  </Button>
                )}

                {/* Ayuda con ejemplos */}
                <div className="rounded-lg border p-4 bg-blue-500/5">
                  <p className="text-sm font-medium mb-2">💡 Ejemplos:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• <strong>Solo Uber:</strong> Transporte: $0, Uber: $200</li>
                    <li>• <strong>Solo Transporte:</strong> Transporte: $50, Uber: $0</li>
                    <li>• <strong>Combinado:</strong> Transporte: $50, Uber: $80</li>
                  </ul>
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
                    <label
                      htmlFor="invertirDiferencial"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      Invertir el ahorro mensual 💰
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Si gastas menos en transporte alternativo que en mantener un auto, invierte esa diferencia mensualmente. 
                      Esto hace la comparación más realista.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Opciones Avanzadas */}
            <Card>
              <CardHeader
                className="cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <div className="flex w-full items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Opciones Avanzadas
                  </CardTitle>
                  {showAdvanced ? <ChevronUp /> : <ChevronDown />}
                </div>
              </CardHeader>
              {showAdvanced && (
                <CardContent className="space-y-4">
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
                      Rendimiento esperado si inviertes el dinero
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tasaDepreciacionAnual">Depreciación Anual (%)</Label>
                    <NumberInput
                      id="tasaDepreciacionAnual"
                      name="tasaDepreciacionAnual"
                      placeholder="15"
                      value={formData.tasaDepreciacionAnual}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Porcentaje que pierde valor el auto cada año (típico: 10-20%)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tasaInflacion">Inflación Anual (%)</Label>
                    <NumberInput
                      id="tasaInflacion"
                      name="tasaInflacion"
                      placeholder="3"
                      value={formData.tasaInflacion}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Inflación esperada por año (afecta el poder adquisitivo)
                    </p>
                  </div>
                </CardContent>
              )}
            </Card>

            <Button type="submit" size="lg" className="w-full gap-2">
              <Calculator className="h-5 w-5" />
              Ver Resultados
            </Button>
          </form>
        </div>
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
              <Charts 
                resultados={resultados}
                anos={formData.anosProyeccion}
                formData={formData}
              />

              {/* Recomendación */}
              <ResultsDisplay 
                resultados={resultados}
                anos={formData.anosProyeccion}
                onlyRecommendation={true}
              />
            </div>

            {/* Resultados detallados */}
            <ResultsDisplay 
              resultados={resultados}
              anos={formData.anosProyeccion}
              onlyRecommendation={false}
            />

            {/* Componente de Compartir */}
            <ShareResults 
              formData={formData}
              resultados={resultados}
              tipo="auto"
              alternativas={alternativas}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function CalculadoraAutoPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Cargando calculadora...</p>
          </div>
        </div>
      </div>
    }>
      <CalculadoraAutoContent />
    </Suspense>
  );
}

