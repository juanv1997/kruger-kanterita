## KRUGER CHALLENGE 
## Sistema de registro de vacunación de los empleados


### Acerca de
Sistema que permite llevar un control detallado de la vacunación de los empleados.

### Pre-requisitos

Se debe tener instalado algunas programas para el correcto funcionamiento de la aplicación, tanto en backend, como en frontend.

#### Backend
- SDK Java;
- Maven;
- IDE de su elección(ItellJ IDEA,NetBeans,Eclipse);
- Sistema Gestor de Base de Datos(en este caso se usará PostgreSQL) ;

#### Frontend
- Node js;
- Editor de código de su eleccion(VSC,Vim);


### Proceso de construcción

#### Backend
Para el backend de la aplicación de utilizó el framework Spring Boot, con el cual construimos un API REST donde podrá ser consultada cualquier información de la aplicación.Además se utilizó el patrón de arquitectura basado en MVC, aunque en este caso, solo se utilizaron los modelos y controladores.Para la capa de datos se usó el patrón de diseño DAO(Data Access Object) con el cual se podía conectar a la Base de Datos, y finalmente como ORM (Object Relational Mapping) se usó Hibernate.

#### Frontend

En el frontend se utilizó la librería de JavaScript  , React, la cual nos permite crear interfaces reactivas, intuitiva y con una alta UX (User Experience).Además se utilizá también la librería Material UI, la cual nos pone a disposición una gran cantidad de componentes para un mejor desarrollo de lado del cliente.

#### Capa de datos(persistenmcia)

Se utilizó un enfoque CodeFirst, donde, para la creación de la base de datos se codifica un modelo con los atributos y relaciones que tendrá la tabla y al compilar el proyecto, se crean las tablas establecidas en una base datos que se haya configurado en el proyecto.

### Modelo de datos

Se tiene también un modelo de datos de extensión ".cdm", creado en Power Designer, donde se podrá observar los atributos y relaciones entre entidades(tablas) de la base de datos.

### Ejecución

Nota: Debemos tener en cuenta que para el momento de la ejecución de nuestra aplicación de frontend, debemos tener ya corriendo nuestra aplicación de backend para poder consumir la información respectiva que necesita nuestra aplicación.

- Ingresamos a la aplicacion a traves de "localhost:3000" despues de haber iniciado el servidor de desarrollo en nuestra aplicación de react ;
- Se nos desplegará una pantalla de inicio de sesión donde podremos ingresar al sistema.;
- De acuerdo a nuestro rol nos aparecerá cierto tipo de opciones que podamos realizar. ;
- En el caso de ser administradores podremos agregar nuevos empleados y su defecto crear un usuario y contraseña para que puedan ingresar el sistema. ;
- Si por otro lado somos empelados, entonces solo podremos visualizar y actualizar nuestra información. ;

