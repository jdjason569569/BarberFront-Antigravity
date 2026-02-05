# **Documento de Especificaciones: BarberView Dashboard**

## **1\. Introducción**

Este documento define los requisitos para una aplicación web diseñada para que un barbero pueda visualizar sus turnos y el historial de visitas de sus clientes de forma gráfica, utilizando un entorno seguro.

## **2\. Perfil de Usuario**

* **Barbero (Administrador):** Única persona autorizada para acceder al sistema. Su función es consultar la agenda y analizar la fidelidad de los clientes.

## **3\. Requisitos Funcionales (RF)**

### **RF1: Control de Acceso (Auth)**

* El sistema debe contar con una pantalla de inicio de sesión.  
* La autenticación se realizará mediante **Supabase Auth**.  
* Solo el barbero (cuenta preconfigurada) tendrá acceso al dashboard.

### **RF2: Visualización de Turnos**

* El sistema debe listar los turnos existentes en la base de datos de Supabase.  
* Cada turno debe mostrar: Nombre del cliente, hora, fecha y servicio.  
* No se permitirá la creación o edición de turnos desde esta interfaz (Solo Lectura).
* Por ahora implementa con mocks para dar una visualizacion de los turnos

### **RF3: Análisis de Fidelización (Gráfico)**

* **Componente de Gráficas:** Un módulo visual que procese el historial de turnos.  
* Debe mostrar un ranking de clientes basado en el conteo total de sus visitas.  
* Uso de **Chart.js** para representar los datos (ej. gráfico de barras).

---

## **4\. Requisitos No Funcionales (RNF)**

| Requisito | Especificación |
| :---- | :---- |
| **Seguridad** | Uso de políticas de seguridad (RLS) en Supabase para proteger los datos. |
| **Rendimiento** | Las gráficas deben cargar en menos de 2 segundos tras la consulta. |
| **Interfaz** | Diseño limpio y responsivo (adaptable a móviles y tablets). |
| **Idioma** | Interfaz completamente en español. |

---

## **5\. Especificaciones Técnicas**

### **Modelo de Datos (Supabase/PostgreSQL)**

El sistema consultará las siguientes tablas:

* **Tabla clientes**: id, nombre, telefono.  
* **Tabla turnos**: id, cliente\_id (relación), fecha\_asistencia, servicio.

### **Arquitectura Angular**

* **Servicios:** Un servicio dedicado para las peticiones a Supabase (usando el cliente @supabase/supabase-js).  
* **Guards:** Implementación de un AuthGuard para proteger las rutas de visualización.

---

## **6\. Diagrama de Flujo**

1. El barbero ingresa sus credenciales.  
2. Angular valida con Supabase.  
3. El sistema descarga los turnos y los agrupa por cliente.  
4. Se renderiza la lista de turnos y se genera la gráfica de barras de visitas.

