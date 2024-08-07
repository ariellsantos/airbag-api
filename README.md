## airbag API - DESIGN DOC

### CONTEXTO Y ALCANCE

API para prueba técnica de airbag.

### Objetivos y no objetivoss del API

#### Objetivos del API:

* Crear y obtener conductores.
* Crear, obtener, modificar y eliminar vehículos.
* Establecer asignaciones entre vehículos y conductores.
* Obtener una lista de todos los vehículos registrados con la conversión del precio a MXN, EUR, GBP y USD.

#### Detalles a tener en cuenta:

* Se requiere una lista con todos los vehículos registrados, incluyendo sus precios convertidos a distintas monedas.
* Se tolera un periodo de actualización mayor a 20 minutos, dependiendo de la API utilizada para obtener el tipo de cambio actual.
* La relación entre conductor y vehículo se establece mediante asignación.
* No se permite asignar más de un vehículo por conductor ni más de un conductor por vehículo.

#### Como plus:

* Agregar validación a las rutas.
* Incluir pruebas unitarias.
* Guardar historial de peticiones.

### Visión general del API:

* La arquitectura de esta aplicación se diseñó basándose en *Clean Architecture* y *Vertical Slicing*.
* Las dependencias de la aplicación son gestionadas a través de un contenedor de dependencias.
* Se utiliza un ORM para manejar las interacciones con la base de datos.
* Para el acceso e interacción entre los modelos de dominio y los datos, se aplicó el patrón repositorio.
* Las conexiones y clientes necesarios son creados aplicando el patrón factory.
* La estrategia de pruebas está conformada por pruebas unitarias y pruebas de integración.
* Se utiliza Docker para crear la imagen y el contenedor donde se ejecuta la aplicación.
* PM2 se utiliza como supervisor dentro del contenedor de Docker.
* Docker Compose se utiliza como orquestador de los servicios necesarios para ejecutar la aplicación.



### Detalle del Diseño Actual:

#### Clean Architecture y Vertical Slicing:

La elección de basar la arquitectura del código en Clean Architecture y Vertical Slicing se tomó teniendo en cuenta la experiencia en proyectos grandes. 
En estos casos, la incorporación de nuevas características se volvía complicada debido al fuerte acoplamiento en la estructura del código. 
Cualquier cambio necesario se volvía rápidamente complicado.



Las Clean Architectures proponen un diseño de código donde se mantienen desacopladas las capas de la aplicación, y si necesitan interactuar, lo hacen a través de interfaces. 
Idealmente, ninguna capa debería tener interacción directa con otra.

Las ventajas de aplicar una arquitectura basada en **Clean Architecture** son:
* **Código testeable:** Dado que la interacción se realiza solo a través de interfaces, es fácil cambiar la implementación de los servicios de infraestructura y utilizar mocks en su lugar.
* **Mantenibilidad:** Al dividir el código en capas, cada una es responsable de realizar solo lo que le corresponde, facilitando la resolución de errores cuando surgen.
* **Escalabilidad:** Al estar dividida en capas, proporciona la flexibilidad de agregar o quitar servicios con un menor costo, ofreciendo la tranquilidad de poder realizar cambios en la aplicación, como cambiar la base de datos o agregar un ORM diferente, de manera más sencilla.

El código suele dividirse en tres capas:

1. **Infraestructura:** En esta capa, se implementan todas las integraciones con agentes externos a nuestra aplicación. Aquí se manejan servicios y componentes que interactúan con recursos externos, como bases de datos, servicios web u otras tecnologías de infraestructura.

2. **Dominio:** La capa de dominio contiene el código que representa nuestros modelos de dominio y las reglas de negocio. En esta capa, se definen las entidades, objetos de valor y lógicas fundamentales que gobiernan el comportamiento central de la aplicación.

3. **Aplicación:** La capa de aplicación alberga el código de nuestros casos de uso. Aquí se coordinan los flujos de trabajo, y se implementa la lógica que conecta las operaciones del dominio para cumplir con los requisitos específicos de la aplicación. Los casos de uso orquestan las interacciones entre la infraestructura y el dominio


**Vertical Slicing** se aplica para mantener todas las capas necesarias que permitan el funcionamiento de una característica específica, manteniendo la cohesión en nuestro código.
Por ejemplo, todo lo necesario para que nuestra característica de manejo de vehículos estaría contenido dentro del "slice" **Vehículo**. Es decir, el código de aplicación, de dominio y de infraestructura estaría contenido en Vehículo.

Esta técnica facilita la organización del código alrededor de características específicas, lo que puede mejorar la mantenibilidad y comprensión del sistema.


La estructura del proyecto se organiza de la siguiente manera:

![estrucutra](https://drive.google.com/uc?id=1S8FeYdp8VxAcdDYSRiiSUC8uaJYX2NOO)

**src:** Aquí se encuentra todo el código que ejecuta la aplicación.

**Application:** En esta sección se coloca todo el código que permite interactuar con el entorno, como controladores, rutas, trabajos, comandos y configuraciones del entorno. En general, son los puntos de acceso por los cuales se puede comunicar con la aplicación.

**contexts:** Esta sección es donde aplicamos el Vertical Slicing, dividiendo la aplicación en características, departamentos o subdominios de nuestro negocio.

**Backoffice:** En este caso, representa un subdominio de nuestro negocio donde se llevan a cabo todas las tareas que no involucran interacción con el usuario o cliente.

**Driver/Vehicle:** Estas carpetas contienen las piezas o características que hacen funcionar el Backoffice. Cada una de estas carpetas incluye todo lo necesario para operar, organizado en sus propias carpetas de application, domain e infrastructure.

**tests:** Aquí se almacenan todos los tests (integración, unitarios y end-to-end). Normalmente, se replica la estructura de **src**.


### Manejo de dependencias

Para el manejo de dependencias, empleamos un paquete llamado **Awilix**. Este paquete nos facilita registrar cada uno de nuestros servicios y se encarga de instanciarlos en tiempo de ejecución cuando son necesarios.

La elección de este paquete se basa en la flexibilidad que proporciona y las opciones de instanciado, como singleton o normal (instanciar una clase nueva cada vez que se requiera).

El funcionamiento se resume en la creación de un contenedor donde registramos cada una de las dependencias que usaremos en todo nuestro proyecto. Estas dependencias pueden ser clases o funciones que se ejecutarán al ser solicitadas.

Esta implementación con **Awilix** permite una gestión eficiente y dinámica de las dependencias, adaptándose a las necesidades específicas de nuestro proyecto.

```typescript
const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
});

container.register({
  winstonLogger: asFunction(winstonLogger).singleton(),
  logger: aliasTo('winstonLogger'),
  applicationConfig: asFunction(configFactory, {
    injector: () => ({ resource: 'application' })
  }),
  mariadbConfig: asFunction(configFactory, {
    injector: () => ({ resource: 'database' })
  }),
  openExchangeConfig: asFunction(configFactory, {
    injector: () => ({ resource: 'openExchangeApi' })
  }),
  typeormConnectionFactory: asFunction(typeormConnectionFactory),
  mariadbConnection: asFunction(mariadbTypeormConnectionFactory),
  prismaClient: asFunction(prismaClientFactory).singleton(),
  orm: aliasTo('typeormConnectionFactory'),
  vehicleRepository: asClass(VehiclePrismaRepository),
  vehicleFinder: asClass(VehicleFinder),
  getVehicleController: asClass(GetVehicleController),
  vehicleCreator: asClass(VehicleCreator),
  postVehicleCreatorController: asClass(PostCreateVehicleController),
  httpClient: asClass(AxiosClient),
  openExchangeService: asClass(OpenExchangeService),
  exchangeService: aliasTo('openExchangeService'),
  prismaMongoClient: asFunction(prismaMongoClientFactory).singleton(),
  currenciesRateRepository: asClass(CurrenciesRatePrismaRepository),
  insertLastCurrenciesRateService: asClass(InsertLastCurrenciesRate),
  latestCurrenciesRatesFinderService: asClass(LatestCurrenciesRatesFinder),
  allVehiclesFinderService: asClass(AllVehiclesFinder),
  vehiclesPricesRepository: asClass(VehiclesPricesPrismaRepository),
  lastVehiclesPricesInsertService: asClass(LastVehiclesPricesInsert),
  latestVehiclesPricesFinderService: asClass(LatestVehiclePricesFinder),
  getVehiclesPricesController: asClass(GetVehiclesPricesController)
});
```

### Prisma ORM

La elección de Prisma ORM se basó en su facilidad de uso, especialmente para implementar el patrón repository en el proyecto.

Se creó una clase base de repositorio que se utiliza como plantilla en cada uno de los repositorios dentro del proyecto. Este repositorio base nos permite encapsular las funciones necesarias para manejar los datos de cada uno de los modelos:

Esta implementación con Prisma ORM simplifica la interacción con la base de datos y proporciona una estructura organizada para gestionar los datos de manera eficiente.


```typescript
export abstract class PrismaOrmRepository<D extends Delegate, T extends CrudTypeMap, O, E> {
  protected constructor(protected delegate: D) {}

  public async create(data: O): Promise<void> {
    await this.delegate.create({ data });
  }

  public async findUniqueOrThrows(data: T['findUniqueOrThrow']): Promise<O> {
    return (await this.delegate.findUniqueOrThrow(data)) as O;
  }

  public async update(data: T['update']) {
    await this.delegate.update(data);
  }

  public async delete(id: string): Promise<void> {
    return await this.update({
      where: {
        id
      },
      data: {
        deleted: true
      }
    });
  }
}
```

Así, cada uno de los repositorios hereda de esta clase. Por ejemplo, el repositorio de Vehículo:
```typescript
export default class VehiclePrismaRepository
  extends PrismaOrmRepository<Prisma.VehicleDelegate, VehicleTypeMap, VehicleType, Vehicle>
  implements VehicleRepository
{
  constructor(
    prismaClient: PrismaClient,
    private readonly logger: Logger
  ) {
    super(prismaClient.vehicle);
  }

  async findOne(id: string): Promise<Vehicle> {
    try {
      const vehicle = await this.findUniqueOrThrows({
        where: {
          id,
          deleted: false
        }
      });
      return VehicleDataMapper.mapOne(vehicle);
    } catch (error) {
      this.logger.error(error as Error);
      throw new ObjectNotFound(`Object does not exist`);
    }
  }
}
```

Se utiliza prisma para realizar conexiones a dos bases de datos "MariaDB y MongoDB"  y así poder reutilizar código base de los repositorios 

```typescript
export default class CurrenciesRatePrismaRepository
  extends PrismaOrmRepository<Prisma.CurrenciesRateDelegate, CurrenciesRateTypeMap, CurrenciesRateType, CurrenciesRate>
  implements CurrenciesRateRepository
{
  constructor(
    protected readonly prismaMongoClient: PrismaClient,
    private readonly logger: Logger
  ) {
    super(prismaMongoClient.currenciesRate);
  }

  async create(data: CurrenciesRateType): Promise<void> {
    this.logger.info(`saving currencies rates ${JSON.stringify(data)}`);
    await this.delegate.create({
      data: {
        date: data.date,
        id: data.id,
        rates: {
          createMany: {
            data: data.rates
          }
        }
      }
    });
  }

  async findLast() {
    const currenciesRate: CurrenciesRateTypeDB = await this.delegate.findFirstOrThrow({
      where: {
        deleted: false
      },
      orderBy: {
        date: 'desc'
      },
      include: {
        rates: true
      }
    });
    return CurrenciesRateDataMapper.mapOne(currenciesRate);
  }
  async findOne(id: string): Promise<CurrenciesRate> {
    try {
      const currenciesRate = await this.findUniqueOrThrows({
        where: {
          id,
          deleted: false
        }
      });
      return CurrenciesRateDataMapper.mapOne(currenciesRate);
    } catch (error) {
      this.logger.error(error as Error);
      throw new ObjectNotFound(`Object does not exist`);
    }
  }
}
```


Las conexiones con la base de datos por parte de Prisma se crea a partir de una function factory y se inyecta por constructor a los repositorios que la necesitan

```typescript
export function prismaClientFactory() {
  return new PrismaClient();
}

export function prismaMongoClientFactory() {
  return new PrismaClient();
}

```

Esta función se registra en el contenedor de dependencias como singleton, permitiéndonos reutilizar la conexión y evitando crear una nueva cada vez.

#### Desventajas de Prisma ORM:

Aunque Prisma ORM ofrece numerosas ventajas, también presenta algunas desventajas. 
Una de ellas es la manipulación de números decimales. Prisma gestiona este tipo de datos con una biblioteca llamada Decimal.js, lo que puede requerir su implementación y puede resultar en la invasión de nuestros modelos de dominio. A pesar de esta desventaja, las ventajas que Prisma ofrece superan este inconveniente.

## Asegurando la calidad del código

### Linter and Prettier

Se utiliza el paquete husky el cual permite colocar hooks en comandos git y ejecutar procesos cuando ciertas acciones se realicen.

En cada commit en el hook pre-commit se ejecuta el paquete lint-staged con el cual se aplica el prettier y linter a los archivos que están en stage apunto de quedar dentro del commit.

Así cada vez que se realiza un commit se asegura de que el código cumpla con las reglas establecidad.

```shell
npx lint-staged


 "lint-staged": {
    "{src,tests}/**/*.ts": [
      "prettier --write ",
      "tslint --fix"
    ]
  },
```
### Tests

Los tests se encuentran en la carpeta **tests** en la raíz del proyecto. Esta carpeta refleja casi por completo la estructura dentro de **src**.

La estrategia de prueba que se implementa es:

#### Unit tests

Con estos tests, nos aseguramos de comprobar que el código de nuestros casos de uso se ejecute correctamente sin tener que interactuar directamente con los servicios de infraestructura. Para realizar los tests, se utiliza el paquete **Jest**.
```shell
npm run test:unit
```

```typescript
describe('VehicleCreator', () => {
  let vehicleRepository: VehicleRepositoryMock;

  beforeEach(() => {
    vehicleRepository = new VehicleRepositoryMock();
  });
  it('should register a new vehicle', async () => {
    const id = uuid();
    const plates = 'AC-121';
    const vin = '3LN123456789G4564';
    const vehicleType = 'SUV';
    const brand = 'Toyota';
    const price = new Prisma.Decimal(20000.0);

    const vehicleCreator = new VehicleCreator(vehicleRepository);
    const vehicleInfo: VehicleType = {
      id,
      plates,
      vin,
      price,
      brand,
      vehicleType
    };
    await vehicleCreator.run(vehicleInfo);

    vehicleRepository.assertCreateHasBeenCalledWith(vehicleInfo);
  });
});

```

Como vemos, para probar el caso de uso de registrar un vehículo, creamos un mock del **VehicleRepository**, el cual se pasa como constructor al caso de uso.

El propósito del mock es simular la implementación real del servicio. Este debe implementar la misma interfaz que el servicio que se está intentando simular (mock)

```typescript
export class VehicleRepositoryMock implements VehicleRepository {
  private mockCreate = jest.fn();
  private mockDelete = jest.fn();
  private mockfindOne = jest.fn();

  returnOnFindOne(vehicle: Vehicle) {
    this.mockfindOne.mockImplementation(() => {
      return vehicle;
    });
  }

  throwErrorOnFindOne(error: Error) {
    this.mockfindOne.mockImplementation(() => {
      throw error;
    });
  }
  async create(data: VehicleType): Promise<void> {
    this.mockCreate(data);
  }

  async delete(id: string): Promise<void> {
    this.mockDelete(id);
  }

  async findOne(id: string): Promise<Vehicle> {
    return this.mockfindOne(id);
  }
  assertFindOneHasBeenCalledWith(id: string) {
    expect(this.mockfindOne).toHaveBeenCalledWith(id);
  }

  assertCreateHasBeenCalledWith(vehicleInfo: VehicleType) {
    expect(this.mockCreate).toHaveBeenCalledWith(vehicleInfo);
  }
}

```

#### Test de Integración:

En estos tests, se verifica que la integración con cualquier servicio externo funcione según lo esperado. Estos tests interactúan con los servicios reales. Se considera integración cualquier cosa que no dependa de nosotros, ya sea bases de datos, conexiones a APIs, servicios como Kafka o Rabbit, entre otros.

Por ejemplo, este test se realiza para asegurarnos de que nuestro repositorio **VehiclePrismaRepository** se conecta correctamente con la base de datos y guarda los datos de manera adecuada.

```shell
npm run test:integration
```

```typescript
describe('VehiclePrismaRepository', () => {
  let vehicleRepository: VehiclePrismaRepository;
  beforeEach(async () => {
    vehicleRepository = new VehiclePrismaRepository(prismaConnection, logger);
  });

  beforeEach(async () => {
    // Todo: implement truncate info after tests finished
  });

  it('Should create a new Vehicle', async () => {
    const vehicleInfo = {
      id: uuid(),
      plates: 'AC-121',
      vin: '3LN123456789G4564',
      vehicleType: 'SUV',
      brand: 'Toyota',
      price: new Prisma.Decimal(20000.0)
    };
    const vehicle = Vehicle.register(vehicleInfo);
    await vehicleRepository.create(vehicle.toObject());
  });
  it('should find a vehicle registered', async () => {
    const vehicleInfo = {
      id: uuid(),
      plates: 'AC-121',
      vin: '3LN123456789G4564',
      vehicleType: 'SUV',
      brand: 'Toyota',
      price: new Prisma.Decimal(20000.0)
    };
    const vehicle = Vehicle.register(vehicleInfo);
    await vehicleRepository.create(vehicle.toObject());

    const vehicleDb = await vehicleRepository.findOne(vehicle.id);
    expect(vehicleDb).toEqual(vehicleInfo);
  });

  it('should delete a vehicle ', async () => {
    const vehicleInfo = {
      id: uuid(),
      plates: 'AC-121',
      vin: '3LN123456789G4564',
      vehicleType: 'SUV',
      brand: 'Toyota',
      price: new Prisma.Decimal(20000.0)
    };
    const vehicle = Vehicle.register(vehicleInfo);
    await vehicleRepository.create(vehicle.toObject());
    await vehicleRepository.delete(vehicle.id);
    await expect(async () => {
      await vehicleRepository.findOne(vehicle.id);
    }).rejects.toThrowError(new ObjectNotFound(`Object does not exist`));
  });
});

```

Como se ve en el ejemplo, se ataca directamente a la conexión sin utilizar mocks. Este tipo de tests normalmente lo aplicamos a lo que esta en las carpetas de infraestructura

### Contenedores y Entorno de la Aplicación:

Se emplea Docker y docker-compose para orquestar el entorno en el que se ejecuta la aplicación. La imagen base seleccionada es **node:20.8.1**.

#### Supervisores y Contenedores de Docker:

En general, se recomienda evitar el uso de supervisores dentro de los contenedores de Docker, ya que el ciclo de vida de la aplicación suele ser gestionado por balanceadores de carga o servicios como Kubernetes.

En esta ocasión, se decidió utilizar PM2. La elección se basa en la intención de desplegar el proyecto como un servicio único utilizando Cloud Run. Dado que no habrá una capa superior que controle el ciclo de vida de la aplicación, se optó por incorporar PM2 para gestionar este aspecto.

### Base de Datos:

#### MariaDB
Se utiliza MariaDB como base de datos debido a su amplio reconocimiento y rendimiento suficiente para el proyecto actual. En caso de requerir mayor rendimiento en el futuro, la estructura de la aplicación permite agregar otra conexión de manera casi transparente para los servicios que la utilicen.

MariaDB es utilizada para guardar los datos transaccionales de la aplicación

#### MongoDB

Se integró mongodb para la estructura de documentos e información de vistas que se calculan mediante cron jobs



## Características del API:

### Obtención de tipo de cambio MXN -> GBP ,USD, EUR

#### Conexiones HTTP

Se integró como un cliente el paquete `axios` que permite realizar peticiones HTTP.
Este cliente es pasado por constructor a los servicios que requieran realizar peticiones.


```typescript
export interface HttpClient<R extends ResponseHttpClient> {
  getRequest(url: string, requestParams: RequestParamsType): Promise<R>;
}

export default class AxiosClient implements HttpClient<AxiosResponse> {
  constructor(private readonly logger: Logger) {}
  async getRequest(url: string, requestParams: RequestParamsType = {}): Promise<AxiosResponse> {
    try {
      return await axios.get(url, requestParams);
    } catch (error) {
      this.logger.error(error as Error);
      throw new ApiRequestError(`Error Get Request with: ${AxiosClient.name}`);
    }
  }

```

#### Open exchange API

Se integró una conexión con el API de Open exchange , el cual es utilizado para obtener los tipos de cambio al momento

A este servicio se le pasa por construtor un cliente http , en este caso el cliente de axios , pero puede ser cualquiera que cumpla con el contrato especificado

```typescript
export default class OpenExchangeService implements CurrencyExchangeRateService {
  constructor(
    private readonly openExchangeConfig: OpenExchangeConfig,
    private readonly httpClient: HttpClient<ResponseHttpClient>,
    private readonly logger: Logger
  ) {}

  async getLastCurrencyRates(...currencies: string[]): Promise<CurrencyRate[]> {
    try {
      const response = await this.httpClient.getRequest(`${this.openExchangeConfig.baseUrl}/latest.json`, {
        params: {
          app_id: this.openExchangeConfig.appId,
          symbols: currencies.join(',')
        }
      });
      const data = response.data as OpenExchangeResponseType;

      const currencyRates: CurrencyRate[] = [];

      const mxnXusd = this.reversMXNtoUSD(data.rates.MXN, data.rates.USD);

      for (const [code, rate] of Object.entries(data.rates)) {
        const mxnRate = this.calculateCrossRateExchange(mxnXusd, rate);
        currencyRates.push(new CurrencyRate(code, mxnRate));
      }
      return currencyRates;
    } catch (error) {
      this.logger.error(error as Error);
      throw new Error('Error from here');
    }
  }

  private calculateCrossRateExchange(mxnRate: number, otherExchangeRate: number): number {
    const rate = mxnRate * otherExchangeRate;
    return Number(Number(rate).toFixed(3)) * 1000;
  }

  private reversMXNtoUSD(mxn: number, usd: number): number {
    return usd / mxn;
  }
}

```

### Cron jobs

La aplicación cuenta con dos cron jobs:
1. **Jon currencies rates:** Se dedica a obtener la información de cambio de moneda e insertarlo en la base de datos de mongo
2. **Job vehicles prices:** Toma la información del último tipo de cambio registrado y de los vehículos registrados para  generar una vista con la información del precio de cada uno de los vehiculos con su precio convertido al tipo de cambio de cada moneda

```typescript
cron.schedule('* */10 * * *', async () => {
  try {
    logger.info('running job');

    const insertLasCurrenciesRateService: InsertLastCurrenciesRate = container.resolve(
      'insertLastCurrenciesRateService'
    );
    const id = uuid();
    const date = new Date();
    await insertLasCurrenciesRateService.run(id, date);
  } catch (error) {
    logger.error(error as Error);
  }

  logger.info('Job finished');
});



cron.schedule('* */30 * * *', async () => {
  try {
    logger.info('running job');

    const insertLasCurrenciesRateService: LastVehiclesPricesInsert = container.resolve(
      'lastVehiclesPricesInsertService'
    );
    const id = uuid();
    const date = new Date();
    await insertLasCurrenciesRateService.run(id, date);
  } catch (error) {
    logger.error(error as Error);
  }

  logger.info('Job finished');
});


```

### Endpoints
Esta API consta de 3 endpoints.

```json
GET - /vehicles/:id

Response -> 200 OK
{
    "data": {
        "id": "5db22571-db1e-4d81-b5d7-d8a560935a62",
        "plates": "AA-34",
        "vin": "3L123456745674552",
        "brand": "Linconln",
        "vehicleType": "SUV",
        "price": 3000.45
    }
}

```

```json
POST - /vehicles
BODY
{
    "id": "5db22571-db1e-4d81-b5d7-d8a560935a62",
    "plates": "AA-34",
    "vin": "3L123456745674552",
    "brand": "Linconln",
    "vehicleType": "SUV",
    "price": 3000.45
}

Response -> 201 Created
```

```json
GET - /vehicles-prices
Response -> 200 OK

{
  "data": {
    "id": "a17c4835-717a-4256-80f4-2b4c479fde5a",
    "date": "2023-11-13T15:22:00.497Z",
    "vehicles": [
      {
        "id": "07ce6da4-eb91-4281-b657-1f0d9be2c634",
        "date": "2023-11-13T14:13:00.512Z",
        "prices": [
          {
            "code": "EUR",
            "price": "1060"
          },
          {
            "code": "GBP",
            "price": "920"
          },
          {
            "code": "MXN",
            "price": "20000"
          },
          {
            "code": "USD",
            "price": "1140"
          }
        ]
      },
      ...
    ]
  }
}
```

Características del API - Enfoque de ID (uuid4):

En este diseño, se optó por enviar el ID (uuid4) en el momento de la creación. Las ventajas de esta elección son:

* Tenemos control del ID, ya que lo conocemos de antemano, por lo tanto, no necesitamos una respuesta del backend para saber qué ID tiene.
* Al ser uuid4, existe una mínima posibilidad de que el ID colisione con algún otro ya registrado.
* Al conocer el ID desde el momento de crear la aplicación, podemos trabajar con servicios offline. Sabemos que cuando se recupere la conexión a internet, estos recursos podrán ser enviados al servidor y creados sin problema, ya que no dependemos de un ID numérico autogenerado y, por lo tanto, no habrá colisiones.

Desventajas de UUID:

Aunque el uso de UUID como identificadores ofrece ventajas, una desventaja significativa es la falta de indexación. Dado que los UUID son asignados de forma aleatoria, no siguen un orden lógico, lo que puede afectar negativamente al rendimiento de las consultas, especialmente en grandes conjuntos de datos.

A pesar de esta desventaja en términos de indexación, se ha tomado la decisión de utilizar UUID debido a sus beneficios, considerando que para muchos casos, las ventajas superan esta limitación.

### Validación de Parámetros en los Endpoints:

Se emplea el paquete **express-validato**r para llevar a cabo las validaciones de los parámetros requeridos en los endpoints.

```typescript
const reqGetVehiclesValidator = [param('id').exists().isUUID()];


const reqBodyCreatValidator = [
  body('id').exists().exists().isUUID(),
  body('plates').exists().isString().isLength({ max: 7 }),
  body('vin').exists().isString().isLength({ max: 17, min: 17 }),
  body('brand').exists().isString().isLength({ max: 20 }),
  body('vehicleType').exists().isString().isLength({ max: 10 }),
  body('price').exists().isNumeric().isLength({ max: 10 })
];
```

Validación de Parámetros en los Endpoints:

Este proceso se lleva a cabo mediante la implementación de un middleware en las rutas designadas. Este middleware, a través del uso de **express-validator**, se encarga de validar los parámetros requeridos en los endpoints, asegurando que los datos proporcionados cumplan con los criterios especificados antes de procesar la solicitud.

```typescript
export function validateReqSchema(req: Request, res: Response, next: NextFunction) {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }

  res.send({ errors: validationErrors.array() });
}

router.get('/vehicles/:id', reqGetVehiclesValidator, validateReqSchema, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const controller: GetVehicleController = container.resolve('getVehicleController');
    const payload = await controller.exec({ id });
    res.status(httpStatus.IM_A_TEAPOT);
    res.send({ data: payload });
  } catch (error) {
    logger.error(error as Error);
    if (error instanceof ClientError) {
      res.status(httpStatus.BAD_REQUEST);
      res.send({ error: error.message });
    } else {
      res.sendStatus(500).send({ eroor: 'Server error, retry later' });
    }
  }
});

```

La elección de express-validator se debe a su naturaleza intuitiva y su capacidad para identificar fácilmente las restricciones en los parámetros. 

### Configuración del Entorno Local:

Requerimientos:

* Docker y Docker Compose instalados.
* Una base de datos mongodb con replica set activado (puedes crear una gratis en [Mogo Atlas](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/) )
* Crear una cuenta en [Open Exchange](https://openexchangerates.org/) y generar un APP ID 

Instrucciones:

1. Clona el proyecto en tu computadora.
2. Asegúrate de tener los archivos `.env` y **environments/{dev, prod, test}.json** con las configuraciones correctas.
3. Ejecuta el comando **docker-compose up --build** para levantar el entorno de la API y la base de datos necesaria para el funcionamiento del API.
4. Una vez que los contenedores con el API y la base de datos han iniciado, accede a la terminal del contenedor que está ejecutando el API.
5. Dentro del contenedor del API, ejecuta el comando **npx prisma generate** para sincronizar los modelos y generar el Prisma Client para el proyecto, lo que nos permite trabajar con cada modelo.
6. Ejecuta el comando **npm run db:sync** para enviar los cambios en los modelos a la base de datos.


Estas instrucciones te guiarán para configurar el entorno local utilizando Docker y Docker Compose, permitiéndote trabajar con el proyecto de manera efectiva.