// ============================================================
// DATOS DE ESTUDIANTES REGISTRADOS
// ============================================================
// Lista de estudiantes habilitados para votar
// Estos son DATOS DE PRUEBA con números de documento realistas
// Solo los estudiantes cuyo número de documento aparezcan
// aquí podrán votar en el sistema
// ============================================================

import { Estudiante } from '@/types';

// ===============================================
// ESTUDIANTES DE PRUEBA (GRADOS 6° A 11°
// ===============================================
export const estudiantes: Estudiante[] = [
  // ===============================================
  // GRADO 11 (VOTANTES HABILITADOS)
  // ===============================================
  { documento: '1001001001', nombre: 'Sofía Martínez López', grado: '11°', curso: '11-01' },
  { documento: '1001001002', nombre: 'Juan Sebastián Pérez', grado: '11°', curso: '11-01' },
  { documento: '1001001003', nombre: 'Valentina Gómez Ruiz', grado: '11°', curso: '11-01' },
  { documento: '1001001004', nombre: 'Daniel Torres', grado: '11°', curso: '11-01' },
  { documento: '1001001005', nombre: 'Isabella Ramírez', grado: '11°', curso: '11-01' },
  { documento: '1001001006', nombre: 'Mateo González', grado: '11°', curso: '11-02' },
  { documento: '1001001007', nombre: 'Lucía Castro', grado: '11°', curso: '11-02' },
  { documento: '1001001008', nombre: 'Diego Fernández', grado: '11°', curso: '11-02' },
  { documento: '1001001009', nombre: 'Martina Alvarez', grado: '11°', curso: '11-02' },
  { documento: '1001001010', nombre: 'Samuel Jiménez', grado: '11°', curso: '11-02' },
  { documento: '1001001011', nombre: 'Emma Moreno', grado: '11°', curso: '11-02' },
  { documento: '1001001012', nombre: 'Andrés Morales', grado: '11°', curso: '11-02' },
  { documento: '1001001013', nombre: 'Paula Gutiérrez', grado: '11°', curso: '11-01' },
  { documento: '1001001014', nombre: 'Nicolás Romero', grado: '11°', curso: '11-01' },
  { documento: '1001001015', nombre: 'Gabriela Herrera', grado: '11°', curso: '11-01' },

  // ===============================================
  // GRADO 10 (VOTANTES HABILITADOS)
  // ===============================================
  { documento: '1001002001', nombre: 'Carlos Mendoza', grado: '10°', curso: '10-01' },
  { documento: '1001002002', nombre: 'Laura Ortega', grado: '10°', curso: '10-01' },
  { documento: '1001002003', nombre: 'Felipe Vargas', grado: '10°', curso: '10-01' },
  { documento: '1001002004', nombre: 'Elena Rojas', grado: '10°', curso: '10-01' },
  { documento: '1001002005', nombre: 'Santiago Pineda', grado: '10°', curso: '10-01' },
  { documento: '1001002006', nombre: 'Mariana Salazar', grado: '10°', curso: '10-02' },
  { documento: '1001002007', nombre: 'David Cortés', grado: '10°', curso: '10-02' },
  { documento: '1001002008', nombre: 'Valeria Parra', grado: '10°', curso: '10-02' },
  { documento: '1001002009', nombre: 'Martín Estrada', grado: '10°', curso: '10-02' },
  { documento: '1001002010', nombre: 'Antonella Muñoz', grado: '10°', curso: '10-02' },
  { documento: '1001002011', nombre: 'Julián Salas', grado: '10°', curso: '10-01' },
  { documento: '1001002012', nombre: 'Ana Sofía Caro', grado: '10°', curso: '10-02' },

  // ===============================================
  // GRADO 9 (VOTANTES HABILITADOS)
  // ===============================================
  { documento: '1001003001', nombre: 'Miguel Ángel Prieto', grado: '9°', curso: '9-01' },
  { documento: '1001003002', nombre: 'Camila Lozano', grado: '9°', curso: '9-01' },
  { documento: '1001003003', nombre: 'Pablo Ibañez', grado: '9°', curso: '9-01' },
  { documento: '1001003004', nombre: 'Daniela Palacios', grado: '9°', curso: '9-01' },
  { documento: '1001003005', nombre: 'Alejandro Castaño', grado: '9°', curso: '9-02' },
  { documento: '1001003006', nombre: 'Manuela Gil', grado: '9°', curso: '9-02' },
  { documento: '1001003007', nombre: 'Jerónimo Londoño', grado: '9°', curso: '9-02' },
  { documento: '1001003008', nombre: 'Manuela Osorio', grado: '9°', curso: '9-02' },
  { documento: '1001003009', nombre: 'David González', grado: '9°', curso: '9-01' },
  { documento: '1001003010', nombre: 'María Juliana Agudelo', grado: '9°', curso: '9-01' },

  // ===============================================
  // GRADO 8 (VOTANTES HABILITADOS)
  // ===============================================
  { documento: '1001004001', nombre: 'Tomás Montoya', grado: '8°', curso: '8-01' },
  { documento: '1001004002', nombre: 'Julieta Saldarriaga', grado: '8°', curso: '8-01' },
  { documento: '1001004003', nombre: 'Juan Pablo Ospina', grado: '8°', curso: '8-01' },
  { documento: '1001004004', nombre: 'Mafe Cárdenas', grado: '8°', curso: '8-02' },
  { documento: '1001004005', nombre: 'Emilio Quintero', grado: '8°', curso: '8-02' },
  { documento: '1001004006', nombre: 'Eliza Martínez', grado: '8°', curso: '8-02' },
  { documento: '1001004007', nombre: 'Juan José Zapata', grado: '8°', curso: '8-01' },
  { documento: '1001004008', nombre: 'Isidora Arias', grado: '8°', curso: '8-02' },

  // ===============================================
  // GRADO 7 (VOTANTES HABILITADOS)
  // ===============================================
  { documento: '1001005001', nombre: 'Pedro Velásquez', grado: '7°', curso: '7-01' },
  { documento: '1001005002', nombre: 'Isabel Escobar', grado: '7°', curso: '7-01' },
  { documento: '1001005003', nombre: 'Benjamín Múnera', grado: '7°', curso: '7-01' },
  { documento: '1001005004', nombre: 'Elsa Álvarez', grado: '7°', curso: '7-02' },
  { documento: '1001005005', nombre: 'Juan Esteban Vélez', grado: '7°', curso: '7-02' },
  { documento: '1001005006', nombre: 'Antonia Betancourt', grado: '7°', curso: '7-02' },
  { documento: '1001005007', nombre: 'Simón Villegas', grado: '7°', curso: '7-01' },
];

// ===============================================
// FUNCIÓN: Validar si un documento pertenece a
// un estudiante registrado
// ===============================================
/**
 * Busca un estudiante por su número de documento
 * @param documento Número de identificación a buscar
 * @returns El estudiante si existe, o null si no está registrado
 */
export function buscarEstudiantePorDocumento(documento: string): Estudiante | null {
  // Limpiamos el documento de espacios para evitar errores de digitación
  const documentoLimpio = documento.trim();
  // Buscamos en el listado
  return estudiantes.find(e => e.documento === documentoLimpio) || null;
}
