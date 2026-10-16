import type { Messages } from './messages'

export const es: Messages = {
  agentTitle: 'Instalar con un agente',
  agentBody:
    'Copia este mensaje en tu agente de programación. Incluye el despliegue y la plataforma elegidos, las comprobaciones y la guía oficial.',
  agentCopy: 'Copiar instrucciones',
  agentPrompt:
    'Instala LinkSense {{edition}} en esta máquina {{platform}}.\n\nLee primero la guía oficial: {{docs}}\n\nComprueba el sistema y la arquitectura reales, Docker Engine API 1.45+, Docker Compose 2.24.4+, la memoria disponible para Docker, el espacio SSD y el puerto TCP 18081. Revisa el instalador antes de ejecutarlo. Usa este comando solo si corresponde al equipo:\n\n{{command}}\n\nSi LinkSense ya está instalado, revisa su estado y conserva todas las claves y volúmenes. Detente antes de sobrescribir o restablecer datos. No muestres secretos en la respuesta final.\n\nAl terminar, indica la URL y guíame para inicializar el administrador y configurar el modelo. Las contraseñas y claves API se introducen en la aplicación local, no en este chat.',
  proofTitle: 'Para el trabajo diario de una organización.',
  languages: 'Idiomas de la interfaz',
  deployments: 'Configuraciones de alojamiento propio',
  channels: 'Canales de mensajería',
  methodsTitle: 'Un buen método,\nmás allá de una tarea.',
  method1: 'Define el resultado.',
  method2: 'Señala los detalles.',
  method3: 'Hazlo reutilizable.',
  method1body:
    'Explica el objetivo, los materiales y la entrega que necesitas.',
  method2body:
    'Selecciona una parte del resultado y solicita un cambio concreto.',
  method3body: 'Convierte el método probado en una aplicación para el equipo.',
  insightsTitle: 'Un buen lugar\npara empezar.',
  extend: 'Desarrolla con LinkSense',
  installGuide: 'Elige el despliegue, revisa los requisitos e instala.',
  startGuide: 'Conecta un modelo y completa tu primera tarea real.',
  extendGuide:
    'Empaqueta habilidades, conecta MCP y crea aplicaciones interactivas.',
  read: 'Leer la guía',
  planTitle: 'Planifica antes de actuar.',
  planBody:
    'Acordad el enfoque en modo Plan antes de ejecutar. Sigue los pasos, las herramientas y la actividad de los subagentes.',
  goalTitle: 'Haz avanzar un objetivo complejo.',
  goalBody:
    'El modo Objetivo permite abordar trabajos de varios pasos, consultar el progreso, pausar y respetar los límites de ejecución.',
  spaceTitle: 'Continúa donde lo dejaste.',
  spaceBody:
    'Organiza tareas en proyectos y reutiliza los archivos de trabajo. Las tareas personales comparten un entorno de usuario, no espacios aislados por tarea.',
  createTitle: 'Más formas de crear.',
  createBody:
    'Dicta un borrador editable, genera imágenes con un modelo configurado o publica un resultado HTML como sitio estático público.',
  home: 'Inicio',
  product: 'Producto',
  install: 'Instalación',
  start: 'Primeros pasos',
  docs: 'Documentación',
  try: 'Explorar LinkSense',
  menu: 'Menú',
  close: 'Cerrar',
  language: 'Idioma',
  skip: 'Ir al contenido',
  category: 'Un espacio de trabajo con IA para tu organización',
  hero1: 'De una idea individual.',
  hero2: 'A una capacidad de todo el equipo.',
  heroBody:
    'Investiga, crea y completa el trabajo. Convierte los métodos que funcionan en habilidades y aplicaciones para tu equipo. Con tu infraestructura y tus modelos.',
  watch: 'Descubre LinkSense en acción',
  play: 'Reproducir demostración',
  pause: 'Pausar demostración',
  introTitle: 'Las buenas formas de trabajar\nmerecen llegar más lejos.',
  introBody:
    'Un espacio para que cada persona trabaje con IA. Una forma de conservar los conocimientos, métodos y herramientas útiles para la organización.',
  workTitle: 'De una petición a un resultado.',
  workBody:
    'Investiga, analiza una hoja de cálculo o crea una presentación. Previsualiza Word, Excel, PPT y HTML, selecciona un detalle y pide cambios.',
  knowledgeTitle: 'Respuestas con fundamento.',
  knowledgeBody:
    'Consulta documentos de tu organización, abre las citas y comprueba la versión utilizada. Disponible con Full.',
  appsTitle: 'Tu mejor método, al alcance del equipo.',
  appsBody:
    'Combina instrucciones, modelos, conocimientos, habilidades y herramientas MCP en una aplicación. Comparte un paquete independiente o un servicio administrado.',
  autoTitle: 'El trabajo encuentra su ritmo.',
  autoBody:
    'Programa informes, revisiones y comprobaciones periódicas. Conserva las ejecuciones, el historial y los archivos en la misma tarea.',
  scenesTitle: 'Hazlo parte de\ntu día de trabajo.',
  sample: 'Ejemplo de flujo de trabajo',
  input: 'Tu petición',
  materials: 'Materiales de trabajo',
  report: 'Listo para revisar',
  source: 'Ver fuente',
  policy: 'Política de compras',
  answer: 'Una respuesta que puedes verificar.',
  sharedApp: 'Aplicación del equipo',
  skill: 'Habilidad',
  knowledge: 'Conocimiento',
  tools: 'Herramientas',
  people: 'Tu equipo',
  weekly: 'Informe semanal',
  scheduled: 'Programado',
  connectTitle: 'Conecta con el trabajo\ndonde ya está.',
  connectBody:
    'Autoriza Google Docs, Gmail, Outlook, OneDrive y SharePoint. Amplía tu espacio mediante MCP.',
  channelBody:
    'Inicia tareas desde WeChat, Feishu, WeCom, DingTalk y Microsoft Teams. Consulta el proceso completo y los archivos en LinkSense.',
  ownTitle: 'Tu infraestructura.\nTu forma de trabajar.',
  ownBody:
    'Despliega en tus servidores o nube privada. Elige modelos y gestiona quién puede utilizar cada capacidad.',
  models: 'Elige tus proveedores de modelos',
  governance: 'Usuarios, grupos y controles de acceso',
  usage: 'Cuotas, consumo y auditoría con datos sensibles ocultos',
  open: 'Una capa abierta de capacidades organizativas',
  faqTitle: 'Respuestas para empezar.',
  faq1: '¿En qué se diferencian Core y Full?',
  faq1a:
    'Core incluye el espacio de trabajo con IA y las capacidades organizativas, también los archivos adjuntos de las tareas. Full añade procesamiento documental y búsqueda en bases de conocimiento. Ambos son despliegues propios.',
  faq2: '¿Puedo usar mis propios modelos?',
  faq2a:
    'Puedes configurar proveedores y servicios compatibles. Antes de usarlos debes configurar modelos, credenciales y capacidades opcionales. La inferencia y la infraestructura pueden tener costes.',
  faq3: '¿El despliegue propio funciona totalmente sin conexión?',
  faq3a:
    'Depende de la configuración. Los modelos externos, sitios web, conectores y servicios MCP pueden transmitir datos fuera de tu infraestructura. El despliegue privado no garantiza aislamiento sin conexión.',
  faq4: '¿Qué exige la licencia de código abierto?',
  faq4a:
    'LinkSense utiliza CPAL-1.0 con permisos adicionales para despliegues internos. Las interfaces gráficas conservan la atribución; los documentos e imágenes exportados no necesitan marca de agua. Consulta los términos exactos.',
  ctaTitle: 'Pon las ideas de\ntu equipo a trabajar.',
  ctaBody: 'Empieza con una tarea real. Conserva lo que funciona.',
  footer: 'El trabajo con IA, conectado.',
  license: 'Licencia y atribución',
  security: 'Seguridad',
  community: 'Comunidad',
  installTitle: 'Abre espacio a\notra forma de trabajar.',
  installBody:
    'Elige un despliegue, prepara Docker y ejecuta el instalador. Después conecta un modelo y completa tu primera tarea.',
  edition: 'Despliegue',
  platform: 'Sistema operativo',
  coreBody: 'Espacio de trabajo con IA y capacidades organizativas.',
  fullBody:
    'Todo Core, más procesamiento documental y búsqueda de conocimiento.',
  requirements: 'Prepara el entorno',
  resourceNote:
    'Requisitos iniciales documentados, sin garantía de concurrencia o velocidad.',
  dockerNote:
    'Docker Engine API 1.45+, Compose 2.24.4+, curl y el puerto TCP 18081 disponible. macOS requiere Docker Desktop; cuenta la memoria realmente disponible para Docker Engine.',
  copy: 'Copiar comando',
  copied: 'Copiado',
  copyFailed:
    'No se puede copiar automáticamente. Selecciona el comando y cópialo manualmente.',
  afterInstall: 'Después de instalar',
  afterInstallBody:
    'Abre {{address}} y utiliza la credencial de inicialización de un solo uso que muestra el instalador para crear el primer administrador.',
  macNote:
    'En macOS, no uses sudo. Asigna memoria adicional a Docker Desktop para cumplir el requisito de memoria útil. La dirección localhost no significa acceso exclusivo desde tu Mac.',
  publicNote:
    'Para un despliegue público, configura un proxy inverso HTTPS. Protege las credenciales.',
  manage: 'Mantén tu despliegue operativo',
  upgradeNote:
    'La actualización crea una copia de PostgreSQL antes de migrar. Una vez iniciada la migración, los fallos no revierten automáticamente la base de datos. Guarda copias independientes de archivos y configuración.',
  fullNote:
    'La búsqueda de conocimiento requiere un modelo Embedding; Ranker es opcional.',
  startTitle: 'Una tarea real.\nUn primer resultado útil.',
  startBody:
    'De una instalación nueva a un resultado que puedes revisar, descargar y mejorar.',
  step1: 'Crea el administrador',
  step1body:
    'Abre el servicio y completa la inicialización con la credencial de un solo uso. Los miembros existentes acceden por el método habilitado por su administrador.',
  step2: 'Conecta un modelo',
  step2body:
    'En Configuración → Modelos, añade un canal proveedor y un modelo de conversación. Prueba la conexión, guarda y mantén el modelo disponible para conversaciones.',
  step3: 'Plantea una tarea clara',
  step3body:
    'Indica el objetivo, adjunta los materiales y describe el resultado esperado. Elige habilidades, complementos o bases de conocimiento disponibles cuando sea necesario.',
  step4: 'Revisa, mejora y reutiliza',
  step4body:
    'Abre los archivos, selecciona contenido para pedir cambios y descarga el resultado. Convierte un método probado en una aplicación para el equipo.',
  prompt:
    'Lee los datos de ventas adjuntos, identifica tres cambios importantes y genera un resumen con un desglose en Excel.',
  nextDocs: 'Continuar con las guías',
  notFound: 'Esta página no está aquí.',
  error: 'No se ha podido cargar esta página.',
  retry: 'Reintentar',
}

export const pt: Messages = {
  agentTitle: 'Instalar com um agente',
  agentBody:
    'Envie este pedido ao seu agente de programação. Ele inclui a implantação e a plataforma escolhidas, verificações e o guia oficial.',
  agentCopy: 'Copiar instruções',
  agentPrompt:
    'Instale o LinkSense {{edition}} nesta máquina {{platform}}.\n\nLeia primeiro o guia oficial: {{docs}}\n\nVerifique o sistema e a arquitetura reais, Docker Engine API 1.45+, Docker Compose 2.24.4+, memória disponível ao Docker, espaço SSD e porta TCP 18081. Inspecione o instalador antes de executar. Use este comando somente se corresponder ao ambiente:\n\n{{command}}\n\nSe o LinkSense já estiver instalado, inspecione seu estado e preserve todas as chaves e volumes. Pare antes de sobrescrever ou redefinir dados existentes. Não divulgue segredos na resposta final.\n\nAo terminar, forneça a URL e oriente a inicialização do administrador e a configuração do modelo. Senhas e chaves API devem ser inseridas no aplicativo local, não neste chat.',
  proofTitle: 'Para o dia de trabalho de uma organização.',
  languages: 'Idiomas da interface',
  deployments: 'Configurações de implantação própria',
  channels: 'Canais de mensagens',
  methodsTitle: 'Um bom método,\nalém de uma tarefa.',
  method1: 'Defina o resultado.',
  method2: 'Aponte os detalhes.',
  method3: 'Torne o método reutilizável.',
  method1body: 'Explique o objetivo, os materiais e a entrega desejada.',
  method2body:
    'Selecione uma parte da entrega e peça uma alteração específica.',
  method3body: 'Transforme o método comprovado em um aplicativo para a equipe.',
  insightsTitle: 'Um bom lugar\npara começar.',
  extend: 'Crie com o LinkSense',
  installGuide: 'Escolha a implantação, confira os requisitos e instale.',
  startGuide: 'Conecte um modelo e conclua sua primeira tarefa real.',
  extendGuide:
    'Empacote habilidades, conecte MCP e crie aplicativos interativos.',
  read: 'Ler o guia',
  planTitle: 'Planeje antes de agir.',
  planBody:
    'Combine a abordagem no modo Plano antes de executar. Acompanhe etapas, ferramentas e atividades dos subagentes.',
  goalTitle: 'Faça um objetivo complexo avançar.',
  goalBody:
    'Use o modo Objetivo para trabalhos de várias etapas, com progresso visível, pausa e limites de execução.',
  spaceTitle: 'Continue de onde parou.',
  spaceBody:
    'Organize tarefas em projetos e reaproveite os arquivos. Tarefas pessoais compartilham um ambiente de usuário, não ambientes isolados por tarefa.',
  createTitle: 'Mais formas de criar.',
  createBody:
    'Dite um rascunho editável, gere imagens com um modelo configurado ou publique uma entrega HTML como site estático público.',
  home: 'Início',
  product: 'Produto',
  install: 'Instalação',
  start: 'Primeiros passos',
  docs: 'Documentação',
  try: 'Explorar o LinkSense',
  menu: 'Menu',
  close: 'Fechar',
  language: 'Idioma',
  skip: 'Ir para o conteúdo',
  category: 'Um ambiente de IA para sua organização',
  hero1: 'Da ideia de uma pessoa.',
  hero2: 'À capacidade de toda a equipe.',
  heroBody:
    'Pesquise, crie e conclua o trabalho. Transforme métodos que funcionam em habilidades e aplicativos para a equipe. Na sua infraestrutura, com seus modelos.',
  watch: 'Veja o LinkSense em ação',
  play: 'Reproduzir demonstração',
  pause: 'Pausar demonstração',
  introTitle: 'Boas formas de trabalhar\nmerecem ir além.',
  introBody:
    'Um espaço para cada pessoa trabalhar com IA. Uma maneira de preservar os conhecimentos, métodos e ferramentas que ajudam a organização.',
  workTitle: 'De um pedido a uma entrega.',
  workBody:
    'Pesquise, analise planilhas ou crie apresentações. Visualize Word, Excel, PPT e HTML, selecione um detalhe e peça alterações.',
  knowledgeTitle: 'Respostas com fundamento.',
  knowledgeBody:
    'Consulte documentos da organização, abra citações e confira a versão usada. Disponível com Full.',
  appsTitle: 'Seu melhor método, para toda a equipe.',
  appsBody:
    'Combine instruções, modelos, conhecimentos, habilidades e ferramentas MCP em um aplicativo. Compartilhe um pacote independente ou um serviço gerenciado.',
  autoTitle: 'Trabalho que segue um ritmo.',
  autoBody:
    'Agende resumos, revisões e verificações periódicas. Mantenha execuções, histórico e arquivos na mesma tarefa.',
  scenesTitle: 'Faça parte do\nseu dia de trabalho.',
  sample: 'Fluxo de trabalho ilustrativo',
  input: 'Seu pedido',
  materials: 'Materiais de trabalho',
  report: 'Pronto para revisão',
  source: 'Ver fonte',
  policy: 'Política de compras',
  answer: 'Uma resposta que você pode verificar.',
  sharedApp: 'Aplicativo da equipe',
  skill: 'Habilidade',
  knowledge: 'Conhecimento',
  tools: 'Ferramentas',
  people: 'Sua equipe',
  weekly: 'Resumo semanal',
  scheduled: 'Agendado',
  connectTitle: 'Encontre seu trabalho\nonde ele já está.',
  connectBody:
    'Autorize Google Docs, Gmail, Outlook, OneDrive e SharePoint. Amplie seu ambiente com MCP.',
  channelBody:
    'Inicie tarefas pelo WeChat, Feishu, WeCom, DingTalk e Microsoft Teams. Veja o processo completo e os arquivos no LinkSense.',
  ownTitle: 'Sua infraestrutura.\nSeu jeito de trabalhar.',
  ownBody:
    'Implante em seus servidores ou nuvem privada. Escolha modelos e gerencie quem pode usar cada capacidade.',
  models: 'Escolha os provedores de modelos',
  governance: 'Usuários, grupos e controle de acesso',
  usage: 'Cotas, uso e auditoria com dados sensíveis ocultos',
  open: 'Uma camada aberta de capacidades organizacionais',
  faqTitle: 'Algumas respostas para começar.',
  faq1: 'Qual é a diferença entre Core e Full?',
  faq1a:
    'Core inclui o ambiente de IA e as capacidades organizacionais, além dos anexos comuns das tarefas. Full acrescenta processamento de documentos e busca em bases de conhecimento. Ambos são opções de implantação própria.',
  faq2: 'Posso usar meus próprios modelos?',
  faq2a:
    'Você configura os provedores e serviços compatíveis. Antes do uso, configure modelos, credenciais e capacidades opcionais. Inferência e infraestrutura podem ter custos próprios.',
  faq3: 'A implantação própria funciona totalmente offline?',
  faq3a:
    'Depende da configuração. Modelos externos, sites, conectores e serviços MCP podem transmitir dados para fora da sua infraestrutura. Implantação privada não garante isolamento offline completo.',
  faq4: 'O que a licença de código aberto exige?',
  faq4a:
    'O LinkSense usa CPAL-1.0 com permissões adicionais para implantação interna. Interfaces gráficas mantêm a atribuição; documentos e imagens exportados não precisam de marca-d’água. Consulte os termos completos.',
  ctaTitle: 'Coloque as ideias\nda equipe em prática.',
  ctaBody: 'Comece com uma tarefa real. Aproveite o que funciona.',
  footer: 'Trabalho com IA, conectado.',
  license: 'Licença e atribuição',
  security: 'Segurança',
  community: 'Comunidade',
  installTitle: 'Abra espaço para\num novo jeito de trabalhar.',
  installBody:
    'Escolha a implantação, prepare o Docker e execute o instalador. Depois conecte um modelo e conclua sua primeira tarefa.',
  edition: 'Implantação',
  platform: 'Sistema operacional',
  coreBody: 'Ambiente de IA e capacidades organizacionais.',
  fullBody: 'Tudo do Core, mais documentos e busca de conhecimento.',
  requirements: 'Prepare o ambiente',
  resourceNote:
    'Requisitos iniciais documentados, sem garantia de concorrência ou velocidade.',
  dockerNote:
    'Docker Engine API 1.45+, Compose 2.24.4+, curl e porta TCP 18081 disponível. macOS requer Docker Desktop; vale a memória realmente disponível para o Docker Engine.',
  copy: 'Copiar comando',
  copied: 'Copiado',
  copyFailed:
    'Não foi possível copiar automaticamente. Selecione o comando e copie manualmente.',
  afterInstall: 'Depois da instalação',
  afterInstallBody:
    'Abra {{address}} e use a credencial de inicialização de uso único exibida pelo instalador para criar o primeiro administrador.',
  macNote:
    'No macOS, não use sudo. Aloque memória extra ao Docker Desktop para atender ao requisito de memória útil. O endereço localhost não significa acesso restrito ao seu Mac.',
  publicNote:
    'Para implantação pública, configure um proxy reverso HTTPS. Proteja as credenciais.',
  manage: 'Mantenha a implantação funcionando',
  upgradeNote:
    'A atualização cria um backup do PostgreSQL antes da migração. Após o início da migração, falhas não revertem o banco automaticamente. Mantenha backups independentes de arquivos e configuração.',
  fullNote:
    'A busca de conhecimento requer um modelo Embedding; Ranker é opcional.',
  startTitle: 'Uma tarefa real.\nUm primeiro resultado útil.',
  startBody:
    'Da instalação a um resultado que você pode revisar, baixar e melhorar.',
  step1: 'Crie o administrador',
  step1body:
    'Abra o serviço e conclua a inicialização com a credencial de uso único. Membros existentes usam o método habilitado pelo administrador.',
  step2: 'Conecte um modelo',
  step2body:
    'Em Configurações → Modelos, adicione um canal e um modelo de conversa. Teste a conexão, salve e mantenha o modelo disponível para conversas.',
  step3: 'Defina uma tarefa clara',
  step3body:
    'Informe o objetivo, anexe os materiais e descreva a entrega. Selecione habilidades, plugins ou bases de conhecimento disponíveis quando necessário.',
  step4: 'Revise, melhore e reutilize',
  step4body:
    'Abra os arquivos, selecione conteúdo para pedir alterações e baixe o resultado. Transforme um fluxo comprovado em um aplicativo para a equipe.',
  prompt:
    'Leia os dados de vendas anexados, identifique três mudanças importantes e crie um resumo com um detalhamento em Excel.',
  nextDocs: 'Continuar nos guias de uso',
  notFound: 'Esta página não está aqui.',
  error: 'Não foi possível carregar esta página.',
  retry: 'Tentar novamente',
}

export const fr: Messages = {
  agentTitle: 'Installer avec un agent',
  agentBody:
    'Transmettez ce message à votre agent de programmation. Il comprend le déploiement choisi, la plateforme, les vérifications et le guide officiel.',
  agentCopy: 'Copier les instructions',
  agentPrompt:
    'Installe LinkSense {{edition}} sur cette machine {{platform}}.\n\nLis d’abord le guide officiel : {{docs}}\n\nVérifie le système et l’architecture réels, Docker Engine API 1.45+, Docker Compose 2.24.4+, la mémoire utilisable par Docker, l’espace SSD et le port TCP 18081. Examine le script avant exécution. Utilise cette commande uniquement si elle correspond à la machine :\n\n{{command}}\n\nSi LinkSense est déjà installé, vérifie son état et préserve les clés et volumes. Arrête-toi avant d’écraser ou de réinitialiser des données. N’affiche aucun secret dans la réponse finale.\n\nÀ la fin, fournis l’URL et guide-moi pour l’initialisation de l’administrateur et la configuration du modèle. Les mots de passe et clés API doivent être saisis dans l’application locale, pas dans ce chat.',
  proofTitle: 'Pour le quotidien de votre organisation.',
  languages: 'Langues de l’interface',
  deployments: 'Configurations auto-hébergées',
  channels: 'Canaux de messagerie',
  methodsTitle: 'Une bonne méthode,\nbien au-delà d’une tâche.',
  method1: 'Définissez le résultat.',
  method2: 'Précisez les détails.',
  method3: 'Rendez la méthode réutilisable.',
  method1body: 'Décrivez l’objectif, les documents et le livrable attendu.',
  method2body:
    'Sélectionnez un élément du résultat et demandez une modification précise.',
  method3body: 'Transformez la méthode éprouvée en application pour l’équipe.',
  insightsTitle: 'Un bon point\nde départ.',
  extend: 'Développer avec LinkSense',
  installGuide:
    'Choisissez le déploiement, vérifiez les exigences et installez.',
  startGuide: 'Connectez un modèle et réalisez votre première vraie tâche.',
  extendGuide:
    'Créez des compétences, connectez MCP et développez des applications interactives.',
  read: 'Lire le guide',
  planTitle: 'Planifiez avant d’agir.',
  planBody:
    'Validez l’approche en mode Plan avant l’exécution. Suivez les étapes, les outils et l’activité des sous-agents.',
  goalTitle: 'Faites avancer un objectif complexe.',
  goalBody:
    'Utilisez le mode Objectif pour les travaux en plusieurs étapes, avec progression visible, pause et limites d’exécution.',
  spaceTitle: 'Reprenez là où vous en étiez.',
  spaceBody:
    'Organisez les tâches en projets et réutilisez les fichiers. Les tâches personnelles partagent un environnement utilisateur, sans isolation de sécurité par tâche.',
  createTitle: 'Plus de façons de créer.',
  createBody:
    'Dictez un brouillon modifiable, générez des images avec un modèle configuré ou publiez un livrable HTML comme site statique public.',
  home: 'Accueil',
  product: 'Produit',
  install: 'Installation',
  start: 'Premiers pas',
  docs: 'Documentation',
  try: 'Découvrir LinkSense',
  menu: 'Menu',
  close: 'Fermer',
  language: 'Langue',
  skip: 'Aller au contenu',
  category: 'Un espace de travail IA pour votre organisation',
  hero1: 'De l’idée d’une personne.',
  hero2: 'Au savoir-faire de toute une équipe.',
  heroBody:
    'Recherchez, créez et faites avancer le travail. Transformez les méthodes efficaces en compétences et applications pour votre équipe. Sur votre infrastructure, avec vos modèles.',
  watch: 'Voir LinkSense à l’œuvre',
  play: 'Lire la démonstration',
  pause: 'Mettre la démonstration en pause',
  introTitle: 'Les bonnes méthodes\nméritent d’aller plus loin.',
  introBody:
    'Un espace pour travailler avec l’IA. Un moyen de conserver les connaissances, méthodes et outils utiles à votre organisation.',
  workTitle: 'D’une demande à un livrable.',
  workBody:
    'Recherchez, analysez un tableau ou créez une présentation. Prévisualisez Word, Excel, PPT et HTML, sélectionnez un détail et demandez des modifications.',
  knowledgeTitle: 'Des réponses étayées.',
  knowledgeBody:
    'Interrogez les documents de votre organisation, ouvrez les citations et retrouvez la version utilisée. Disponible avec Full.',
  appsTitle: 'Votre meilleure méthode, pour toute l’équipe.',
  appsBody:
    'Réunissez instructions, modèles, connaissances, compétences et outils MCP dans une application. Partagez un paquet indépendant ou un service géré.',
  autoTitle: 'Le travail prend son rythme.',
  autoBody:
    'Planifiez synthèses, bilans et contrôles récurrents. Conservez chaque exécution, son historique et ses fichiers dans la même tâche.',
  scenesTitle: 'Une place dans\nvotre quotidien.',
  sample: 'Exemple de flux de travail',
  input: 'Votre demande',
  materials: 'Documents de travail',
  report: 'Prêt pour relecture',
  source: 'Voir la source',
  policy: 'Politique d’achat',
  answer: 'Une réponse dont on peut retrouver la source.',
  sharedApp: 'Application d’équipe',
  skill: 'Compétence',
  knowledge: 'Connaissances',
  tools: 'Outils',
  people: 'Votre équipe',
  weekly: 'Synthèse hebdomadaire',
  scheduled: 'Planifié',
  connectTitle: 'Retrouvez votre travail\nlà où il se trouve.',
  connectBody:
    'Autorisez Google Docs, Gmail, Outlook, OneDrive et SharePoint. Étendez votre espace avec MCP.',
  channelBody:
    'Lancez des tâches depuis WeChat, Feishu, WeCom, DingTalk et Microsoft Teams. Consultez le processus et les fichiers complets dans LinkSense.',
  ownTitle: 'Votre infrastructure.\nVotre façon de travailler.',
  ownBody:
    'Déployez sur vos serveurs ou votre cloud privé. Choisissez les modèles et gérez l’accès à chaque capacité.',
  models: 'Choisissez vos fournisseurs de modèles',
  governance: 'Utilisateurs, groupes et contrôle d’accès',
  usage: 'Quotas, consommation et audit expurgé',
  open: 'Une couche ouverte de capacités organisationnelles',
  faqTitle: 'Quelques réponses utiles.',
  faq1: 'Quelle différence entre Core et Full ?',
  faq1a:
    'Core comprend l’espace IA, les capacités organisationnelles et les pièces jointes ordinaires des tâches. Full ajoute le traitement documentaire et la recherche dans les connaissances. Les deux sont des options auto-hébergées.',
  faq2: 'Puis-je utiliser mes propres modèles ?',
  faq2a:
    'Vous configurez les fournisseurs et services compatibles. Modèles, identifiants et capacités facultatives doivent être configurés avant utilisation. L’inférence et l’infrastructure peuvent avoir leurs propres coûts.',
  faq3: 'L’auto-hébergement garantit-il un fonctionnement hors ligne ?',
  faq3a:
    'Cela dépend de la configuration. Modèles externes, sites web, connecteurs et services MCP peuvent transmettre des données hors de votre infrastructure. Un déploiement privé ne garantit pas un isolement hors ligne complet.',
  faq4: 'Qu’exige la licence open source ?',
  faq4a:
    'LinkSense utilise CPAL-1.0 avec des permissions supplémentaires pour les déploiements internes. Les interfaces graphiques conservent l’attribution ; les documents et images exportés ne nécessitent aucun filigrane. Consultez les conditions précises.',
  ctaTitle: 'Mettez les idées\nde l’équipe à l’œuvre.',
  ctaBody: 'Commencez par une vraie tâche. Conservez ce qui fonctionne.',
  footer: 'Le travail avec l’IA, connecté.',
  license: 'Licence et attribution',
  security: 'Sécurité',
  community: 'Communauté',
  installTitle: 'Faites place à\nune nouvelle façon de travailler.',
  installBody:
    'Choisissez un déploiement, préparez Docker et lancez l’installateur. Connectez ensuite un modèle et réalisez votre première tâche.',
  edition: 'Déploiement',
  platform: 'Système d’exploitation',
  coreBody: 'Espace de travail IA et capacités organisationnelles.',
  fullBody:
    'Tout Core, plus traitement documentaire et recherche de connaissances.',
  requirements: 'Préparez votre environnement',
  resourceNote:
    'Configuration de départ documentée, sans garantie de capacité simultanée ni de vitesse.',
  dockerNote:
    'Docker Engine API 1.45+, Compose 2.24.4+, curl et port TCP 18081 disponible. macOS nécessite Docker Desktop ; la mémoire retenue est celle réellement utilisable par Docker Engine.',
  copy: 'Copier la commande',
  copied: 'Copié',
  copyFailed:
    'Copie automatique indisponible. Sélectionnez la commande pour la copier manuellement.',
  afterInstall: 'Après l’installation',
  afterInstallBody:
    'Ouvrez {{address}} et utilisez l’identifiant d’initialisation à usage unique affiché par l’installateur pour créer le premier administrateur.',
  macNote:
    'Sous macOS, n’utilisez pas sudo. Allouez davantage de mémoire à Docker Desktop pour atteindre le minimum réellement utilisable. L’adresse localhost ne signifie pas que seul votre Mac peut accéder au service.',
  publicNote:
    'Pour un déploiement public, configurez un proxy inverse HTTPS. Protégez les identifiants.',
  manage: 'Maintenez votre déploiement',
  upgradeNote:
    'La mise à niveau sauvegarde PostgreSQL avant la migration. Après le début de la migration, une erreur ne rétablit pas automatiquement la base. Sauvegardez séparément fichiers et configuration.',
  fullNote:
    'La recherche nécessite un modèle Embedding ; Ranker est facultatif.',
  startTitle: 'Une vraie tâche.\nUn premier résultat utile.',
  startBody:
    'De l’installation à un résultat à relire, télécharger et améliorer.',
  step1: 'Créez votre administrateur',
  step1body:
    'Ouvrez le service et terminez l’initialisation avec l’identifiant à usage unique. Les membres existants utilisent la méthode activée par leur administrateur.',
  step2: 'Connectez un modèle',
  step2body:
    'Dans Paramètres → Modèles, ajoutez un fournisseur et un modèle de conversation. Testez, enregistrez et laissez le modèle disponible pour les conversations.',
  step3: 'Définissez une tâche claire',
  step3body:
    'Précisez l’objectif, joignez les documents et décrivez le livrable. Sélectionnez les compétences, extensions ou bases de connaissances disponibles si nécessaire.',
  step4: 'Relisez, améliorez, réutilisez',
  step4body:
    'Ouvrez les fichiers, sélectionnez du contenu pour demander des modifications et téléchargez le résultat. Transformez une méthode éprouvée en application pour l’équipe.',
  prompt:
    'Lisez les données de vente jointes, identifiez trois évolutions importantes et créez une synthèse avec un détail Excel.',
  nextDocs: 'Continuer avec les guides',
  notFound: 'Cette page n’est pas ici.',
  error: 'Impossible de charger cette page.',
  retry: 'Réessayer',
}

export const ja: Messages = {
  agentTitle: 'AI エージェントでインストール',
  agentBody:
    'この手順をコーディングエージェントに渡してください。選択した構成と OS、環境の確認項目、公式ガイドを含みます。',
  agentCopy: 'インストール手順をコピー',
  agentPrompt:
    'この {{platform}} マシンに LinkSense {{edition}} をインストールしてください。\n\n最初に公式ガイドを読んでください：{{docs}}\n\n実際の OS とアーキテクチャ、Docker Engine API 1.45+、Docker Compose 2.24.4+、Docker の利用可能メモリ、SSD 容量、TCP 18081 ポートを確認してください。実行前にスクリプトを確認し、次のコマンドがこの環境に適している場合のみ使用してください：\n\n{{command}}\n\n既に LinkSense がある場合は状態を確認し、すべてのキーとデータボリュームを保全してください。既存データを上書き・初期化する前に停止してください。最後の回答に秘密情報を表示しないでください。\n\n完了後にアクセス URL を示し、初回管理者の初期化とモデル設定を案内してください。パスワードと API キーはローカルのアプリで入力し、このチャットには送らないようにしてください。',
  proofTitle: '組織の日々の仕事のために。',
  languages: '対応する画面言語',
  deployments: 'セルフホスト構成',
  channels: 'メッセージチャネル',
  methodsTitle: 'よい手順を、\n一度きりで終わらせない。',
  method1: '求める成果を伝える。',
  method2: '修正する箇所を示す。',
  method3: '再利用できる形に。',
  method1body: '目的、資料、必要な成果物を説明します。',
  method2body: '成果物の箇所を選び、具体的な修正を依頼します。',
  method3body: '有効な手順をチーム用アプリにまとめます。',
  insightsTitle: 'ここから、\n始めましょう。',
  extend: 'LinkSense で拡張する',
  installGuide: '構成と動作要件を確認してインストールします。',
  startGuide: 'モデルを接続し、最初の仕事を完了します。',
  extendGuide: 'スキルの作成、MCP 接続、対話型アプリの開発へ。',
  read: 'ガイドを読む',
  planTitle: '実行の前に、計画を確認。',
  planBody:
    '計画モードで方針を確認してから実装へ。手順、ツール、サブエージェントの活動を追跡できます。',
  goalTitle: '複雑な目標を、一歩ずつ。',
  goalBody:
    '目標モードで複数の手順が必要な仕事を進めます。進捗を確認し、必要に応じて一時停止できます。実行には上限があります。',
  spaceTitle: '前の仕事から、続きを始める。',
  spaceBody:
    'タスクをプロジェクトに整理し、作業ファイルを再利用します。個人タスクはユーザー環境を共有し、タスクごとの安全な隔離は行いません。',
  createTitle: '表現と成果物に、選択肢を。',
  createBody:
    '音声を編集可能な下書きに変換し、設定済みモデルで画像を生成。HTML の成果物を公開静的サイトとして発信できます。',
  home: 'ホーム',
  product: '製品機能',
  install: 'インストール',
  start: 'はじめに',
  docs: 'ドキュメント',
  try: 'LinkSense を試す',
  menu: 'メニュー',
  close: '閉じる',
  language: '言語',
  skip: '本文へ移動',
  category: '組織のための AI ワークスペース',
  hero1: '一人のアイデアを、',
  hero2: 'チーム全体の力に。',
  heroBody:
    '調査、資料作成、業務の実行まで。役立つ手順をスキルやアプリにまとめ、チームで活用できます。自社の環境で、選んだモデルとともに。',
  watch: 'LinkSense の動作を見る',
  play: '製品デモを再生',
  pause: '製品デモを一時停止',
  introTitle: '優れた仕事の進め方を、\nもっと広く。',
  introBody:
    '一人ひとりに AI と働く場所を。組織には、役立つ知識、手順、ツールを蓄積する仕組みを。',
  workTitle: '一つの依頼から、成果物へ。',
  workBody:
    'テーマの調査、表計算の分析、プレゼンテーションの作成。Word、Excel、PPT、HTML をプレビューし、箇所を選んで修正を依頼できます。',
  knowledgeTitle: '根拠をたどれる回答。',
  knowledgeBody:
    '組織の文書を検索し、引用から回答に使われた文書のバージョンを確認できます。Full で利用可能です。',
  appsTitle: 'あなたの得意な手順を、チームの力に。',
  appsBody:
    '指示、モデル、知識、スキル、MCP ツールをアプリに組み合わせます。独立したパッケージや、作成者が管理するサービスとして共有できます。',
  autoTitle: '繰り返す仕事に、リズムを。',
  autoBody:
    '定期的な要約、振り返り、確認作業をスケジュール。実行履歴と成果物を同じタスクに保存します。',
  scenesTitle: '日々の仕事に、\nAI の力を。',
  sample: 'ワークフローの例',
  input: '仕事の依頼',
  materials: '作業資料',
  report: 'レビュー待ちの成果物',
  source: '引用元を見る',
  policy: '購買管理規程',
  answer: '根拠を確認できる回答。',
  sharedApp: 'チームアプリ',
  skill: 'スキル',
  knowledge: '知識',
  tools: 'ツール',
  people: 'チーム',
  weekly: '週間レポート',
  scheduled: '実行予定',
  connectTitle: 'いつもの業務システムと、\nつながる。',
  connectBody:
    '認可した Google Docs、Gmail、Outlook、OneDrive、SharePoint を利用できます。MCP でほかの組織システムにも接続できます。',
  channelBody:
    'WeChat、Feishu、WeCom、DingTalk、Microsoft Teams からタスクを開始。詳しい実行内容とファイルは LinkSense で確認できます。',
  ownTitle: '自社の環境で、\n自社らしい働き方を。',
  ownBody:
    '自社サーバーやプライベートクラウドに導入。モデルを選び、機能を使えるユーザーを管理できます。',
  models: 'モデルと提供元を選択',
  governance: 'ユーザー、グループ、アクセス制御',
  usage: '利用枠、使用量、機密情報を除いた監査',
  open: 'オープンな組織向け機能基盤',
  faqTitle: 'まず知っておきたいこと。',
  faq1: 'Core と Full の違いは？',
  faq1a:
    'Core は AI ワークスペースと組織向け機能を備え、通常の添付ファイルも処理できます。Full は文書処理とナレッジ検索を追加します。どちらもセルフホストの構成です。',
  faq2: '自社で選んだモデルを使えますか？',
  faq2a:
    'モデルの提供元や互換エンドポイントを設定できます。利用前にモデル、認証情報、必要な機能の設定が必要です。推論やインフラには別途費用がかかる場合があります。',
  faq3: 'セルフホストなら完全オフラインですか？',
  faq3a:
    'データの送信先は設定によって異なります。外部モデル、ウェブサイト、コネクター、MCP サービスは外部にデータを送る場合があります。プライベート環境への導入は完全なオフライン分離を保証しません。',
  faq4: 'オープンソースの利用条件は？',
  faq4a:
    'LinkSense は CPAL-1.0 を採用し、社内導入向けの追加許諾を設けています。グラフィカルな画面では帰属表示が必要ですが、書き出した文書や画像に透かしは不要です。詳しくはライセンスをご確認ください。',
  ctaTitle: 'チームのアイデアを、\n仕事にしよう。',
  ctaBody: 'まずは一つの実際の仕事から。役立つ手順を蓄積しましょう。',
  footer: 'AI と組織の仕事をつなぐ。',
  license: 'ライセンスと帰属表示',
  security: 'セキュリティ',
  community: 'コミュニティ',
  installTitle: '新しい働き方の、\n場所をつくる。',
  installBody:
    '構成を選び、Docker を準備してインストーラーを実行します。その後モデルを接続し、最初のタスクを試しましょう。',
  edition: '構成',
  platform: 'OS',
  coreBody: 'AI ワークスペースと組織向け機能。',
  fullBody: 'Core の全機能と、文書処理・ナレッジ検索。',
  requirements: '動作環境を準備',
  resourceNote:
    '文書記載の初期要件です。同時実行数や処理速度を保証するものではありません。',
  dockerNote:
    'Docker Engine API 1.45+、Compose 2.24.4+、curl、空いている TCP 18081 ポートが必要です。macOS では Docker Desktop を使用し、Docker Engine が実際に利用できるメモリ量で判定します。',
  copy: 'コマンドをコピー',
  copied: 'コピーしました',
  copyFailed:
    '自動コピーできません。コマンドを選択して手動でコピーしてください。',
  afterInstall: 'インストール後',
  afterInstallBody:
    '{{address}} を開き、インストーラーが表示した一度限りの初期化認証情報で最初の管理者を作成します。',
  macNote:
    'macOS では sudo を使用しないでください。Docker Desktop に実用可能なメモリ要件を満たす余裕を持たせてください。localhost からのアクセス例は、Mac 以外からの接続を制限するものではありません。',
  publicNote:
    '公開環境では HTTPS リバースプロキシを設定し、認証情報を保護してください。',
  manage: '導入環境を運用する',
  upgradeNote:
    '更新時は移行前に PostgreSQL をバックアップします。移行開始後の失敗でデータベースが自動復元されることはありません。ファイルと設定は別途バックアップしてください。',
  fullNote: 'ナレッジ検索には Embedding モデルが必要です。Ranker は任意です。',
  startTitle: '一つの仕事から、\n役立つ最初の成果へ。',
  startBody: '新規導入から、確認・ダウンロード・修正できる成果物を得るまで。',
  step1: '管理者を作成する',
  step1body:
    '導入先を開き、一度限りの認証情報で初期化を完了します。既存メンバーは管理者が有効にした方法でログインします。',
  step2: 'モデルを接続する',
  step2body:
    '「設定 → モデル設定」で提供元と対話モデルを追加します。接続をテストして保存し、対話用の選択肢として有効にします。',
  step3: '明確な仕事を依頼する',
  step3body:
    '目的、資料、求める成果物を伝えます。必要に応じて、利用できるスキル、プラグイン、ナレッジベースを選びます。',
  step4: '確認し、改善して再利用する',
  step4body:
    '成果物を開き、箇所を選んで修正を依頼し、結果をダウンロードします。有効な手順はチーム用アプリにまとめられます。',
  prompt:
    '添付した売上データから重要な変化を三つ見つけ、要約と Excel の明細を作成してください。',
  nextDocs: 'ユーザーガイドを読む',
  notFound: 'このページは見つかりません。',
  error: 'ページを読み込めませんでした。',
  retry: '再試行',
}
