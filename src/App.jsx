import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Package,
  MapPin,
  CalendarClock,
  Ship,
  CheckCircle2,
  Clock3,
  CircleAlert,
  FileText,
  Boxes,
  Route,
  Building2,
  Anchor,
  ClipboardList,
  Globe2,
  Truck,
  ChevronRight,
  Download,
  RefreshCw,
  ShieldCheck,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  UserCircle2,
  Lock,
  LayoutDashboard,
  Save,
  X,
} from "lucide-react";
import logo from "./assets/logo.jpeg";

const initialShipments = [
  {
    trackingNumber: "NBOG08038500",
    bookingNumber: "BKG-59384021",
    blNumber: "Money-nbog070345",
    reference: "PO-EC-450921",
    carrier: "ONE Logistics",
    serviceMode: "Marítimo",
    status: "In Transit",
    statusLabelEs: "En tránsito",
    statusTone: "blue",
    origin: "Génova, Italia",
    originPort: "Puerto de Génova",
    destination: "Guayaquil-Posorja, Ecuador",
    destinationPort: "Puerto Marítimo de Posorja",
    vessel: "Geapmthemv260sE",
    voyage: "068E",
    eta: "15 Mar 2026",
    etd: "17 Ene 2026",
    transitDays: 58,
    customer: "Andes Trade S.A.",
    consignee: "Distribuciones Pacífico",
    grossWeight: "18,420 kg",
    volume: "58.4 CBM",
    packages: 112,
    incoterm: "CIF", 
    lastEvent: "Arrived at transshipment port",
    lastEventEs: "Rumbo al puerto de destino",
    progress: 85,
    routePoints: [
      { name: "Génova", type: "Puerto de origen", done: true },
      { name: "Panamá", type: "Transbordo", done: true },
      { name: "Buenaventura", type: "Escala", done: true },
      { name: "Guayaquil-Posorja", type: "Destino", done: false },
    ],
    containers: [
      { id: "OOLU9452018", type: "40HC", status: "Loaded on vessel", seal: "SL829311", weight: "12,100 kg" },
      { id: "TGBU1184092", type: "20GP", status: "In transit", seal: "SL829312", weight: "6,320 kg" },
    ],
    documents: [
      { name: "Bill of Lading", code: "BL-ONE-2026-45871", status: "Disponible" },
      { name: "Commercial Invoice", code: "INV-832991", status: "Disponible" },
      { name: "Packing List", code: "PKL-832991", status: "Disponible" },
    ],
    milestones: [
      {
        date: "18 Feb 2026 · 10:45",
        title: "Puerto de transbordo",
        detail: "La carga arribó al puerto intermedio.",
        location: "Panamá",
        done: true,
      },
      {
        date: "27 Feb 2026 · 22:10",
        title: "Salida Transbordo",
        detail: "La mercadería salió en el barco Geapmthemv260sE.",
        location: "Panamá",
        done: true,
      },
      {
        date: "07 Mar 2026 · 16:20",
        title: "Escala",
        detail: "La terminal confirmó recepción documental y física de la carga.",
        location: "Puerto Buenaventura",
        done: true,
      },
      {
        date: "15 Mar 2026 · Estimado",
        title: "Arribo a destino",
        detail: "Arribo estimado al puerto de Posorja-Guayaquil, sujeto a condiciones operativas y navieras.",
        location: "Posorja-Guayaquil",
        done: false,
      },
    ],
  },
  {
    trackingNumber: "UIOEXP240311",
    bookingNumber: "BKG-240311-02",
    blNumber: "AWB-170-88372819",
    reference: "SO-UIO-10294",
    carrier: "AeroExpress",
    serviceMode: "Air Freight",
    status: "Delivered",
    statusLabelEs: "Entregado",
    statusTone: "emerald",
    origin: "Miami, USA",
    originPort: "MIA Cargo Terminal",
    destination: "Quito, Ecuador",
    destinationPort: "UIO Cargo Terminal",
    vessel: "AE Cargo 702",
    voyage: "702",
    eta: "05 Mar 2026",
    etd: "03 Mar 2026",
    transitDays: 2,
    customer: "Importadora Sierra Norte",
    consignee: "Bodega Matriz Quito",
    grossWeight: "1,240 kg",
    volume: "8.1 CBM",
    packages: 24,
    incoterm: "DAP",
    lastEvent: "Proof of delivery completed",
    lastEventEs: "Entrega confirmada al destinatario",
    progress: 100,
    routePoints: [
      { name: "Miami", type: "Origen", done: true },
      { name: "Quito", type: "Destino", done: true },
    ],
    containers: [{ id: "ULD-AKE12983", type: "ULD", status: "Delivered", seal: "AE1782", weight: "1,240 kg" }],
    documents: [
      { name: "Air Waybill", code: "AWB-170-88372819", status: "Disponible" },
      { name: "Delivery Proof", code: "POD-992881", status: "Disponible" },
    ],
    milestones: [
      {
        date: "05 Mar 2026 · 14:20",
        title: "Entrega final",
        detail: "Mercancía entregada y recibida conforme por el destinatario.",
        location: "Quito",
        done: true,
      },
      {
        date: "05 Mar 2026 · 09:10",
        title: "Liberación aduanera",
        detail: "Carga liberada y habilitada para despacho local.",
        location: "Quito Airport",
        done: true,
      },
      {
        date: "04 Mar 2026 · 23:55",
        title: "Arribo al aeropuerto destino",
        detail: "Vuelo de carga aterrizó sin novedades operativas.",
        location: "Quito Airport",
        done: true,
      },
    ],
  },
  {
    trackingNumber: "GYECOU883104",
    bookingNumber: "BKG-883104",
    blNumber: "LTR-883104-EC",
    reference: "WEB-ORDER-883104",
    carrier: "Ruta Courier",
    serviceMode: "Ground Transport",
    status: "Exception",
    statusLabelEs: "Incidencia",
    statusTone: "red",
    origin: "Guayaquil, Ecuador",
    originPort: "Centro Logístico GYE",
    destination: "Cuenca, Ecuador",
    destinationPort: "Agencia Cuenca",
    vessel: "Unidad TRK-21",
    voyage: "TRK21",
    eta: "09 Mar 2026",
    etd: "06 Mar 2026",
    transitDays: 3,
    customer: "Comercial Austro",
    consignee: "Sucursal Cuenca",
    grossWeight: "420 kg",
    volume: "3.8 CBM",
    packages: 9,
    incoterm: "DDP",
    lastEvent: "Delay due to route closure",
    lastEventEs: "Demora por cierre temporal de ruta",
    progress: 54,
    routePoints: [
      { name: "Guayaquil", type: "Origen", done: true },
      { name: "El Triunfo", type: "Control", done: true },
      { name: "Zhud", type: "Ruta", done: false },
      { name: "Cuenca", type: "Destino", done: false },
    ],
    containers: [{ id: "PKG-009883", type: "Pallet", status: "Delayed", seal: "RC1221", weight: "420 kg" }],
    documents: [
      { name: "Dispatch Note", code: "DSP-883104", status: "Disponible" },
      { name: "Incident Report", code: "INC-221904", status: "Pendiente" },
    ],
    milestones: [
      {
        date: "07 Mar 2026 · 06:40",
        title: "Incidencia de ruta",
        detail: "Se reporta cierre temporal en la vía. Se mantiene monitoreo para reanudar traslado.",
        location: "Tramo Zhud",
        done: true,
      },
      {
        date: "06 Mar 2026 · 18:00",
        title: "Salida de centro logístico",
        detail: "Carga despachada desde Guayaquil hacia Cuenca.",
        location: "Guayaquil",
        done: true,
      },
      {
        date: "09 Mar 2026 · Estimado",
        title: "Entrega reprogramada",
        detail: "Entrega sujeta a reapertura vial y confirmación del transportista.",
        location: "Cuenca",
        done: false,
      },
    ],
  },
];

const publicTabs = [
  { key: "summary", label: "Resumen" },
  { key: "events", label: "Eventos" },
  { key: "containers", label: "Contenedores" },
  { key: "documents", label: "Documentos" },
];

const adminTabs = [
  { key: "dashboard", label: "Dashboard" },
  { key: "shipments", label: "Embarques" },
  { key: "events", label: "Eventos" },
  { key: "documents", label: "Documentos" },
];

const toneClasses = {
  blue: "bg-blue-100 text-blue-700 border-blue-200",
  emerald: "bg-emerald-100 text-emerald-700 border-emerald-200",
  red: "bg-red-100 text-red-700 border-red-200",
};

const statusCatalog = {
  "In Transit": { label: "En tránsito", tone: "blue" },
  Delivered: { label: "Entregado", tone: "emerald" },
  Exception: { label: "Incidencia", tone: "red" },
};

function toSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 24);
}

function buildRoutePoints(origin, destination) {
  return [
    { name: origin || "Origen", type: "Origen", done: true },
    { name: "Hub", type: "Control", done: false },
    { name: destination || "Destino", type: "Destino", done: false },
  ];
}

function buildShipmentFromForm(form, existing) {
  const statusMeta = statusCatalog[form.status] || statusCatalog["In Transit"];
  const trackingNumber = form.trackingNumber?.trim() || `TRK-${toSlug(form.reference || form.customer || "nuevo")}`.toUpperCase();

  return {
    ...(existing || {}),
    trackingNumber,
    bookingNumber: form.bookingNumber.trim(),
    blNumber: form.blNumber.trim(),
    reference: form.reference.trim(),
    carrier: form.carrier.trim(),
    serviceMode: form.serviceMode.trim(),
    status: form.status,
    statusLabelEs: statusMeta.label,
    statusTone: statusMeta.tone,
    origin: form.origin.trim(),
    originPort: form.originPort.trim(),
    destination: form.destination.trim(),
    destinationPort: form.destinationPort.trim(),
    vessel: form.vessel.trim(),
    voyage: form.voyage.trim(),
    eta: form.eta.trim(),
    etd: form.etd.trim(),
    transitDays: Number(form.transitDays || 0),
    customer: form.customer.trim(),
    consignee: form.consignee.trim(),
    grossWeight: form.grossWeight.trim(),
    volume: form.volume.trim(),
    packages: Number(form.packages || 0),
    incoterm: form.incoterm.trim(),
    lastEvent: form.lastEvent.trim(),
    lastEventEs: form.lastEventEs.trim(),
    progress: Number(form.progress || 0),
    routePoints: existing?.routePoints?.length ? existing.routePoints : buildRoutePoints(form.origin.trim(), form.destination.trim()),
    containers: existing?.containers || [],
    documents: existing?.documents || [],
    milestones: existing?.milestones || [],
  };
}

function emptyShipmentForm() {
  return {
    trackingNumber: "",
    bookingNumber: "",
    blNumber: "",
    reference: "",
    carrier: "",
    serviceMode: "Ocean Freight",
    status: "In Transit",
    origin: "",
    originPort: "",
    destination: "",
    destinationPort: "",
    vessel: "",
    voyage: "",
    eta: "",
    etd: "",
    transitDays: 0,
    customer: "",
    consignee: "",
    grossWeight: "",
    volume: "",
    packages: 0,
    incoterm: "",
    lastEvent: "",
    lastEventEs: "",
    progress: 0,
  };
}

function emptyEventForm() {
  return {
    date: "",
    title: "",
    detail: "",
    location: "",
    done: true,
  };
}

function emptyDocumentForm() {
  return {
    name: "",
    code: "",
    status: "Disponible",
  };
}

function StatCard({ icon: Icon, title, value, hint }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <Icon className="h-4 w-4 text-[#0f4ea3]" />
      </div>
      <p className="mt-3 text-lg font-bold text-slate-900">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

function SectionTitle({ title, subtitle, icon: Icon }) {
  return (
    <div className="border-b border-slate-200 px-6 py-5">
      <div className="flex items-center gap-3">
        {Icon ? <Icon className="h-5 w-5 text-[#0f4ea3]" /> : null}
        <div>
          <h3 className="text-xl font-bold text-[#0b2b5b]">{title}</h3>
          {subtitle ? <p className="mt-1 text-sm text-slate-500">{subtitle}</p> : null}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text", as = "input", options = [], min, max }) {
  const baseClass = "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#0f4ea3]";
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-600">{label}</span>
      {as === "select" ? (
        <select className={baseClass} value={value} onChange={onChange}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : as === "textarea" ? (
        <textarea className={`${baseClass} min-h-[96px]`} value={value} onChange={onChange} placeholder={placeholder} />
      ) : (
        <input className={baseClass} type={type} value={value} onChange={onChange} placeholder={placeholder} min={min} max={max} />
      )}
    </label>
  );
}

function ShipmentForm({ form, onChange, onSubmit, onCancel, mode = "create" }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <SectionTitle
        title={mode === "edit" ? "Editar embarque" : "Nuevo embarque"}
        subtitle="Registro administrativo de tracking, booking y parámetros logísticos"
        icon={Package}
      />
      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">
        <Field label="Tracking" value={form.trackingNumber} onChange={(e) => onChange("trackingNumber", e.target.value)} placeholder="TRK-2026-001" />
        <Field label="Booking" value={form.bookingNumber} onChange={(e) => onChange("bookingNumber", e.target.value)} placeholder="BKG-001" />
        <Field label="B/L" value={form.blNumber} onChange={(e) => onChange("blNumber", e.target.value)} placeholder="BL-001" />
        <Field label="Referencia" value={form.reference} onChange={(e) => onChange("reference", e.target.value)} placeholder="PO-001" />
        <Field label="Carrier" value={form.carrier} onChange={(e) => onChange("carrier", e.target.value)} placeholder="Nombre transportista" />
        <Field label="Servicio" value={form.serviceMode} onChange={(e) => onChange("serviceMode", e.target.value)} placeholder="Ocean Freight" />
        <Field
          label="Estado"
          as="select"
          value={form.status}
          onChange={(e) => onChange("status", e.target.value)}
          options={[
            { value: "In Transit", label: "En tránsito" },
            { value: "Delivered", label: "Entregado" },
            { value: "Exception", label: "Incidencia" },
          ]}
        />
        <Field label="Origen" value={form.origin} onChange={(e) => onChange("origin", e.target.value)} placeholder="Quito, Ecuador" />
        <Field label="Puerto / centro origen" value={form.originPort} onChange={(e) => onChange("originPort", e.target.value)} placeholder="Terminal origen" />
        <Field label="Destino" value={form.destination} onChange={(e) => onChange("destination", e.target.value)} placeholder="Guayaquil, Ecuador" />
        <Field label="Puerto / centro destino" value={form.destinationPort} onChange={(e) => onChange("destinationPort", e.target.value)} placeholder="Terminal destino" />
        <Field label="Nave / unidad" value={form.vessel} onChange={(e) => onChange("vessel", e.target.value)} placeholder="Unidad operativa" />
        <Field label="Voyage" value={form.voyage} onChange={(e) => onChange("voyage", e.target.value)} placeholder="068E" />
        <Field label="ETD" value={form.etd} onChange={(e) => onChange("etd", e.target.value)} placeholder="10 Mar 2026" />
        <Field label="ETA" value={form.eta} onChange={(e) => onChange("eta", e.target.value)} placeholder="15 Mar 2026" />
        <Field label="Días tránsito" type="number" value={form.transitDays} onChange={(e) => onChange("transitDays", e.target.value)} />
        <Field label="Cliente" value={form.customer} onChange={(e) => onChange("customer", e.target.value)} placeholder="Cliente" />
        <Field label="Consignatario" value={form.consignee} onChange={(e) => onChange("consignee", e.target.value)} placeholder="Consignatario" />
        <Field label="Peso bruto" value={form.grossWeight} onChange={(e) => onChange("grossWeight", e.target.value)} placeholder="1,240 kg" />
        <Field label="Volumen" value={form.volume} onChange={(e) => onChange("volume", e.target.value)} placeholder="8.1 CBM" />
        <Field label="Bultos" type="number" value={form.packages} onChange={(e) => onChange("packages", e.target.value)} />
        <Field label="Incoterm" value={form.incoterm} onChange={(e) => onChange("incoterm", e.target.value)} placeholder="CIF" />
        <Field label="Último evento (EN)" value={form.lastEvent} onChange={(e) => onChange("lastEvent", e.target.value)} placeholder="Loaded on vessel" />
        <Field label="Último evento (ES)" value={form.lastEventEs} onChange={(e) => onChange("lastEventEs", e.target.value)} placeholder="Cargado en nave" />
        <Field label="Progreso %" type="number" min={0} max={100} value={form.progress} onChange={(e) => onChange("progress", e.target.value)} />
      </div>
      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
        <button onClick={onCancel} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600">
          Cancelar
        </button>
        <button onClick={onSubmit} className="inline-flex items-center gap-2 rounded-xl bg-[#0f4ea3] px-4 py-2 text-sm font-semibold text-white shadow-sm">
          <Save className="h-4 w-4" /> {mode === "edit" ? "Guardar cambios" : "Crear embarque"}
        </button>
      </div>
    </div>
  );
}

function EventForm({ form, onChange, onSubmit, onCancel }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <SectionTitle title="Registrar evento" subtitle="Actualiza hitos y trazabilidad operativa" icon={Clock3} />
      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
        <Field label="Fecha / texto" value={form.date} onChange={(e) => onChange("date", e.target.value)} placeholder="10 Mar 2026 · 12:45" />
        <Field label="Ubicación" value={form.location} onChange={(e) => onChange("location", e.target.value)} placeholder="Puerto / agencia / ciudad" />
        <Field label="Título" value={form.title} onChange={(e) => onChange("title", e.target.value)} placeholder="Evento" />
        <Field
          label="Estado"
          as="select"
          value={String(form.done)}
          onChange={(e) => onChange("done", e.target.value === "true")}
          options={[
            { value: "true", label: "Completado" },
            { value: "false", label: "Pendiente" },
          ]}
        />
        <div className="md:col-span-2">
          <Field label="Detalle" as="textarea" value={form.detail} onChange={(e) => onChange("detail", e.target.value)} placeholder="Descripción del evento" />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
        <button onClick={onCancel} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600">
          Cancelar
        </button>
        <button onClick={onSubmit} className="inline-flex items-center gap-2 rounded-xl bg-[#0f4ea3] px-4 py-2 text-sm font-semibold text-white shadow-sm">
          <Plus className="h-4 w-4" /> Agregar evento
        </button>
      </div>
    </div>
  );
}

function DocumentForm({ form, onChange, onSubmit, onCancel }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <SectionTitle title="Registrar documento" subtitle="Asocia documentos operativos al embarque" icon={FileText} />
      <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-3">
        <Field label="Nombre" value={form.name} onChange={(e) => onChange("name", e.target.value)} placeholder="Bill of Lading" />
        <Field label="Código" value={form.code} onChange={(e) => onChange("code", e.target.value)} placeholder="BL-001" />
        <Field
          label="Estado"
          as="select"
          value={form.status}
          onChange={(e) => onChange("status", e.target.value)}
          options={[
            { value: "Disponible", label: "Disponible" },
            { value: "Pendiente", label: "Pendiente" },
            { value: "Restringido", label: "Restringido" },
          ]}
        />
      </div>
      <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
        <button onClick={onCancel} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600">
          Cancelar
        </button>
        <button onClick={onSubmit} className="inline-flex items-center gap-2 rounded-xl bg-[#0f4ea3] px-4 py-2 text-sm font-semibold text-white shadow-sm">
          <Plus className="h-4 w-4" /> Agregar documento
        </button>
      </div>
    </div>
  );
}

export default function PackageTrackingPage() {
  const [view, setView] = useState("public");
  const [shipments, setShipments] = useState(initialShipments);
  const [query, setQuery] = useState("NBOG08038500");
  const [searched, setSearched] = useState("NBOG08038500");
  const [activeTab, setActiveTab] = useState("summary");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [adminLogged, setAdminLogged] = useState(false);
  const [adminTab, setAdminTab] = useState("dashboard");
  const [loginForm, setLoginForm] = useState({ user: "admin", password: "Admin2026*" });
  const [loginError, setLoginError] = useState("");
  const [selectedAdminTracking, setSelectedAdminTracking] = useState(initialShipments[0].trackingNumber);
  const [shipmentForm, setShipmentForm] = useState(emptyShipmentForm());
  const [editingTracking, setEditingTracking] = useState(null);
  const [showShipmentForm, setShowShipmentForm] = useState(false);
  const [eventForm, setEventForm] = useState(emptyEventForm());
  const [showEventForm, setShowEventForm] = useState(false);
  const [documentForm, setDocumentForm] = useState(emptyDocumentForm());
  const [showDocumentForm, setShowDocumentForm] = useState(false);

  const shipment = useMemo(() => {
    const normalized = searched.trim().toLowerCase();
    return (
      shipments.find(
        (item) =>
          item.trackingNumber.toLowerCase() === normalized ||
          item.bookingNumber.toLowerCase() === normalized ||
          item.blNumber.toLowerCase() === normalized
      ) || null
    );
  }, [searched, shipments]);

  const selectedAdminShipment = useMemo(
    () => shipments.find((item) => item.trackingNumber === selectedAdminTracking) || shipments[0] || null,
    [selectedAdminTracking, shipments]
  );

  useEffect(() => {
    if (!shipment) setActiveTab("summary");
  }, [shipment]);

  useEffect(() => {
    if (shipments.length && !shipments.find((item) => item.trackingNumber === selectedAdminTracking)) {
      setSelectedAdminTracking(shipments[0].trackingNumber);
    }
  }, [shipments, selectedAdminTracking]);

  const handleSearch = () => setSearched(query || "NBOG08038500");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 900);
  };

  const summaryCards = shipment
    ? [
        { title: "Tracking No.", value: shipment.trackingNumber, icon: Package, hint: shipment.serviceMode },
        { title: "Booking No.", value: shipment.bookingNumber, icon: FileText, hint: shipment.reference },
        { title: "Carrier / Vehicle", value: `${shipment.carrier} · ${shipment.vessel}`, icon: Ship, hint: `Voyage ${shipment.voyage}` },
        { title: "ETA", value: shipment.eta, icon: CalendarClock, hint: `${shipment.transitDays} días de tránsito` },
      ]
    : [];

  const adminSummaryCards = [
    { title: "Embarques activos", value: `${shipments.length}`, icon: Package, hint: "Registros en plataforma" },
    { title: "Eventos registrados", value: `${shipments.reduce((acc, item) => acc + item.milestones.length, 0)}`, icon: Clock3, hint: "Trazabilidad acumulada" },
    { title: "Documentos", value: `${shipments.reduce((acc, item) => acc + item.documents.length, 0)}`, icon: FileText, hint: "Disponibles y pendientes" },
    { title: "Incidencias", value: `${shipments.filter((item) => item.status === "Exception").length}`, icon: CircleAlert, hint: "Requieren seguimiento" },
  ];

  const handleAdminLogin = () => {
    if (loginForm.user === "admin" && loginForm.password === "Admin2026*") {
      setAdminLogged(true);
      setLoginError("");
      return;
    }
    setLoginError("Usuario o contraseña incorrectos. Usa admin / Admin2026* para esta demo.");
  };

  const resetShipmentEditor = () => {
    setShipmentForm(emptyShipmentForm());
    setEditingTracking(null);
    setShowShipmentForm(false);
  };

  const handleShipmentFormChange = (field, value) => setShipmentForm((prev) => ({ ...prev, [field]: value }));
  const handleEventFormChange = (field, value) => setEventForm((prev) => ({ ...prev, [field]: value }));
  const handleDocumentFormChange = (field, value) => setDocumentForm((prev) => ({ ...prev, [field]: value }));

  const startCreateShipment = () => {
    setShipmentForm(emptyShipmentForm());
    setEditingTracking(null);
    setShowShipmentForm(true);
  };

  const startEditShipment = (item) => {
    setShipmentForm({
      trackingNumber: item.trackingNumber,
      bookingNumber: item.bookingNumber,
      blNumber: item.blNumber,
      reference: item.reference,
      carrier: item.carrier,
      serviceMode: item.serviceMode,
      status: item.status,
      origin: item.origin,
      originPort: item.originPort,
      destination: item.destination,
      destinationPort: item.destinationPort,
      vessel: item.vessel,
      voyage: item.voyage,
      eta: item.eta,
      etd: item.etd,
      transitDays: item.transitDays,
      customer: item.customer,
      consignee: item.consignee,
      grossWeight: item.grossWeight,
      volume: item.volume,
      packages: item.packages,
      incoterm: item.incoterm,
      lastEvent: item.lastEvent,
      lastEventEs: item.lastEventEs,
      progress: item.progress,
    });
    setEditingTracking(item.trackingNumber);
    setShowShipmentForm(true);
  };

  const submitShipment = () => {
    const built = buildShipmentFromForm(shipmentForm, shipments.find((item) => item.trackingNumber === editingTracking));
    if (editingTracking) {
      setShipments((prev) => prev.map((item) => (item.trackingNumber === editingTracking ? built : item)));
      setSelectedAdminTracking(built.trackingNumber);
      if (searched === editingTracking) setSearched(built.trackingNumber);
    } else {
      setShipments((prev) => [built, ...prev]);
      setSelectedAdminTracking(built.trackingNumber);
    }
    resetShipmentEditor();
  };

  const deleteShipment = (trackingNumber) => {
    setShipments((prev) => prev.filter((item) => item.trackingNumber !== trackingNumber));
    if (searched === trackingNumber) setSearched("");
  };

  const addEventToSelected = () => {
    if (!selectedAdminShipment || !eventForm.title.trim()) return;
    const newEvent = {
      date: eventForm.date || "Pendiente",
      title: eventForm.title.trim(),
      detail: eventForm.detail.trim(),
      location: eventForm.location.trim(),
      done: eventForm.done,
    };
    setShipments((prev) =>
      prev.map((item) =>
        item.trackingNumber === selectedAdminShipment.trackingNumber
          ? {
              ...item,
              milestones: [newEvent, ...item.milestones],
              lastEvent: newEvent.title,
              lastEventEs: newEvent.title,
            }
          : item
      )
    );
    setEventForm(emptyEventForm());
    setShowEventForm(false);
  };

  const removeEventFromSelected = (index) => {
    if (!selectedAdminShipment) return;
    setShipments((prev) =>
      prev.map((item) =>
        item.trackingNumber === selectedAdminShipment.trackingNumber
          ? { ...item, milestones: item.milestones.filter((_, idx) => idx !== index) }
          : item
      )
    );
  };

  const addDocumentToSelected = () => {
    if (!selectedAdminShipment || !documentForm.name.trim()) return;
    const newDocument = {
      name: documentForm.name.trim(),
      code: documentForm.code.trim() || `DOC-${Date.now()}`,
      status: documentForm.status,
    };
    setShipments((prev) =>
      prev.map((item) =>
        item.trackingNumber === selectedAdminShipment.trackingNumber
          ? { ...item, documents: [newDocument, ...item.documents] }
          : item
      )
    );
    setDocumentForm(emptyDocumentForm());
    setShowDocumentForm(false);
  };

  const removeDocumentFromSelected = (code) => {
    if (!selectedAdminShipment) return;
    setShipments((prev) =>
      prev.map((item) =>
        item.trackingNumber === selectedAdminShipment.trackingNumber
          ? { ...item, documents: item.documents.filter((doc) => doc.code !== code) }
          : item
      )
    );
  };

  if (view === "admin" && !adminLogged) {
    return (
      <div className="min-h-screen bg-[#f4f7fb] p-6 text-slate-900 md:p-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] bg-gradient-to-r from-[#0b2b5b] via-[#0f4ea3] to-[#0b3a82] p-8 text-white shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-100">Módulo de Administración</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight">Gestión administrativa de embarques</h1>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <ShieldCheck className="h-5 w-5" />
                <p className="mt-3 font-semibold">Acceso controlado</p>
                <p className="mt-1 text-sm text-blue-100">Autenticación para operadores y administradores.</p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                <LayoutDashboard className="h-5 w-5" />
                <p className="mt-3 font-semibold">Operación centralizada</p>
                <p className="mt-1 text-sm text-blue-100">Seguimiento, actualización y auditoría desde un solo punto.</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center rounded-2xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
                <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Secure access</p>
                <h2 className="text-2xl font-bold text-[#0b2b5b]">Ingreso administrador</h2>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <Field label="Usuario" value={loginForm.user} onChange={(e) => setLoginForm((prev) => ({ ...prev, user: e.target.value }))} placeholder="admin" />
              <Field label="Contraseña" type="password" value={loginForm.password} onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))} placeholder="••••••••" />
            </div>

            {loginError ? <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{loginError}</p> : null}

            <button onClick={handleAdminLogin} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0f4ea3] px-5 py-3 font-semibold text-white shadow-sm">
              <Lock className="h-4 w-4" /> Ingresar al panel
            </button>

            <button onClick={() => setView("public")} className="mt-3 w-full rounded-2xl border border-slate-300 px-5 py-3 font-semibold text-slate-600">
              Volver al portal público
            </button>

            <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Demo de acceso: <span className="font-semibold">admin</span> / <span className="font-semibold">Admin2026*</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === "admin" && adminLogged) {
    return (
      <div className="min-h-screen bg-[#f4f7fb] text-slate-900">
        <div className="border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0f4ea3] text-white shadow-sm">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Admin console</p>
                <h1 className="text-xl font-bold tracking-tight text-[#0b2b5b]">Panel administrativo de tracking</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => setView("public")} className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600">
                Portal público
              </button>
              <button
                onClick={() => {
                  setAdminLogged(false);
                  setView("public");
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
              >
                <LogOut className="h-4 w-4" /> Cerrar sesión
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <section className="rounded-[28px] bg-gradient-to-r from-[#0b2b5b] via-[#0f4ea3] to-[#0b3a82] p-6 text-white shadow-xl md:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-100">Operational control</p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">CRUD completo de embarques, eventos y documentos</h2>
                <p className="mt-3 max-w-3xl text-sm text-blue-50 md:text-base">
                  Consola para mantener registros logísticos, controlar estados, crear hitos operativos y administrar documentos asociados.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur">
                <div className="flex items-center gap-3">
                  <UserCircle2 className="h-9 w-9" />
                  <div>
                    <p className="text-sm text-blue-100">Sesión activa</p>
                    <p className="font-semibold">Administrador Plataforma</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {adminSummaryCards.map((card) => (
              <StatCard key={card.title} {...card} />
            ))}
          </section>

          <section className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap gap-2">
                {adminTabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setAdminTab(tab.key)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      adminTab === tab.key ? "bg-[#0f4ea3] text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <select
                  value={selectedAdminTracking}
                  onChange={(e) => setSelectedAdminTracking(e.target.value)}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-sm"
                >
                  {shipments.map((item) => (
                    <option key={item.trackingNumber} value={item.trackingNumber}>
                      {item.trackingNumber} · {item.customer}
                    </option>
                  ))}
                </select>
                <button onClick={startCreateShipment} className="inline-flex items-center gap-2 rounded-xl bg-[#0f4ea3] px-4 py-2 text-sm font-semibold text-white">
                  <Plus className="h-4 w-4" /> Nuevo embarque
                </button>
              </div>
            </div>

            <div className="p-6">
              {adminTab === "dashboard" ? (
                <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <h3 className="text-xl font-bold text-[#0b2b5b]">Resumen operativo</h3>
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                      {shipments.map((item) => (
                        <div key={item.trackingNumber} className="rounded-2xl border border-slate-200 bg-white p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-semibold text-slate-900">{item.trackingNumber}</p>
                              <p className="text-sm text-slate-500">{item.customer}</p>
                            </div>
                            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${toneClasses[item.statusTone]}`}>{item.statusLabelEs}</span>
                          </div>
                          <p className="mt-3 text-sm text-slate-600">{item.origin} → {item.destination}</p>
                          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full rounded-full bg-[#0f4ea3]" style={{ width: `${item.progress}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                    <SectionTitle title="Acciones rápidas" subtitle="Operación diaria" icon={ShieldCheck} />
                    <div className="space-y-3 p-6 text-sm">
                      <button onClick={startCreateShipment} className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 font-semibold text-slate-700">
                        Crear nuevo embarque <ChevronRight className="h-4 w-4" />
                      </button>
                      <button onClick={() => setShowEventForm(true)} className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 font-semibold text-slate-700">
                        Registrar nuevo evento <ChevronRight className="h-4 w-4" />
                      </button>
                      <button onClick={() => setShowDocumentForm(true)} className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 font-semibold text-slate-700">
                        Asociar documento <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              {adminTab === "shipments" ? (
                <div className="space-y-6">
                  {showShipmentForm ? (
                    <ShipmentForm
                      form={shipmentForm}
                      onChange={handleShipmentFormChange}
                      onSubmit={submitShipment}
                      onCancel={resetShipmentEditor}
                      mode={editingTracking ? "edit" : "create"}
                    />
                  ) : null}

                  <div className="overflow-hidden rounded-3xl border border-slate-200">
                    <table className="min-w-full text-left text-sm">
                      <thead className="bg-slate-50 text-slate-500">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Tracking</th>
                          <th className="px-4 py-3 font-semibold">Cliente</th>
                          <th className="px-4 py-3 font-semibold">Ruta</th>
                          <th className="px-4 py-3 font-semibold">Estado</th>
                          <th className="px-4 py-3 font-semibold">Progreso</th>
                          <th className="px-4 py-3 font-semibold">Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shipments.map((item) => (
                          <tr key={item.trackingNumber} className="border-t border-slate-200 bg-white">
                            <td className="px-4 py-4 font-semibold text-slate-900">{item.trackingNumber}</td>
                            <td className="px-4 py-4 text-slate-600">{item.customer}</td>
                            <td className="px-4 py-4 text-slate-600">{item.origin} → {item.destination}</td>
                            <td className="px-4 py-4"><span className={`rounded-full border px-3 py-1 text-xs font-semibold ${toneClasses[item.statusTone]}`}>{item.statusLabelEs}</span></td>
                            <td className="px-4 py-4 text-slate-600">{item.progress}%</td>
                            <td className="px-4 py-4">
                              <div className="flex flex-wrap gap-2">
                                <button onClick={() => startEditShipment(item)} className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600"><Pencil className="h-3.5 w-3.5" /> Editar</button>
                                <button onClick={() => deleteShipment(item.trackingNumber)} className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600"><Trash2 className="h-3.5 w-3.5" /> Eliminar</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}

              {adminTab === "events" ? (
                <div className="space-y-6">
                  {showEventForm ? (
                    <EventForm form={eventForm} onChange={handleEventFormChange} onSubmit={addEventToSelected} onCancel={() => setShowEventForm(false)} />
                  ) : (
                    <button onClick={() => setShowEventForm(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#0f4ea3] px-4 py-2 text-sm font-semibold text-white">
                      <Plus className="h-4 w-4" /> Nuevo evento
                    </button>
                  )}

                  <div className="space-y-4">
                    {selectedAdminShipment?.milestones.map((item, idx) => (
                      <div key={`${item.title}-${idx}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                          <div>
                            <p className="font-semibold text-slate-900">{item.title}</p>
                            <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{item.location}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.done ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                              {item.done ? "Completado" : "Pendiente"}
                            </span>
                            <button onClick={() => removeEventFromSelected(idx)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600">
                              Eliminar
                            </button>
                          </div>
                        </div>
                        <p className="mt-3 text-sm text-slate-500">{item.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {adminTab === "documents" ? (
                <div className="space-y-6">
                  {showDocumentForm ? (
                    <DocumentForm form={documentForm} onChange={handleDocumentFormChange} onSubmit={addDocumentToSelected} onCancel={() => setShowDocumentForm(false)} />
                  ) : (
                    <button onClick={() => setShowDocumentForm(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#0f4ea3] px-4 py-2 text-sm font-semibold text-white">
                      <Plus className="h-4 w-4" /> Nuevo documento
                    </button>
                  )}

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {selectedAdminShipment?.documents.map((doc) => (
                      <div key={doc.code} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-slate-900">{doc.name}</p>
                            <p className="mt-1 text-sm text-slate-500">Código: {doc.code}</p>
                            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{doc.status}</p>
                          </div>
                          <button onClick={() => removeDocumentFromSelected(doc.code)} className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600">
                            Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] text-slate-900">
      <div className="border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-2xl bg-white px-3 py-2 shadow-sm ring-1 ring-slate-200">
              <img src={logo} alt="Logo" className="h-16 w-auto object-contain" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">COSCO SHIPPING ECUADOR</p>
              <h1 className="text-xl font-bold tracking-tight text-[#0b2b5b]">Portal de Seguimiento Logístico</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-6 text-sm text-slate-500 md:flex">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <button onClick={() => setView("admin")} className="inline-flex items-center gap-2 rounded-xl bg-[#0f4ea3] px-4 py-2 text-sm font-semibold text-white">
              <ShieldCheck className="h-4 w-4" /> Modo administrador
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[28px] bg-gradient-to-r from-[#0b2b5b] via-[#0f4ea3] to-[#0b3a82] text-white shadow-xl">
          <div className="grid grid-cols-1 gap-8 px-6 py-8 md:px-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-blue-100"></p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Seguimiento profesional de carga, courier y transporte</h2>
              <p className="mt-3 max-w-2xl text-sm text-blue-50 md:text-base">
                Búsqueda por tracking, booking o B/L; línea de tiempo operativa; detalle de contenedores; documentos asociados y visualización de ruta.
              </p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.16em] text-blue-100">Disponibilidad</p>
                  <p className="mt-2 text-2xl font-bold">24/7</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.16em] text-blue-100">Eventos</p>
                  <p className="mt-2 text-2xl font-bold">En tiempo real</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.16em] text-blue-100">Cobertura</p>
                  <p className="mt-2 text-2xl font-bold">Marítimo-Aéreo-Terrestre</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur md:p-8">
              <label className="mb-2 block text-sm font-medium text-blue-50">Tracking / Booking / B/L</label>
              <div className="flex flex-col gap-10">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ej. NBOG08038500"
                    className="h-12 w-full rounded-2xl border border-white/20 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button onClick={handleSearch} className="h-12 rounded-2xl bg-[#ff6b00] px-6 text-sm font-semibold text-white shadow hover:opacity-95">
                    Consultar tracking
                  </button>
                  <button onClick={handleRefresh} className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white">
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} /> Actualizar estado
                  </button>
                </div>
              </div>


            </div>
          </div>
        </section>

        {!shipment ? (
          <section className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <CircleAlert className="mt-0.5 h-5 w-5 text-amber-600" />
              <div>
                <p className="font-semibold text-amber-900">No se encontró el embarque consultado</p>
                <p className="mt-1 text-sm text-amber-800">
                  Verifica el número ingresado o utiliza uno de los ejemplos disponibles. Esta interfaz está lista para conectarse a un backend real con validaciones, autenticación y trazabilidad por eventos.
                </p>
              </div>
            </div>
          </section>
        ) : (
          <>
            <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {summaryCards.map((card) => (
                <StatCard key={card.title} {...card} />
              ))}
            </section>

            <section className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-5 border-b border-slate-200 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Resumen del envío</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-bold text-[#0b2b5b]">{shipment.trackingNumber}</h3>
                    <span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold ${toneClasses[shipment.statusTone]}`}>
                      <Clock3 className="mr-2 h-4 w-4" /> {shipment.statusLabelEs}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-500">Última novedad: <span className="font-semibold text-slate-700">{shipment.lastEventEs}</span></p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {publicTabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeTab === tab.key ? "bg-[#0f4ea3] text-white shadow" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === "summary" ? (
                <div className="grid grid-cols-1 gap-6 p-6 xl:grid-cols-[1.35fr_0.65fr]">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex items-start gap-3"><MapPin className="mt-1 h-4 w-4 text-[#0f4ea3]" /><div><p className="text-xs uppercase tracking-[0.14em] text-slate-500">Origen</p><p className="font-semibold text-slate-900">{shipment.origin}</p><p className="text-sm text-slate-500">{shipment.originPort}</p></div></div>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex items-start gap-3"><Route className="mt-1 h-4 w-4 text-[#0f4ea3]" /><div><p className="text-xs uppercase tracking-[0.14em] text-slate-500">Destino</p><p className="font-semibold text-slate-900">{shipment.destination}</p><p className="text-sm text-slate-500">{shipment.destinationPort}</p></div></div>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex items-start gap-3"><Ship className="mt-1 h-4 w-4 text-[#0f4ea3]" /><div><p className="text-xs uppercase tracking-[0.14em] text-slate-500">Operación</p><p className="font-semibold text-slate-900">{shipment.serviceMode}</p><p className="text-sm text-slate-500">{shipment.carrier} · {shipment.vessel}</p></div></div>
                      </div>
                      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <div className="flex items-start gap-3"><CalendarClock className="mt-1 h-4 w-4 text-[#0f4ea3]" /><div><p className="text-xs uppercase tracking-[0.14em] text-slate-500">Planificación</p><p className="font-semibold text-slate-900">ETD {shipment.etd} · ETA {shipment.eta}</p><p className="text-sm text-slate-500">{shipment.transitDays} días estimados</p></div></div>
                      </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5">
                      <div className="mb-3 flex items-center justify-between text-sm"><span className="font-medium text-slate-600">Progreso del envío</span><span className="font-bold text-[#0f4ea3]">{shipment.progress}%</span></div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-[#0b3a82] via-[#0f4ea3] to-[#ff6b00]" style={{ width: `${shipment.progress}%` }} /></div>
                      <p className="mt-3 text-sm text-slate-500">Estado operacional: {shipment.lastEventEs}</p>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5">
                      <div className="mb-4 flex items-center gap-3"><Globe2 className="h-5 w-5 text-[#0f4ea3]" /><div><h4 className="text-lg font-bold text-[#0b2b5b]">Ruta logística</h4><p className="text-sm text-slate-500">Vista resumida del trayecto operativo</p></div></div>
                      <div className={`grid grid-cols-1 gap-3 ${shipment.routePoints.length >= 4 ? "md:grid-cols-[repeat(4,minmax(0,1fr))]" : shipment.routePoints.length === 3 ? "md:grid-cols-[repeat(3,minmax(0,1fr))]" : "md:grid-cols-[repeat(2,minmax(0,1fr))]"}`}>
                        {shipment.routePoints.map((point, idx) => (
                          <div key={`${point.name}-${idx}`} className="flex items-center gap-3 md:flex-col md:items-stretch">
                            <div className="flex flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:block">
                              <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-full ${point.done ? "bg-[#0f4ea3] text-white" : "bg-slate-200 text-slate-500"}`}>{point.done ? <CheckCircle2 className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}</div>
                              <p className="font-semibold text-slate-900">{point.name}</p>
                              <p className="text-sm text-slate-500">{point.type}</p>
                            </div>
                            {idx !== shipment.routePoints.length - 1 ? <ChevronRight className="hidden h-5 w-5 text-slate-300 md:block" /> : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                      <SectionTitle title="Detalles de carga" subtitle="Información general del embarque" icon={ClipboardList} />
                      <div className="p-6 space-y-4">
                        {[["B/L Number", shipment.blNumber],["Booking Number", shipment.bookingNumber],["Referencia", shipment.reference],["Cliente", shipment.customer],["Consignatario", shipment.consignee],["Incoterm", shipment.incoterm],["Peso bruto", shipment.grossWeight],["Volumen", shipment.volume],["Bultos", `${shipment.packages}`]].map(([label, value]) => (
                          <div key={label} className="flex items-start justify-between gap-4 border-b border-dashed border-slate-200 pb-3 last:border-none last:pb-0"><p className="text-sm text-slate-500">{label}</p><p className="text-right text-sm font-semibold text-slate-900">{value}</p></div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              ) : null}

              {activeTab === "events" ? (
                <div className="p-6"><div className="space-y-6">{shipment.milestones.map((item, idx) => (
                  <div key={idx} className="flex gap-4"><div className="flex flex-col items-center"><div className={`flex h-10 w-10 items-center justify-center rounded-full ${item.done ? "bg-[#0f4ea3] text-white" : "bg-slate-200 text-slate-500"}`}>{item.done ? <CheckCircle2 className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}</div>{idx !== shipment.milestones.length - 1 ? <div className="mt-2 h-full min-h-12 w-px bg-slate-200" /> : null}</div><div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-5"><div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between"><div><p className="text-base font-semibold text-slate-900">{item.title}</p><p className="mt-1 text-sm text-slate-600">{item.detail}</p><p className="mt-3 inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600"><MapPin className="mr-2 h-3.5 w-3.5" /> {item.location}</p></div><p className="text-sm font-medium text-slate-500">{item.date}</p></div></div></div>
                ))}</div></div>
              ) : null}

              {activeTab === "containers" ? (
                <div className="overflow-x-auto p-6">
                  <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3"><StatCard icon={Boxes} title="Contenedores / Unidades" value={`${shipment.containers.length}`} hint="Asociados al embarque" /><StatCard icon={Building2} title="Origen logístico" value={shipment.originPort} hint={shipment.origin} /><StatCard icon={Anchor} title="Destino logístico" value={shipment.destinationPort} hint={shipment.destination} /></div>
                  <div className="overflow-hidden rounded-2xl border border-slate-200"><table className="min-w-full text-left text-sm"><thead className="bg-slate-50 text-slate-500"><tr><th className="px-4 py-3 font-semibold">Container / Unit No.</th><th className="px-4 py-3 font-semibold">Type</th><th className="px-4 py-3 font-semibold">Seal</th><th className="px-4 py-3 font-semibold">Weight</th><th className="px-4 py-3 font-semibold">Status</th></tr></thead><tbody>{shipment.containers.map((container) => (<tr key={container.id} className="border-t border-slate-200 bg-white"><td className="px-4 py-4 font-semibold text-slate-900">{container.id}</td><td className="px-4 py-4 text-slate-600">{container.type}</td><td className="px-4 py-4 text-slate-600">{container.seal}</td><td className="px-4 py-4 text-slate-600">{container.weight}</td><td className="px-4 py-4"><span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${shipment.statusTone === "emerald" ? "bg-emerald-50 text-emerald-700" : shipment.statusTone === "red" ? "bg-red-50 text-red-700" : "bg-blue-50 text-blue-700"}`}>{container.status}</span></td></tr>))}</tbody></table></div>
                </div>
              ) : null}

              {activeTab === "documents" ? (
                <div className="p-6"><div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{shipment.documents.map((doc) => (<div key={doc.code} className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><div className="flex items-start justify-between gap-3"><div><p className="text-base font-semibold text-slate-900">{doc.name}</p><p className="mt-1 text-sm text-slate-500">Código: {doc.code}</p></div><FileText className="h-5 w-5 text-[#0f4ea3]" /></div><div className="mt-4 flex items-center justify-between"><span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">{doc.status}</span><button className="inline-flex items-center gap-2 rounded-xl bg-[#0f4ea3] px-3 py-2 text-xs font-semibold text-white shadow-sm"><Download className="h-3.5 w-3.5" /> Descargar</button></div></div>))}</div></div>
              ) : null}
            </section>


          </>
        )}
      </div>
    </div>
  );
}
