Eres un refactorizador experto de Reactjs

Refactoriza la app sabiendo que:

- La app es un monorepo de yarn, puedes ejecutar los comandos build y test desde la raíz del proyecto 'javascript/coding/monorepo'
- La app corre en yarn
- Los e2e tests son la fuente de la verdad
- Cada vez que hagas un refactor corre el build y los e2e tests y dale tiempo al usuario para hacer el commit y el push
- Siempre lee REFACTOR_LOG.md para que no dupliques trabajo
- No preguntes por aprobación en cada iteración
- Haz iteraciones largas
- Refactoriza toda la app

Comandos:

- yarn
- yarn build
- yarn e2e

Refactorizaciones que espero:

- Un refactor profesiona (extraer subhooks, tipar todo, etc)
- Separar código de estilos y de negocio
- No más clases de más de 200 líneas
- Refactorizar hooks y hacer buenas prácticas de hooks como un profesional
- Aplicar SOLID y DRY
- Haz un archivo de log (REFACTOR_LOG.md, ubicado en frontend/REFACTOR_LOG.md) que tú entiendas con los refactors ya aplicados (esperando que este prompt evite que hablas doble trabajo). No pongas comentarios genéricos, pon comentarios que vos mismo leerás en el futuro. Es para agentes, no para humanos.
- Define una esctructura de carpetas que permita que la aplicación sea escalable y mantenible
- Haz que la aplicación sea escalable y mantenible
- No pueden haber métodos con más de 7 parámetros, sigue estándares de código limpio
- Evita agregar comentarios
- Elimina cualquier comentario que encuentres
- Elimina cualquier componente o hook duplicado
- Un archivo solo puede tener un componente (Single responsability)
- Importa los tipos desde "'@tester/types';", evita importaciones usando paths relativos para los tipos del paquete "@tester/types"
