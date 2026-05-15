// src/data/catalogueLoader.ts

type VehicleEntry = {
  marca: string;
  modelo: string;
  anio_desde: string | number;
  anio_hasta: string | number;
  version: string;
  medida: string | null;
  estado: string;
  posicion: string;
  rodado?: string | number | null;
};

const modules = import.meta.glob("./vehicleCatalogue/*.json", { eager: true });

const vehicleCatalogue: VehicleEntry[] = Object.values(modules).flatMap((module: any) => {
  return module.default || module;
});

export default vehicleCatalogue;
